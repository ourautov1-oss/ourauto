
// import { createClient } from "@supabase/supabase-js"; // Removed, using shared supabase client

import { supabase } from "@/app/lib/supabase";

export type DealerProfile = {
  id: string;
  name: string | null;
  city: string | null;
  verified?: boolean;
};

export async function getDealerProfile(dealerId: string): Promise<DealerProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, city, verified")
    .eq("id", dealerId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as DealerProfile;
}
