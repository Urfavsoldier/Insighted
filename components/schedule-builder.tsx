"use client";

import { Fragment } from "react";
import { useMemo, useState, useTransition } from "react";
import { AlertTriangle, CalendarClock, RefreshCcw, Sparkles, UserX } from "lucide-react";
import { Badge, SectionHeading, Surface } from "@/components/ui";
import { classroomAvailability, scheduleDays, scheduleEvents, scheduleRequirements, teacherAvailability, timeSlots } from "@/lib/schedule-data";
import { generateSchedule } from "@/lib/schedule";
import { ScheduledLesson } from "@/lib/types";
import { cn } from "@/lib/utils";

function groupLessons(lessons: ScheduledLesson[]) {
  const map = new Map<string, ScheduledLesson[]>();
  for (const lesson of lessons) {
    const key = `${lesson.classId}-${lesson.day}-${lesson.slotId}`;
    const current = map.get(key) ?? [];
    current.push(lesson);
    map.set(key, current);
  }
  return map;
}

export function ScheduleBuilder() {
  const [absentTeacherIds, setAbsentTeacherIds] = useState<string[]>([]);
  const [result, setResult] = useState(() =>
    generateSchedule({
      teacherAvailability,
      classroomAvailability,
      requirements: scheduleRequirements,
      events: scheduleEvents,
    }),
  );
  const [isPending, startTransition] = useTransition();

  const lessonMap = useMemo(() => groupLessons(result.lessons), [result.lessons]);
  const teachers = teacherAvailability.map((item) => ({ id: item.teacherId, name: item.teacherName }));

  const regenerate = () => {
    startTransition(() => {
      setResult((previous) =>
        generateSchedule({
          teacherAvailability,
          classroomAvailability,
          requirements: scheduleRequirements,
          events: scheduleEvents,
          absentTeacherIds,
          previousLessons: previous.lessons,
        }),
      );
    });
  };

  const toggleTeacher = (teacherId: string) => {
    setAbsentTeacherIds((current) => (current.includes(teacherId) ? current.filter((id) => id !== teacherId) : [...current, teacherId]));
  };

  return (
    <div className="space-y-5">
      <Surface className="bg-gradient-to-br from-white/[0.03] via-black/16 to-violet-500/[0.08] p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-2 text-violet-100">
              <CalendarClock className="h-5 w-5" />
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.28em]">Умное расписание</span>
            </div>
            <SectionHeading
              eyebrow="Панель администратора"
              title="Автогенерация расписания с учетом ограничений"
              description="Система учитывает учителей, кабинеты, пары, ленты, академические часы и события, а затем собирает расписание без пересечений."
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="violet">{result.generatedAt}</Badge>
            <button
              type="button"
              onClick={regenerate}
              className="inline-flex items-center gap-2 rounded-2xl border border-violet-400/20 bg-violet-500/10 px-5 py-3 text-sm text-white transition hover:border-violet-400/30 hover:bg-violet-500/14"
            >
              <RefreshCcw className={isPending ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
              Сгенерировать расписание
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
          <div className="rounded-[24px] border border-white/8 bg-black/12 p-4">
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">Слотов занято</div>
            <div className="mt-3 text-3xl font-semibold text-white">{result.lessons.length}</div>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-black/12 p-4">
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">Конфликты</div>
            <div className="mt-3 text-3xl font-semibold text-white">{result.conflicts.length}</div>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-black/12 p-4">
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">Изменения</div>
            <div className="mt-3 text-3xl font-semibold text-white">{result.changeLog.length}</div>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-black/12 p-4">
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">Отсутствуют</div>
            <div className="mt-3 text-3xl font-semibold text-white">{absentTeacherIds.length}</div>
          </div>
        </div>
      </Surface>

      <div className="grid gap-5 xl:grid-cols-[0.84fr_1.16fr]">
        <Surface className="p-7">
          <SectionHeading
            eyebrow="Ограничения"
            title="Ограничения генерации"
            description="Отметьте отсутствующих преподавателей и пересоберите расписание. Затронутые уроки обновятся автоматически."
          />

          <div className="space-y-3">
            {teachers.map((teacher) => {
              const selected = absentTeacherIds.includes(teacher.id);
              return (
                <button
                  key={teacher.id}
                  type="button"
                  onClick={() => toggleTeacher(teacher.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[22px] border px-4 py-4 text-left transition",
                    selected ? "border-rose-400/20 bg-rose-500/[0.08]" : "border-white/8 bg-white/[0.03]",
                  )}
                >
                  <div>
                    <div className="font-medium text-white">{teacher.name}</div>
                    <div className="mt-1 max-w-[28ch] text-sm text-slate-400">Доступность и уроки пересчитаются автоматически</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <UserX className="h-4 w-4" />
                    {selected ? "Отсутствует" : "Доступен"}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-[24px] border border-violet-400/14 bg-violet-500/[0.06] p-4">
            <div className="mb-3 flex items-center gap-2 text-violet-100">
              <Sparkles className="h-4 w-4" />
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">Что учитывает система</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {["Доступность учителей", "Кабинеты", "Ленты", "Пары", "События", "Несколько классов"].map((item) => (
                <div key={item} className="rounded-[18px] border border-white/8 bg-black/10 px-3 py-3 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Surface>

        <Surface className="bg-gradient-to-br from-white/[0.03] via-black/10 to-violet-500/[0.05] p-7">
          <SectionHeading
            eyebrow="Уведомления"
            title="Изменения и уведомления"
            description="После пересборки система показывает журнал изменений и список получателей."
          />
          <div className="space-y-3">
            {result.notifications.map((item) => (
              <div key={item} className="rounded-[22px] border border-blue-400/12 bg-blue-500/[0.05] px-4 py-4 text-sm leading-6 text-slate-200">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            {result.changeLog.slice(0, 6).map((item) => (
              <div key={item.id} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-white">{item.audience}</div>
                  <Badge tone={item.scope === "admin" ? "violet" : item.scope === "teacher" ? "blue" : "green"}>{item.scope}</Badge>
                </div>
                <p className="mt-2 max-w-[52ch] text-sm leading-6 text-slate-400">{item.message}</p>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <Surface className="bg-gradient-to-br from-white/[0.03] via-black/12 to-white/[0.015] p-7">
        <SectionHeading
          eyebrow="Сетка расписания"
          title="Визуализация расписания"
          description="Сетка показывает дни, академические часы, пары, ленты и обновленные блоки."
        />
        <div className="mb-5 grid gap-3 md:grid-cols-5">
          <div className="rounded-[18px] border border-blue-400/12 bg-blue-500/[0.05] px-4 py-3 text-sm text-slate-200">Урок: один слот и один предмет</div>
          <div className="rounded-[18px] border border-violet-400/12 bg-violet-500/[0.05] px-4 py-3 text-sm text-slate-200">Пара: два соседних слота подряд</div>
          <div className="rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">Академический час: базовая единица сетки</div>
          <div className="rounded-[18px] border border-amber-400/12 bg-amber-500/[0.05] px-4 py-3 text-sm text-slate-200">Мероприятие: блокирует часть сетки</div>
          <div className="rounded-[18px] border border-emerald-400/12 bg-emerald-500/[0.05] px-4 py-3 text-sm text-slate-200">Лента: деление на группы внутри класса</div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[1080px]">
            <div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-3">
              <div />
              {scheduleDays.map((day) => (
                <div key={day} className="rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3 text-center font-mono-ui text-xs uppercase tracking-[0.22em] text-slate-400">
                  {day}
                </div>
              ))}
              {timeSlots.map((slot) => (
                <Fragment key={slot.id}>
                    <div key={`${slot.id}-time`} className="rounded-[18px] border border-white/8 bg-white/[0.025] px-4 py-4">
                    <div className="font-mono-ui text-xs uppercase tracking-[0.22em] text-slate-500">{slot.label}</div>
                    <div className="mt-2 text-sm text-slate-300">
                      {slot.start} - {slot.end}
                    </div>
                  </div>
                  {scheduleDays.map((day) => {
                    const lessons = ["10A", "10B"].flatMap((classId) => lessonMap.get(`${classId}-${day}-${slot.id}`) ?? []);
                    return (
                      <div key={`${day}-${slot.id}`} className="min-h-[122px] rounded-[24px] border border-white/8 bg-white/[0.02] p-3">
                        {lessons.length === 0 ? <div className="text-sm text-slate-600">Свободно</div> : null}
                        <div className="space-y-2">
                          {lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className={cn(
                                "rounded-[18px] border p-3 text-sm",
                                lesson.status === "updated"
                                  ? "border-violet-400/22 bg-violet-500/[0.10] shadow-[0_12px_30px_rgba(135,90,245,0.12)]"
                                  : "border-blue-400/12 bg-blue-500/[0.04]",
                              )}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="font-medium text-white">{lesson.subject}</div>
                                <Badge tone={lesson.status === "updated" ? "violet" : "blue"}>{lesson.className}</Badge>
                              </div>
                              <div className="mt-2 text-xs leading-5 text-slate-300">
                                {lesson.teacherName} · {lesson.roomName}
                              </div>
                              {lesson.splitGroup ? (
                                <div className="mt-2 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                  Лента {lesson.parallelGroup}
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {result.conflicts.length > 0 ? (
          <div className="mt-5 rounded-[24px] border border-rose-400/16 bg-rose-500/[0.05] p-4">
            <div className="mb-3 flex items-center gap-2 text-rose-100">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-mono-ui text-[11px] uppercase tracking-[0.24em]">Обнаружены конфликты</span>
            </div>
            <div className="space-y-2">
              {result.conflicts.map((conflict) => (
                <div key={conflict.id} className="text-sm text-slate-200">
                  {conflict.message}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-[24px] border border-emerald-400/14 bg-emerald-500/[0.05] p-4 text-sm text-slate-200">
            Конфликтов нет. Расписание готово к демонстрации и публикации.
          </div>
        )}
      </Surface>
    </div>
  );
}
