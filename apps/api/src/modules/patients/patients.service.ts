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

  update(userId: string, data: object) {
    return this.repo.update({ userId }, data)
  }
}
