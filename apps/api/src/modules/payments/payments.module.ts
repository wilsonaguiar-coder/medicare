import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'
import { Payment } from './entities/payment.entity'
import { ConsultationsModule } from '../consultations/consultations.module'

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), ConsultationsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
