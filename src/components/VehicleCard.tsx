import { Pencil } from "lucide-react";
import type { SelectedVehicle } from "../types";

interface Props {
  vehicle: SelectedVehicle;
  onModify: () => void;
}

export default function VehicleCard({ vehicle, onModify }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-[0_8px_24px_-12px_rgba(20,22,26,0.25)]">
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="h-[84px] w-[112px] shrink-0 rounded-xl bg-surface object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div>
          <p className="text-[15px] font-bold leading-tight">
            {vehicle.name} {vehicle.year}
          </p>
          <p className="mt-0.5 text-xs text-muted">{vehicle.engine}</p>
          {vehicle.vin && <p className="mt-0.5 truncate text-[11px] text-muted">VIN {vehicle.vin}</p>}
        </div>
        <button
          type="button"
          onClick={onModify}
          className="flex h-9 items-center justify-center gap-1.5 self-end rounded-xl border border-line bg-white px-4 text-[13px] font-semibold shadow-sm transition hover:bg-surface active:scale-95"
        >
          <Pencil className="h-3.5 w-3.5" />
          Modifier
        </button>
      </div>
    </div>
  );
}
