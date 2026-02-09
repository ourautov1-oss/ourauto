
"use client";

const fuelIcons: Record<string, React.ReactNode> = {
  'petrol': '⛽',
  'diesel': '🛢️',
  'hybrid': '🔋⛽',
  'electric': '⚡',
};

const transmissionIcons: Record<string, React.ReactNode> = {
  'manual': '🎛️',
  'automatic': '⚙️',
};

export function FuelIcon({ type }: { type: string }) {
  return <span className="text-lg">{fuelIcons[type] || '⛽'}</span>;
}

export function TransmissionIcon({ type }: { type: string }) {
  return <span className="text-lg">{transmissionIcons[type] || '⚙️'}</span>;
}
