export interface Patient {
  id: string
  userId: string
  fullName: string
  cpf: string
  dateOfBirth: Date
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  phone: string
  address: PatientAddress
  createdAt: Date
  updatedAt: Date
}

export interface PatientAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}
