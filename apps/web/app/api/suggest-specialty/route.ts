import { NextResponse } from 'next/server'

const VALID_SPECIALTIES = [
  'CLINICAL_MEDICINE', 'PEDIATRICS', 'DERMATOLOGY', 'GYNECOLOGY',
  'ORTHOPEDICS', 'PSYCHIATRY', 'NEUROLOGY', 'CARDIOLOGY',
  'ENDOCRINOLOGY', 'GASTROENTEROLOGY', 'OTORHINOLARYNGOLOGY',
]

const SYSTEM_PROMPT = `Você é um assistente de triagem médica de uma plataforma de telemedicina brasileira.
Com base nos sintomas descritos pelo paciente, indique qual das especialidades abaixo é a mais adequada.

Especialidades disponíveis:
- CLINICAL_MEDICINE: Clínica Médica (queixas gerais, febre, dor inespecífica, mal-estar)
- PEDIATRICS: Pediatria (crianças e adolescentes até 18 anos)
- DERMATOLOGY: Dermatologia (pele, cabelo, unhas, alergias cutâneas)
- GYNECOLOGY: Ginecologia (saúde feminina, ciclo menstrual, gravidez)
- ORTHOPEDICS: Ortopedia (ossos, articulações, músculos, lesões)
- PSYCHIATRY: Psiquiatria (saúde mental, ansiedade, depressão, insônia)
- NEUROLOGY: Neurologia (dor de cabeça intensa, tontura, formigamento, memória)
- CARDIOLOGY: Cardiologia (dor no peito, palpitações, pressão arterial, falta de ar)
- ENDOCRINOLOGY: Endocrinologia (diabetes, tireoide, hormônios, obesidade)
- GASTROENTEROLOGY: Gastroenterologia (estômago, intestino, fígado, náusea, diarreia)
- OTORHINOLARYNGOLOGY: Otorrinolaringologia (ouvido, nariz, garganta, sinusite, tontura)

Responda SOMENTE com JSON válido, sem markdown ou texto extra:
{"specialty":"CHAVE","label":"Nome em português","reason":"Explicação em 1-2 frases do motivo desta indicação"}

Você NÃO faz diagnósticos. Em caso de dúvida ou queixas gerais, use CLINICAL_MEDICINE.`

export async function POST(req: Request) {
  try {
    const { symptoms } = await req.json()

    if (!symptoms || symptoms.trim().length < 10) {
      return NextResponse.json(
        { error: 'Descreva seus sintomas com mais detalhes (mínimo 10 caracteres).' },
        { status: 400 },
      )
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Serviço temporariamente indisponível.' },
        { status: 503 },
      )
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: symptoms.trim().slice(0, 500) },
        ],
        max_tokens: 200,
        temperature: 0.2,
      }),
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Erro ao consultar a IA.' }, { status: 502 })
    }

    const data = await res.json()
    const text: string = data.choices?.[0]?.message?.content ?? ''
    const result = JSON.parse(text)

    if (!VALID_SPECIALTIES.includes(result.specialty)) {
      result.specialty = 'CLINICAL_MEDICINE'
      result.label = 'Clínica Médica'
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      { error: 'Não foi possível identificar a especialidade. Tente novamente.' },
      { status: 500 },
    )
  }
}
