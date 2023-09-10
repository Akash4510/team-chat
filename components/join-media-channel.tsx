'use client';

import { useState } from 'react';
import { Channel, ChannelType } from '@prisma/client';

import { Button } from './ui/button';
import MediaRoom from './media-room';

interface JoinMediaChannelProps {
  channel: Channel;
}

const JoinMediaChannel = ({ channel }: JoinMediaChannelProps) => {
  const [isJoined, setIsJoined] = useState(false);

  if (isJoined) {
    return (
      <MediaRoom
        chatId={channel.id}
        audio={true}
        video={channel.type === ChannelType.VIDEO}
        onDisconnect={() => setIsJoined(false)}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-6 text-center">
      <h1 className="text-2xl font-bold">
        Click the button below to join the{' '}
        <span>{channel.type === ChannelType.AUDIO ? 'voice' : 'video'}</span>{' '}
        channel
      </h1>
      <Button variant="primary" onClick={() => setIsJoined(true)}>
        <p className="font-bold">
          {channel.type === ChannelType.AUDIO ? 'Join audio' : 'Join video'}
        </p>
      </Button>
    </div>
  );
};

export default JoinMediaChannel;
