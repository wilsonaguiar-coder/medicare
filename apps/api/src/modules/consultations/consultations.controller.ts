import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { ConsultationsService } from './consultations.service'

@ApiTags('Consultas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova solicitação de consulta' })
  create(@CurrentUser() user: { id: string }, @Body() body: object) {
    return this.consultationsService.create(user.id, body)
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

  @Post(':id/accept')
  @ApiOperation({ summary: 'Médico aceita a consulta' })
  accept(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.consultationsService.acceptByDoctor(id, user.id)
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Médico finaliza a consulta e salva prontuário' })
  complete(@Param('id') id: string, @Body() record: object) {
    return this.consultationsService.complete(id, record)
  }
}
