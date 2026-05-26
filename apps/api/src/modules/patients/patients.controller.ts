import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { PatientsService } from './patients.service'

@ApiTags('Pacientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('me')
  getProfile(@CurrentUser() user: { id: string }) {
    return this.patientsService.findByUserId(user.id)
  }

  @Patch('me')
  updateProfile(@CurrentUser() user: { id: string }, @Body() body: object) {
    return this.patientsService.update(user.id, body)
  }
}
