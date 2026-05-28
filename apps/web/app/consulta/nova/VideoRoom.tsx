'use client'

import { LiveKitRoom, VideoConference, RoomAudioRenderer } from '@livekit/components-react'
import '@livekit/components-styles'
import Image from 'next/image'

interface VideoRoomProps {
  token: string
  serverUrl: string
  onDisconnect?: () => void
}

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  {
    urls: [
      'turn:medicare.med.br:3479',
      'turns:medicare.med.br:5350',
    ],
    username: 'medicare',
    credential: 'Medicare2026!',
  },
]

export function VideoRoom({ token, serverUrl, onDisconnect }: VideoRoomProps) {
  return (
    <div style={{ position: 'relative', height: '560px', borderRadius: '16px', overflow: 'hidden', background: '#0A2342' }}>
      <LiveKitRoom
        serverUrl={serverUrl}
        token={token}
        video={true}
        audio={true}
        connect={true}
        onDisconnected={() => onDisconnect?.()}
        style={{ height: '100%' }}
        connectOptions={{ rtcConfig: { iceServers: ICE_SERVERS } }}
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
      <div style={{ position: 'absolute', top: 12, left: 16, pointerEvents: 'none', opacity: 0.8, zIndex: 10 }}>
        <Image src="/lgmda.png" alt="Medicare" width={90} height={32} style={{ objectFit: 'contain' }} />
      </div>
    </div>
  )
}
