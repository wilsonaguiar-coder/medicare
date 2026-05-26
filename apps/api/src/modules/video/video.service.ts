import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

@Injectable()
export class VideoService {
  createRoom(consultationId: string): { roomId: string; token: string } {
    // Em produção: integrar com Daily.co, Twilio Video ou LiveKit
    const roomId = `room-${consultationId}-${randomUUID().slice(0, 8)}`
    const token = `token-${randomUUID()}`
    return { roomId, token }
  }
}
