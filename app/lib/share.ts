// app/lib/share.ts
export function shareCar(car: {
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  id: string;
}) {
  const url = `${window.location.origin}/cars/${car.id}`;
  const text = `Check out this car: ${car.brand} ${car.model} (${car.year}) for ₹${car.price} in ${car.location}. ${url}`;
  if (typeof window !== "undefined" && navigator.share) {
    navigator.share({
      title: `${car.brand} ${car.model}`,
      text,
      url,
    });
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  }
}
