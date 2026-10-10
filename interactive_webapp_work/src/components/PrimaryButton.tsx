import type { ReactNode } from "react";
import { ChevronRight, Loader2 } from "lucide-react";

type Variant = "primary" | "outline" | "danger-outline" | "success-outline";

interface Props {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  chevron?: boolean;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_22px_-8px_rgba(227,6,19,0.65)] hover:bg-brand-dark",
  outline: "border border-ink/15 bg-white text-ink shadow-sm hover:bg-surface",
  "danger-outline": "border-[1.5px] border-brand bg-white text-brand hover:bg-brand-soft",
  "success-outline":
    "border-[1.5px] border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50",
};

export default function PrimaryButton({
  children,
  variant = "primary",
  icon,
  chevron = false,
  loading = false,
  disabled = false,
  href,
  external,
  onClick,
  className = "",
}: Props) {
  const cls = `group flex h-14 w-full items-center rounded-2xl px-5 text-[15px] font-semibold transition duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60 ${
    chevron ? "justify-between" : "justify-center"
  } ${variants[variant]} ${className}`;

  const content = (
    <>
      <span className="flex items-center gap-3">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : icon}
        {children}
      </span>
      {chevron && !loading && (
        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled || loading}>
      {content}
    </button>
  );
}
