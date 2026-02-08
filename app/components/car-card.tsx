'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/app/lib/cars';
import { FuelIcon, TransmissionIcon } from './icons';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-zinc-900">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-4 p-4">
        {/* Car Name */}
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {car.brand} {car.model}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{car.year}</p>
        </div>

        {/* Icons Row */}
        <div className="flex items-center gap-4 py-2 border-y border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-2">
            <FuelIcon type={car.fuelType} />
            <span className="text-xs uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
              {car.fuelType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TransmissionIcon type={car.transmission} />
            <span className="text-xs uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
              {car.transmission}
            </span>
          </div>
        </div>

        {/* Location */}
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          📍 {car.location}
        </p>

        {/* CTA Button */}
        <Link
          href={`/cars/${car.id}`}
          className="block w-full rounded-lg bg-black py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
