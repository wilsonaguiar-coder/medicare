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

  @Column({ type: 'varchar', nullable: true })
  doctorId: string | null

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
  limitations: string | null

  @Column({ type: 'text', nullable: true })
  sourceSymptoms: string | null

  @Column({ type: 'varchar', nullable: true })
  sourceSymptomDuration: string | null

  @Column('jsonb', { default: {} })
  sourceFlags: Record<string, boolean>

  @Column('jsonb', { default: [] })
  sourceDocumentSummaryIds: string[]

  @Column({ type: 'varchar', nullable: true })
  model: string | null

  @Column({ default: 'consultation-preparation-v1' })
  promptVersion: string

  @Column({ type: 'timestamp' })
  generatedAt: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
