import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Patient } from './entities/patient.entity'

@Injectable()
export class PatientsService {
  constructor(@InjectRepository(Patient) private readonly repo: Repository<Patient>) {}

  findByUserId(userId: string) {
    return this.repo.findOne({ where: { userId } })
  }

  create(data: { userId: string; fullName: string; cpf?: string; phone?: string }) {
    const patient = this.repo.create(data)
    return this.repo.save(patient)
  }

  update(userId: string, data: object) {
    return this.repo.update({ userId }, data)
  }
}
