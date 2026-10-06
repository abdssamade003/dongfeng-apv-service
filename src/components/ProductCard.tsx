import { ChevronRight } from "lucide-react";
import type { Product } from "../types";
import { categories } from "../data/mockData";
import { getCategoryIcon } from "./categoryIcons";

interface Props {
  product: Product;
  onClick?: () => void;
  compact?: boolean;
}

export function ProductThumb({ product, className = "" }: { product: Product; className?: string }) {
  const category = categories.find((c) => c.id === product.categoryId);
  const Icon = getCategoryIcon(category?.icon ?? "");
  if (product.image) {
    return <img src={product.image} alt={product.name} className={`object-cover ${className}`} />;
  }
  return (
    <div className={`flex items-center justify-center bg-surface text-brand ${className}`}>
      <Icon className="h-1/2 w-1/2" strokeWidth={1.5} />
    </div>
  );
}

export default function ProductCard({ product, onClick, compact }: Props) {
  const body = (
    <>
      <ProductThumb product={product} className="h-16 w-20 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1 text-left">
        <p className="text-[14px] font-bold leading-snug">{product.name}</p>
        <p className="mt-0.5 text-xs text-muted">Réf. {product.ref}</p>
        {!compact && (
          <p className="mt-1.5 inline-flex rounded-full bg-brand-soft px-2 py-0.5 text-[10.5px] font-semibold text-brand">
            {product.tags[0] ?? "Pièce compatible"}
          </p>
        )}
      </div>
      {onClick && <ChevronRight className="h-5 w-5 shrink-0 text-muted" />}
    </>
  );
  const cls =
    "flex w-full items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-[0_6px_18px_-10px_rgba(20,22,26,0.25)]";

  if (!onClick) return <div className={cls}>{body}</div>;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${cls} transition duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]`}
    >
      {body}
    </button>
  );
}
