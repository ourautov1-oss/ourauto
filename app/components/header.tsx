'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export function Header() {

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          OurAuto
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Sign In */}
          <Link
            href="/auth/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-block"
          >
            Sign In
          </Link>

          {/* Create Account (Primary CTA) */}
          <Link
            href="/auth/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-foreground/90 hover:text-background"
          >
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
}
