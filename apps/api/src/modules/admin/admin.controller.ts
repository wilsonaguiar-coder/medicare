import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { DoctorsService } from '../doctors/doctors.service'

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Patch('doctors/:id/approve')
  @ApiOperation({ summary: 'Aprovar cadastro de médico' })
  approveDoctor(@Param('id') id: string) {
    return this.doctorsService.update(id, { approvalStatus: 'APPROVED' })
  }

  @Patch('doctors/:id/block')
  @ApiOperation({ summary: 'Bloquear médico' })
  blockDoctor(@Param('id') id: string) {
    return this.doctorsService.update(id, { approvalStatus: 'BLOCKED' })
  }
}
