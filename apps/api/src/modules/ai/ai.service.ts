import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import OpenAI from 'openai'

const DEFAULT_OPENAI_MODEL = 'gpt-5.4-mini'

const documentSummaryFormat = {
  type: 'json_schema' as const,
  json_schema: {
    name: 'document_summary',
    strict: true,
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        resumo: { type: 'string' },
        medicamentos: { type: 'array', items: { type: 'string' } },
        alergias: { type: 'array', items: { type: 'string' } },
        condicoes_registradas: { type: 'array', items: { type: 'string' } },
        exames_e_resultados: { type: 'array', items: { type: 'string' } },
        datas_relevantes: { type: 'array', items: { type: 'string' } },
        observacoes_para_o_medico: { type: 'array', items: { type: 'string' } },
        limitacoes_da_leitura: { type: 'string' },
      },
      required: [
        'resumo',
        'medicamentos',
        'alergias',
        'condicoes_registradas',
        'exames_e_resultados',
        'datas_relevantes',
        'observacoes_para_o_medico',
        'limitacoes_da_leitura',
      ],
    },
  },
}

const consultationPreparationFormat = {
  type: 'json_schema' as const,
  json_schema: {
    name: 'consultation_preparation',
    strict: true,
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        queixa_principal: { type: 'string' },
        pontos_de_atencao: { type: 'array', items: { type: 'string' } },
        hipoteses_clinicas: { type: 'array', items: { type: 'string' } },
        cid10_provaveis: { type: 'array', items: { type: 'string' } },
        respostas_objetivas: { type: 'array', items: { type: 'string' } },
        documentos_resumidos: { type: 'array', items: { type: 'string' } },
        perguntas_sugeridas_para_o_medico: { type: 'array', items: { type: 'string' } },
        limitacoes: { type: 'string' },
      },
      required: [
        'queixa_principal',
        'pontos_de_atencao',
        'hipoteses_clinicas',
        'cid10_provaveis',
        'respostas_objetivas',
        'documentos_resumidos',
        'perguntas_sugeridas_para_o_medico',
        'limitacoes',
      ],
    },
  },
}

// A IA NAO realiza diagnostico. Apenas organiza dados para apoiar o medico.
@Injectable()
export class AiService {
  private readonly openai: OpenAI

  constructor(private readonly config: ConfigService) {
    this.openai = new OpenAI({ apiKey: config.get('OPENAI_API_KEY') })
  }

  getModel() {
    return this.config.get('OPENAI_MODEL', DEFAULT_OPENAI_MODEL)
  }

  async summarizeDocument(text: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.getModel(),
      response_format: documentSummaryFormat,
      messages: [
        {
          role: 'system',
          content: [
            'Voce e um assistente de organizacao documental medica.',
            'Sua funcao e APENAS organizar informacoes presentes no texto extraido por OCR/parser.',
            'NAO faca diagnosticos. NAO sugira condutas clinicas. NAO interprete resultados.',
            'Quando uma informacao nao existir no texto, use array vazio ou string vazia.',
          ].join(' '),
        },
        {
          role: 'user',
          content: `Organize as informacoes do seguinte documento medico. Use apenas o texto fornecido.\n\n${text}`,
        },
      ],
      max_completion_tokens: 1000,
      temperature: 0.1,
    })

    return response.choices[0]?.message?.content ?? '{}'
  }

  async summarizeConsultationPreparation(input: {
    specialty: string
    symptoms: string
    symptomDuration?: string
    flags: Record<string, boolean>
    documentSummaries: string[]
    extractedTexts?: string[]
  }): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.getModel(),
      response_format: consultationPreparationFormat,
      messages: [
        {
          role: 'system',
          content: [
            'Voce organiza uma pre-triagem interna para leitura exclusiva do medico antes da teleconsulta.',
            'Use sintomas, tempo de inicio, respostas objetivas e textos extraidos dos documentos por OCR/parser.',
            'Preencha hipoteses_clinicas com possiveis doencas ou condicoes para avaliacao medica, sempre como hipotese e nunca como diagnostico.',
            'Preencha cid10_provaveis separadamente, com codigos CID-10 provaveis e suas descricoes, quando houver base suficiente nos dados informados.',
            'Nao misture CID-10 dentro de hipoteses_clinicas. Nao misture nomes de doencas dentro de cid10_provaveis sem o codigo correspondente.',
            'Use apenas dados informados pelo paciente ou extraidos dos documentos. Se nao houver base suficiente, retorne arrays vazios para hipoteses_clinicas e cid10_provaveis e explique a limitacao em limitacoes.',
            'NAO apresente diagnostico definitivo. NAO classifique gravidade. NAO recomende tratamento. NAO prescreva medicamentos.',
            'A resposta deve apoiar a decisao medica, nunca substituir o medico.',
          ].join(' '),
        },
        {
          role: 'user',
          content: JSON.stringify(input),
        },
      ],
      max_completion_tokens: 1400,
      temperature: 0.1,
    })

    return response.choices[0]?.message?.content ?? '{}'
  }

  async suggestAnamnesisTemplate(chiefComplaint: string, specialty: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.getModel(),
      messages: [
        {
          role: 'system',
          content: [
            'Voce e um assistente de documentacao clinica.',
            'Sugira apenas um modelo de anamnese estruturado para o medico preencher.',
            'NAO faca diagnosticos. NAO sugira condutas.',
            'O medico e o unico responsavel pelas decisoes clinicas.',
          ].join(' '),
        },
        {
          role: 'user',
          content: `Especialidade: ${specialty}. Queixa principal: ${chiefComplaint}. Sugira um modelo de anamnese.`,
        },
      ],
      max_completion_tokens: 600,
      temperature: 0.2,
    })

    return response.choices[0]?.message?.content ?? ''
  }
}
