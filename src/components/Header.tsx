import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Logo from "./Logo";

interface Props {
  onBack?: () => void;
  onNotify: (msg: string) => void;
}

const languages = [
  { code: "FR", label: "Français", enabled: true },
  { code: "EN", label: "English", enabled: false },
  { code: "AR", label: "العربية", enabled: false },
];

function LanguageSelector({ onNotify }: { onNotify: (msg: string) => void }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("FR");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} className="flex h-9 items-center gap-1 rounded-full px-3 text-[13px] font-semibold transition hover:bg-surface active:scale-95">
        {lang}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="listbox" className="anim-fade absolute right-0 top-11 z-30 w-40 overflow-hidden rounded-2xl border border-line bg-white py-1 shadow-xl">
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={lang === l.code}
                onClick={() => {
                  setOpen(false);
                  if (l.enabled) setLang(l.code);
                  else onNotify(`${l.label} : bientôt disponible`);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-surface ${lang === l.code ? "font-semibold text-brand" : l.enabled ? "" : "text-muted"}`}
              >
                {l.label}<span className="text-xs text-muted">{l.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header({ onBack, onNotify }: Props) {
  return (
    <header className="sticky top-0 z-20 w-full shrink-0 border-b border-line/70 bg-white/94 backdrop-blur-xl lg:static lg:border-b-0 lg:bg-white">
      <div className={`mx-auto flex h-[64px] w-full max-w-[1180px] items-center px-3 sm:px-5 lg:h-[76px] lg:px-8 ${onBack ? "justify-between" : "justify-between"}`}>
        <div className="flex min-w-0 items-center gap-2">
          {onBack && (
            <button type="button" onClick={onBack} aria-label="Retour" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-surface active:scale-90">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <Logo />
        </div>
        <LanguageSelector onNotify={onNotify} />
      </div>
    </header>
  );
}
