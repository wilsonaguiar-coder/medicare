import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { AiService } from './ai.service'
import { AiProcessor } from './ai.processor'
import { DocumentsModule } from '../documents/documents.module'

@Module({
  imports: [
    BullModule.registerQueue({ name: 'ai-processing' }),
    DocumentsModule,
  ],
  providers: [AiService, AiProcessor],
  exports: [AiService],
})
export class AiModule {}
