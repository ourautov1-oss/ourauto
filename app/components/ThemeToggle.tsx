'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

    return (
      <button
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={
          `inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium shadow-sm transition-colors
          bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-black`
        }
      >
        {isDark ? (
          <span className="flex items-center gap-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 16v2m11-9h-2M3 12H1m16.95 6.95-1.41-1.41M6.46 6.46 5.05 5.05m12.02 0-1.41 1.41M6.46 17.54l-1.41 1.41"/></svg>
            <span className="hidden sm:inline">Light</span>
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"/></svg>
            <span className="hidden sm:inline">Dark</span>
          </span>
        )}
      </button>
    );
}
