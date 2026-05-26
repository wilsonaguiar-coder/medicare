export type PaymentMethod = 'PIX' | 'CREDIT_CARD'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

export interface Payment {
  id: string
  consultationId: string
  patientId: string
  method: PaymentMethod
  status: PaymentStatus
  amount: number
  gatewayTransactionId?: string
  pixQrCode?: string
  pixKey?: string
  paidAt?: Date
  refundedAt?: Date
  createdAt: Date
}

export interface IrpfReceipt {
  consultationId: string
  patientName: string
  patientCpf: string
  doctorName: string
  doctorCpf: string
  doctorCnpj?: string
  doctorCrm: string
  consultationDate: Date
  amount: number
  transactionId: string
}
