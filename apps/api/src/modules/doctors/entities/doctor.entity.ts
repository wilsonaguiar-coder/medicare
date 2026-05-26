import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  userId: string

  @Column()
  fullName: string

  @Column({ unique: true })
  cpf: string

  @Column()
  crm: string

  @Column()
  crmState: string

  @Column('text', { array: true, default: [] })
  specialties: string[]

  @Column({
    type: 'enum',
    enum: ['AVAILABLE', 'BUSY', 'OFFLINE'],
    default: 'OFFLINE',
  })
  status: 'AVAILABLE' | 'BUSY' | 'OFFLINE'

  @Column({
    type: 'enum',
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'BLOCKED'],
    default: 'PENDING',
  })
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'BLOCKED'

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 120 })
  consultationPrice: number

  @Column({ type: 'jsonb', nullable: true })
  bankAccount: object

  @Column({ nullable: true, type: 'text' })
  bio: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
