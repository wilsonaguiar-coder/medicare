import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'
import { DocumentsController } from './documents.controller'
import { DocumentsService } from './documents.service'
import { MedicalDocument } from './entities/medical-document.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalDocument]),
    BullModule.registerQueue({ name: 'ai-processing' }),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
