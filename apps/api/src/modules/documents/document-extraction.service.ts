import { BadRequestException, Injectable } from '@nestjs/common'
import pdfParse from 'pdf-parse'
import sharp from 'sharp'
import { createWorker } from 'tesseract.js'

const MIN_EXTRACTED_TEXT_LENGTH = 20

@Injectable()
export class DocumentExtractionService {
  async extractText(file: Express.Multer.File): Promise<string> {
    if (file.mimetype === 'application/pdf') {
      return this.extractPdfText(file.buffer)
    }

    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
      return this.extractImageText(file.buffer)
    }

    throw new BadRequestException('Tipo de arquivo nao permitido. Envie PDF, JPG ou PNG.')
  }

  private async extractPdfText(buffer: Buffer): Promise<string> {
    const parsed = await pdfParse(buffer)
    const text = this.normalizeText(parsed.text)

    if (text.length < MIN_EXTRACTED_TEXT_LENGTH) {
      throw new BadRequestException(
        'Nao foi possivel extrair texto suficiente deste PDF. Envie um PDF com texto selecionavel ou uma imagem legivel do documento.',
      )
    }

    return text
  }

  private async extractImageText(buffer: Buffer): Promise<string> {
    const preparedImage = await sharp(buffer)
      .rotate()
      .grayscale()
      .normalize()
      .png()
      .toBuffer()

    const worker = await createWorker('por')

    try {
      const result = await worker.recognize(preparedImage)
      const text = this.normalizeText(result.data.text)

      if (text.length < MIN_EXTRACTED_TEXT_LENGTH) {
        throw new BadRequestException('Nao foi possivel ler texto suficiente na imagem enviada.')
      }

      return text
    } finally {
      await worker.terminate()
    }
  }

  private normalizeText(text: string): string {
    return text.replace(/\s+/g, ' ').trim()
  }
}
