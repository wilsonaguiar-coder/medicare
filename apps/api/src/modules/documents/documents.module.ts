import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DocumentsController } from './documents.controller'
import { DocumentsService } from './documents.service'
import { DocumentExtractionService } from './document-extraction.service'
import { PatientDocumentInsight } from './entities/patient-document-insight.entity'
import { AiModule } from '../ai/ai.module'

@Module({
  imports: [TypeOrmModule.forFeature([PatientDocumentInsight]), AiModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentExtractionService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
