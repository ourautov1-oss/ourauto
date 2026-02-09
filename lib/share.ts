// lib/share.ts

export interface ShareCarOptions {
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  id: string;
}

export function getShareText({ brand, model, year, price, location, id }: ShareCarOptions) {
  return `Check out this car on OurAuto 🚗\n\n${brand} ${model} ${year}\nPrice: ₹${price.toLocaleString()}\nCity: ${location}\n\nView here:\nhttps://ourauto.com/cars/${id}`;
}

export async function shareCar(options: ShareCarOptions) {
  const text = getShareText(options);
  const url = `https://ourauto.com/cars/${options.id}`;
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${options.brand} ${options.model} ${options.year}`,
        text,
        url,
      });
      return true;
    } catch {
      // fallback to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    alert('Car details copied to clipboard!');
    return true;
  } catch {
    alert('Unable to share or copy.');
    return false;
  }
}
