import "server-only";
import { headers } from "next/headers";
import { TenantContext } from "./types";

export async function getTenantContext(): Promise<TenantContext> {
  const h = await headers();
  const tenantId = h.get("x-tenant-id") ?? "public";
  return { tenantId };
}
