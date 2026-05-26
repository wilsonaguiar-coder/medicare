import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { DoctorsService } from './doctors.service'

@ApiTags('Médicos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get('me')
  @ApiOperation({ summary: 'Obter perfil do médico autenticado' })
  getProfile(@CurrentUser() user: { id: string }) {
    return this.doctorsService.findByUserId(user.id)
  }

  @Patch('me/status')
  @ApiOperation({ summary: 'Atualizar status de disponibilidade' })
  updateStatus(
    @CurrentUser() user: { id: string },
    @Body() body: { status: 'AVAILABLE' | 'BUSY' | 'OFFLINE' },
  ) {
    return this.doctorsService.updateStatus(user.id, body.status)
  }
}
