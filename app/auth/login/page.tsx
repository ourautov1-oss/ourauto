"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) return setError('Email Address is required');
    if (!password) return setError('Password is required');

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setError(error.message || 'Unable to sign in');
        setLoading(false);
        return;
      }

      if (data.session) {
        // Get user profile and redirect to dealer dashboard
        router.push('/dealer/dashboard');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-black">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">Sign In</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Access your OurAuto account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="space-y-4">
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
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-black placeholder-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="font-medium text-black hover:underline dark:text-white">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </form>

        <Link href="/" className="block text-center text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
