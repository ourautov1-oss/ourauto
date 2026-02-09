

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/app/components/car-card";
import { LucideShieldCheck, LucideUsers, LucideZap, LucideUserPlus, LucideUploadCloud, LucideCheckCircle } from "lucide-react";

const RECENT_CARS = [
  {
    id: 1,
    name: "2022 BMW 3 Series",
    price: "₹38,00,000",
    city: "Mumbai",
    image: "/cars/bmw-3.jpg",
  },
  {
    id: 2,
    name: "2021 Mercedes C-Class",
    price: "₹35,50,000",
    city: "Delhi",
    image: "/cars/merc-c.jpg",
  },
  {
    id: 3,
    name: "2023 Audi A4",
    price: "₹40,20,000",
    city: "Bangalore",
    image: "/cars/audi-a4.jpg",
  },
  {
    id: 4,
    name: "2022 Toyota Fortuner",
    price: "₹42,00,000",
    city: "Hyderabad",
    image: "/cars/fortuner.jpg",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-3xl rounded-full opacity-20" />
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Buy & Sell Verified Cars <br />
            <span className="text-primary">with Confidence</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            India’s trusted B2B marketplace for dealers and serious buyers.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link href="/cars">
              <Button size="lg" className="rounded-2xl px-8 py-6 text-base shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95">
                Browse Cars
              </Button>
            </Link>
            <Link href="/dealer/dashboard">
              <Button variant="outline" size="lg" className="rounded-2xl px-8 py-6 active:scale-95">
                Become a Dealer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-muted/40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-10 text-sm text-muted-foreground">
          <span>✔ 100% Verified Listings</span>
          <span>✔ Direct Dealer Network</span>
          <span>✔ No Fake Leads</span>
          <span>✔ Secure Transactions</span>
        </div>
      </section>

      {/* REAL STATS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-4xl font-bold text-primary">5,000+</p>
            <p className="text-muted-foreground mt-2">Cars Listed</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">1,200+</p>
            <p className="text-muted-foreground mt-2">Active Dealers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">15,000+</p>
            <p className="text-muted-foreground mt-2">Monthly Buyers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">98%</p>
            <p className="text-muted-foreground mt-2">Verified Listings</p>
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="container max-w-7xl mx-auto py-24 px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="flex flex-row gap-8 w-full justify-center">
            <FeatureCard
              icon={<LucideShieldCheck className="w-8 h-8 text-primary" />}
              title="Verified Listings"
              desc="Every car is checked and verified for authenticity."
            />
            <FeatureCard
              icon={<LucideUsers className="w-8 h-8 text-primary" />}
              title="Direct Dealer Connect"
              desc="Connect directly with trusted dealers across India."
            />
            <FeatureCard
              icon={<LucideZap className="w-8 h-8 text-primary" />}
              title="Fast Enquiry System"
              desc="Get instant responses and close deals faster."
            />
          </div>
        </div>
      </section>

      {/* LIVE CAR GRID PREVIEW */}
      <section className="container max-w-7xl mx-auto py-24 px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Recently Added Cars
          </h2>
          <Link href="/cars" className="text-primary font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {RECENT_CARS.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container max-w-7xl mx-auto py-24 px-4">
        <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12 mt-16">
          <HowItWorksStep
            step={1}
            icon={<LucideUserPlus className="w-8 h-8 text-primary" />}
            title="Sign Up"
          />
          <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full" />
          <HowItWorksStep
            step={2}
            icon={<LucideUploadCloud className="w-8 h-8 text-primary" />}
            title="List Car"
          />
          <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full" />
          <HowItWorksStep
            step={3}
            icon={<LucideCheckCircle className="w-8 h-8 text-primary" />}
            title="Receive Leads"
          />
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center w-72 cursor-pointer">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <div className="text-xl font-semibold mb-2 text-foreground">{title}</div>
      <div className="text-base text-muted-foreground text-center">{desc}</div>
    </div>
  );
}

function HowItWorksStep({ step, icon, title }: { step: number; icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-semibold mb-4">
        {step}
      </div>
      <div className="mb-2">{icon}</div>
      <div className="text-lg font-semibold text-foreground text-center">{title}</div>
    </div>
  );
}
