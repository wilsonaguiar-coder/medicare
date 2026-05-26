import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Doctor } from './entities/doctor.entity'

@Injectable()
export class DoctorsService {
  constructor(@InjectRepository(Doctor) private readonly repo: Repository<Doctor>) {}

  findAvailable(specialty: string) {
    return this.repo.find({
      where: { status: 'AVAILABLE', approvalStatus: 'APPROVED' },
    })
  }

  findByUserId(userId: string) {
    return this.repo.findOne({ where: { userId } })
  }

  updateStatus(id: string, status: 'AVAILABLE' | 'BUSY' | 'OFFLINE') {
    return this.repo.update(id, { status })
  }

  update(userId: string, data: Partial<Doctor>) {
    return this.repo.update({ userId }, data)
  }
}
