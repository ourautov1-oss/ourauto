"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CarCard } from "@/app/components/car-card";
import { mockCars } from "@/app/lib/cars";

interface Dealer {
  id: string;
  name: string;
  city: string;
  logo?: string;
  phone?: string; // stored but never rendered as plaintext
  followers?: number;
}

// Minimal mock dealers for the static demo page
const mockDealers: Dealer[] = [
  {
    id: "dealer-1",
    name: "Imperial Motors",
    city: "Mumbai",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    phone: "912345678901",
    followers: 124,
  },
  {
    id: "dealer-2",
    name: "Prestige Autohaus",
    city: "Bangalore",
    phone: "919876543210",
    followers: 58,
  },
];

export default function DealerProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const dealer = useMemo(
    () => mockDealers.find((d) => d.id === params.id) ?? null,
    [params.id]
  );

  // Map cars to dealers for demo purposes
  const dealerCars = useMemo(() => {
    // assign some existing mock cars to dealers deterministically
    if (!dealer) return [];
    if (dealer.id === "dealer-1") return mockCars.filter((c) => ["1", "5"].includes(c.id));
    if (dealer.id === "dealer-2") return mockCars.filter((c) => ["3", "7"].includes(c.id));
    return [];
  }, [dealer]);

  // Visibility rules - follow the prompt exactly.
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDealerUser, setIsDealerUser] = useState(false);
  const [currentDealerId, setCurrentDealerId] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const logged = Boolean(localStorage.getItem("isLoggedIn"));
    setIsLoggedIn(logged);
    setIsDealerUser(localStorage.getItem("isDealer") === "true");
    setCurrentDealerId(localStorage.getItem("dealerId"));
  }, []);

  // Follow state (persisted per-dealer in localStorage)
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    if (!isMounted || !dealer) return;
    const key = `following_${dealer.id}`;
    setFollowing(localStorage.getItem(key) === "true");
  }, [isMounted, dealer]);

  const toggleFollow = () => {
    if (!dealer) return;
    const key = `following_${dealer.id}`;
    const next = !following;
    setFollowing(next);
    localStorage.setItem(key, next ? "true" : "false");
  };

  if (!dealer) {
    return (
      <main className="min-h-screen bg-white dark:bg-black">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black dark:text-white">Dealer not found</h2>
          <button
            onClick={() => router.push('/')}
            className="mt-4 rounded-md bg-zinc-100 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white"
          >
            ← Back to home
          </button>
        </div>
      </main>
    );
  }

  // Determine whether to show contact actions
  const showContactActions = isLoggedIn && isDealerUser && currentDealerId !== dealer.id;

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link href="/" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
          ← Back to listings
        </Link>

        {/* Profile Card */}
        <div className="mt-6 rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="shrink-0">
              {dealer.logo ? (
                <img
                  src={dealer.logo}
                  alt={dealer.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-xl font-semibold dark:bg-zinc-800">
                  {dealer.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}
            </div>

            {/* Name + meta */}
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-2xl font-bold text-black dark:text-white">{dealer.name}</h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span>📍</span>
                <span>{dealer.city}</span>
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="rounded-md bg-zinc-50 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {dealerCars.length} cars listed
                </div>
                <div className="rounded-md bg-zinc-50 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {dealer.followers ?? 0} followers
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6">
            {!isMounted || !isLoggedIn ? (
              // Not logged in: show single sign-in CTA
              <div>
                <Link
                  href="/auth/login"
                  className="inline-block w-full rounded-lg bg-black py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Sign in to contact dealer
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Follow toggler: only visible when contact actions allowed */}
                {showContactActions && (
                  <button
                    onClick={toggleFollow}
                    className={`flex h-12 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors ${
                      following
                        ? 'border border-zinc-300 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
                        : 'bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black'
                    }`}
                  >
                    {following ? 'Following' : 'Follow Dealer'}
                  </button>
                )}

                {/* Contact buttons */}
                {showContactActions && dealer.phone && (
                  <div className="flex w-full gap-3 sm:w-auto">
                    <a
                      href={`tel:+${dealer.phone}`}
                      className="flex h-12 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                    >
                      📞 Call Dealer
                    </a>

                    <a
                      href={`https://wa.me/${dealer.phone}?text=${encodeURIComponent(
                        'Hi, I found your profile on OurAuto.'
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-12 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                    >
                      💬 WhatsApp Dealer
                    </a>
                  </div>
                )}

                {/* If dealer is viewing own profile, or logged-in non-dealer user, hide contact actions */}
              </div>
            )}

            {/* Trust text */}
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Connected via OurAuto – Verified Dealer Network</p>
          </div>
        </div>

        {/* Cars Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-black dark:text-white">Cars from this Dealer</h2>

          {dealerCars.length === 0 ? (
            <div className="mt-6 flex items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 py-16 dark:border-zinc-800">
              <div className="text-5xl mb-4">🚗</div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-black dark:text-white">This dealer has not listed any cars yet</h3>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {dealerCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
