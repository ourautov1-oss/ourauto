
"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import CarCard from '@/app/components/car-card';
import type { DealerProfile, Car } from '@/app/lib/types';




export default function DealerProfilePage({ params }: { params: { id: string } }) {
  const [dealer, setDealer] = useState<DealerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  // Remove carsLoading, not used

  useEffect(() => {
    async function load() {
      const { data: d } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single();
      setDealer(d);
      setLoading(false);
    }
    load();
  }, [params.id]);

  useEffect(() => {
    if (!dealer) return;
    async function loadCars() {
        if (!dealer) return;
        const { data: carData } = await supabase
          .from('cars')
          .select('id, title, brand, model, year, price, location, images')
          .eq('dealer_id', dealer.id);
      setCars(carData || []);
    }
    loadCars();
  }, [dealer]);

  if (loading) return <div>Loading...</div>;
  if (!dealer) return <div>Dealer not found</div>;

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <div className="text-base text-blue-900 font-medium mb-2">
          “Verified dealers build trust on OurAuto”
        </div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🏬 {dealer.name}
          {dealer.verified && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">✔ Verified Dealer</span>
          )}
        </h1>
        <div className="text-gray-600 mt-1 flex items-center gap-4">
          <span>📍 {dealer.city}</span>
          <span>🚗 {cars?.length || 0} cars listed</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cars && cars.length > 0 ? (
          cars.map((car: Car) => <CarCard key={car.id} car={car} />)
        ) : (
          <div className="col-span-full text-center text-zinc-500 py-12">
            <div className="text-5xl mb-2">🚗</div>
            <div>આ dealer પાસે હાલ કોઈ cars નથી</div>
          </div>
        )}
      </div>
      <footer className="mt-10 text-center text-xs text-gray-500">
        OurAuto — trusted marketplace for real dealers
      </footer>
    </main>
  );
}
