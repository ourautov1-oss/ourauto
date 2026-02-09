'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-black dark:text-white"
        >
          OurAuto
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Sign In */}
          <Link
            href="/auth/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 sm:inline-block"
          >
            Sign In
          </Link>

          {/* Create Account (Primary CTA) */}
          <Link
            href="/auth/signup"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
}
