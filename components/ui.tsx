"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Surface({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
      className={cn(
        "surface-glow rounded-[30px] border border-white/8 bg-gradient-to-b from-white/[0.045] via-white/[0.02] to-black/20 p-6 shadow-[0_30px_70px_rgba(0,0,0,0.34)]",
        className,
      )}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-slate-500">{eyebrow}</div>
      <div className="mt-2 max-w-[24ch] text-xl font-semibold tracking-tight text-white">{title}</div>
      {description ? <p className="mt-2 max-w-[58ch] text-sm leading-6 text-slate-400">{description}</p> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  accent = "blue",
}: {
  label: string;
  value: string;
  delta: string;
  accent?: "blue" | "violet" | "green" | "red";
}) {
  const map = {
    blue: "from-blue-500/20 to-blue-500/5 text-blue-100",
    violet: "from-violet-500/20 to-violet-500/5 text-violet-100",
    green: "from-emerald-500/20 to-emerald-500/5 text-emerald-100",
    red: "from-rose-500/20 to-rose-500/5 text-rose-100",
  };

  const positive = !delta.startsWith("-");

  return (
    <Surface className={cn("bg-gradient-to-br", map[accent])}>
      <div className="max-w-[16ch] font-mono-ui text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{value}</div>
        <div
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs",
            positive ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200" : "border-rose-400/20 bg-rose-500/10 text-rose-200",
          )}
        >
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          <span className="font-mono-ui">{delta}</span>
        </div>
      </div>
    </Surface>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "blue" | "violet" | "green" | "red";
}) {
  const tones = {
    neutral: "border-white/10 bg-white/[0.04] text-slate-300",
    blue: "border-blue-400/20 bg-blue-500/10 text-blue-200",
    violet: "border-violet-400/20 bg-violet-500/10 text-violet-200",
    green: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
    red: "border-rose-400/20 bg-rose-500/10 text-rose-200",
  };

  return <span className={cn("inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs", tones[tone])}>{children}</span>;
}

export function InsightCallout({ title, text }: { title: string; text: string }) {
  return (
    <div className="surface-glow rounded-[30px] border border-violet-400/14 bg-gradient-to-br from-violet-500/12 via-black/30 to-blue-500/10 p-6">
      <div className="flex items-center gap-2 text-blue-100">
        <Sparkles className="h-4 w-4" />
        <span className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">AI-рекомендация</span>
      </div>
      <div className="mt-5 text-2xl font-medium text-white">{title}</div>
      <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
    </div>
  );
}
