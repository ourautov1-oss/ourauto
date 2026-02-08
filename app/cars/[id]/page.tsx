'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockCars } from '@/app/lib/cars';
import Link from 'next/link';
import { FuelIcon, TransmissionIcon } from '@/app/components/icons';

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const car = mockCars.find((c) => c.id === params.id);

  useEffect(() => {
    // Check if user is logged in (in a real app, check localStorage or auth context)
    // For now, this is a placeholder
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [router]);

  if (!car) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Car not found
          </h2>
          <Link
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <Link href="/" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
          ← Back to listings
        </Link>

        <div className="mt-8 space-y-8">
          {/* Image */}
          <div className="overflow-hidden rounded-xl">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="h-96 w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-black dark:text-white">
                {car.brand} {car.model}
              </h1>
              <p className="mt-2 text-xl text-zinc-600 dark:text-zinc-400">
                {car.year}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Fuel Type</p>
                <div className="mt-2 flex items-center gap-2">
                  <FuelIcon type={car.fuelType} />
                  <p className="text-lg font-semibold capitalize text-black dark:text-white">
                    {car.fuelType}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Transmission</p>
                <div className="mt-2 flex items-center gap-2">
                  <TransmissionIcon type={car.transmission} />
                  <p className="text-lg font-semibold capitalize text-black dark:text-white">
                    {car.transmission}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Location</p>
                <p className="mt-2 text-lg font-semibold text-black dark:text-white">
                  📍 {car.location}
                </p>
              </div>

              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Vehicle ID</p>
                <p className="mt-2 font-mono text-lg font-semibold text-black dark:text-white">
                  {car.id}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                For dealer contact and pricing, reach out to our team
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
