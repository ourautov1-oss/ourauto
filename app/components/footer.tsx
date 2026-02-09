
"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-xl font-semibold tracking-tight select-none mb-4">
          <span className="text-primary">Our</span>
          <span className="text-foreground">Auto</span> <span className="text-muted-foreground">© 2026</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-base text-muted-foreground">
            <p className="text-lg font-medium mb-1">
              Turn inventory into sales.
            </p>
            <p className="text-base">
              Verified buyers. Real leads. Zero commission.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="/cars" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Browse Cars</a>
            <a href="/dealer/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dealer Portal</a>
            <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
