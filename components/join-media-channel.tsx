'use client';

import { useState } from 'react';
import { Channel, ChannelType } from '@prisma/client';
import { Mic, Video } from 'lucide-react';

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
      <p className="text-2xl md:text-3xl font-bold">
        Welcome to #{channel.name}
      </p>
      <h1 className="text-base md:text-lg">
        Click the button below to join the{' '}
        <span>{channel.type === ChannelType.AUDIO ? 'voice' : 'video'}</span>{' '}
        channel
      </h1>

      <div className="flex items-center justify-center gap-4">
        <div className="h-[70px] w-[70px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          {channel.type === ChannelType.AUDIO && (
            <Mic className="h-10 w-10 text-white" />
          )}
          {channel.type === ChannelType.VIDEO && (
            <Video className="h-10 w-10 text-white" />
          )}
        </div>
        <Button size="lg" variant="primary" onClick={() => setIsJoined(true)}>
          <p className="font-bold">
            {channel.type === ChannelType.AUDIO ? 'Join audio' : 'Join video'}
          </p>
        </Button>
      </div>
    </div>
  );
};

export default JoinMediaChannel;
