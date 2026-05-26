import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty()
  @IsString()
  fullName: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string

  @ApiProperty({ enum: ['PATIENT', 'DOCTOR'] })
  @IsEnum(['PATIENT', 'DOCTOR'])
  role: 'PATIENT' | 'DOCTOR'

  @ApiProperty()
  @IsString()
  cpf: string

  @ApiProperty()
  @IsString()
  phone: string
}
