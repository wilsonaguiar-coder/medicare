import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('patient_document_insights')
export class PatientDocumentInsight {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  consultationId: string

  @Column()
  patientId: string

  @Column({
    type: 'enum',
    enum: ['LAB_RESULT', 'MEDICAL_REPORT', 'PRESCRIPTION', 'CLINICAL_REPORT', 'OTHER'],
    default: 'OTHER',
  })
  type: string

  @Column({ type: 'text' })
  extractedText: string

  @Column({ type: 'text' })
  aiSummary: string

  @Column({ type: 'timestamp' })
  aiProcessedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
