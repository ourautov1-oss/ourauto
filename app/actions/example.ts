"use server";

import { revalidateTag } from "next/cache";
import { getTenantContext } from "../lib/tenant";

export async function updateSomething(formData: FormData) {
  // validate input here
  const { tenantId } = await getTenantContext();
  revalidateTag(`cars:${tenantId}`, {});
}
