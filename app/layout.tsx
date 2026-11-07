import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Sans, Martian_Mono } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const martian = Martian_Mono({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-martian',
  display: 'swap',
});

const description =
  'Software developer in Lagos working with React, Next.js, Flutter, and Java. Explore projects, technical skills, and credentials.';

export const metadata: Metadata = {
  title: 'Favour Akintade | Software Developer',
  description,
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Favour Akintade | Software Developer',
    description,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} ${martian.variable}`}>
      <body>{children}</body>
    </html>
  );
}
