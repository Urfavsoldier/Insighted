"use client";

import { useState, useTransition } from "react";
import { Brain, RefreshCcw, ShieldAlert, Sparkles } from "lucide-react";
import { AIInsight, Role } from "@/lib/types";
import { Badge, SectionHeading, Surface } from "@/components/ui";

function DiagnosticCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/8 bg-black/12 p-4">
      <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-3 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

export function AiPanel({ initialInsight, role }: { initialInsight: AIInsight; role: Role }) {
  const [insight, setInsight] = useState(initialInsight);
  const [isPending, startTransition] = useTransition();

  const refresh = () => {
    startTransition(async () => {
      const response = await fetch(`/api/ai-insights?role=${role}`, { method: "GET", cache: "no-store" });
      const data = (await response.json()) as AIInsight;
      setInsight(data);
    });
  };

  return (
    <Surface className="overflow-hidden bg-gradient-to-br from-blue-500/[0.08] via-violet-500/[0.05] to-white/[0.03]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <div className="mb-4 flex items-center gap-2 text-violet-100">
            <Brain className="h-5 w-5" />
            <span className="font-mono-ui text-[11px] uppercase tracking-[0.28em]">AI-наставник</span>
          </div>
          <SectionHeading
            eyebrow="Интеллектуальная аналитика"
            title="AI объясняет данные и подсказывает следующий шаг"
            description="InsightED анализирует оценки, тренды, посещаемость, достижения и рейтинг. Вывод зависит от роли."
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="violet">{insight.updatedAt}</Badge>
          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white transition hover:border-violet-400/30 hover:bg-white/[0.08]"
          >
            <RefreshCcw className={isPending ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            Обновить
          </button>
        </div>
      </div>

      {insight.role === "student" ? (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 xl:grid-cols-[1.45fr_0.55fr]">
            <div className="rounded-[32px] border border-violet-400/14 bg-gradient-to-br from-violet-500/16 via-slate-950/30 to-blue-500/12 p-6">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-violet-100/80">Краткий итог</div>
              <p className="mt-5 max-w-[58ch] text-lg leading-7 text-slate-100">{insight.summary}</p>
              <div className="mt-6 rounded-[24px] border border-violet-400/14 bg-violet-500/[0.07] p-5">
                <div className="mb-3 flex items-center gap-2 text-violet-100">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">Прогноз</span>
                </div>
                <p className="max-w-[58ch] text-sm leading-6 text-slate-100">{insight.prediction}</p>
              </div>
              <p className="mt-5 rounded-[22px] border border-white/8 bg-white/[0.05] p-5 text-sm leading-6 text-slate-300">{insight.supportiveNote}</p>
            </div>
            <div className="space-y-4">
              <DiagnosticCard label="Точность AI" value={`${insight.diagnostics.confidence}%`} />
              <DiagnosticCard label="Позиция в рейтинге" value={`${insight.diagnostics.rankingPosition}/${insight.diagnostics.rankingTotal}`} />
              <DiagnosticCard label="Вероятность риска" value={`${insight.diagnostics.predictedRisk}%`} />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[30px] border border-emerald-400/12 bg-emerald-500/[0.05] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-emerald-200/80">Сильные стороны</div>
              <div className="mt-4 space-y-3">
                {insight.strengths.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-rose-400/12 bg-rose-500/[0.05] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-rose-200/80">Зоны роста</div>
              <div className="mt-4 space-y-3">
                {insight.growthAreas.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[30px] border border-amber-400/12 bg-amber-500/[0.05] p-5">
              <div className="mb-4 flex items-center gap-2 text-amber-100">
                <ShieldAlert className="h-4 w-4" />
                <span className="font-mono-ui text-[11px] uppercase tracking-[0.28em]">Риски</span>
              </div>
              <div className="space-y-3">
                {insight.risks.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-blue-400/12 bg-blue-500/[0.05] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-blue-100/80">Персональные рекомендации</div>
              <div className="mt-4 space-y-3">
                {insight.recommendations.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/8 bg-white/[0.03] p-5">
            <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-slate-500">План на неделю</div>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {insight.weeklyPlan.map((item, index) => (
                <div key={item} className="rounded-[22px] border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-slate-300">
                  <div className="mb-2 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">Шаг 0{index + 1}</div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {insight.role === "teacher" ? (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[32px] border border-violet-400/14 bg-gradient-to-br from-violet-500/16 via-slate-950/30 to-blue-500/12 p-6">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-violet-100/80">Сводка для учителя</div>
              <p className="mt-5 max-w-[56ch] text-lg leading-7 text-slate-100">{insight.summary}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <DiagnosticCard label="Точность AI" value={`${insight.diagnostics.confidence}%`} />
              <DiagnosticCard label="Ученики в риске" value={`${insight.diagnostics.riskStudents}`} />
              <DiagnosticCard label="Тренд класса" value={`${insight.diagnostics.classAverageTrend >= 0 ? "+" : ""}${insight.diagnostics.classAverageTrend}`} />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[30px] border border-white/8 bg-white/[0.03] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-slate-500">Тренды класса</div>
              <div className="mt-4 space-y-3">
                {insight.trendSummary.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-blue-400/12 bg-blue-500/[0.05] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-blue-100/80">Рекомендации учителю</div>
              <div className="mt-4 space-y-3">
                {insight.recommendations.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-rose-400/12 bg-rose-500/[0.05] p-5">
            <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-rose-200/80">Ученики в зоне риска</div>
            <div className="mt-4 grid gap-4">
              {insight.riskStudents.map((item) => (
                <div key={item.studentId} className="rounded-[24px] border border-white/8 bg-black/10 p-5">
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                      <div className="text-lg font-medium text-white">{item.name}</div>
                      <div className="mt-2 font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-500">
                        Риск {item.riskScore}% · Посещаемость {item.attendance.toFixed(1)}% · Тренд {item.trend >= 0 ? "+" : ""}
                        {item.trend}
                      </div>
                    </div>
                    <Badge tone={item.riskLevel === "high" ? "red" : "violet"}>{item.riskLevel === "high" ? "Высокий риск" : "Нужен контроль"}</Badge>
                  </div>
                  <p className="mt-4 max-w-[54ch] text-sm leading-6 text-slate-200">{item.explanation}</p>
                  <div className="mt-4 max-w-[54ch] rounded-[20px] border border-violet-400/14 bg-violet-500/[0.06] p-4 text-sm leading-6 text-slate-100">
                    {item.nextRisk}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {insight.role === "parent" ? (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[32px] border border-violet-400/14 bg-gradient-to-br from-violet-500/16 via-slate-950/30 to-blue-500/12 p-6">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-violet-100/80">Выжимка для родителя</div>
              <p className="mt-5 max-w-[56ch] text-lg leading-7 text-slate-100">{insight.summary}</p>
              <div className="mt-6 rounded-[24px] border border-violet-400/14 bg-violet-500/[0.07] p-5 text-sm leading-6 text-slate-100">
                {insight.prediction}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <DiagnosticCard label="Точность AI" value={`${insight.diagnostics.confidence}%`} />
              <DiagnosticCard label="Позиция в классе" value={`${insight.diagnostics.rankingPosition}`} />
              <DiagnosticCard label="Посещаемость" value={`${insight.diagnostics.attendance.toFixed(1)}%`} />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[30px] border border-emerald-400/12 bg-emerald-500/[0.05] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-emerald-200/80">Сильные стороны</div>
              <div className="mt-4 space-y-3">
                {insight.strengths.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-amber-400/12 bg-amber-500/[0.05] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-amber-100/80">Рекомендуем обратить внимание</div>
              <div className="mt-4 space-y-3">
                {insight.attentionPoints.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-blue-400/12 bg-blue-500/[0.05] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-blue-100/80">Что можно сделать дома</div>
              <div className="mt-4 space-y-3">
                {insight.recommendations.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {insight.role === "admin" ? (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[32px] border border-violet-400/14 bg-gradient-to-br from-violet-500/16 via-slate-950/30 to-blue-500/12 p-6">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-violet-100/80">Пульс школы</div>
              <p className="mt-5 max-w-[58ch] text-lg leading-7 text-slate-100">{insight.pulse}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <DiagnosticCard label="Высокий риск" value={`${insight.diagnostics.highRiskCount}`} />
              <DiagnosticCard label="Умеренный риск" value={`${insight.diagnostics.mediumRiskCount}`} />
              <DiagnosticCard label="Средняя посещаемость" value={`${insight.diagnostics.averageAttendance.toFixed(1)}%`} />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[30px] border border-emerald-400/12 bg-emerald-500/[0.05] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-emerald-200/80">Сильные предметы</div>
              <div className="mt-4 space-y-3">
                {insight.strongestSubjects.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-rose-400/12 bg-rose-500/[0.05] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-rose-200/80">Предметы внимания</div>
              <div className="mt-4 space-y-3">
                {insight.weakestSubjects.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-amber-400/12 bg-amber-500/[0.05] p-5">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-amber-100/80">Распределение рисков</div>
              <div className="mt-4 space-y-3">
                {insight.riskDistribution.map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-blue-400/12 bg-blue-500/[0.05] p-5">
            <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-blue-100/80">Рекомендуемые действия</div>
            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              {insight.recommendations.map((item) => (
                <div key={item} className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </Surface>
  );
}
