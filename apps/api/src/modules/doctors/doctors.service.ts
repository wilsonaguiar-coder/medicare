import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Doctor } from './entities/doctor.entity'

@Injectable()
export class DoctorsService {
  constructor(@InjectRepository(Doctor) private readonly repo: Repository<Doctor>) {}

  async findAvailable(specialty?: string) {
    const qb = this.repo
      .createQueryBuilder('doctor')
      .where('doctor.status = :status', { status: 'AVAILABLE' })
      .andWhere('doctor.approvalStatus = :approval', { approval: 'APPROVED' })

    if (specialty) {
      qb.andWhere(':specialty = ANY(doctor.specialties)', { specialty })
    }

    return qb.getMany()
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
