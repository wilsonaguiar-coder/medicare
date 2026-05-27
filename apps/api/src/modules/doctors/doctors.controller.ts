import { Controller, Get, Patch, Body, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { DoctorsService } from './doctors.service'

@ApiTags('Médicos')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get('available')
  @ApiOperation({ summary: 'Verificar disponibilidade de médicos por especialidade' })
  @ApiQuery({ name: 'specialty', required: false })
  async checkAvailability(@Query('specialty') specialty?: string) {
    const doctors = await this.doctorsService.findAvailable(specialty)
    return { available: doctors.length > 0, count: doctors.length }
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter perfil do médico autenticado' })
  getProfile(@CurrentUser() user: { id: string }) {
    return this.doctorsService.findByUserId(user.id)
  }

  @Patch('me/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar status de disponibilidade' })
  updateStatus(
    @CurrentUser() user: { id: string },
    @Body() body: { status: 'AVAILABLE' | 'BUSY' | 'OFFLINE' },
  ) {
    return this.doctorsService.updateStatus(user.id, body.status)
  }
}
