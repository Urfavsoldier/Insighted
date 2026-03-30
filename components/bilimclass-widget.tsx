"use client";

import { useEffect, useState, useTransition } from "react";
import { DownloadCloud, RefreshCcw } from "lucide-react";
import { BilimClassImport } from "@/lib/types";
import { Badge, SectionHeading, Surface } from "@/components/ui";

export function BilimClassWidget({ initialData }: { initialData: BilimClassImport }) {
  const [data, setData] = useState(initialData);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const refresh = () => {
    startTransition(async () => {
      const response = await fetch("/api/bilimclass", { method: "GET", cache: "no-store" });
      const next = (await response.json()) as BilimClassImport;
      setData(next);
    });
  };

  return (
    <Surface className="h-full bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-blue-500/[0.06]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <SectionHeading
          eyebrow="Интеграция с BilimClass"
          title="Импорт оценок и обновлений"
          description="Портал подтягивает данные из внешней системы и сразу делает их полезными для школы."
        />
        <Badge tone="green">{data.status === "connected" ? "Подключено" : "Синхронизация"}</Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-[0.78fr_1.22fr]">
        <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5">
          <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-slate-500">Импортировано предметов</div>
          <div className="mt-3 text-4xl font-semibold text-white">{data.importedSubjects}</div>
          <div className="mt-2 text-sm text-slate-400">Последняя синхронизация: {data.lastSync}</div>
          <div className="mt-5 rounded-[20px] border border-emerald-400/12 bg-emerald-500/[0.05] p-3">
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-emerald-200/80">Состояние</div>
            <div className="mt-2 text-sm text-slate-200">Данные актуальны и готовы к повторной загрузке.</div>
          </div>
        </div>
        <button
          type="button"
          onClick={refresh}
          className="group rounded-[26px] border border-blue-400/18 bg-gradient-to-br from-blue-500/14 to-violet-500/10 p-5 text-left transition hover:border-blue-400/30 hover:bg-blue-500/10"
        >
          <div className="flex items-center gap-2 text-blue-100">
            {isPending ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <DownloadCloud className="h-4 w-4" />}
            <span className="font-mono-ui text-[11px] uppercase tracking-[0.28em]">Загрузка из BilimClass</span>
          </div>
          <div className="mt-3 text-xl font-medium text-white">{isPending ? "Загрузка..." : "Обновить данные"}</div>
          <div className="mt-2 max-w-[34ch] text-sm text-slate-300">Имитация реальной синхронизации с задержкой и новыми оценками.</div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/8 bg-black/10 p-3">
              <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-slate-500">Источник</div>
              <div className="mt-2 text-sm text-white">BilimClass</div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-black/10 p-3">
              <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-slate-500">Режим</div>
              <div className="mt-2 text-sm text-white">Демо-режим</div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-black/10 p-3">
              <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-slate-500">Надежность</div>
              <div className="mt-2 text-sm text-white">Надежно</div>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {data.recentUpdates.map((item) => (
          <div key={`${item.subject}-${item.time}`} className="flex items-center justify-between rounded-[24px] border border-white/8 bg-white/[0.025] px-4 py-4">
            <div>
              <div className="text-sm font-medium text-white">{item.subject}</div>
              <div className="text-sm text-slate-400">Оценка добавлена из внешней системы</div>
            </div>
            <div className="text-right">
              <div className="font-mono-ui text-lg text-white">{item.value}</div>
              <div className="font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-500">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Surface>
  );
}
