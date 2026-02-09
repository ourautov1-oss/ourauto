
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getCarById } from "@/app/lib/getCarById";

import { supabase } from "@/app/lib/supabase";

type Lead = {
  id: string;
  car_id: string;
  name: string;
  phone: string;
  message: string;
  created_at: string;
};

type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  images: string[];
  image?: string;
};

function LeadRealtimeListener() {
  useEffect(() => {
    const channel = supabase
      .channel("new-leads")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "leads",
        },
        (payload) => {
          // Optionally handle new lead notification here
          // console.log('New lead payload:', payload);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return null;
}


// Notification Permission Button
// TODO: Enable notifications after Phase 2
// function RequestNotificationPermission() {
//   async function askPermission() {
//     if (typeof window === "undefined" || !("Notification" in window)) return;
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       new Notification("🚗 New Lead Received!", {
//         body: "Someone is interested in your car.",
//       });
//       console.log("Notifications allowed ✅");
//     }
//   }
//   return (
//     <button
//       onClick={askPermission}
//       className="px-3 py-2 bg-green-600 text-white rounded mb-4"
//     >
//       🔔 Enable Notifications
//     </button>
//   );
// }


export default function DealerLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [cars, setCars] = useState<Record<string, Car>>({});
  const [loading, setLoading] = useState(true);
  const [newLeadIds, setNewLeadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchLeads() {
      const { data: leadsData, error } = await supabase
        .from("leads")
        .select("id, car_id, name, phone, message, created_at")
        .order("created_at", { ascending: false });
      if (error) {
        setLeads([]);
        setLoading(false);
        return;
      }
      setLeads(leadsData as Lead[] || []);
      setLoading(false);

      // Mark newest lead as 'NEW' (local state)
      if (leadsData && leadsData.length > 0) {
        setNewLeadIds(new Set([leadsData[0].id]));
      }

      // Fetch car details for each car_id
      const carMap: Record<string, Car> = {};
      await Promise.all(
        Array.from(new Set((leadsData || []).map((l: Lead) => l.car_id))).map(async carId => {
          const car = await getCarById(carId);
          carMap[carId] = car as Car;
        })
      );
      setCars(carMap);
    }
    fetchLeads();
  }, []);

  // Group leads by car_id
  const grouped = leads.reduce((acc: Record<string, Lead[]>, lead) => {
    acc[lead.car_id] = acc[lead.car_id] || [];
    acc[lead.car_id].push(lead);
    return acc;
  }, {} as Record<string, Lead[]>);

  function humanDate(date: string) {
    const now = new Date();
    const d = new Date(date);
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 172800) return "Yesterday";
    return `${Math.floor(diff / 86400)} days ago`;
  }

  if (loading) return <div>Loading leads...</div>;
  if (!leads.length)
    return (
      <div className="text-center py-16 text-lg text-zinc-500">
        No leads yet — share your cars to get more visibility 🚀
        <div className="mt-2 text-base text-zinc-400">OurAuto — trusted car marketplace for real buyers & dealers</div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Leads Dashboard</h1>
      {/* TODO: Enable after Phase 2 */}
      {/* <RequestNotificationPermission /> */}
      <LeadRealtimeListener />
      {Object.entries(grouped).map(([carId, carLeads]) => {
        const car = cars[carId];
        return (
          <div key={carId} className="mb-8 rounded-lg border bg-white p-4 shadow">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={car?.images?.[0] || car?.image || "/placeholder-car.png"}
                alt={car ? `${car.brand} ${car.model}` : "Car"}
                width={80}
                height={50}
                className="rounded object-cover"
              />
              <div>
                <div className="text-lg font-semibold">
                  {car ? `${car.brand} ${car.model}` : `Car ${carId}`}
                </div>
                <div className="text-xs text-zinc-500">{car?.year} • {car?.location}</div>
              </div>
              <span className="ml-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {carLeads.length} Lead{carLeads.length > 1 ? "s" : ""}
              </span>
            </div>
            <ul className="space-y-2">
              {carLeads.map(lead => (
                <li key={lead.id} className="flex items-center gap-3 border-b last:border-none py-2">
                  <div className="flex-1">
                    <div className={newLeadIds.has(lead.id) ? "font-bold" : ""}>
                      {lead.name} <span className="text-xs text-zinc-400">({lead.phone})</span>
                      {newLeadIds.has(lead.id) && (
                        <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">NEW</span>
                      )}
                    </div>
                    <div className="text-zinc-700">{lead.message}</div>
                  </div>
                  <div className="text-xs text-zinc-500 min-w-[80px] text-right">{humanDate(lead.created_at)}</div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
