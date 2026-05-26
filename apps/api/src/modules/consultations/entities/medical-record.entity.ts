import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  consultationId: string

  @Column()
  doctorId: string

  @Column()
  patientId: string

  @Column({ type: 'text' })
  anamnesis: string

  @Column({ nullable: true })
  diagnosis: string

  @Column({ nullable: true })
  icdCode: string

  @Column({ type: 'text' })
  conduct: string

  @Column({ type: 'jsonb', default: [] })
  prescriptions: object[]

  @Column('text', { array: true, default: [] })
  labRequests: string[]

  @Column({ nullable: true, type: 'text' })
  returnInstructions: string

  @CreateDateColumn()
  createdAt: Date
}
