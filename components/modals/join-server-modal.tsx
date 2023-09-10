'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import { useOrigin } from '@/hooks/use-origin';

const JoinServerModal = () => {
  const router = useRouter();
  const origin = useOrigin();
  const { isOpen, openModal, closeModal, type } = useModal();

  const isModalOpen = isOpen && type === 'joinServer';

  const [inviteUrl, setInviteUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setInviteUrl(e.target.value);
  };

  const openCreateServerModal = () => {
    setInviteUrl('');
    setErrorMessage('');
    closeModal();
    openModal('createServer');
  };

  const joinServer = async () => {
    try {
      setIsLoading(true);

      const regex = new RegExp(
        `^${origin}/invite/[a-zA-Z0-9]{6}$|^${origin}/invite/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`
      );

      if (!regex.test(inviteUrl.trim())) {
        setErrorMessage('Invalid invite link');
        throw new Error('Invalid invite link');
      }

      const inviteCode = inviteUrl.split('/').pop()?.trim();

      const response = await axios.patch(`/api/servers/join/`, {
        inviteCode,
      });

      router.push(`/servers/${response.data.id}`);
      setInviteUrl('');
      closeModal();
    } catch (error) {
      console.log('Error joining server:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Join a server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Got an invite? Paste the invite link below and join the server!
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-2">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Enter invite link
          </Label>
          <div className="flex flex-col items-left mt-2 gap-1">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
              onChange={handleChange}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm ml-1">{errorMessage}</p>
            )}
          </div>
        </div>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="w-full flex items-center justify-between gap-2">
            <div>
              <span className="text-sm text-zinc-500 dark:text-secondary/70">
                Want to create a server instead?
                <br className="hidden max-[550px]:block" />
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="font-bold underline text-zinc-500 dark:text-secondary/70 px-0 py-2 h-5 min-[550px]:ml-2"
                  onClick={openCreateServerModal}
                >
                  Create a server
                </Button>
              </span>
            </div>
            <Button
              type="button"
              variant="primary"
              disabled={isLoading}
              onClick={joinServer}
            >
              {!isLoading ? (
                <p>Join</p>
              ) : (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinServerModal;
