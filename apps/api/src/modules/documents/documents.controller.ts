import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { DocumentsService } from './documents.service'

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

@ApiTags('Documentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload temporário de documento médico para extração de texto' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_SIZE_BYTES } }))
  upload(
    @CurrentUser() user: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { consultationId: string; type: string },
  ) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new Error('Tipo de arquivo não permitido. Envie PDF, JPG ou PNG.')
    }
    return this.documentsService.upload(user.id, file, body)
  }

  @Get('consultation/:consultationId')
  @ApiOperation({ summary: 'Listar documentos de uma consulta' })
  findByConsultation(@Param('consultationId') consultationId: string) {
    return this.documentsService.findByConsultation(consultationId)
  }
}
