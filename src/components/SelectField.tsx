import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  label: string;
  icon: ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  dimmed?: boolean;
}

export default function SelectField({ label, icon, value, options, onChange, dimmed }: Props) {
  return (
    <div className={`flex items-center gap-4 transition-opacity ${dimmed ? "opacity-50" : ""}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-ink">{icon}</div>
      <label className="block flex-1">
        <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
        <span className="relative block">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-line bg-white pl-4 pr-10 text-sm font-medium shadow-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink" />
        </span>
      </label>
    </div>
  );
}
