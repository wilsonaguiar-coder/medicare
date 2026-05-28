import { Injectable, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Consultation } from './entities/consultation.entity'
import { ConsultationAiSummary } from './entities/consultation-ai-summary.entity'
import { MedicalRecord } from './entities/medical-record.entity'

const PLATFORM_COMMISSION = 0.2

type SaveAiSummaryInput = {
  consultationId: string
  patientId: string
  doctorId?: string | undefined
  summary: {
    queixa_principal?: string | undefined
    pontos_de_atencao?: string[] | undefined
    hipoteses_clinicas?: string[] | undefined
    cid10_provaveis?: string[] | undefined
    respostas_objetivas?: string[] | undefined
    documentos_resumidos?: string[] | undefined
    perguntas_sugeridas_para_o_medico?: string[] | undefined
    limitacoes?: string | undefined
  }
  sourceSymptoms?: string | undefined
  sourceSymptomDuration?: string | undefined
  sourceFlags?: Record<string, boolean> | undefined
  sourceDocumentSummaryIds?: string[] | undefined
  model?: string | undefined
  promptVersion?: string | undefined
  generatedAt?: Date | undefined
}

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation) private readonly consultationRepo: Repository<Consultation>,
    @InjectRepository(ConsultationAiSummary) private readonly aiSummaryRepo: Repository<ConsultationAiSummary>,
    @InjectRepository(MedicalRecord) private readonly recordRepo: Repository<MedicalRecord>,
  ) {}

  async create(patientId: string, data: any): Promise<Consultation> {
    const totalAmount = data.totalAmount as number
    const platformFee = totalAmount * PLATFORM_COMMISSION
    const consultation = this.consultationRepo.create({
      patientId,
      specialty: data.specialty,
      chiefComplaint: data.chiefComplaint,
      symptoms: data.symptoms,
      symptomDuration: data.symptomDuration,
      currentMedications: data.currentMedications ?? [],
      allergies: data.allergies ?? [],
      preExistingConditions: data.preExistingConditions ?? [],
      totalAmount,
      platformFee,
      doctorAmount: totalAmount - platformFee,
      videoRoomId: data.videoRoomId ?? null,
      status: 'PENDING_PAYMENT',
    })
    return this.consultationRepo.save(consultation)
  }

  findByUser(userId: string, role: string) {
    const field = role === 'DOCTOR' ? 'doctorId' : 'patientId'
    return this.consultationRepo.find({
      where: { [field]: userId },
      order: { createdAt: 'DESC' },
    })
  }

  async findById(id: string): Promise<Consultation> {
    const consultation = await this.consultationRepo.findOne({ where: { id } })
    if (!consultation) throw new NotFoundException('Consulta não encontrada')
    return consultation
  }

  findAiSummaryByConsultation(consultationId: string) {
    return this.aiSummaryRepo.findOne({
      where: { consultationId },
      order: { generatedAt: 'DESC' },
    })
  }

  async saveAiSummary(input: SaveAiSummaryInput): Promise<ConsultationAiSummary> {
    const current = await this.aiSummaryRepo.findOne({ where: { consultationId: input.consultationId } })
    const entity = current ?? this.aiSummaryRepo.create({
      consultationId: input.consultationId,
      patientId: input.patientId,
    })

    entity.patientId = input.patientId
    entity.doctorId = input.doctorId ?? entity.doctorId ?? null
    entity.chiefComplaint = input.summary.queixa_principal ?? ''
    entity.attentionPoints = input.summary.pontos_de_atencao ?? []
    entity.clinicalHypotheses = input.summary.hipoteses_clinicas ?? []
    entity.probableCid10 = input.summary.cid10_provaveis ?? []
    entity.objectiveAnswers = input.summary.respostas_objetivas ?? []
    entity.suggestedQuestions = input.summary.perguntas_sugeridas_para_o_medico ?? []
    entity.limitations = input.summary.limitacoes ?? null
    entity.sourceSymptoms = input.sourceSymptoms ?? null
    entity.sourceSymptomDuration = input.sourceSymptomDuration ?? null
    entity.sourceFlags = input.sourceFlags ?? {}
    entity.sourceDocumentSummaryIds = input.sourceDocumentSummaryIds ?? []
    entity.model = input.model ?? null
    entity.promptVersion = input.promptVersion ?? 'consultation-preparation-v1'
    entity.generatedAt = input.generatedAt ?? new Date()

    return this.aiSummaryRepo.save(entity)
  }

  async authorizePayment(id: string): Promise<Consultation> {
    const consultation = await this.findById(id)
    // TODO Fase 2: substituir por Stripe PaymentIntents.create() ou MP preference
    // const intent = await stripe.paymentIntents.create({ amount: consultation.totalAmount * 100, currency: 'brl', capture_method: 'manual' })
    // consultation.paymentIntentId = intent.id
    consultation.paymentIntentId = `mock_pi_${randomUUID()}`
    consultation.paymentStatus = 'AUTHORIZED'
    consultation.status = 'WAITING_DOCTOR'
    return this.consultationRepo.save(consultation)
  }

  async acceptByDoctor(id: string, doctorId: string): Promise<Consultation> {
    const consultation = await this.findById(id)
    consultation.doctorId = doctorId
    consultation.status = 'IN_PROGRESS'
    consultation.startedAt = new Date()
    // TODO Fase 2: substituir por Stripe PaymentIntents.capture(consultation.paymentIntentId)
    if (consultation.paymentStatus === 'AUTHORIZED') {
      consultation.paymentStatus = 'CAPTURED'
    }
    await this.aiSummaryRepo.update({ consultationId: id }, { doctorId })
    return this.consultationRepo.save(consultation)
  }

  async cancelConsultation(id: string): Promise<Consultation> {
    const consultation = await this.findById(id)
    consultation.status = 'CANCELLED'
    // TODO Fase 2: substituir por Stripe PaymentIntents.cancel(consultation.paymentIntentId)
    if (consultation.paymentStatus === 'AUTHORIZED') {
      consultation.paymentStatus = 'RELEASED'
    }
    return this.consultationRepo.save(consultation)
  }

  async complete(id: string, recordData: any): Promise<{ consultation: Consultation; record: MedicalRecord[] | MedicalRecord }> {
    const consultation = await this.findById(id)
    consultation.status = 'COMPLETED'
    consultation.completedAt = new Date()
    await this.consultationRepo.save(consultation)

    const record = this.recordRepo.create({
      consultationId: id,
      doctorId: consultation.doctorId,
      patientId: consultation.patientId,
      ...recordData,
    })
    await this.recordRepo.save(record)

    return { consultation, record }
  }
}
