export type DocumentType =
  | 'LAB_RESULT'
  | 'MEDICAL_REPORT'
  | 'PRESCRIPTION'
  | 'CLINICAL_REPORT'
  | 'OTHER'

export type DocumentMimeType = 'application/pdf' | 'image/jpg' | 'image/jpeg' | 'image/png'

export interface MedicalDocument {
  id: string
  consultationId: string
  patientId: string
  type: DocumentType
  fileName: string
  mimeType: DocumentMimeType
  storageKey: string
  sizeBytes: number
  aiSummary?: string
  aiProcessedAt?: Date
  createdAt: Date
}
