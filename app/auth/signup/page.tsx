import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-black">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Create Account
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Join OurAuto to access premium vehicles
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Sign up page coming soon
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-black hover:underline dark:text-white"
            >
              Sign in
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="block text-center text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
