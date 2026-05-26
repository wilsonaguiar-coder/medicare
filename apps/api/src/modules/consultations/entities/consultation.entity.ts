import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  patientId: string

  @Column({ nullable: true })
  doctorId: string

  @Column()
  specialty: string

  @Column({
    type: 'enum',
    enum: ['PENDING_PAYMENT', 'WAITING_DOCTOR', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW'],
    default: 'PENDING_PAYMENT',
  })
  status: string

  @Column()
  chiefComplaint: string

  @Column({ nullable: true, type: 'text' })
  symptoms: string

  @Column({ nullable: true })
  symptomDuration: string

  @Column('text', { array: true, default: [] })
  currentMedications: string[]

  @Column('text', { array: true, default: [] })
  allergies: string[]

  @Column('text', { array: true, default: [] })
  preExistingConditions: string[]

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  platformFee: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  doctorAmount: number

  @Column({ nullable: true })
  videoRoomId: string

  @Column({ nullable: true, type: 'timestamp' })
  startedAt: Date

  @Column({ nullable: true, type: 'timestamp' })
  completedAt: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
