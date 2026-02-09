-- Migration: Create cars table
CREATE TABLE cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id uuid REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  year INT NOT NULL,
  fuel TEXT,
  transmission TEXT,
  price NUMERIC,
  city TEXT,
  images TEXT[],
  created_at TIMESTAMP DEFAULT now()
);