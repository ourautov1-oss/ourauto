import "server-only";

// Node-only, stateful data access
import { supabase } from "../supabase";

import { getTenantContext } from "../tenant";
export async function getDealerById(id: string) {
  const { tenantId } = await getTenantContext();
  const { data, error } = await supabase
    .from('dealer')
    .select('*')
    .eq('id', id)
    .eq('tenantId', tenantId)
    .single();
  if (error) throw error;
  return data;
}
