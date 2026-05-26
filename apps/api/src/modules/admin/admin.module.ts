import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { DoctorsModule } from '../doctors/doctors.module'

@Module({
  imports: [DoctorsModule],
  controllers: [AdminController],
})
export class AdminModule {}
