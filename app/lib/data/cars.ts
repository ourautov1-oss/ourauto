import "server-only";
import { getTenantContext } from "../tenant";

// Edge-safe, read-only data access
export async function getCars() {
  const { tenantId } = await getTenantContext();
  const res = await fetch(`https://api.example.com/cars?tenant=${tenantId}`, {
    cache: "force-cache",
    next: {
      revalidate: 300,
      tags: ["cars:" + tenantId],
    },
  });

  if (!res.ok) throw new Error("Failed to fetch cars");
  return res.json();
}
