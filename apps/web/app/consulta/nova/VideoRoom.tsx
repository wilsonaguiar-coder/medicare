'use client'

import { LiveKitRoom, VideoConference, RoomAudioRenderer } from '@livekit/components-react'
import '@livekit/components-styles'

interface VideoRoomProps {
  token: string
  serverUrl: string
  onDisconnect?: () => void
}

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
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  )
}
