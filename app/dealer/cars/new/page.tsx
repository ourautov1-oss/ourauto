
"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { addCar } from "@/app/lib/addCar";
import { getSession } from "@/app/lib/session";
import type { Profile } from '@/app/lib/types';

export default function AddCarPage() {
  const [session, setSession] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const s = await getSession();
      setSession(s);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!session?.id) return <div>Not authorized</div>;

  // Form fields
  // (In a real app, use client component for file upload)

  async function handleSubmit(formData: FormData) {
    const car = {
      brand: String(formData.get("brand")),
      model: String(formData.get("title")),
      year: Number(formData.get("year")),
      fuelType: String(formData.get("fuel")),
      transmission: String(formData.get("transmission")),
      location: String(formData.get("city")),
      price: Number(formData.get("price")),
      images: [], // TODO: handle file upload
    };
    await addCar(car);
    redirect("/dealer/cars");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
      <form action={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" required className="w-full border p-2 rounded" />
        <input name="brand" placeholder="Brand" required className="w-full border p-2 rounded" />
        <input name="year" type="number" placeholder="Year" required className="w-full border p-2 rounded" />
        <input name="fuel" placeholder="Fuel" className="w-full border p-2 rounded" />
        <input name="transmission" placeholder="Transmission" className="w-full border p-2 rounded" />
        <input name="city" placeholder="City" className="w-full border p-2 rounded" />
        <input name="price" type="number" placeholder="Price" className="w-full border p-2 rounded" />
        <label className="block font-medium">Car Images (1–5):</label>
        <input name="images" type="file" accept="image/*" multiple required className="w-full border p-2 rounded" max={5} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Car</button>
      </form>
    </div>
  );
}
