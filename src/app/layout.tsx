import { ModeToggle, ThemeProvider, Toaster } from '@/components';
import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import React from 'react';
import './globals.scss';

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '500', '700', '800'],
  fallback: ['sans-serif'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Todo Manager',
  description: 'A Todo Manager App to help you get more organized.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body
        className={`${robotoCondensed.className} antialiased w-full min-h-screen`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
