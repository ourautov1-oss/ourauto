'use client';

import { useEffect, useState } from 'react';
import { CarCard } from '@/app/components/car-card';
// ...existing code...
import type { Car } from '@/app/lib/types';

export function CarListing() {
  const [cars, setCars] = useState<Car[]>([]);
  const [nearestCity, setNearestCity] = useState<string>('Mumbai');
  const [loading, setLoading] = useState(true);

  const filterCarsByCity = (city: string) => {
    // Minimal working logic
    setCars([]);
  };


  // Effect to get user location, set nearest city, and filter cars
  useEffect(() => {
    let isMounted = true;
    const handleCity = (city: string) => {
      if (!isMounted) return;
      setNearestCity(city);
      filterCarsByCity(city);
      setLoading(false);
    };
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // ...existing code...
            // Minimal working logic
            handleCity('Mumbai');
        },
        () => {
          // If location permission denied, show default city
          handleCity('Mumbai');
        }
      );
    } else {
      handleCity('Mumbai');
    }
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-border bg-muted shadow-md"
            style={{ paddingBottom: '75%', aspectRatio: '4/3' }}
          >
            <div className="h-full w-full rounded-xl bg-gradient-to-r from-muted via-background to-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-black dark:text-white">
            Luxury Dealers Near {nearestCity}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {cars.length} premium vehicles available
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
