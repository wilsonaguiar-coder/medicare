import {
  BadRequestException,
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
import { memoryStorage } from 'multer'
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
  @ApiOperation({ summary: 'Processar documento medico sem armazenar o arquivo original' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_SIZE_BYTES },
    }),
  )
  upload(
    @CurrentUser() user: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { consultationId: string; type: string },
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo nao enviado.')
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de arquivo nao permitido. Envie PDF, JPG ou PNG.')
    }

    return this.documentsService.upload(user.id, file, body)
  }

  @Get('consultation/:consultationId')
  @ApiOperation({ summary: 'Listar resumos extraidos dos documentos de uma consulta' })
  findByConsultation(@Param('consultationId') consultationId: string) {
    return this.documentsService.findByConsultation(consultationId)
  }
}
