import { AppShell } from "@/components/app-shell";
import { KioskRotator } from "@/components/kiosk-rotator";
import { Surface } from "@/components/ui";
import { Role } from "@/lib/types";

function parseRole(value?: string): Role {
  if (value === "teacher" || value === "parent" || value === "admin") return value;
  return "admin";
}

export default async function KioskModePage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = parseRole(params.role);

  return (
    <AppShell title="Режим экрана" eyebrow="Школьный экран" role={role}>
      <div className="space-y-5">
        <Surface className="bg-gradient-to-r from-violet-500/[0.12] via-slate-950/30 to-blue-500/[0.12] p-8 md:p-10">
          <div className="max-w-5xl">
            <div className="font-mono-ui text-[13px] uppercase tracking-[0.32em] text-violet-100/80">Экран для показа</div>
            <h2 className="mt-4 text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Большой экран для школы: достижения, события, AI-пульс школы и изменения расписания без единого клика.
            </h2>
            <p className="mt-6 text-2xl leading-relaxed text-slate-200 md:text-3xl">
              Режим рассчитан на коридор, холл и демо-видео: крупная типографика, высокий контраст, автоматическая ротация блоков и мгновенно понятный обзор школьной жизни.
            </p>
          </div>
        </Surface>
        <KioskRotator />
      </div>
    </AppShell>
  );
}
