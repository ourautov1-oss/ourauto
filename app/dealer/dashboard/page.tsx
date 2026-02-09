"use client";

import Link from "next/link";

export default function DealerDashboard() {
  // Mock data for dashboard
  const dealerName = "Dealer";
  const stats = {
    listings: 3,
    leads: 12,
    sold: 1,
  };
  const loading = false;
  const cars = [
    { id: 1, make: "BMW", model: "X5", year: 2022, price: 50000, status: "Active" },
    { id: 2, make: "Toyota", model: "Corolla", year: 2021, price: 22000, status: "Active" },
    { id: 3, make: "Honda", model: "Civic", year: 2020, price: 18000, status: "Sold" },
  ];

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
        <div className="border rounded-lg p-6 bg-white dark:bg-zinc-900">
          <p className="text-sm text-muted-foreground">Active Listings</p>
          <p className="text-3xl font-bold">{stats.listings}</p>
        </div>
        <div className="border rounded-lg p-6 bg-white dark:bg-zinc-900">
          <p className="text-sm text-muted-foreground">Leads Received</p>
          <p className="text-3xl font-bold">{stats.leads}</p>
        </div>
        <div className="border rounded-lg p-6 bg-white dark:bg-zinc-900">
          <p className="text-sm text-muted-foreground">Cars Sold</p>
          <p className="text-3xl font-bold">{stats.sold}</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-zinc-900 border rounded-lg shadow-sm overflow-x-auto mb-10">
        <h2 className="text-xl font-semibold px-6 pt-6 pb-2">Inventory</h2>
        {loading ? (
          <div className="text-center py-10 text-zinc-500">Loading inventory...</div>
        ) : cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 m-6">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-4 text-zinc-400 dark:text-zinc-600"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13l2-2m0 0l7-7 7 7M5 11v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
            <h3 className="text-lg font-semibold mb-2">No cars in inventory</h3>
            <p className="text-zinc-500 mb-4">You haven’t added any cars yet. Start by listing your first car for sale.</p>
            <Link href="/dealer/add-car" className="rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 font-semibold transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200">Add New Car</Link>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Make</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
              {cars.map((car) => (
                <tr key={car.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{car.make}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${car.price.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${car.status === "Active" ? "bg-green-100 text-green-800" : "bg-zinc-200 text-zinc-600"}`}>
                      {car.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
