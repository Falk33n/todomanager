import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.scss';

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '500', '700', '800'],
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  title: 'Todo Manager',
  description: 'A Todo Manager App to help you get more organized.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${robotoCondensed.className} antialiased w-full min-h-screen`}
      >
        {children && children}
      </body>
    </html>
  );
}
