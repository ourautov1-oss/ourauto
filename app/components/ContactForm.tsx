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
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
        className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30 transition min-h-[96px]"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 w-full font-semibold shadow-md transition-colors hover:bg-foreground/90 hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-black disabled:opacity-60"
      >
        {loading ? "Sending..." : "Contact Dealer"}
      </button>
    </form>
  );
}
