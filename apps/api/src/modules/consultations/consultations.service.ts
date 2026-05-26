import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Consultation } from './entities/consultation.entity'
import { MedicalRecord } from './entities/medical-record.entity'

const PLATFORM_COMMISSION = 0.2

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation) private readonly consultationRepo: Repository<Consultation>,
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

  async acceptByDoctor(id: string, doctorId: string): Promise<Consultation> {
    const consultation = await this.findById(id)
    consultation.doctorId = doctorId
    consultation.status = 'IN_PROGRESS'
    consultation.startedAt = new Date()
    return this.consultationRepo.save(consultation)
  }

  async complete(id: string, recordData: any): Promise<{ consultation: Consultation; record: MedicalRecord }> {
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
