import type { Metadata } from "next";
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/app/components/header';

import Footer from '@/app/components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'OurAuto - Premium B2B Car Dealer Network',
  description: 'Discover luxury vehicles from verified dealers. The elite marketplace for premium car trading.',
  openGraph: {
    title: 'OurAuto - Premium B2B Car Dealer Network',
    description: 'Discover luxury vehicles from verified dealers. The elite marketplace for premium car trading.',
    url: 'https://ourauto.com',
    siteName: 'OurAuto',
    images: [
      {
        url: 'https://ourauto.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OurAuto - Premium B2B Car Dealer Network',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OurAuto - Premium B2B Car Dealer Network',
    description: 'Discover luxury vehicles from verified dealers. The elite marketplace for premium car trading.',
    site: '@ourauto',
    images: ['https://ourauto.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://ourauto.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased transition-colors`}
      >
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-8 py-8">
            {children}
          </main>
          <Footer />
        </Providers>
        {/* Toast notifications */}
        <div id="toast-root">
          {/* Toast notifications: Toaster must be rendered in a client component */}
        </div>
      </body>
    </html>
  );
}
