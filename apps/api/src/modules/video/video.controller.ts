import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { VideoService } from './video.service'
import { VideoGateway } from './video.gateway'

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly videoGateway: VideoGateway,
  ) {}

  @Post('token')
  @ApiOperation({ summary: 'Gerar token LiveKit para sala de consulta' })
  async getToken(
    @Body() body: { roomName: string; participantName: string; participantIdentity?: string },
  ) {
    const identity = body.participantIdentity ?? body.participantName
    const token = await this.videoService.createRoomToken(body.roomName, identity, body.participantName)
    return { token, serverUrl: this.videoService.getLivekitUrl() }
  }

  @Post('waiting-room')
  @ApiOperation({ summary: 'Registrar paciente aguardando na sala' })
  registerWaiting(@Body() body: {
    roomName: string
    specialty: string
    patientName: string
    consultationId?: string
  }) {
    this.videoService.registerWaitingRoom(body.roomName, body.specialty, body.patientName, body.consultationId)
    this.videoGateway.emitQueueUpdate(this.videoService.getWaitingRooms())
    return { ok: true }
  }

  @Get('waiting-rooms')
  @ApiOperation({ summary: 'Listar salas com pacientes aguardando' })
  getWaiting() {
    return this.videoService.getWaitingRooms()
  }

  @Delete('waiting-room/:roomName')
  @ApiOperation({ summary: 'Remover sala da fila (medico entrou)' })
  removeWaiting(@Param('roomName') roomName: string) {
    this.videoService.removeWaitingRoom(roomName)
    this.videoGateway.emitQueueUpdate(this.videoService.getWaitingRooms())
    return { ok: true }
  }
}
