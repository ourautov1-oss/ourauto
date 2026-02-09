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
    <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden hover:scale-[1.02] transition-transform duration-300 bg-muted dark:bg-muted">
        <Image
          src={Array.isArray(car.images) && car.images.length > 0 ? car.images[0] : "/placeholder-car.png"}
          alt={`${car.brand} ${car.model}`}
          width={400}
          height={225}
          className="aspect-[4/3] w-full object-cover"
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

        {/* Price */}
        <p className="text-xl font-semibold tracking-tight">
          ₹{car.price?.toLocaleString()}
        </p>

        {/* Icons Row */}
        <div className="flex items-center gap-4 py-3 border-y border-border">
          <div className="flex items-center gap-2">
            <FuelIcon type={car.fuelType ?? ''} />
            <span className="text-sm uppercase tracking-wide text-muted-foreground">
              {car.fuelType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TransmissionIcon type={car.transmission ?? ''} />
            <span className="text-sm uppercase tracking-wide text-muted-foreground">
              {car.transmission}
            </span>
          </div>
        </div>

        {/* Location */}
        <p className="text-base text-muted-foreground">
          📍 {car.location}
        </p>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="block w-full rounded-xl bg-primary text-primary-foreground px-5 py-2.5 w-full font-semibold shadow-md transition-colors hover:bg-foreground/90 hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-black mb-2 active:scale-95"
        >
          🔗 Share Car
        </button>

        {/* CTA Button */}
        <Link
          href={`/cars/${car.id}`}
          className="block w-full rounded-xl border border-primary bg-transparent text-primary px-5 py-2.5 text-center font-semibold transition-colors hover:bg-primary hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-black active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
