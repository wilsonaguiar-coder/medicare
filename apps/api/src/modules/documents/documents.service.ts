import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { MedicalDocument } from './entities/medical-document.entity'

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(MedicalDocument) private readonly repo: Repository<MedicalDocument>,
    @InjectQueue('ai-processing') private readonly aiQueue: Queue,
    private readonly config: ConfigService,
  ) {}

  async upload(
    patientId: string,
    file: Express.Multer.File,
    data: { consultationId: string; type: string },
  ): Promise<MedicalDocument> {
    const storageKey = `documents/${data.consultationId}/${Date.now()}-${file.originalname}`

    const document = this.repo.create({
      patientId,
      consultationId: data.consultationId,
      type: data.type,
      fileName: file.originalname,
      mimeType: file.mimetype,
      storageKey,
      sizeBytes: file.size,
    })

    const saved = await this.repo.save(document)

    // Imagens de exames de imagem NÃO são processadas por IA (conforme spec)
    const aiEligibleTypes = ['LAB_RESULT', 'MEDICAL_REPORT', 'PRESCRIPTION', 'CLINICAL_REPORT']
    if (aiEligibleTypes.includes(data.type)) {
      await this.aiQueue.add('summarize-document', { documentId: saved.id, storageKey })
    }

    return saved
  }

  findByConsultation(consultationId: string) {
    return this.repo.find({ where: { consultationId }, order: { createdAt: 'ASC' } })
  }

  updateAiSummary(id: string, summary: string) {
    return this.repo.update(id, { aiSummary: summary, aiProcessedAt: new Date() })
  }
}
