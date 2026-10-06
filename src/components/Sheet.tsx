import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface Props {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Sheet({ title, onClose, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center sm:justify-center sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" aria-label="Fermer" onClick={onClose} className="anim-fade absolute inset-0 bg-ink/45 backdrop-blur-[2px]" />
      <div className="anim-sheet relative max-h-[88%] w-full overflow-y-auto rounded-t-[28px] bg-white px-5 pb-8 pt-3 shadow-2xl sm:max-w-lg sm:rounded-[28px] sm:px-6 sm:pb-6 sm:pt-5">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line sm:hidden" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Fermer" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface transition active:scale-90"><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
