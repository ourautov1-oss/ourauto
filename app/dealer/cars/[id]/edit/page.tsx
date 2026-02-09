

"use client";
import React, { useState, useEffect } from 'react';
import type { Profile, Car } from '@/app/lib/types';
// ...existing code...
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default function EditCarPage({ params }: { params: { id: string } }) {
  const [session, setSession] = useState<Profile | null>(null);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const s = await getSession();
      setSession(s);
      if (!s?.id) {
        setLoading(false);
        return;
      }
      setCar(null);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!session?.id) return <div>Not authorized</div>;
  if (!car || car.dealer_id !== session.id) return <div>Car not found or not allowed</div>;

  async function handleSubmit(/* formData: FormData */) {
    // TODO: handle images update
    // await updateCar(params.id, ...); // Not implemented
    redirect("/dealer/cars");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Car</h1>
      <form action={handleSubmit} className="space-y-4">
        <input name="title" defaultValue={car.title} required className="w-full border p-2 rounded" />
        <input name="brand" defaultValue={car.brand} required className="w-full border p-2 rounded" />
        <input name="year" type="number" defaultValue={car.year} required className="w-full border p-2 rounded" />
        <input name="fuel" defaultValue={car.fuel} className="w-full border p-2 rounded" />
        <input name="transmission" defaultValue={car.transmission} className="w-full border p-2 rounded" />
        <input name="city" defaultValue={car.city} className="w-full border p-2 rounded" />
        <input name="price" type="number" defaultValue={car.price} className="w-full border p-2 rounded" />
        <label className="block font-medium">Car Images (1–5):</label>
        <input name="images" type="file" accept="image/*" multiple className="w-full border p-2 rounded" max={5} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
}
