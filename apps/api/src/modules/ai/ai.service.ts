import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import OpenAI from 'openai'

// A IA NÃO realiza diagnóstico. Apenas organiza e resume documentos.
@Injectable()
export class AiService {
  private readonly openai: OpenAI

  constructor(private readonly config: ConfigService) {
    this.openai = new OpenAI({ apiKey: config.get('OPENAI_API_KEY') })
  }

  async summarizeDocument(text: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.config.get('OPENAI_MODEL', 'gpt-4o'),
      messages: [
        {
          role: 'system',
          content: [
            'Você é um assistente de organização documental médica.',
            'Sua função é APENAS extrair e organizar informações presentes no documento.',
            'NÃO faça diagnósticos. NÃO sugira condutas clínicas. NÃO interprete resultados.',
            'Organize: medicamentos mencionados, alergias, doenças registradas, resultados laboratoriais (apenas valores), datas relevantes.',
            'Responda em português, de forma objetiva e estruturada.',
          ].join(' '),
        },
        {
          role: 'user',
          content: `Organize as informações do seguinte documento médico:\n\n${text}`,
        },
      ],
      max_tokens: 800,
      temperature: 0.1,
    })

    return response.choices[0]?.message?.content ?? ''
  }

  async suggestAnamnesisTemplate(chiefComplaint: string, specialty: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.config.get('OPENAI_MODEL', 'gpt-4o'),
      messages: [
        {
          role: 'system',
          content: [
            'Você é um assistente de documentação clínica.',
            'Sugira apenas um modelo de anamnese estruturado para o médico preencher.',
            'NÃO faça diagnósticos. NÃO sugira condutas.',
            'O médico é o único responsável pelas decisões clínicas.',
          ].join(' '),
        },
        {
          role: 'user',
          content: `Especialidade: ${specialty}. Queixa principal: ${chiefComplaint}. Sugira um modelo de anamnese.`,
        },
      ],
      max_tokens: 600,
      temperature: 0.2,
    })

    return response.choices[0]?.message?.content ?? ''
  }
}
