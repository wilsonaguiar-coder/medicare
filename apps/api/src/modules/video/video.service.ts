import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AccessToken } from 'livekit-server-sdk'

@Injectable()
export class VideoService {
  constructor(private readonly config: ConfigService) {}

  async createRoomToken(
    roomName: string,
    participantIdentity: string,
    participantName: string,
  ): Promise<string> {
    const apiKey = this.config.get<string>('LIVEKIT_API_KEY') ?? ''
    const apiSecret = this.config.get<string>('LIVEKIT_API_SECRET') ?? ''

    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantIdentity,
      name: participantName,
      ttl: '2h',
    })

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    })

    return await at.toJwt()
  }

  getLivekitUrl(): string {
    return this.config.get<string>('LIVEKIT_URL') ?? 'wss://medicare.med.br/livekit'
  }
}
