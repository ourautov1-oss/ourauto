
"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background/80 py-10 text-center mt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-2xl font-semibold text-foreground mb-2 tracking-tight select-none" style={{ letterSpacing: '-0.01em' }}>
          OurAuto <span className="text-primary">© 2026</span>
        </div>
        <div className="text-base text-muted-foreground">
          <p className="text-lg font-medium mb-1">
            Turn inventory into sales.
          </p>
          <p className="text-base">
            Verified buyers. Real leads. Zero commission.
          </p>
        </div>
      </div>
    </footer>
  );
}
