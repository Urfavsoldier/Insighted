"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui";
import { generateAiInsight } from "@/lib/ai";
import { primaryStudent } from "@/lib/mock-data";
import { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

function Sparkline({
  values,
  tone = "violet",
}: {
  values: number[];
  tone?: "violet" | "blue" | "red" | "green";
}) {
  const width = 220;
  const height = 72;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 10) - 5;
      return `${x},${y}`;
    })
    .join(" ");

  const strokeMap = {
    violet: "#9d7bff",
    blue: "#6d97ff",
    red: "#f87171",
    green: "#34d399",
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-20 w-full">
      <defs>
        <linearGradient id={`spark-${tone}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={strokeMap[tone]} stopOpacity="0.18" />
          <stop offset="100%" stopColor={strokeMap[tone]} stopOpacity="0.92" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={`url(#spark-${tone})`}
        strokeWidth="3"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConfidenceRing({ value }: { value: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <svg viewBox="0 0 72 72" className="h-20 w-20 -rotate-90">
        <circle cx="36" cy="36" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          stroke="#9d7bff"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
      </svg>
      <div className="absolute font-mono-ui text-sm text-white">{value}%</div>
    </div>
  );
}

function getModuleContent(role: Role) {
  const insight = generateAiInsight(role, primaryStudent);

  if (insight.role === "teacher") {
    const target = insight.riskStudents[0];
    return {
      title: "AI-прогноз",
      prediction: `Риск снижения по ${target?.name ?? "классу"}: ${target?.riskScore ?? 76}%`,
      confidence: 92,
      freshness: insight.updatedAt,
      basis: "Учтены: успеваемость, посещаемость, тренд класса и рейтинг",
      why: target?.explanation ?? insight.summary,
      risk: target?.nextRisk ?? "Есть вероятность усиления пробелов, если не вмешаться до следующей контрольной.",
      action: insight.recommendations[0],
      cta: "Открыть инсайты",
      href: `/ai-insights?role=${role}`,
      trendValues: [74, 72, 70, 68, 64, 61],
      trendLabel: "↓ -11% за 3 недели",
      trendTone: "red" as const,
      plan: [
        "Провести короткую точечную диагностику слабой темы в начале недели",
        "Назначить точечный план поддержки на 7 дней",
        "Сверить динамику после следующей контрольной работы",
      ],
      nextStep: "Сформировать вмешательство по классу",
    };
  }

  if (insight.role === "parent") {
    return {
      title: "AI-прогноз",
      prediction: "Вероятность уверенного роста по алгебре: 82%",
      confidence: insight.diagnostics.confidence,
      freshness: insight.updatedAt,
      basis: "Учтены: оценки, посещаемость, цели и позиция ребенка в классе",
      why: insight.attentionPoints[0],
      risk: insight.prediction,
      action: insight.recommendations[0],
      cta: "Рекомендации",
      href: `/ai-insights?role=${role}`,
      trendValues: [58, 61, 64, 68, 74, 82],
      trendLabel: "↑ +14% за 3 недели",
      trendTone: "green" as const,
      plan: [
        "Выбрать одну учебную цель на неделю и зафиксировать ее дома",
        "Спокойно обсудить слабую тему без давления и перегруза",
        "В конце недели вместе отметить, что именно улучшилось",
      ],
      nextStep: "Получить простой недельный план",
    };
  }

  if (insight.role === "admin") {
    return {
      title: "AI-прогноз",
      prediction: "Риск перегрузки по математическому блоку: 68%",
      confidence: insight.diagnostics.confidence,
      freshness: insight.updatedAt,
      basis: "Учтены: распределение рисков, посещаемость, предметные агрегаты и нагрузка школы",
      why: insight.pulse,
      risk: insight.weakestSubjects[0],
      action: insight.recommendations[0],
      cta: "Открыть инсайты",
      href: `/ai-insights?role=${role}`,
      trendValues: [62, 64, 65, 66, 68, 68],
      trendLabel: "↑ +6% за 3 недели",
      trendTone: "violet" as const,
      plan: [
        "Усилить раннюю поддержку по алгебре и физике",
        "Сверить нагрузку учителей и плотность школьного расписания",
        "Опубликовать общий фокус недели для всей школы",
      ],
      nextStep: "Открыть пульс школы",
    };
  }

  return {
    title: "AI-прогноз",
    prediction: `Риск снижения по физике: ${insight.diagnostics.predictedRisk}%`,
    confidence: insight.diagnostics.confidence,
    freshness: insight.updatedAt,
    basis: "Прогноз построен на основе 24 последних оценок, посещаемости, рейтинга и достижений",
    why: insight.growthAreas[0],
    risk: insight.risks[0],
    action: insight.recommendations[0],
    cta: "План на неделю",
    href: `/ai-insights?role=${role}`,
    trendValues: [86, 84, 82, 79, 78, 78],
    trendLabel: "↓ -12% за 3 недели",
    trendTone: "violet" as const,
    plan: [
      "Пройти 3 видеоурока по слабой теме",
      "Решить 1 пробный тест до пятницы",
      "Обсудить проблемную лабораторную с учителем",
    ],
    nextStep: "Открыть AI-инсайты",
  };
}

export function AIIntelligenceModule({ role }: { role: Role }) {
  const content = getModuleContent(role);
  const trendPositive = content.trendTone === "green";

  return (
    <section className="ai-intelligence-shell surface-glow relative overflow-hidden rounded-[34px] border border-violet-400/16 bg-[linear-gradient(180deg,rgba(14,14,18,0.98)_0%,rgba(7,8,10,0.98)_100%)] p-6 shadow-[0_36px_90px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(135,90,245,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(135,90,245,0.08),transparent_30%)]" />
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-violet-100">
              <BrainCircuit className="h-5 w-5" />
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.28em]">AI-ядро InsightED</span>
            </div>
            <h3 className="max-w-[12ch] text-3xl font-semibold tracking-tight text-white">{content.title}</h3>
          </div>
          <Badge tone="violet">Обновлено только что</Badge>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[28px] border border-violet-400/14 bg-violet-500/[0.07] p-5">
            <div className="font-mono-ui text-[11px] uppercase tracking-[0.26em] text-violet-100/80">AI-прогноз</div>
            <div className="mt-3 max-w-[18ch] text-3xl font-semibold leading-tight text-white">{content.prediction}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[18px] border border-white/8 bg-black/20 px-3 py-3">
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-slate-500">Достоверность</div>
                <div className="mt-2 font-mono-ui text-sm text-white">0.{content.confidence}</div>
              </div>
              <div className="rounded-[18px] border border-white/8 bg-black/20 px-3 py-3">
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-slate-500">Свежесть</div>
                <div className="mt-2 font-mono-ui text-sm text-white">{content.freshness}</div>
              </div>
              <div className="rounded-[18px] border border-white/8 bg-black/20 px-3 py-3">
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-slate-500">Динамика</div>
                <div className="mt-2 font-mono-ui text-sm text-white">{content.trendLabel}</div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-black/22 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-mono-ui text-[11px] uppercase tracking-[0.26em] text-slate-500">Индикатор уверенности</div>
                <div className="mt-2 text-sm leading-6 text-slate-300">Прогноз сформирован на основе текущих данных</div>
              </div>
              <ConfidenceRing value={content.confidence} />
            </div>
            <div className="mt-4 rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
              <Sparkline values={content.trendValues} tone={content.trendTone} />
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4">
          <div className="rounded-[26px] border border-white/8 bg-black/18 p-5">
            <div className="font-mono-ui text-[11px] uppercase tracking-[0.26em] text-slate-500">Почему это важно</div>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-slate-200">{content.why}</p>
          </div>

          <div className="rounded-[26px] border border-rose-400/12 bg-rose-500/[0.05] p-5">
            <div className="font-mono-ui text-[11px] uppercase tracking-[0.26em] text-rose-100/80">Ключевой риск</div>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-slate-200">{content.risk}</p>
          </div>

          <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5">
            <div className="font-mono-ui text-[11px] uppercase tracking-[0.26em] text-slate-500">Персональный AI-план</div>
            <div className="mt-4 grid gap-3">
              {content.plan.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[20px] border border-white/8 bg-black/16 px-4 py-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-400/18 bg-violet-500/[0.08] font-mono-ui text-xs text-violet-100">
                    0{index + 1}
                  </div>
                  <div className="text-sm leading-6 text-slate-200">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[24px] border border-blue-400/12 bg-blue-500/[0.04] p-5">
          <div className="font-mono-ui text-[11px] uppercase tracking-[0.26em] text-blue-100/80">Следующее действие</div>
          <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <p className="max-w-[48ch] text-sm leading-6 text-slate-200">{content.action}</p>
            <Link
              href={content.href}
              className={cn(
                "inline-flex items-center gap-2 rounded-2xl border border-violet-400/18 bg-violet-500/[0.08] px-5 py-3 text-sm text-white transition hover:border-violet-400/30 hover:bg-violet-500/[0.14]",
              )}
            >
              {content.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-violet-200" />
              Учтены: посещаемость, рейтинг, достижения
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300">
              {trendPositive ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-300" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-violet-200" />
              )}
              {content.nextStep}
            </span>
          </div>
        </div>

        <div className="mt-4 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">{content.basis}</div>
      </div>
    </section>
  );
}
