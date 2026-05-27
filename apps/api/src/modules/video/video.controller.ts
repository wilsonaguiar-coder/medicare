import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { VideoService } from './video.service'

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('token')
  @ApiOperation({ summary: 'Gerar token LiveKit para sala de consulta' })
  async getToken(
    @Body() body: { roomName: string; participantName: string; participantIdentity?: string },
  ) {
    const identity = body.participantIdentity ?? body.participantName
    const token = await this.videoService.createRoomToken(
      body.roomName,
      identity,
      body.participantName,
    )
    return { token, serverUrl: this.videoService.getLivekitUrl() }
  }
}
