'use client';

import { useSocket } from '@/providers/socket-provider';
import { Badge } from '@/components/ui/badge';

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-600 text-white text-center border-none"
      >
        <span className="hidden sm:block">Fallback: Polling every 1s</span>
        <span className="block sm:hidden">Polling</span>
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="bg-emerald-600 text-white text-center border-none"
    >
      <span className="hidden sm:block">Live: Real-time updates</span>
      <span className="block sm:hidden">Live</span>
    </Badge>
  );
};

export default SocketIndicator;
