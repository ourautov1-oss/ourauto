import "server-only";

// Example: Node-only authentication data access
import { supabase } from "../supabase";

import { getTenantContext } from "../tenant";
export async function getUserByEmail(email: string) {
  const { tenantId } = await getTenantContext();
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', email)
    .eq('tenantId', tenantId)
    .single();
  if (error) throw error;
  return data;
}
