import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('consultation_ai_summaries')
export class ConsultationAiSummary {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  consultationId: string

  @Column()
  patientId: string

  @Column({ nullable: true })
  doctorId: string

  @Column({ type: 'text' })
  chiefComplaint: string

  @Column('jsonb', { default: [] })
  attentionPoints: string[]

  @Column('jsonb', { default: [] })
  clinicalHypotheses: string[]

  @Column('jsonb', { default: [] })
  probableCid10: string[]

  @Column('jsonb', { default: [] })
  objectiveAnswers: string[]

  @Column('jsonb', { default: [] })
  suggestedQuestions: string[]

  @Column({ type: 'text', nullable: true })
  limitations: string

  @Column({ type: 'text', nullable: true })
  sourceSymptoms: string

  @Column({ nullable: true })
  sourceSymptomDuration: string

  @Column('jsonb', { default: {} })
  sourceFlags: Record<string, boolean>

  @Column('jsonb', { default: [] })
  sourceDocumentSummaryIds: string[]

  @Column({ nullable: true })
  model: string

  @Column({ default: 'consultation-preparation-v1' })
  promptVersion: string

  @Column({ type: 'timestamp' })
  generatedAt: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
