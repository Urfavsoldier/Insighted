import { Award, BellRing, BookOpenCheck, ChartNoAxesCombined, Star, Target, UserCircle2 } from "lucide-react";
import { AiPanel } from "@/components/ai-panel";
import { AIIntelligenceModule } from "@/components/ai-intelligence-module";
import { BilimClassWidget } from "@/components/bilimclass-widget";
import { PerformanceChart, RatingChart } from "@/components/charts";
import { Badge, SectionHeading, StatCard, Surface } from "@/components/ui";
import { generateAiInsight } from "@/lib/ai";
import { createPlatformSnapshot } from "@/lib/domain/selectors";
import { allStudents, bilimClassImport, leaderboard, primaryStudent, schoolEvents, roleLabels } from "@/lib/mock-data";
import { AdminAIInsight, ParentAIInsight, Role, StudentAIInsight, TeacherAIInsight } from "@/lib/types";
import { formatTrend } from "@/lib/utils";

function StudentDashboard() {
  const insight = generateAiInsight("student", primaryStudent) as StudentAIInsight;
  const snapshot = createPlatformSnapshot();
  const rank = `${insight.diagnostics.rankingPosition}/${insight.diagnostics.rankingTotal}`;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Surface className="overflow-hidden bg-gradient-to-br from-white/[0.035] via-black/24 to-white/[0.02] p-7 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="max-w-2xl">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.3em] text-blue-100/80">Режим ученика</div>
              <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-[3.35rem] md:leading-[0.95]">
                Твой прогресс виден сразу: оценки, достижения, цели и понятный план на неделю.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Сразу видно, что уже получается, где нужен фокус и какой шаг даст быстрый результат.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge tone="green">Бейджи и достижения</Badge>
                <Badge tone="violet">Рейтинг в классе</Badge>
                <Badge tone="blue">AI-инсайты</Badge>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[30px] border border-white/8 bg-black/24 p-5">
                <div className="font-mono-ui text-[11px] uppercase tracking-[0.3em] text-slate-500">Позиция в классе</div>
                <div className="mt-3 text-4xl font-semibold text-white">{rank}</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">Ты рядом с лидерами и можешь укрепить позицию уже на этой неделе.</p>
              </div>
              <div className="rounded-[30px] border border-violet-400/12 bg-gradient-to-br from-violet-500/[0.12] via-black/20 to-blue-500/[0.06] p-5">
                <div className="font-mono-ui text-[11px] uppercase tracking-[0.3em] text-violet-100/80">Последний анализ</div>
                <div className="mt-3 text-2xl font-semibold text-white">2 минуты назад</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">Фокус недели: закрыть один риск и сохранить сильный темп.</p>
              </div>
            </div>
          </div>
        </Surface>
        <AIIntelligenceModule role="student" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr]">
        <StatCard label="Текущий средний балл" value={primaryStudent.averageScore.toFixed(2)} delta="+0,34" accent="blue" />
        <StatCard label="Посещаемость" value={`${primaryStudent.attendance.toFixed(1)}%`} delta="+1,2%" accent="green" />
        <StatCard label="Достижения" value={`${primaryStudent.achievements.length}`} delta="+3" accent="violet" />
        <StatCard label="Позиция в рейтинге" value={rank} delta="+1" accent="blue" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Surface className="overflow-hidden bg-gradient-to-br from-white/[0.04] via-black/20 to-violet-500/[0.04] p-7 md:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <SectionHeading
              eyebrow="Учебный фокус недели"
              title="Что важно закрепить прямо сейчас"
              description="Главный вывод, ближайший риск и короткий маршрут на неделю."
            />
            <Badge tone="violet">2 мин назад</Badge>
          </div>
          <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[30px] border border-white/8 bg-black/22 p-6">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.28em] text-violet-100/80">Краткий итог</div>
              <p className="mt-4 max-w-[48ch] text-base leading-7 text-slate-100 md:text-lg">{insight.summary}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4">
                  <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">Почему это важно</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">Одна слабая тема уже влияет на рейтинг, темп и уверенность.</p>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4">
                  <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-slate-500">Ключевой риск</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{insight.risks[0]}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-[30px] border border-violet-400/14 bg-gradient-to-br from-violet-500/[0.12] to-black/18 p-5">
                <div className="font-mono-ui text-[11px] uppercase tracking-[0.26em] text-violet-100/80">Прогноз сформирован на основе текущих данных</div>
                <p className="mt-4 max-w-[44ch] text-sm leading-6 text-slate-100">{insight.prediction}</p>
              </div>
              <div className="rounded-[30px] border border-white/8 bg-white/[0.035] p-5">
                <div className="font-mono-ui text-[11px] uppercase tracking-[0.26em] text-slate-500">Рекомендованный план</div>
                <p className="mt-4 max-w-[42ch] text-sm leading-6 text-slate-200">{insight.recommendations[0]}</p>
                <div className="mt-4 rounded-[20px] border border-blue-400/12 bg-blue-500/[0.05] p-4">
                  <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-blue-100/80">Следующее действие</div>
                  <div className="mt-2 text-sm text-slate-200">{insight.weeklyPlan[0]}</div>
                </div>
              </div>
            </div>
          </div>
        </Surface>
        <Surface className="p-7">
          <SectionHeading eyebrow="График успеваемости" title="Как меняется динамика" description="График быстро показывает, где началось замедление, а где рост уже стабилен." />
          <PerformanceChart data={primaryStudent.attendanceWeekly} />
        </Surface>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <Surface>
          <SectionHeading eyebrow="Цели и достижения" title="Что поддерживает темп" description="Когда цели и победы видны, удерживать фокус намного проще." />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              {primaryStudent.goals.map((goal) => (
                <div key={goal} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">{goal}</div>
              ))}
            </div>
            <div className="space-y-3">
              {primaryStudent.achievements.map((achievement) => (
                <div key={achievement.id} className="rounded-[24px] border border-violet-400/12 bg-violet-500/[0.05] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-white">{achievement.title}</div>
                    <Badge tone="violet">{achievement.level}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Surface>
        <div className="space-y-5">
          <BilimClassWidget initialData={bilimClassImport} />
          <Surface>
            <SectionHeading eyebrow="Структура данных" title="Единая модель платформы" description="Главная собирается из связанных сущностей: ученик, AI, расписание, события и уведомления." />
            <div className="grid gap-3">
              <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-300">Пользователи: {snapshot.students.length + snapshot.teachers.length + snapshot.parents.length + snapshot.admins.length}</div>
              <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-300">Уведомления: {snapshot.notifications.length}</div>
              <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-300">События: {snapshot.events.length}</div>
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard() {
  const insight = generateAiInsight("teacher", primaryStudent) as TeacherAIInsight;
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Surface className="bg-gradient-to-br from-white/[0.03] via-black/10 to-violet-500/[0.06] p-7">
          <SectionHeading eyebrow="Режим учителя" title="Класс под контролем: риски, тренды, действия" description="Сразу видно, кому нужна помощь, почему возник риск и что делать дальше." />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <StatCard label="Ученики в риске" value={`${insight.diagnostics.riskStudents}`} delta="+1" accent="red" />
            <StatCard label="Тренд класса" value={`${insight.diagnostics.classAverageTrend >= 0 ? "+" : ""}${insight.diagnostics.classAverageTrend}`} delta="стабильно" accent="blue" />
            <StatCard label="Точность AI" value={`${insight.diagnostics.confidence}%`} delta="+2%" accent="violet" />
          </div>
          <button type="button" className="mt-5 rounded-[24px] border border-blue-400/16 bg-blue-500/10 px-5 py-4 text-sm text-white transition hover:border-blue-400/28 hover:bg-blue-500/16">
            Сгенерировать отчет по классу
          </button>
        </Surface>
        <Surface className="bg-gradient-to-br from-black/10 to-rose-500/[0.06]">
          <SectionHeading eyebrow="Зона риска" title="Кого AI советует не упускать из внимания" />
          <div className="space-y-3">
            {insight.riskStudents.map((student) => (
              <div key={student.studentId} className="rounded-[24px] border border-white/8 bg-black/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-white">{student.name}</div>
                  <Badge tone={student.riskLevel === "high" ? "red" : "violet"}>{student.riskLevel === "high" ? "Высокий риск" : "Нужен контроль"}</Badge>
                </div>
                <p className="mt-2 max-w-[44ch] text-sm leading-6 text-slate-300">{student.explanation}</p>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Surface>
          <SectionHeading eyebrow="Список учеников" title="Класс в одном экране" description="Чистая таблица с быстрым доступом к ключевым сигналам." />
          <div className="overflow-hidden rounded-[24px] border border-white/8">
            <div className="grid grid-cols-[1.1fr_0.6fr_0.6fr_0.7fr] bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-500">
              <div>Ученик</div><div>Средний балл</div><div>Тренд</div><div>Риск</div>
            </div>
            {allStudents.map((student) => (
              <div key={student.id} className="grid grid-cols-[1.1fr_0.6fr_0.6fr_0.7fr] items-center border-t border-white/8 px-4 py-4 text-sm transition hover:bg-white/[0.03]">
                <div className="font-medium text-white">{student.name}</div>
                <div className="font-mono-ui text-white">{student.averageScore.toFixed(2)}</div>
                <div className={student.performanceTrend >= 0 ? "font-mono-ui text-emerald-300" : "font-mono-ui text-rose-300"}>{formatTrend(student.performanceTrend)}</div>
                <div><Badge tone={student.riskLevel === "high" ? "red" : student.riskLevel === "medium" ? "violet" : "green"}>{student.riskLevel === "high" ? "Высокий" : student.riskLevel === "medium" ? "Средний" : "Низкий"}</Badge></div>
              </div>
            ))}
          </div>
        </Surface>
        <Surface className="bg-gradient-to-br from-violet-500/[0.08] to-black/18">
          <SectionHeading eyebrow="AI-анализ по ученикам" title="Почему именно эти сигналы важны" />
          <div className="space-y-3">
            {insight.trendSummary.concat(insight.recommendations).slice(0, 5).map((item) => (
              <div key={item} className="rounded-[24px] border border-white/8 bg-black/10 p-4 text-sm leading-6 text-slate-200">{item}</div>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}

function ParentDashboard() {
  const insight = generateAiInsight("parent", primaryStudent) as ParentAIInsight;
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <Surface className="bg-gradient-to-br from-white/[0.03] via-black/10 to-blue-500/[0.05] p-7">
          <SectionHeading eyebrow="Режим родителя" title="Прогресс ребенка — спокойно и по делу" description="Все собрано так, чтобы сразу понять общую картину и точки поддержки." />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <StatCard label="Средний балл ребенка" value={primaryStudent.averageScore.toFixed(2)} delta="+0,34" accent="blue" />
            <StatCard label="Посещаемость" value={`${primaryStudent.attendance.toFixed(1)}%`} delta="+1,2%" accent="green" />
            <StatCard label="Достижения" value={`${primaryStudent.achievements.length}`} delta="+1" accent="violet" />
          </div>
        </Surface>
        <Surface className="bg-gradient-to-br from-violet-500/[0.08] to-black/18">
          <SectionHeading eyebrow="AI-выжимка" title="Самое важное простым языком" />
          <div className="rounded-[24px] border border-white/8 bg-black/12 p-5"><p className="text-base leading-7 text-slate-100">{insight.summary}</p></div>
          <div className="mt-4 rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-sm leading-7 text-slate-300">{insight.recommendations[0]}</div>
        </Surface>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr_1fr]">
        <Surface><SectionHeading eyebrow="Сильные стороны" title="Что уже получается хорошо" /><div className="space-y-3">{insight.strengths.map((item) => <div key={item} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">{item}</div>)}</div></Surface>
        <Surface><SectionHeading eyebrow="Рекомендуем обратить внимание" title="Где нужна мягкая поддержка" /><div className="space-y-3">{insight.attentionPoints.map((item) => <div key={item} className="rounded-[22px] border border-amber-400/12 bg-amber-500/[0.05] p-4 text-sm leading-6 text-slate-300">{item}</div>)}</div></Surface>
        <Surface><SectionHeading eyebrow="Достижения" title="Что стоит отметить" /><div className="space-y-3">{primaryStudent.achievements.map((achievement) => <div key={achievement.id} className="rounded-[22px] border border-violet-400/12 bg-violet-500/[0.05] p-4"><div className="font-medium text-white">{achievement.title}</div><div className="mt-2 text-sm text-slate-400">{achievement.description}</div></div>)}</div></Surface>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const insight = generateAiInsight("admin", primaryStudent) as AdminAIInsight;
  const snapshot = createPlatformSnapshot();
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <Surface className="bg-gradient-to-br from-white/[0.03] via-black/10 to-blue-500/[0.05] p-7">
          <SectionHeading eyebrow="Режим администрации" title="Школа в одном обзоре: аналитика и управление" description="Здесь собраны статистика, AI-пульс, события и управление расписанием." />
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <StatCard label="Высокий риск" value={`${insight.diagnostics.highRiskCount}`} delta="стабильно" accent="red" />
            <StatCard label="Умеренный риск" value={`${insight.diagnostics.mediumRiskCount}`} delta="+1" accent="violet" />
            <StatCard label="Средняя посещаемость" value={`${insight.diagnostics.averageAttendance.toFixed(1)}%`} delta="+0,6%" accent="green" />
            <StatCard label="События недели" value={`${schoolEvents.length}`} delta="+2" accent="blue" />
          </div>
        </Surface>
        <Surface className="bg-gradient-to-br from-violet-500/[0.08] to-black/18">
          <SectionHeading eyebrow="Пульс школы" title="Главный AI-вывод по школе" />
          <div className="rounded-[24px] border border-white/8 bg-black/12 p-5"><p className="text-base leading-7 text-slate-100">{insight.pulse}</p></div>
        </Surface>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Surface><SectionHeading eyebrow="Аналитика по классам" title="Сильные и слабые зоны" /><div className="grid gap-3 md:grid-cols-2">{insight.strongestSubjects.concat(insight.weakestSubjects).map((item) => <div key={item} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">{item}</div>)}</div></Surface>
        <Surface><SectionHeading eyebrow="Управление" title="Что можно сделать сейчас" /><div className="grid gap-3"><div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-300">Создать событие и выбрать классы показа</div><div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-300">Открыть умное расписание и обновить сетку</div><div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-300">Опубликовать новость для школы</div><div className="rounded-[24px] border border-blue-400/12 bg-blue-500/[0.05] p-4 text-sm text-slate-200">Связано: {snapshot.classes.length} класс · {snapshot.schedule.lessons.length} уроков · {snapshot.notifications.length} уведомления</div></div></Surface>
      </div>
    </div>
  );
}

export function DashboardContent({ role }: { role: Role }) {
  if (role === "teacher") return <TeacherDashboard />;
  if (role === "parent") return <ParentDashboard />;
  if (role === "admin") return <AdminDashboard />;
  return <StudentDashboard />;
}

export function StudentProfileContent() {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
        <Surface className="bg-gradient-to-br from-blue-500/12 via-white/[0.03] to-violet-500/10">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/[0.08] text-2xl font-semibold text-white">{primaryStudent.avatar}</div>
            <div><div className="text-2xl font-semibold text-white">{primaryStudent.name}</div><div className="mt-1 font-mono-ui text-xs uppercase tracking-[0.26em] text-slate-400">{primaryStudent.className} · куратор {primaryStudent.curator}</div><p className="mt-4 text-sm leading-6 text-slate-300">{primaryStudent.bio}</p></div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">{primaryStudent.interests.map((interest) => <Badge key={interest} tone="blue">{interest}</Badge>)}</div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4"><div className="font-mono-ui text-[11px] uppercase tracking-[0.24em] text-slate-500">Средний балл</div><div className="mt-3 text-3xl font-semibold text-white">{primaryStudent.averageScore.toFixed(2)}</div></div>
            <div className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4"><div className="font-mono-ui text-[11px] uppercase tracking-[0.24em] text-slate-500">Посещаемость</div><div className="mt-3 text-3xl font-semibold text-white">{primaryStudent.attendance.toFixed(1)}%</div></div>
            <div className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4"><div className="font-mono-ui text-[11px] uppercase tracking-[0.24em] text-slate-500">Тренд</div><div className="mt-3 text-3xl font-semibold text-white">{formatTrend(primaryStudent.performanceTrend)}</div></div>
          </div>
        </Surface>
        <Surface>
          <SectionHeading eyebrow="Предметы и оценки" title="Академический профиль" description="Оценки, динамика и преподаватели собраны в одном блоке." />
          <div className="overflow-hidden rounded-[24px] border border-white/8">
            <div className="grid grid-cols-[1.3fr_0.6fr_0.7fr_1fr] bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-500"><div>Предмет</div><div>Средний</div><div>Тренд</div><div>Последние оценки</div></div>
            {primaryStudent.grades.map((grade) => <div key={grade.subject} className="grid grid-cols-[1.3fr_0.6fr_0.7fr_1fr] items-center border-t border-white/8 px-4 py-4 text-sm"><div><div className="font-medium text-white">{grade.subject}</div><div className="text-slate-500">{grade.teacher}</div></div><div className="font-mono-ui text-white">{grade.average.toFixed(1)}</div><div className={grade.trend >= 0 ? "font-mono-ui text-emerald-300" : "font-mono-ui text-rose-300"}>{formatTrend(grade.trend)}</div><div className="flex gap-2">{grade.latest.map((value, index) => <span key={`${grade.subject}-${index}`} className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] font-mono-ui text-xs text-white">{value}</span>)}</div></div>)}
          </div>
        </Surface>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr_1fr]">
        <Surface><SectionHeading eyebrow="Достижения" title="Личное портфолио" /><div className="space-y-3">{primaryStudent.achievements.map((achievement) => <div key={achievement.id} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4"><div className="flex items-center justify-between gap-3"><div className="font-medium text-white">{achievement.title}</div><Badge tone="violet">{achievement.level}</Badge></div><p className="mt-2 text-sm leading-6 text-slate-400">{achievement.description}</p><div className="mt-3 font-mono-ui text-xs uppercase tracking-[0.24em] text-slate-500">{achievement.category} · {achievement.date}</div></div>)}</div></Surface>
        <Surface><SectionHeading eyebrow="Цели и рост" title="Цели и зоны роста" /><div className="space-y-4"><div><div className="mb-3 flex items-center gap-2 text-sm font-medium text-white"><Target className="h-4 w-4 text-blue-200" />Цели на ближайший цикл</div><div className="space-y-3">{primaryStudent.goals.map((goal) => <div key={goal} className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">{goal}</div>)}</div></div><div className="grid gap-3 md:grid-cols-2"><div className="rounded-[22px] border border-emerald-400/12 bg-emerald-500/[0.05] p-4"><div className="mb-3 flex items-center gap-2 text-sm font-medium text-white"><Star className="h-4 w-4 text-emerald-300" />Сильные стороны</div><div className="space-y-2">{primaryStudent.strengths.map((item) => <div key={item} className="text-sm text-slate-300">{item}</div>)}</div></div><div className="rounded-[22px] border border-rose-400/12 bg-rose-500/[0.05] p-4"><div className="mb-3 flex items-center gap-2 text-sm font-medium text-white"><BookOpenCheck className="h-4 w-4 text-rose-300" />Зоны роста</div><div className="space-y-2">{primaryStudent.growthZones.map((item) => <div key={item} className="text-sm text-slate-300">{item}</div>)}</div></div></div></div></Surface>
        <Surface><SectionHeading eyebrow="Последняя активность" title="Недавние события" /><div className="space-y-3">{primaryStudent.activity.map((activity) => <div key={activity.id} className="flex gap-4 rounded-[22px] border border-white/8 bg-white/[0.03] p-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04]">{activity.type === "grade" ? <ChartNoAxesCombined className="h-4 w-4 text-blue-200" /> : activity.type === "achievement" ? <Award className="h-4 w-4 text-violet-200" /> : activity.type === "teacher" ? <UserCircle2 className="h-4 w-4 text-emerald-200" /> : <BellRing className="h-4 w-4 text-amber-200" />}</div><div><div className="font-medium text-white">{activity.title}</div><p className="mt-1 text-sm leading-6 text-slate-400">{activity.description}</p><div className="mt-2 font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-500">{activity.time}</div></div></div>)}</div></Surface>
      </div>
    </div>
  );
}

export function AiInsightsContent({ role }: { role: Role }) {
  return (
    <div className="space-y-5">
      <Surface className="bg-gradient-to-r from-violet-500/[0.12] via-slate-950/30 to-blue-500/[0.12]">
        <div className="max-w-4xl">
          <div className="font-mono-ui text-[11px] uppercase tracking-[0.3em] text-violet-100/80">AI-наставник</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">Главная ценность InsightED: AI объясняет прогресс, риски и следующий шаг ясным человеческим языком.</h2>
          <p className="mt-5 text-base leading-7 text-slate-300">Эта страница показывает, как один и тот же набор данных превращается в разный, но полезный вывод для ученика, учителя, родителя и администрации.</p>
        </div>
      </Surface>
      <AiPanel initialInsight={generateAiInsight(role, primaryStudent)} role={role} />
    </div>
  );
}

export function ClassRatingContent({ role }: { role: Role }) {
  const teacherInsight = generateAiInsight("teacher", primaryStudent) as TeacherAIInsight;
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
        <Surface className="bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-violet-500/[0.06]">
          <SectionHeading eyebrow="Рейтинг класса" title="Лидеры и движение по 10A" description="Здесь видно не только место, но и реальный прогресс." />
          <div className="grid gap-3 md:grid-cols-3">{leaderboard.slice(0, 3).map((student, index) => <div key={student.id} className="rounded-[28px] border border-white/8 bg-gradient-to-br from-white/[0.05] to-black/10 p-5"><div className="font-mono-ui text-xs uppercase tracking-[0.24em] text-slate-500">#{index + 1}</div><div className="mt-3 text-xl font-medium text-white">{student.name}</div><div className="mt-2 text-3xl font-semibold text-white">{student.averageScore.toFixed(2)}</div><div className="mt-2 text-sm text-slate-400">Баллы за активность: {student.achievementPoints}</div></div>)}</div>
        </Surface>
        <Surface className="bg-gradient-to-br from-blue-500/[0.08] to-violet-500/[0.08]">
          <div className="mb-4 flex flex-wrap items-center gap-3"><Badge tone="blue">Класс: 10A</Badge><Badge tone="neutral">Период: четверть</Badge><Badge tone={role === "teacher" ? "green" : "violet"}>{roleLabels[role]}</Badge></div>
          <RatingChart data={leaderboard.map((student) => ({ name: student.name.split(" ")[0], averageScore: student.averageScore }))} />
        </Surface>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Surface className="bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.02]">
          <div className="overflow-hidden rounded-[24px] border border-white/8">
            <div className="grid grid-cols-[0.4fr_1.2fr_0.6fr_0.8fr_0.7fr_0.6fr] bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-500"><div>Место</div><div>Ученик</div><div>Средний</div><div>Баллы</div><div>Посещаемость</div><div>Δ</div></div>
            {leaderboard.map((student, index) => <div key={student.id} className="grid grid-cols-[0.4fr_1.2fr_0.6fr_0.8fr_0.7fr_0.6fr] items-center border-t border-white/8 px-4 py-4 text-sm transition hover:bg-white/[0.03]"><div className="font-mono-ui text-white">#{index + 1}</div><div className="font-medium text-white">{student.name}</div><div className="font-mono-ui text-white">{student.averageScore.toFixed(2)}</div><div className="font-mono-ui text-white">{student.achievementPoints}</div><div className="font-mono-ui text-white">{student.attendance.toFixed(1)}%</div><div className={student.movement >= 0 ? "font-mono-ui text-emerald-300" : "font-mono-ui text-rose-300"}>{student.movement >= 0 ? "+" : ""}{student.movement}</div></div>)}
          </div>
        </Surface>
        <Surface className="bg-gradient-to-br from-rose-500/[0.06] to-white/[0.03]">
          <SectionHeading eyebrow="Зона риска" title="Кому нужен быстрый фокус" description="AI сразу показывает учеников, которым нужна поддержка." />
          <div className="space-y-3">{teacherInsight.riskStudents.map((student) => <div key={student.studentId} className="rounded-[24px] border border-rose-400/12 bg-rose-500/[0.05] p-4"><div className="flex items-center justify-between gap-4"><div className="font-medium text-white">{student.name}</div><Badge tone={student.riskLevel === "high" ? "red" : "violet"}>{student.riskLevel === "high" ? "Высокий риск" : "Нужен контроль"}</Badge></div><p className="mt-2 text-sm leading-6 text-slate-300">{student.explanation}</p><div className="mt-3 font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-500">Риск {student.riskScore}% · Посещаемость {student.attendance.toFixed(1)}% · Тренд {student.trend >= 0 ? "+" : ""}{student.trend}</div></div>)}</div>
        </Surface>
      </div>
    </div>
  );
}
