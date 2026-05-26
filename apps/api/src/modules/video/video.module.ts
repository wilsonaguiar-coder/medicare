import { Module } from '@nestjs/common'
import { VideoGateway } from './video.gateway'
import { VideoService } from './video.service'

@Module({
  providers: [VideoGateway, VideoService],
  exports: [VideoService],
})
export class VideoModule {}
