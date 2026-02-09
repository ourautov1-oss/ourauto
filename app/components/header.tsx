'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export function Header() {

  return (
    <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-40 w-full shadow-md transition-colors duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="OurAuto"
            width={120}
            height={40}
            priority
            className="h-8 w-auto dark:brightness-110"
          />
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Sign In */}
          <Link
            href="/auth/login"
            className="hidden rounded-lg border border-border bg-background px-4 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-block"
          >
            Sign In
          </Link>

          {/* Create Account (Primary CTA) */}
          <Link
            href="/auth/signup"
            className="rounded-lg bg-primary px-4 py-2 text-base font-semibold text-primary-foreground shadow-md transition-colors hover:bg-foreground/90 hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
}
