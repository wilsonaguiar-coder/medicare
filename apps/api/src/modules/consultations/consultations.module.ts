import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'
import { ConsultationsController } from './consultations.controller'
import { ConsultationsService } from './consultations.service'
import { Consultation } from './entities/consultation.entity'
import { MedicalRecord } from './entities/medical-record.entity'
import { DoctorsModule } from '../doctors/doctors.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Consultation, MedicalRecord]),
    BullModule.registerQueue({ name: 'consultations' }),
    DoctorsModule,
  ],
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
  exports: [ConsultationsService],
})
export class ConsultationsModule {}
