import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

interface Props {
  children: ReactNode;
  toast: string | null;
  sidebar?: ReactNode;
}

export default function MobileShell({ children, toast, sidebar }: Props) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#f5f6f8_38%,#e7e9ee_100%)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1600px] lg:gap-6 lg:p-6 xl:gap-8 xl:p-8">
        {sidebar}
        <main className="relative min-w-0 flex-1 overflow-hidden bg-white lg:min-h-[calc(100dvh-3rem)] lg:rounded-[30px] lg:border lg:border-black/[0.06] lg:shadow-[0_28px_80px_-32px_rgba(15,23,42,0.38)] xl:min-h-[calc(100dvh-4rem)]">
          <div className="relative h-dvh min-h-0 lg:h-[calc(100dvh-3rem)] xl:h-[calc(100dvh-4rem)]">
            {children}
          </div>
          {toast && (
            <div
              key={toast}
              role="status"
              className="anim-toast pointer-events-none absolute bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-2.5 rounded-2xl bg-ink px-4 py-3 text-[13px] font-medium text-white shadow-2xl lg:bottom-7"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              {toast}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
