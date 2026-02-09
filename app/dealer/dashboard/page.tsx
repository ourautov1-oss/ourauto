"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';

import type { Profile } from '@/app/lib/types';

export default function DealerDashboard() {
  const router = useRouter();
  const [profile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }

      // Dealer profile check removed: getUserProfile not implemented

      // setProfile(userProfile); // userProfile not defined
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black dark:text-white">
              {profile.name || 'Dealer'}
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {profile.city && `📍 ${profile.city}`}
            </p>
            {profile.phone && (
              <p className="text-zinc-600 dark:text-zinc-400">
                📞 {profile.phone}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Add Car Card */}
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              ➕ Add Car
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              List a new vehicle on OurAuto
            </p>
            <button
              className="mt-4 rounded-md bg-black px-4 py-2 text-white hover:bg-zinc-800 dark:hover:bg-zinc-700"
              onClick={() => router.push('/dealer/add-car')}
            >
              Add Car
            </button>
          </div>

          {/* My Cars Card */}
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              🚗 My Cars
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              View and manage your listings
            </p>
            <button className="mt-4 rounded-md bg-black px-4 py-2 text-white hover:bg-zinc-800 dark:hover:bg-zinc-700">
              View Cars
            </button>
          </div>

          {/* Profile Card */}
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              👤 Profile
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Update your dealer information
            </p>
            <button className="mt-4 rounded-md bg-black px-4 py-2 text-white hover:bg-zinc-800 dark:hover:bg-zinc-700">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12">
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-900 dark:bg-yellow-900/20">
            <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">
              🚀 Coming Soon
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
              {/* TODO: Enable after Phase 2 */}
              {/* <li>📊 Analytics - View car views and inquiries</li> */}
              {/* <li>💬 Messages - Direct communication with buyers</li> */}
              {/* <li>⭐ Ratings - Build your dealer reputation</li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
