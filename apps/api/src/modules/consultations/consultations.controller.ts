import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { ConsultationsService } from './consultations.service'
import { PatientsService } from '../patients/patients.service'

@ApiTags('Consultas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('consultations')
export class ConsultationsController {
  constructor(
    private readonly consultationsService: ConsultationsService,
    private readonly patientsService: PatientsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova solicitação de consulta' })
  async create(@CurrentUser() user: { id: string }, @Body() body: object) {
    let patient = await this.patientsService.findByUserId(user.id)
    if (!patient) {
      patient = await this.patientsService.create({ userId: user.id, fullName: (body as any).patientName ?? 'Paciente' })
    }
    if (!patient) throw new NotFoundException('Perfil de paciente não encontrado')
    return this.consultationsService.create(patient.id, body)
  }

  @Get('my')
  @ApiOperation({ summary: 'Listar consultas do usuário autenticado' })
  findMine(@CurrentUser() user: { id: string; role: string }) {
    return this.consultationsService.findByUser(user.id, user.role)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma consulta' })
  findOne(@Param('id') id: string) {
    return this.consultationsService.findById(id)
  }

  @Get(':id/ai-summary')
  @ApiOperation({ summary: 'Obter resumo da IA vinculado à consulta' })
  findAiSummary(@Param('id') id: string) {
    return this.consultationsService.findAiSummaryByConsultation(id)
  }

  @Post(':id/payment/authorize')
  @ApiOperation({ summary: 'Paciente autoriza o pagamento (reserva o valor)' })
  authorizePayment(@Param('id') id: string) {
    return this.consultationsService.authorizePayment(id)
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancelar consulta e liberar pré-autorização' })
  cancel(@Param('id') id: string) {
    return this.consultationsService.cancelConsultation(id)
  }

  @Post(':id/accept')
  @ApiOperation({ summary: 'Médico aceita a consulta e captura o pagamento' })
  accept(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.consultationsService.acceptByDoctor(id, user.id)
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Médico finaliza a consulta e salva prontuário' })
  complete(@Param('id') id: string, @Body() record: object) {
    return this.consultationsService.complete(id, record)
  }
}
