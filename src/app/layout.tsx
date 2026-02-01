import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Football Analytics - Plataforma de Análisis de Apuestas',
  description: 'Plataforma profesional de análisis de fútbol para apuestas con estadísticas en tiempo real y predicciones.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-app`}
      >
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
