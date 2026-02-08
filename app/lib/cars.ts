export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  transmission: 'manual' | 'automatic';
  location: string;
  image: string;
}

// Mock car data
export const mockCars: Car[] = [
  {
    id: '1',
    brand: 'Tesla',
    model: 'Model S',
    year: 2024,
    fuelType: 'electric',
    transmission: 'automatic',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1560958089-b8a63eead8c2?w=500&h=300&fit=crop',
  },
  {
    id: '2',
    brand: 'BMW',
    model: '5 Series',
    year: 2023,
    fuelType: 'diesel',
    transmission: 'automatic',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop',
  },
  {
    id: '3',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    fuelType: 'petrol',
    transmission: 'automatic',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=500&h=300&fit=crop',
  },
  {
    id: '4',
    brand: 'Audi',
    model: 'A4',
    year: 2024,
    fuelType: 'diesel',
    transmission: 'automatic',
    location: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1606611282220-192f694dea54?w=500&h=300&fit=crop',
  },
  {
    id: '5',
    brand: 'Porsche',
    model: '911',
    year: 2024,
    fuelType: 'petrol',
    transmission: 'automatic',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=300&fit=crop',
  },
  {
    id: '6',
    brand: 'Jaguar',
    model: 'XE',
    year: 2023,
    fuelType: 'petrol',
    transmission: 'automatic',
    location: 'Chennai',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop',
  },
  {
    id: '7',
    brand: 'Lexus',
    model: 'ES',
    year: 2024,
    fuelType: 'hybrid',
    transmission: 'automatic',
    location: 'Pune',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop',
  },
  {
    id: '8',
    brand: 'Range Rover',
    model: 'Evoque',
    year: 2023,
    fuelType: 'diesel',
    transmission: 'automatic',
    location: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1606378969693-d44c86900184?w=500&h=300&fit=crop',
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
