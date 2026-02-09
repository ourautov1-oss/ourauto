import { supabase } from './supabase';

export async function addCar(car: {
  brand: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  location: string;
  price: number;
  images: File[];
}) {
  // Upload images to Supabase Storage
  const imageUrls: string[] = [];
  for (const file of car.images) {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('car-images')
      .upload(fileName, file);
    if (error) throw new Error(error.message);
    const url = supabase.storage.from('car-images').getPublicUrl(fileName).data.publicUrl;
    imageUrls.push(url);
  }

  // Insert car record
  const { error } = await supabase
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
      },
    ]);
  if (error) throw new Error(error.message);
  return true;
}
