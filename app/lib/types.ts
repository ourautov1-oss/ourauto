export type UserRole = 'dealer';
// ...existing code...
export type Car = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  city?: string;
  fuel?: string;
  images: string[];
  dealer_id?: string;
  fuelType?: string;
  transmission?: string;
};

export type DealerProfile = {
  id: string;
  name: string;
  city: string;
  verified: boolean;
};
export interface Profile {
  id: string;
  role: UserRole;
  name: string | null;
  phone: string | null;
  city: string | null;
  created_at: string;
  updated_at: string;
  verified?: boolean;
}

export interface UserMetadata {
  role: UserRole;
  name?: string;
  phone?: string;
  city?: string;
}
