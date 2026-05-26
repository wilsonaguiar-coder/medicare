import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Payment } from './entities/payment.entity'
import { ConsultationsService } from '../consultations/consultations.service'

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly repo: Repository<Payment>,
    private readonly consultationsService: ConsultationsService,
  ) {}

  async initiate(patientId: string, consultationId: string, method: 'PIX' | 'CREDIT_CARD') {
    const consultation = await this.consultationsService.findById(consultationId)

    const payment = this.repo.create({
      patientId,
      consultationId,
      method,
      amount: consultation.totalAmount,
      status: 'PENDING',
      // PIX QR Code gerado pela integração com gateway (Mercado Pago / Stripe)
      pixQrCode: method === 'PIX' ? 'QR_CODE_PLACEHOLDER' : undefined,
    })

    return this.repo.save(payment)
  }

  async handleWebhook(payload: any) {
    const payment = await this.repo.findOne({
      where: { gatewayTransactionId: payload.transactionId },
    })

    if (!payment) return { received: true }

    if (payload.status === 'paid') {
      payment.status = 'PAID'
      payment.paidAt = new Date()
      await this.repo.save(payment)
      // Aqui seria disparado evento para mover consulta para WAITING_DOCTOR
    }

    return { received: true }
  }

  async generateIrpfReceipt(consultationId: string) {
    const payment = await this.repo.findOne({
      where: { consultationId, status: 'PAID' },
    })

    if (!payment) throw new NotFoundException('Pagamento não encontrado')

    // Retorna dados para geração do PDF no frontend
    return {
      consultationId,
      transactionId: payment.gatewayTransactionId,
      amount: payment.amount,
      paidAt: payment.paidAt,
    }
  }
}
