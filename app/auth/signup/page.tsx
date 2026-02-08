"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';

export default function SignUp() {
  const router = useRouter();
  const [dealerName, setDealerName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function sanitizeMobile(v: string) {
    return v.replace(/\D/g, '').slice(0, 10);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!dealerName.trim()) return setError('Dealer / Showroom Name is required');
    if (!ownerName.trim()) return setError('Owner Name is required');
    if (!email.trim()) return setError('Email Address is required');
    if (!city.trim()) return setError('City is required');
    if (!password) return setError('Password is required');
    if (password !== confirmPassword) return setError('Passwords do not match');

    const cleanMobile = sanitizeMobile(mobile);
    if (mobile && cleanMobile.length !== 10) return setError('Enter a valid 10-digit mobile number');

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            dealer_name: dealerName.trim(),
            owner_name: ownerName.trim(),
            mobile: cleanMobile ? `+91${cleanMobile}` : undefined,
            city: city.trim(),
            role: 'dealer',
          },
        },
      });

      if (error) {
        setError(error.message || 'Unable to create account');
        setLoading(false);
        return;
      }

      if (data.user) {
        // On success, redirect to home
        router.push('/');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-black">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">Create Dealer Account</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Join OurAuto’s verified dealer network</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Dealer / Showroom Name</label>
              <input
                className="mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-black placeholder-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                value={dealerName}
                onChange={(e) => setDealerName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Owner Name</label>
              <input
                className="mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-black placeholder-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-black placeholder-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Mobile Number</label>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">+91</span>
                <input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full rounded-r-md border border-zinc-200 bg-white px-3 py-2 text-base text-black placeholder-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                  value={mobile}
                  onChange={(e) => setMobile(sanitizeMobile(e.target.value))}
                  placeholder="1234567890"
                />
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">India only — enter 10 digit mobile number (optional)</p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">City</label>
              <input
                className="mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-black placeholder-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-black placeholder-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Confirm Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-black placeholder-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
              >
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </div>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-black hover:underline dark:text-white">
              Sign in
            </Link>
          </p>
        </div>

        <Link href="/" className="block text-center text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
