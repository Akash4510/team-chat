import './globals.css';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import { ModalProvider } from '@/providers/modal-provider';
import { SocketProvider } from '@/providers/socket-provider';
import { QueryProvider } from '@/providers/query-provider';

const font = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Discord Clone',
  description: 'Discord clone using Next Js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-clone-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
