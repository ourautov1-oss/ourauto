import { supabase } from './supabase';

import type { Profile } from './types';

export async function getSession(): Promise<Profile | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || !session.user) return null;
  return {
    id: session.user.id,
    role: 'dealer', // Adjust if roles are dynamic
    name: session.user.user_metadata?.name ?? null,
    phone: session.user.user_metadata?.phone ?? null,
    city: session.user.user_metadata?.city ?? null,
    created_at: session.user.created_at ?? '',
    updated_at: session.user.updated_at ?? '',
    verified: session.user.user_metadata?.verified ?? false,
  };
}
