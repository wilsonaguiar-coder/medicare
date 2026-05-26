import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { AiService } from './ai.service'
import { DocumentsService } from '../documents/documents.service'

@Processor('ai-processing')
export class AiProcessor {
  private readonly logger = new Logger(AiProcessor.name)

  constructor(
    private readonly aiService: AiService,
    private readonly documentsService: DocumentsService,
  ) {}

  @Process('summarize-document')
  async handleSummarize(job: Job<{ documentId: string; storageKey: string }>) {
    const { documentId } = job.data
    this.logger.log(`Processando documento ${documentId}`)

    try {
      // Em produção: baixar do storage e extrair texto via OCR
      const extractedText = '[Texto extraído via OCR do documento]'
      const summary = await this.aiService.summarizeDocument(extractedText)
      await this.documentsService.updateAiSummary(documentId, summary)
      this.logger.log(`Documento ${documentId} processado com sucesso`)
    } catch (err) {
      this.logger.error(`Falha ao processar documento ${documentId}`, err)
      throw err
    }
  }
}
