import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import OpenAI from 'openai'

// A IA NAO realiza diagnostico. Apenas organiza dados para apoiar o medico.
@Injectable()
export class AiService {
  private readonly openai: OpenAI

  constructor(private readonly config: ConfigService) {
    this.openai = new OpenAI({ apiKey: config.get('OPENAI_API_KEY') })
  }

  async summarizeDocument(text: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.config.get('OPENAI_MODEL', 'gpt-4o'),
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: [
            'Voce e um assistente de organizacao documental medica.',
            'Sua funcao e APENAS organizar informacoes presentes no texto extraido por OCR/parser.',
            'NAO faca diagnosticos. NAO sugira condutas clinicas. NAO interprete resultados.',
            'Responda somente em JSON valido com as chaves: resumo, medicamentos, alergias, condicoes_registradas, exames_e_resultados, datas_relevantes, observacoes_para_o_medico, limitacoes_da_leitura.',
            'Quando uma informacao nao existir no texto, use array vazio ou string vazia.',
          ].join(' '),
        },
        {
          role: 'user',
          content: `Organize as informacoes do seguinte documento medico. Use apenas o texto fornecido.\n\n${text}`,
        },
      ],
      max_tokens: 1000,
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
  }): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.config.get('OPENAI_MODEL', 'gpt-4o'),
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: [
            'Voce organiza uma pre-triagem para leitura do medico antes da teleconsulta.',
            'NAO faca diagnostico. NAO classifique gravidade. NAO recomende tratamento.',
            'Responda somente em JSON valido com as chaves: queixa_principal, pontos_de_atencao, respostas_objetivas, documentos_resumidos, perguntas_sugeridas_para_o_medico, limitacoes.',
          ].join(' '),
        },
        {
          role: 'user',
          content: JSON.stringify(input),
        },
      ],
      max_tokens: 1200,
      temperature: 0.1,
    })

    return response.choices[0]?.message?.content ?? '{}'
  }

  async suggestAnamnesisTemplate(chiefComplaint: string, specialty: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.config.get('OPENAI_MODEL', 'gpt-4o'),
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
      max_tokens: 600,
      temperature: 0.2,
    })

    return response.choices[0]?.message?.content ?? ''
  }
}
