export type ConsultationStatus =
  | 'PENDING_PAYMENT'
  | 'WAITING_DOCTOR'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'

export interface Consultation {
  id: string
  patientId: string
  doctorId?: string
  specialty: string
  status: ConsultationStatus
  chiefComplaint: string
  symptoms: string
  symptomDuration: string
  currentMedications: string[]
  allergies: string[]
  preExistingConditions: string[]
  previousSurgeries: string[]
  scheduledAt?: Date
  startedAt?: Date
  completedAt?: Date
  cancelledAt?: Date
  totalAmount: number
  platformFee: number
  doctorAmount: number
  videoRoomId?: string
  createdAt: Date
  updatedAt: Date
}

export interface MedicalRecord {
  id: string
  consultationId: string
  doctorId: string
  patientId: string
  anamnesis: string
  diagnosis?: string
  icdCode?: string
  conduct: string
  prescriptions: Prescription[]
  labRequests: string[]
  returnInstructions?: string
  createdAt: Date
}

export interface Prescription {
  medication: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
}
