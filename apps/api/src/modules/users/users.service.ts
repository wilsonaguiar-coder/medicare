import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

interface CreateUserData {
  fullName: string
  email: string
  passwordHash: string
  role: 'PATIENT' | 'DOCTOR'
  cpf: string
  phone: string
}

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async create(data: CreateUserData): Promise<User> {
    const existing = await this.repo.findOne({ where: { email: data.email } })
    if (existing) throw new ConflictException('E-mail já cadastrado')

    const user = this.repo.create({ email: data.email, passwordHash: data.passwordHash, role: data.role })
    return this.repo.save(user)
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } })
  }

  findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } })
  }
}
