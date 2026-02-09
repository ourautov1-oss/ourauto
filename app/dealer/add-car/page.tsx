"use client";
import { addCar } from "./actions";
export default function AddCarPage() {
  async function handleAddCar(formData: FormData) {
    await addCar(formData);
  }
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 py-10 w-full flex justify-center">
        <div className="w-full max-w-xl rounded-2xl bg-card shadow-lg border border-border p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Add a New Car</h1>
          <p className="text-muted-foreground mb-6">Fill in the details below to list a new car for sale. All fields are required.</p>
          <form action={handleAddCar} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Make</label>
                <input name="make" className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. BMW" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Model</label>
                <input name="model" className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. X5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Year</label>
                <input name="year" type="number" className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. 2022" min="1900" max="2099" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Price</label>
                <input name="price" type="number" className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. 50000" min="0" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Mileage</label>
                <input name="mileage" type="number" className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. 15000" min="0" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Description</label>
              <textarea name="description" className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" rows={3} placeholder="Car details..." />
            </div>
            <button type="submit" className="w-full rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-3 font-semibold transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200">
              Add Car
            </button>
          </form>
        </div>
      </div>
    </section>
	);
}
