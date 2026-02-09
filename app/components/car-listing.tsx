'use client';

import { useEffect, useState } from 'react';
import { CarCard } from '@/app/components/car-card';
// ...existing code...
import type { Car } from '@/app/lib/types';

export function CarListing() {
  // Demo: No cars, no loading, no city logic. Add real logic for production.

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 py-16 dark:border-zinc-800">
      <div className="text-5xl mb-4">🚗</div>
      <h3 className="text-lg font-semibold text-black dark:text-white">
        New verified cars added daily
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        OurAuto — trusted car marketplace for real buyers & dealers
      </p>
    </div>
  );
}
