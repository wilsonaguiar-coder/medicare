export type DocumentType =
  | 'LAB_RESULT'
  | 'MEDICAL_REPORT'
  | 'PRESCRIPTION'
  | 'CLINICAL_REPORT'
  | 'OTHER'

export type DocumentMimeType = 'application/pdf' | 'image/jpg' | 'image/jpeg' | 'image/png'

export interface PatientDocumentInsight {
  id: string
  consultationId: string
  patientId: string
  type: DocumentType
  extractedText: string
  aiSummary: string
  aiProcessedAt: Date
  createdAt: Date
}

export type MedicalDocument = PatientDocumentInsight
