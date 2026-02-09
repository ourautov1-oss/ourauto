"use client";

import Link from "next/link";

export default function DealerDashboard() {
  // MVP: static values (safe). Later we’ll connect DB.
  const dealerName = "Dealer";
  const stats = {
    listings: 0,
    leads: 0,
    sold: 0,
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-1">
        Welcome, {dealerName} 👋
      </h1>

      <p className="text-sm text-muted-foreground mb-6">
        ✔ Verified Dealer Account · Zero commission · Buyer phone verified
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Active Listings</p>
          <p className="text-3xl font-bold">{stats.listings}</p>
        </div>

        <div className="border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Leads Received</p>
          <p className="text-3xl font-bold">{stats.leads}</p>
        </div>

        <div className="border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Cars Sold</p>
          <p className="text-3xl font-bold">{stats.sold}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/dealer/add-car"
          className="bg-black text-white px-6 py-3 rounded-md font-medium"
        >
          ➕ Add New Car
        </Link>

        <Link
          href="/dealer/cars"
          className="border px-6 py-3 rounded-md font-medium"
        >
          View My Listings
        </Link>
      </div>
    </div>
  );
}
