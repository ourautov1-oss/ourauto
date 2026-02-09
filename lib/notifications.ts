// lib/notifications.ts

/**
 * Send a push notification to a dealer when a new lead is received.
 * This is a placeholder for the basic version. Integrate with a push provider (e.g., OneSignal, FCM) later.
 */
export interface LeadNotification {
  car: { brand: string; model: string; year: number };
  name: string;
  phone: string;
  dealerId: string;
}

export async function sendNewLeadNotification({ car, name, phone, dealerId }: LeadNotification) {
  // TODO: Integrate with push provider (e.g., OneSignal, FCM)
  // For now, just log the notification payload (simulate push)
  const notification = {
    title: 'New Lead Received 🚨',
    body: `Car: ${car.brand} ${car.model} ${car.year}\nName: ${name}\nPhone: ${phone}`,
    dealerId,
  };
  // Simulate sending notification
  console.log('Push notification (simulated):', notification);
  return true;
}
