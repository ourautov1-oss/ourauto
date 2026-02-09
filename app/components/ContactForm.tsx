"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import toast from "react-hot-toast";

export default function ContactForm({ carId }: { carId: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("leads").insert([
      { car_id: carId, name, phone, message }
    ]);
    setLoading(false);
    if (error) {
      toast.error("Failed to submit lead.");
    } else {
      toast.success("Lead submitted!");
      setName("");
      setPhone("");
      setMessage("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="input"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
        className="input"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="textarea"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 w-full transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        {loading ? "Sending..." : "Contact Dealer"}
      </button>
    </form>
  );
}
