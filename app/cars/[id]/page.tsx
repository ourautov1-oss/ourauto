
import { getCarById } from '@/app/lib/cars';
import Image from 'next/image';
import ShareButton from '@/app/components/ShareButton';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabase';
import { Profile } from '@/app/lib/types';

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const car = await getCarById(params.id);
  let dealer: Profile | null = null;
  let dealerCarsCount = 0;
  if (car && car.dealer_id) {
    const { data: dealerData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', car.dealer_id)
      .single();
    dealer = dealerData;
    const { count } = await supabase
      .from('cars')
      .select('id', { count: 'exact', head: true })
      .eq('dealer_id', car.dealer_id);
    dealerCarsCount = count || 0;
  }

  let carContent;
  if (!car) {
    carContent = <div className="container mx-auto py-8">Car not found.</div>;
  } else {
    // JSON-LD structured data for SEO
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${car.brand} ${car.model} (${car.year})`,
      "image": car.images,
      "description": `Premium car listing on OurAuto. ${car.brand} ${car.model} (${car.year}), ${car.fuel_type}, ${car.transmission}, located in ${car.location}.`,
      "brand": car.brand,
      "offers": {
        "@type": "Offer",
        "price": car.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url": `https://ourauto.com/cars/${car.id}`,
      },
      ...(dealer && {
        "seller": {
          "@type": "Organization",
          "name": dealer.name,
          "address": dealer.city,
          "url": `https://ourauto.com/dealer/${dealer.id}`,
        }
      })
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
      <h1 className="text-3xl font-bold mb-4">{car.brand} {car.model} ({car.year})</h1>

      {/* Dealer Section (Public, Trust Layer) */}
      {dealer && (
        <div className="my-6 p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="text-lg">🏬</span>
              <span className="font-semibold">Dealer: {dealer.name}</span>
              <span className="text-zinc-600">📍 {dealer.city}</span>
              {dealer.verified && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">✔ Verified Dealer</span>
              )}
              <span className="text-zinc-600">🚗 {dealerCarsCount} cars listed</span>
            </div>
            <Link
              href={`/dealer/${dealer.id}`}
              className="mt-2 md:mt-0 inline-block px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
            >
              View Dealer Profile
            </Link>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* Image gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {car.images?.map((img: string, idx: number) => (
              <Image key={idx} src={img} alt={car.brand + ' ' + car.model} width={500} height={300} className="rounded" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <ul className="mb-6">
            <li><strong>Brand:</strong> {car.brand}</li>
            <li><strong>Model:</strong> {car.model}</li>
            <li><strong>Year:</strong> {car.year}</li>
            <li><strong>Location:</strong> {car.location}</li>
            <li><strong>Price:</strong> ₹{car.price}</li>
            <li><strong>Fuel Type:</strong> {car.fuel_type}</li>
            <li><strong>Transmission:</strong> {car.transmission}</li>
          </ul>
          <ShareButton
            title={`${car.brand} ${car.model} (${car.year})`}
            price={car.price}
            city={car.location}
            url={`https://ourauto.com/cars/${car.id}`}
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded" disabled>
            Dealer will contact you soon
          </button>
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
