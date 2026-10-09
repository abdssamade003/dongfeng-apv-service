import type { Category } from "../types";
import { getCategoryIcon } from "./categoryIcons";

interface Props {
  category: Category;
  selected?: boolean;
  onClick: () => void;
}

export default function CategoryCard({ category, selected, onClick }: Props) {
  const Icon = getCategoryIcon(category.icon);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex h-[84px] flex-col items-center justify-center gap-2 rounded-2xl border bg-white text-[13px] font-medium shadow-[0_4px_14px_-6px_rgba(20,22,26,0.18)] transition duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.96] ${
        selected ? "border-brand bg-brand-soft/60 text-brand" : "border-line text-ink"
      }`}
    >
      <Icon className={`h-7 w-7 ${selected ? "text-brand" : "text-ink"}`} strokeWidth={1.8} />
      {category.label}
    </button>
  );
}
