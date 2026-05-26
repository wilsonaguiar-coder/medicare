import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('medical_documents')
export class MedicalDocument {
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

  @Column()
  fileName: string

  @Column()
  mimeType: string

  @Column()
  storageKey: string

  @Column({ type: 'bigint' })
  sizeBytes: number

  @Column({ nullable: true, type: 'text' })
  aiSummary: string

  @Column({ nullable: true, type: 'timestamp' })
  aiProcessedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
