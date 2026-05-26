import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  consultationId: string

  @Column()
  patientId: string

  @Column({ type: 'enum', enum: ['PIX', 'CREDIT_CARD'] })
  method: 'PIX' | 'CREDIT_CARD'

  @Column({
    type: 'enum',
    enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number

  @Column({ nullable: true })
  gatewayTransactionId: string

  @Column({ nullable: true, type: 'text' })
  pixQrCode: string

  @Column({ nullable: true })
  pixKey: string

  @Column({ nullable: true, type: 'timestamp' })
  paidAt: Date

  @Column({ nullable: true, type: 'timestamp' })
  refundedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
