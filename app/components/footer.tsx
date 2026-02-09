
"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-100 dark:bg-zinc-900 text-center py-6 mt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
        OurAuto © 2026
      </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <p className="text-lg font-semibold">
            Turn inventory into sales.
          </p>
          <p className="text-sm text-muted-foreground">
            Verified buyers. Real leads. Zero commission.
          </p>
        </div>
    </footer>
  );
}
