import { CarListing } from '@/app/components/car-listing';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CarListing />
      </div>
    </main>
  );
}
