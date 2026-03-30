"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  BellDot,
  BrainCircuit,
  CalendarRange,
  ChartColumnIncreasing,
  GraduationCap,
  LayoutDashboard,
  MonitorSmartphone,
  MoonStar,
  Search,
  SunMedium,
  UserRound,
} from "lucide-react";
import { Role } from "@/lib/types";
import { cn } from "@/lib/utils";
import { roleLabels } from "@/lib/mock-data";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  { href: "/dashboard", label: "Главная", icon: LayoutDashboard },
  { href: "/student-profile", label: "Профиль ученика", icon: UserRound },
  { href: "/ai-insights", label: "AI-инсайты", icon: BrainCircuit },
  { href: "/class-rating", label: "Рейтинг", icon: ChartColumnIncreasing },
  { href: "/smart-schedule", label: "Умное расписание", icon: CalendarRange },
  { href: "/kiosk-mode", label: "Режим экрана", icon: MonitorSmartphone },
];

const roles: Role[] = ["student", "teacher", "parent", "admin"];

function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  return (
    <div className="theme-toggle rounded-[26px] border border-white/8 bg-white/[0.03] p-1.5">
      <div className="font-mono-ui px-2 pb-2 pt-1 text-[10px] uppercase tracking-[0.24em] text-slate-500">Тема интерфейса</div>
      <div className="grid grid-cols-2 gap-1">
        {[
          { value: "dark" as const, label: "Темная", icon: MoonStar },
          { value: "light" as const, label: "Светлая", icon: SunMedium },
        ].map((option) => {
          const Icon = option.icon;
          const active = mounted ? theme === option.value : option.value === "dark";

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              data-active={active}
              className={cn(
                "theme-toggle-segment flex items-center justify-center gap-2 rounded-[20px] border border-transparent px-3 py-3 text-sm transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-blue-500/14 to-violet-500/16 text-white shadow-[0_10px_24px_rgba(59,130,246,0.12)]"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AppShell({
  children,
  title,
  eyebrow,
  role,
}: {
  children: React.ReactNode;
  title: string;
  eyebrow: string;
  role: Role;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, mounted } = useTheme();

  const setRole = (nextRole: Role) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", nextRole);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-4 md:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1640px] gap-4 lg:grid-cols-[292px_minmax(0,1fr)]">
        <aside className="panel glass relative overflow-hidden rounded-[36px] p-6">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-violet-500/8 to-transparent" />

          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 via-blue-400 to-violet-500 shadow-[0_16px_40px_rgba(37,99,235,0.22)]">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-semibold tracking-tight text-white">InsightED</div>
                <div className="font-mono-ui text-xs uppercase tracking-[0.24em] text-slate-400">Единый цифровой контур школы</div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">
              {mounted ? (theme === "dark" ? "Темная" : "Светлая") : "Темная"}
            </div>
          </div>

          <ThemeToggle />

          <nav className="mt-6 space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={`${item.href}?role=${role}`}
                  className={cn(
                    "group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-sm text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-white",
                    active && "bg-white/7 text-white",
                  )}
                >
                  {active ? (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-2xl border border-blue-400/30 bg-gradient-to-r from-blue-500/18 to-violet-500/14"
                      transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    />
                  ) : null}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="surface-glow mt-8 space-y-3 rounded-[30px] border border-white/8 bg-white/[0.03] p-4">
            <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-slate-400">Роль пользователя</div>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRole(option)}
                  className={cn(
                    "rounded-2xl border px-3 py-2 text-left text-sm transition-all",
                    option === role
                      ? "border-blue-400/40 bg-blue-500/18 text-white"
                      : "border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/16 hover:bg-white/[0.05]",
                  )}
                >
                  {roleLabels[option]}
                </button>
              ))}
            </div>
            <p className="text-sm leading-6 text-slate-400">Роль меняет приоритеты, AI-логику и состав ключевых блоков.</p>
          </div>

          <div className="surface-glow mt-6 rounded-[30px] border border-white/8 bg-gradient-to-br from-white/[0.03] via-black/10 to-violet-500/[0.08] p-4">
            <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-blue-200/80">Ключевая ценность</div>
            <div className="mt-2 text-lg font-semibold text-white">Оценки, AI и расписание в одном контуре</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              InsightED помогает быстро увидеть картину школы и понять, где нужен следующий шаг.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">Синхронизация</div>
                <div className="mt-2 text-xl font-semibold text-white">12</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">Точность AI</div>
                <div className="mt-2 text-xl font-semibold text-white">94%</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="panel grid-surface overflow-hidden rounded-[36px] p-5 md:p-6">
          <div className="mb-6 flex flex-col gap-4 border-b border-white/8 pb-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex max-w-[30ch] items-center gap-3 rounded-[22px] border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">
                  <Search className="h-4 w-4 text-slate-500" />
                  Поиск по данным и AI-сигналам
                </div>
                <div className="inline-flex items-center gap-2 rounded-[22px] border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">
                  <BellDot className="h-4 w-4 text-blue-200" />3 новых обновления
                </div>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.025] px-4 py-3">
                <div className="font-mono-ui text-[11px] uppercase tracking-[0.3em] text-slate-500">Текущий режим</div>
                <div className="mt-2 text-sm text-slate-300">
                  Активная роль: <span className="font-medium text-white">{roleLabels[role]}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="font-mono-ui text-xs uppercase tracking-[0.32em] text-blue-200/80">{eyebrow}</div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h1>
              </div>
              <div className="max-w-[38ch] rounded-[26px] border border-white/8 bg-gradient-to-r from-white/[0.03] to-violet-500/[0.08] px-5 py-4">
                <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-blue-100/80">Подсказка</div>
                <div className="mt-2 text-sm leading-6 text-slate-300">
                  Все ключевые блоки уже адаптированы под текущую роль.
                </div>
              </div>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
