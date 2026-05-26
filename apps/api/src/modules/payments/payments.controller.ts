import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { PaymentsService } from './payments.service'

@ApiTags('Pagamentos')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Iniciar pagamento para uma consulta' })
  initiate(
    @CurrentUser() user: { id: string },
    @Body() body: { consultationId: string; method: 'PIX' | 'CREDIT_CARD' },
  ) {
    return this.paymentsService.initiate(user.id, body.consultationId, body.method)
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Webhook de confirmação do gateway de pagamento' })
  webhook(@Body() payload: object) {
    return this.paymentsService.handleWebhook(payload)
  }

  @Get(':consultationId/receipt')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Gerar recibo para IRPF' })
  generateReceipt(@Param('consultationId') consultationId: string) {
    return this.paymentsService.generateIrpfReceipt(consultationId)
  }
}
