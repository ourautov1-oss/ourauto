
"use client";
import { useEffect, useState } from "react";
// ...existing code...
import CarCard from '@/app/components/car-card';
import type { Car } from '@/app/lib/types';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    // Minimal working state logic
    setCars([]);
    setLoading(false);
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-10">Loading cars...</div>;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Available Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              showDealer={false}
              showContact={false}
              link={`/cars/${car.id}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
