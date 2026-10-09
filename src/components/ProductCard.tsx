import { ChevronRight } from "lucide-react";
import type { Product } from "../types";
import { getCategoryIcon } from "./categoryIcons";

interface Props {
  product: Product;
  onClick?: () => void;
  compact?: boolean;
  availabilityLabel?: string;
}

export function ProductThumb({ product, className = "" }: { product: Product; className?: string }) {
  const Icon = getCategoryIcon(product.categoryId);
  if (product.image) {
    return <img src={product.image} alt={product.name} className={`object-cover ${className}`} />;
  }
  return (
    <div className={`flex items-center justify-center bg-surface text-brand ${className}`}>
      <Icon className="h-1/2 w-1/2" strokeWidth={1.5} />
    </div>
  );
}

export default function ProductCard({ product, onClick, compact, availabilityLabel }: Props) {
  const body = (
    <>
      <ProductThumb product={product} className="h-16 w-20 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1 text-left">
        <p className="text-[14px] font-bold leading-snug">{product.name}</p>
        <p className="mt-0.5 text-xs text-muted">Réf: {product.itemCode ?? product.ref}</p>
        {!compact && (
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px]">
            {product.subType && <p className="text-muted">Sous-type : {product.subType}</p>}
            {product.position && <p className="text-muted">Position : {product.position}</p>}
            {availabilityLabel && (
              <p className={`font-semibold ${
                availabilityLabel === "Disponible"
                  ? "text-emerald-700"
                  : availabilityLabel === "Sur commande"
                    ? "text-orange-600"
                    : "text-amber-700"
              }`}>
                {availabilityLabel}
              </p>
            )}
          </div>
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
