import './globals.css';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';

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
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
