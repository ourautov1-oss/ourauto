"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { Car } from "@/app/lib/types";
import { useRouter } from "next/navigation";

export default function AddCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<Car, "id">>({
    title: "",
    brand: "",
    model: "",
    year: 2023,
    price: 0,
    location: "",
    city: "",
    fuel: "",
    images: [],
    dealer_id: "",
    fuelType: "",
    transmission: "",
  });

  useEffect(() => {
    async function loadDealer() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setForm((prev) => ({
        ...prev,
        dealer_id: user.id,
      }));
    }

    loadDealer();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("cars").insert(form);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dealer/cars");
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Car</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <input
          className="w-full border p-2"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
          required
        />

        <input
          className="w-full border p-2"
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
          required
        />

        <input
          className="w-full border p-2"
          placeholder="Fuel (Petrol / Diesel)"
          value={form.fuel}
          onChange={(e) =>
            setForm({ ...form, fuel: e.target.value })
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Add Car"}
        </button>
      </form>
    </div>
  );
}
