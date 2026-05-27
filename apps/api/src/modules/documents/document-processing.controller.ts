import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { memoryStorage } from 'multer'
import { DocumentsService } from './documents.service'

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

@ApiTags('Documentos')
@Controller('documents/test')
export class DocumentProcessingController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('extract')
  @ApiOperation({ summary: 'Teste: extrair texto e resumir documento sem salvar arquivo' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_SIZE_BYTES },
    }),
  )
  extract(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { type?: string },
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo nao enviado.')
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de arquivo nao permitido. Envie PDF, JPG ou PNG.')
    }

    return this.documentsService.processTemporaryDocument(file, body.type ?? 'OTHER')
  }

  @Post('prepare-consultation')
  @ApiOperation({ summary: 'Teste: gerar resumo da pre-triagem e documentos para o medico' })
  prepareConsultation(
    @Body()
    body: {
      consultationId?: string
      patientId?: string
      doctorId?: string
      specialty: string
      symptoms: string
      symptomDuration?: string
      flags: Record<string, boolean>
      documentSummaries: string[]
      extractedTexts?: string[]
      sourceDocumentSummaryIds?: string[]
    },
  ) {
    if (!body.symptoms || body.symptoms.trim().length < 50) {
      throw new BadRequestException('Descreva os sintomas com pelo menos 50 caracteres.')
    }

    return this.documentsService.prepareConsultationSummary(body)
  }
}
