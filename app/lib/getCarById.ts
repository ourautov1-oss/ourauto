import { supabase } from './supabase';

// Get car details by ID for public page
export async function getCarById(id: string) {
  const { data, error } = await supabase
    .from('cars')
    .select('id, brand, model, year, price, location, images, fuel_type, transmission')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return data;
}
