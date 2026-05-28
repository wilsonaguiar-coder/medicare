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

  @Column({ unique: true, nullable: true })
  cpf: string

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'OTHER'], nullable: true })
  gender: 'MALE' | 'FEMALE' | 'OTHER'

  @Column({ nullable: true })
  phone: string

  @Column({ type: 'jsonb', nullable: true })
  address: object

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
