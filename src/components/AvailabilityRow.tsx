import { ChevronRight, Loader2, MapPin } from "lucide-react";
import type { City, CityAvailability, StockStatus } from "../types";

interface Props {
  city: City;
  availability: CityAvailability;
  selected?: boolean;
  busy?: boolean;
  onClick: () => void;
}

const pill: Record<StockStatus, { label: string; cls: string; dot: string }> = {
  available: { label: "Disponible", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  out: { label: "Rupture", cls: "bg-red-50 text-red-600", dot: "bg-red-500" },
  order: { label: "Sur commande", cls: "bg-orange-50 text-orange-600", dot: "bg-orange-500" },
};

export function StatusPill({ status }: { status: StockStatus }) {
  const p = pill[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${p.cls}`}
    >
      <span className={`h-2 w-2 rounded-full ${p.dot}`} />
      {p.label}
    </span>
  );
}

export default function AvailabilityRow({ city, availability, selected, busy, onClick }: Props) {
  const quantity = availability.qty === undefined
    ? null
    : new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 2 }).format(availability.qty);
  const unit = availability.unit === "LTR"
    ? "L"
    : availability.unit === "KLG"
      ? "kg"
      : availability.unit === "PCS"
        ? availability.qty === 1 ? "pc" : "pcs"
        : availability.unit;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition duration-150 active:scale-[0.99] ${
        selected ? "border-brand/40 bg-brand-soft/50" : "border-transparent hover:bg-surface"
      }`}
    >
      <MapPin className="h-5 w-5 shrink-0" strokeWidth={1.8} />
      <span className="flex-1 text-sm font-medium">{city.name}</span>
      {availability.qty !== undefined && (
        <span className="whitespace-nowrap text-[11px] text-muted">{quantity}{unit ? ` ${unit}` : ` unité${availability.qty === 1 ? "" : "s"}`}</span>
      )}
      <StatusPill status={availability.status} />
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin text-brand" />
      ) : (
        <ChevronRight className="h-4 w-4 text-muted" />
      )}
    </button>
  );
}
