import { Hash } from 'lucide-react';

import MobileToggle from '@/components/mobile-toggle';
import { UserAvatar } from '@/components/user-avatar';
import SocketIndicator from '@/components/socket-indicator';
import { ChatVideoButton } from './chat-video-button';

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: 'channel' | 'conversation';
  imageUrl?: string;
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-xl font-semibold px-3 flex items-center h-14 min-h-[3.5rem] border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 ml-3 mr-1" />
      )}
      {type === 'conversation' && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-[1.2rem] md:text-md text-black dark:text-white line-clamp-1">
        {name}
      </p>
      <div className="ml-auto flex items-center">
        {type === 'conversation' && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
