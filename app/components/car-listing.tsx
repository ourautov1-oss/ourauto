'use client';

import { useEffect, useState } from 'react';
import { CarCard } from '@/app/components/car-card';
// ...existing code...
import type { Car } from '@/app/lib/types';

export function CarListing() {
  // Demo: No cars, no loading, no city logic. Add real logic for production.

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card shadow-sm py-16">
      <div className="text-5xl mb-4">🚗</div>
      <h3 className="text-xl font-semibold text-foreground">
        New verified cars added daily
      </h3>
      <p className="mt-4 text-base text-muted-foreground max-w-md text-center">
        OurAuto — trusted car marketplace for real buyers & dealers
      </p>
    </div>
  );
}
