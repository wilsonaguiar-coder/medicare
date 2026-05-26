import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common'

@WebSocketGateway({ cors: { origin: process.env.WEB_URL ?? 'http://localhost:3000' } })
export class VideoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private readonly logger = new Logger(VideoGateway.name)

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`)
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @MessageBody() data: { roomId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId)
    client.to(data.roomId).emit('peer-joined', { userId: data.userId })
  }

  @SubscribeMessage('webrtc-offer')
  handleOffer(@MessageBody() data: { roomId: string; offer: unknown; to: string }) {
    this.server.to(data.to).emit('webrtc-offer', data)
  }

  @SubscribeMessage('webrtc-answer')
  handleAnswer(@MessageBody() data: { roomId: string; answer: unknown; to: string }) {
    this.server.to(data.to).emit('webrtc-answer', data)
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@MessageBody() data: { candidate: unknown; to: string }) {
    this.server.to(data.to).emit('ice-candidate', data)
  }
}
