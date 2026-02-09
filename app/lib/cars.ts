import { supabase } from './supabase';

// Get cars for a dealer
export async function getDealerCars(dealerId: string) {
  const { data, error } = await supabase
    .from('cars')
    .select('id, title, brand, model, year, price, location, images')
    .eq('dealer_id', dealerId)
    .order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

// Get car details by ID for public page
export async function getCarById(id: string) {
  const { data, error } = await supabase
    .from('cars')
    .select('id, title, brand, model, year, price, location, images, fuel_type, transmission, dealer_id')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return data;
}

// Public SELECT query for cars (no dealer info)
export async function getPublicCars() {
  const { data, error } = await supabase
    .from('cars')
    .select('id, title, brand, model, year, price, location, images')
    .order('created_at', { ascending: false });
  if (error) return [];
  // Map to show only first image
  return (data || []).map(car => ({
    id: car.id,
    title: car.title,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    location: car.location,
    image: car.images && car.images.length > 0 ? car.images[0] : null,
    fuelType: '',
    transmission: '',
    images: car.images || [],
  }));
}

export async function createCar(car: {
  brand: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  location: string;
  price: number;
  images: File[];
}, dealerId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Upload images to Supabase Storage
    const imageUrls: string[] = [];
    for (const file of car.images) {
      const { data, error } = await supabase.storage
        .from('car-images')
        .upload(`${dealerId}/${Date.now()}-${file.name}`, file);
      if (error) return { success: false, error: error.message };
      const url = supabase.storage
        .from('car-images')
        .getPublicUrl(`${dealerId}/${Date.now()}-${file.name}`).data.publicUrl;
      imageUrls.push(url);
    }
    // Insert car record
    const { error: insertError } = await supabase
      .from('cars')
      .insert([
        {
          brand: car.brand,
          model: car.model,
          year: car.year,
          fuel_type: car.fuelType,
          transmission: car.transmission,
          location: car.location,
          price: car.price,
          images: imageUrls,
          dealer_id: dealerId,
        },
      ]);
    if (insertError) return { success: false, error: insertError.message };
    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: 'Unknown error' };
  }
}


import type { Car } from './types';
// Mock car data
export const mockCars: Car[] = [
  {
    id: '1',
    title: 'Tesla Model S',
    brand: 'Tesla',
    model: 'Model S',
    year: 2024,
    price: 100000,
    location: 'Mumbai',
    images: ['https://images.unsplash.com/photo-1560958089-b8a63eead8c2?w=500&h=300&fit=crop'],
    fuelType: 'electric',
    transmission: 'automatic',
  },
  {
    id: '2',
    title: 'BMW 5 Series',
    brand: 'BMW',
    model: '5 Series',
    year: 2023,
    price: 80000,
    location: 'Delhi',
    images: ['https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop'],
    fuelType: 'diesel',
    transmission: 'automatic',
  },
  {
    id: '3',
    title: 'Mercedes-Benz C-Class',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    price: 75000,
    location: 'Bangalore',
    images: ['https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=500&h=300&fit=crop'],
    fuelType: 'petrol',
    transmission: 'automatic',
  },
  {
    id: '4',
    title: 'Audi A4',
    brand: 'Audi',
    model: 'A4',
    year: 2024,
    price: 70000,
    location: 'Hyderabad',
    images: ['https://images.unsplash.com/photo-1606611282220-192f694dea54?w=500&h=300&fit=crop'],
    fuelType: 'diesel',
    transmission: 'automatic',
  },
  {
    id: '5',
    title: 'Porsche 911',
    brand: 'Porsche',
    model: '911',
    year: 2024,
    price: 120000,
    location: 'Mumbai',
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=300&fit=crop'],
    fuelType: 'petrol',
    transmission: 'automatic',
  },
  {
    id: '6',
    title: 'Jaguar XE',
    brand: 'Jaguar',
    model: 'XE',
    year: 2023,
    price: 65000,
    location: 'Chennai',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop'],
    fuelType: 'petrol',
    transmission: 'automatic',
  },
  {
    id: '7',
    title: 'Lexus ES',
    brand: 'Lexus',
    model: 'ES',
    year: 2024,
    price: 90000,
    location: 'Pune',
    images: ['https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop'],
    fuelType: 'hybrid',
    transmission: 'automatic',
  },
  {
    id: '8',
    title: 'Range Rover Evoque',
    brand: 'Range Rover',
    model: 'Evoque',
    year: 2023,
    price: 110000,
    location: 'Kolkata',
    images: ['https://images.unsplash.com/photo-1606378969693-d44c86900184?w=500&h=300&fit=crop'],
    fuelType: 'diesel',
    transmission: 'automatic',
  },
];

export const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Delhi': { lat: 28.7041, lng: 77.1025 },
  'Bangalore': { lat: 12.9716, lng: 77.5946 },
  'Hyderabad': { lat: 17.3850, lng: 78.4867 },
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Pune': { lat: 18.5204, lng: 73.8567 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 },
};

export function getDistanceBetweenCoordinates(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getNearestCity(userLat: number, userLng: number): string {
  let nearestCity = 'Mumbai';
  let minDistance = Infinity;

  Object.entries(cityCoordinates).forEach(([city, coords]) => {
    const distance = getDistanceBetweenCoordinates(
      userLat,
      userLng,
      coords.lat,
      coords.lng
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = city;
    }
  });

  return nearestCity;
}
