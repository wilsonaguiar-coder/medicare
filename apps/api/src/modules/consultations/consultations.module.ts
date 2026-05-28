import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'
import { ConsultationsController } from './consultations.controller'
import { ConsultationsService } from './consultations.service'
import { Consultation } from './entities/consultation.entity'
import { ConsultationAiSummary } from './entities/consultation-ai-summary.entity'
import { MedicalRecord } from './entities/medical-record.entity'
import { DoctorsModule } from '../doctors/doctors.module'
import { PatientsModule } from '../patients/patients.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Consultation, ConsultationAiSummary, MedicalRecord]),
    BullModule.registerQueue({ name: 'consultations' }),
    DoctorsModule,
    PatientsModule,
  ],
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
  exports: [ConsultationsService],
})
export class ConsultationsModule {}
