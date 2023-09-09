'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { UserButton } from '@clerk/nextjs';

const WelcomePage = ({ userName }: { userName: string }) => {
  const { openModal } = useModal();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 lg:gap-6 max-w-[min(850px,90%)] mx-auto text-center">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
        Hi {userName.split(' ')[0]}, cheers to your arrival! 🥂
      </h1>
      <h2 className="text-lg md:text-2xl">
        🎉 We've been waiting for you. Let's Chat is your new online home 🏠 for
        epic hangs and awesome people!🌟
      </h2>
      <p className="text-md lg:text-lg font-bold">
        Get started 🚀 by creating your own server or join one
      </p>

      <div className="mt-4 space-x-6">
        <Button variant="primary" onClick={() => openModal('createServer')}>
          <p className="font-bold">Create a server</p>
        </Button>
        <Button variant="primary" onClick={() => openModal('joinServer')}>
          <p className="font-bold">Join a server</p>
        </Button>
      </div>

      <div className="absolute top-4 right-4">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-[44px] w-[44px]',
            },
          }}
        />
      </div>
    </div>
  );
};

export default WelcomePage;
