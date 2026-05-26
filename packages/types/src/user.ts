export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN'

export interface User {
  id: string
  email: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}
