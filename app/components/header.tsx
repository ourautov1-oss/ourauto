'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export function Header() {

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          <span className="text-primary">Our</span>
          <span className="text-foreground">Auto</span>
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="ghost" className="rounded-xl active:scale-95">
              Login
            </Button>
          </Link>
          <Link href="/dealer/add-car">
            <Button className="rounded-xl px-5 py-2 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 active:scale-95">
              List Your Car
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
