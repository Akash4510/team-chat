'use client';

import * as z from 'zod';
import axios from 'axios';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, SendHorizonal } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EmojiPicker } from '@/components/emoji-picker';
import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: 'conversation' | 'channel';
}

const formSchema = z.object({
  messsage: z.string().min(1),
});

const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const router = useRouter();
  const { openModal } = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messsage: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      const trimmedMessage = values.messsage.trim();
      if (!trimmedMessage) {
        return;
      }

      form.reset();
      await axios.post(url, {
        content: trimmedMessage,
      });

      router.refresh();
      form.setFocus('messsage');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="messsage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openModal('messageFile', { apiUrl, query })}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    autoComplete="off"
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === 'conversation' ? name : '#' + name
                    }`}
                    {...field}
                  />
                  <button
                    type="button"
                    disabled={isLoading}
                    className="absolute top-7 right-[4.75rem] disabled:cursor-not-allowed"
                  >
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value}${emoji}`)
                      }
                    />
                  </button>
                  <button
                    type="submit"
                    onClick={() => form.setFocus('messsage')}
                    disabled={isLoading}
                    className={cn(
                      'relative h-10 w-10 bg-zinc-500 dark:bg-zinc-400 transition rounded-full p-2 flex items-center justify-center disabled:cursor-not-allowed',
                      !isLoading && 'hover:bg-zinc-600 dark:hover:bg-zinc-300'
                    )}
                  >
                    <SendHorizonal className="text-white dark:text-[#313338]" />
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
