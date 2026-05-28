import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AccessToken } from 'livekit-server-sdk'

export interface WaitingRoom {
  roomName: string
  specialty: string
  patientName: string
  createdAt: Date
}

@Injectable()
export class VideoService {
  private readonly waitingRooms = new Map<string, WaitingRoom>()

  constructor(private readonly config: ConfigService) {}

  registerWaitingRoom(roomName: string, specialty: string, patientName: string): void {
    this.waitingRooms.set(roomName, { roomName, specialty, patientName, createdAt: new Date() })
  }

  removeWaitingRoom(roomName: string): void {
    this.waitingRooms.delete(roomName)
  }

  getWaitingRooms(): WaitingRoom[] {
    const cutoff = Date.now() - 60 * 60 * 1000
    for (const [key, r] of this.waitingRooms.entries()) {
      if (r.createdAt.getTime() < cutoff) this.waitingRooms.delete(key)
    }
    return Array.from(this.waitingRooms.values())
  }

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
