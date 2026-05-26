export type DoctorStatus = 'AVAILABLE' | 'BUSY' | 'OFFLINE'
export type DoctorApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'BLOCKED'

export type Specialty =
  | 'CLINICAL_MEDICINE'
  | 'PEDIATRICS'
  | 'DERMATOLOGY'
  | 'GYNECOLOGY'
  | 'ORTHOPEDICS'
  | 'PSYCHIATRY'
  | 'CARDIOLOGY'
  | 'NEUROLOGY'
  | 'ENDOCRINOLOGY'
  | 'GASTROENTEROLOGY'

export interface Doctor {
  id: string
  userId: string
  fullName: string
  cpf: string
  crm: string
  crmState: string
  specialties: Specialty[]
  status: DoctorStatus
  approvalStatus: DoctorApprovalStatus
  consultationPrice: number
  bankAccount: DoctorBankAccount
  bio?: string
  createdAt: Date
  updatedAt: Date
}

export interface DoctorBankAccount {
  bankCode: string
  agency: string
  account: string
  accountType: 'CHECKING' | 'SAVINGS'
  pixKey?: string
}
