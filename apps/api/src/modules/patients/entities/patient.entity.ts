import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  userId: string

  @Column()
  fullName: string

  @Column({ unique: true })
  cpf: string

  @Column({ type: 'date' })
  dateOfBirth: Date

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'OTHER'] })
  gender: 'MALE' | 'FEMALE' | 'OTHER'

  @Column()
  phone: string

  @Column({ type: 'jsonb', nullable: true })
  address: object

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
