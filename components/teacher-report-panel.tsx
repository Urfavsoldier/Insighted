"use client";

import { useMemo, useState, useTransition } from "react";
import { FileText, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui";
import { TeacherAIInsight } from "@/lib/types";

export function TeacherReportPanel({ insight }: { insight: TeacherAIInsight }) {
  const [isPending, startTransition] = useTransition();
  const [visible, setVisible] = useState(false);

  const report = useMemo(() => {
    const topRisk = insight.riskStudents[0];

    return {
      title: "Краткий отчет по классу",
      summary: insight.summary,
      focus: topRisk
        ? `${topRisk.name}: риск ${topRisk.riskScore}%, посещаемость ${topRisk.attendance.toFixed(1)}%, тренд ${topRisk.trend >= 0 ? "+" : ""}${topRisk.trend}.`
        : "Критических сигналов не зафиксировано.",
      action: insight.recommendations[0],
    };
  }, [insight]);

  const generate = () => {
    startTransition(() => {
      setVisible(true);
    });
  };

  return (
    <div className="mt-5 space-y-4">
      <button
        type="button"
        onClick={generate}
        className="inline-flex items-center gap-2 rounded-[24px] border border-blue-400/16 bg-blue-500/10 px-5 py-4 text-sm text-white transition hover:border-blue-400/28 hover:bg-blue-500/16"
      >
        {isPending ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        Сгенерировать отчет по классу
      </button>

      {visible ? (
        <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.24em] text-slate-500">{report.title}</div>
              <div className="mt-2 text-lg font-medium text-white">Раннее предупреждение по 10A</div>
            </div>
            <Badge tone="blue">Обновлено только что</Badge>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <div className="rounded-[20px] border border-white/8 bg-black/10 p-4">
              <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">Сводка</div>
              <p className="mt-3 text-sm leading-6 text-slate-200">{report.summary}</p>
            </div>
            <div className="rounded-[20px] border border-rose-400/12 bg-rose-500/[0.05] p-4">
              <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-rose-200/80">Главный риск</div>
              <p className="mt-3 text-sm leading-6 text-slate-200">{report.focus}</p>
            </div>
            <div className="rounded-[20px] border border-violet-400/12 bg-violet-500/[0.05] p-4">
              <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-violet-200/80">Следующее действие</div>
              <p className="mt-3 text-sm leading-6 text-slate-200">{report.action}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
