"use client";
export default CarCard;

import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/app/lib/types';
import { FuelIcon, TransmissionIcon } from './icons';

interface CarCardProps {
  car: Car;
  showDealer?: boolean;
  showContact?: boolean;
  link?: string;
}

export function CarCard({ car }: CarCardProps) {
  // Share handler
  const handleShare = async () => {
    const { shareCar } = await import('@/app/lib/share');
    await shareCar({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      location: car.location,
      id: car.id,
    });
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all duration-300 hover:shadow-xl dark:bg-card">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-muted dark:bg-muted">
        {/* Use Next.js Image for optimization */}
        <Image
          src={Array.isArray(car.images) && car.images.length > 0 ? car.images[0] : "/placeholder-car.png"}
          alt={`${car.brand} ${car.model}`}
          width={400}
          height={225}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        {/* Car Name */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground leading-tight mb-1">
            {car.brand} {car.model}
          </h3>
          <p className="text-base text-muted-foreground font-medium">{car.year}</p>
        </div>

        {/* Icons Row */}
        <div className="flex items-center gap-4 py-3 border-y border-border">
          <div className="flex items-center gap-2">
            <FuelIcon type={car.fuelType ?? ''} />
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              {car.fuelType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TransmissionIcon type={car.transmission ?? ''} />
            <span className="text-xs uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
              {car.transmission}
            </span>
          </div>
        </div>

        {/* Location */}
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          📍 {car.location}
        </p>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="block w-full rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 mb-2 text-center text-sm font-semibold transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
        >
          🔗 Share Car
        </button>

        {/* CTA Button */}
        <Link
          href={`/cars/${car.id}`}
          className="block w-full rounded-md border border-black dark:border-white bg-transparent text-black dark:text-white px-4 py-2 text-center text-sm font-semibold transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
