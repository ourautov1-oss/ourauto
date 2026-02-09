
// ...existing code...
import Image from 'next/image';
import ShareButton from '@/app/components/ShareButton';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabase';
import { Profile } from '@/app/lib/types';

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const car = null;
  let dealer: Profile | null = null;
  let dealerCarsCount = 0;

  let carContent;
  if (!car) {
    carContent = <div className="container mx-auto py-8">Car not found.</div>;
  } else {
    // JSON-LD structured data for SEO
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Car Listing",
      "image": [],
      "description": "Premium car listing on OurAuto.",
      "brand": "",
      "offers": {
        "@type": "Offer",
        "price": 0,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url": "https://ourauto.com/cars/",
      },
      // No dealer information available
    };
    carContent = <>
      {/* JSON-LD structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Brand trust block */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center gap-2 text-green-700 font-semibold text-base">
          <span className="text-xl">✔</span> Verified Car Listing
        </div>
        <div className="flex items-center gap-2 text-blue-700 text-sm">
          <span className="text-lg">📸</span> Images uploaded by authorized dealer
        </div>
        <div className="flex items-center gap-2 text-zinc-700 text-sm">
          <span className="text-lg">🔒</span> Your contact is safe with OurAuto
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Car Listing</h1>

      {/* Dealer Section (Public, Trust Layer) */}
       {/* Dealer section removed: dealer is always null */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* Image gallery */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
             {/* No images available */}
           </div>
        </div>
        <div className="flex-1">
           <ul className="mb-6">
             <li><strong>Brand:</strong> N/A</li>
             <li><strong>Model:</strong> N/A</li>
             <li><strong>Year:</strong> N/A</li>
             <li><strong>Location:</strong> N/A</li>
             <li><strong>Price:</strong> ₹0</li>
             <li><strong>Fuel Type:</strong> N/A</li>
             <li><strong>Transmission:</strong> N/A</li>
           </ul>
             {/* ShareButton removed: car is always null */}
             {/* Dealer contact button removed: car is always null */}
        </div>
      </div>
      {/* Brand message at bottom */}
      <div className="mt-10 text-center text-base text-zinc-700 dark:text-zinc-300 font-semibold">
        OurAuto — trusted marketplace for real dealers
      </div>
    </>;
  }

  return (
    <main className="container mx-auto py-8">
      {carContent}
    </main>
  );
}
