


"use client";
import React, { useState, useEffect } from 'react';
// ...existing code...
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
      // ...existing code...
      setCars([]);
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
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-4 text-zinc-400 dark:text-zinc-600"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13l2-2m0 0l7-7 7 7M5 11v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
            <h2 className="text-xl font-semibold mb-2">No cars found</h2>
            <p className="text-zinc-500 mb-4">You haven’t added any cars yet. Start by listing your first car for sale.</p>
            <Link href="/dealer/cars/new" className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 font-semibold transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200">Add New Car</Link>
          </div>
        ) : (
          cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        )}
      </div>
    </div>
  );
}
