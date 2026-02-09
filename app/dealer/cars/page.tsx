


"use client";
import React, { useState, useEffect } from 'react';
import { getDealerCars } from "@/app/lib/cars";
import CarCard from "@/app/components/car-card";
import { getSession } from "@/app/lib/session";
import type { Profile, Car } from '@/app/lib/types';
import Link from "next/link";

export default function DealerCarsPage() {
  const [session, setSession] = useState<Profile | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const s = await getSession();
      setSession(s);
      if (!s?.id) {
        setLoading(false);
        return;
      }
      const c = await getDealerCars(s.id);
      setCars(c);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!session?.id) return <div>Not authorized</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.length === 0 ? (
          <div>No cars found.</div>
        ) : (
          cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        )}
      </div>
      <Link href="/dealer/cars/new" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded">Add New Car</Link>
    </div>
  );
}
