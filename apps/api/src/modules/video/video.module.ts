import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { VideoController } from './video.controller'
import { VideoGateway } from './video.gateway'
import { VideoService } from './video.service'

@Module({
  imports: [ConfigModule],
  controllers: [VideoController],
  providers: [VideoGateway, VideoService],
  exports: [VideoService],
})
export class VideoModule {}
