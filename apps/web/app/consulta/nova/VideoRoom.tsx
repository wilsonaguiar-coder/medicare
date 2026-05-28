'use client'

import { LiveKitRoom, VideoConference, RoomAudioRenderer } from '@livekit/components-react'
import '@livekit/components-styles'

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
    <div style={{ height: '560px', borderRadius: '16px', overflow: 'hidden', background: '#0A2342' }}>
      <LiveKitRoom
        serverUrl={serverUrl}
        token={token}
        video={true}
        audio={true}
        connect={true}
        onDisconnected={() => onDisconnect?.()}
        style={{ height: '100%' }}
        options={{ rtcConfig: { iceServers: ICE_SERVERS } }}
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  )
}
