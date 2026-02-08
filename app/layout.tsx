import type { Metadata } from "next";
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/app/providers';
import { Header } from '@/app/components/header';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
