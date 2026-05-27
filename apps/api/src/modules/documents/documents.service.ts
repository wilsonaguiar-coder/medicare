import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PatientDocumentInsight } from './entities/patient-document-insight.entity'
import { DocumentExtractionService } from './document-extraction.service'
import { AiService } from '../ai/ai.service'
import { ConsultationsService } from '../consultations/consultations.service'

const AI_ELIGIBLE_TYPES = ['LAB_RESULT', 'MEDICAL_REPORT', 'PRESCRIPTION', 'CLINICAL_REPORT', 'OTHER']
const PROMPT_VERSION = 'consultation-preparation-v1'

type ConsultationPreparationSummary = {
  queixa_principal?: string
  pontos_de_atencao?: string[]
  hipoteses_clinicas?: string[]
  cid10_provaveis?: string[]
  respostas_objetivas?: string[]
  documentos_resumidos?: string[]
  perguntas_sugeridas_para_o_medico?: string[]
  limitacoes?: string
}

type ConsultationPreparationInput = {
  consultationId?: string
  patientId?: string
  doctorId?: string
  specialty: string
  symptoms: string
  symptomDuration?: string
  flags: Record<string, boolean>
  documentSummaries: string[]
  extractedTexts?: string[]
  sourceDocumentSummaryIds?: string[]
}

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(PatientDocumentInsight)
    private readonly repo: Repository<PatientDocumentInsight>,
    private readonly extractionService: DocumentExtractionService,
    private readonly aiService: AiService,
    private readonly consultationsService: ConsultationsService,
  ) {}

  async upload(
    patientId: string,
    file: Express.Multer.File,
    data: { consultationId: string; type: string },
  ): Promise<PatientDocumentInsight> {
    if (!data.consultationId) {
      throw new BadRequestException('Consulta nao informada.')
    }

    if (!AI_ELIGIBLE_TYPES.includes(data.type)) {
      throw new BadRequestException('Tipo de documento invalido.')
    }

    const extractedText = await this.extractionService.extractText(file)
    const aiSummary = await this.aiService.summarizeDocument(extractedText)

    const insight = this.repo.create({
      patientId,
      consultationId: data.consultationId,
      type: data.type,
      extractedText,
      aiSummary,
      aiProcessedAt: new Date(),
    })

    return this.repo.save(insight)
  }

  async processTemporaryDocument(file: Express.Multer.File, type: string) {
    if (!AI_ELIGIBLE_TYPES.includes(type)) {
      throw new BadRequestException('Tipo de documento invalido.')
    }

    const extractedText = await this.extractionService.extractText(file)
    const aiSummary = await this.aiService.summarizeDocument(extractedText)

    return {
      type,
      extractedText,
      aiSummary,
      processedAt: new Date().toISOString(),
      originalFileStored: false,
    }
  }

  async prepareConsultationSummary(input: ConsultationPreparationInput) {
    const summary = await this.aiService.summarizeConsultationPreparation({
      specialty: input.specialty,
      symptoms: input.symptoms,
      symptomDuration: input.symptomDuration,
      flags: input.flags,
      documentSummaries: input.documentSummaries,
      extractedTexts: input.extractedTexts ?? [],
    })
    const generatedAt = new Date()
    const parsedSummary = parseConsultationSummary(summary)

    const savedSummary = input.consultationId && input.patientId
      ? await this.consultationsService.saveAiSummary({
        consultationId: input.consultationId,
        patientId: input.patientId,
        doctorId: input.doctorId,
        summary: parsedSummary,
        sourceSymptoms: input.symptoms,
        sourceSymptomDuration: input.symptomDuration,
        sourceFlags: input.flags,
        sourceDocumentSummaryIds: input.sourceDocumentSummaryIds ?? [],
        model: this.aiService.getModel(),
        promptVersion: PROMPT_VERSION,
        generatedAt,
      })
      : null

    return {
      summary,
      saved: Boolean(savedSummary),
      summaryId: savedSummary?.id ?? null,
      generatedAt: generatedAt.toISOString(),
    }
  }

  findByConsultation(consultationId: string) {
    return this.repo.find({ where: { consultationId }, order: { createdAt: 'ASC' } })
  }

  updateAiSummary(id: string, summary: string) {
    return this.repo.update(id, { aiSummary: summary, aiProcessedAt: new Date() })
  }
}

function parseConsultationSummary(summary: string): ConsultationPreparationSummary {
  try {
    return JSON.parse(summary) as ConsultationPreparationSummary
  } catch {
    return {
      queixa_principal: '',
      pontos_de_atencao: [],
      hipoteses_clinicas: [],
      cid10_provaveis: [],
      respostas_objetivas: [],
      documentos_resumidos: [],
      perguntas_sugeridas_para_o_medico: [],
      limitacoes: 'Nao foi possivel interpretar o JSON retornado pela IA.',
    }
  }
}
