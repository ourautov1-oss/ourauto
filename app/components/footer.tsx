
"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/60 py-8 text-center mt-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-base font-semibold text-foreground mb-1 tracking-tight">
          OurAuto © 2026
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="text-lg font-semibold mb-1">
            Turn inventory into sales.
          </p>
          <p className="text-sm">
            Verified buyers. Real leads. Zero commission.
          </p>
        </div>
      </div>
    </footer>
  );
}
