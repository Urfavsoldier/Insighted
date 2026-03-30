"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui";
import { generateAiInsight } from "@/lib/ai";
import { leaderboard, primaryStudent, schoolEvents } from "@/lib/mock-data";
import { classroomAvailability, scheduleEvents, scheduleRequirements, teacherAvailability } from "@/lib/schedule-data";
import { generateSchedule } from "@/lib/schedule";
import { cn } from "@/lib/utils";

const scheduleResult = generateSchedule({
  teacherAvailability,
  classroomAvailability,
  requirements: scheduleRequirements,
  events: scheduleEvents,
});

const adminInsight = generateAiInsight("admin", primaryStudent);

const slides = [
  {
    key: "leaders",
    kicker: "Топ ученики дня",
    title: "Лидеры дня задают темп школе",
    items: leaderboard.slice(0, 3).map((student, index) => ({
      title: `${index + 1}. ${student.name}`,
      meta: `Средний балл ${student.averageScore.toFixed(2)} · Посещаемость ${student.attendance.toFixed(1)}%`,
    })),
  },
  {
    key: "achievements",
    kicker: "Достижения",
    title: "Победы и сильные результаты",
    items: primaryStudent.achievements.map((achievement) => ({
      title: achievement.title,
      meta: `${achievement.level} · ${achievement.date}`,
    })),
  },
  {
    key: "events",
    kicker: "События",
    title: "Главные события ближайших дней",
    items: schoolEvents.map((event) => ({
      title: event.title,
      meta: `${event.date} · ${event.time} · ${event.location}`,
    })),
  },
  {
    key: "schedule",
    kicker: "Изменения расписания",
    title: "Учебный день перестраивается без потерь",
    items: scheduleResult.changeLog.slice(0, 3).map((change) => ({
      title: change.audience,
      meta: change.message,
    })),
  },
  {
    key: "pulse",
    kicker: "AI-пульс школы",
    title: "AI видит школьную картину целиком",
    items:
      adminInsight.role === "admin"
        ? [
            { title: adminInsight.pulse, meta: adminInsight.riskDistribution[0] },
            { title: adminInsight.strongestSubjects[0], meta: adminInsight.strongestSubjects[1] },
            { title: adminInsight.weakestSubjects[0], meta: adminInsight.recommendations[0] },
          ]
        : [],
  },
];

export function KioskRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  return (
    <div className="grid min-h-[calc(100vh-260px)] gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="theme-kiosk-surface surface-glow relative overflow-hidden rounded-[42px] border border-white/10 bg-gradient-to-br from-black/30 via-[#080a0d] to-violet-500/12 p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(135,90,245,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(77,131,255,0.08),transparent_28%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-4">
            <Badge tone="violet">Экран InsightED</Badge>
            <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-2xl text-white">Aqbobek Lyceum</div>
          </div>

          <div className="my-10">
            <div className="text-3xl text-violet-100/90 md:text-4xl">{activeSlide.kicker}</div>
            <h2 className="mt-6 max-w-5xl text-6xl font-semibold leading-[0.98] tracking-tight text-white md:text-8xl">
              {activeSlide.title}
            </h2>
          </div>

          <div className="grid gap-4">
            {activeSlide.items.map((item) => (
              <div key={`${activeSlide.key}-${item.title}`} className="rounded-[32px] border border-white/10 bg-black/30 px-6 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                <div className="max-w-[22ch] text-2xl leading-tight text-white md:text-4xl">{item.title}</div>
                <div className="mt-3 max-w-[34ch] text-xl leading-relaxed text-slate-200 md:text-2xl">{item.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="surface-glow rounded-[36px] border border-violet-400/16 bg-gradient-to-br from-violet-500/[0.08] to-black/20 p-6">
          <div className="text-2xl text-violet-100 md:text-3xl">AI-пульс школы</div>
          {adminInsight.role === "admin" ? (
            <>
              <div className="mt-5 max-w-[16ch] text-3xl leading-tight text-white md:text-4xl">{adminInsight.pulse}</div>
              <div className="mt-6 grid gap-3">
                {adminInsight.riskDistribution.map((item) => (
                <div key={item} className="rounded-[24px] border border-white/10 bg-black/22 px-5 py-5 text-2xl text-slate-100">
                    {item}
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="surface-glow rounded-[36px] border border-white/10 bg-white/[0.03] p-6">
          <div className="text-2xl text-white md:text-3xl">Изменения расписания</div>
          <div className="mt-5 grid gap-3">
            {scheduleResult.changeLog.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-[24px] border border-white/10 bg-black/18 px-5 py-5">
                <div className="text-2xl text-white">{item.audience}</div>
                <div className="mt-2 max-w-[26ch] text-xl leading-relaxed text-slate-200">{item.message}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {slides.map((slide, index) => (
            <div
              key={slide.key}
              className={cn(
                "h-3 rounded-full transition-all duration-500",
                index === activeIndex ? "bg-violet-400" : "bg-white/15",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
