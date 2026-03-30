import { generateAiInsight } from "@/lib/ai";
import { buildSmartSchedule } from "@/lib/backend/schedule-service";
import { allStudents, bilimClassImport, leaderboard, primaryStudent, roleLabels, schoolEvents } from "@/lib/mock-data";
import { PlatformSnapshot } from "@/lib/domain/entities";

export function createPlatformSnapshot(): PlatformSnapshot {
  const schedule = buildSmartSchedule().data;
  const studentAverage = Number((allStudents.reduce((acc, student) => acc + student.averageScore, 0) / allStudents.length).toFixed(2));
  const attendanceAverage = Number((allStudents.reduce((acc, student) => acc + student.attendance, 0) / allStudents.length).toFixed(1));

  return {
    students: allStudents.map((student) => ({
      id: student.id,
      fullName: student.name,
      role: "student",
      profile: student,
      grades: student.grades,
      attendance: student.attendance,
      achievements: student.achievements,
      goals: student.goals,
      activity: student.activity,
      aiAnalysis: generateAiInsight("student", student),
    })),
    teachers: [
      { id: "t-main", fullName: "Ерлан Айтжанов", role: "teacher", subjects: ["Алгебра", "Физика"], classes: ["10A", "10B"], riskStudents: ["st-002", "st-003"] },
    ],
    parents: [{ id: "p-main", fullName: primaryStudent.parentName, role: "parent", childrenIds: [primaryStudent.id], notifications: ["Новая AI-выжимка готова"] }],
    admins: [{ id: "a-main", fullName: "Администратор школы", role: "admin", permissions: ["события", "расписание", "аналитика"] }],
    classes: [
      { id: "10A", title: "10A", curator: primaryStudent.curator, studentIds: ["st-001", "st-002", "st-003"], averageScore: studentAverage, schedule },
    ],
    portfolios: allStudents.map((student) => ({
      studentId: student.id,
      achievements: student.achievements,
      certificates: student.achievements.map((item) => item.title),
      extracurriculars: student.interests,
    })),
    analyses: allStudents.map((student) => ({
      studentId: student.id,
      analysis: generateAiInsight("student", student),
      freshnessLabel: "Обновлено только что",
    })),
    events: schoolEvents.map((event) => ({ event, targetRoles: ["student", "parent", "teacher", "admin"], targetClasses: ["10A", "10B"] })),
    notifications: [
      { id: "n1", recipients: ["10A"], type: "расписание", source: "Умное расписание", text: "Изменения расписания опубликованы", isRead: false, priority: "высокий" },
      { id: "n2", recipients: ["st-001"], type: "AI", source: "InsightED", text: "Последний анализ: 2 минуты назад", isRead: false, priority: "средний" },
    ],
    schedule: { generatedAt: schedule.generatedAt, lessons: schedule.lessons, updates: schedule.changeLog },
    analytics: {
      averageScore: studentAverage,
      averageAttendance: attendanceAverage,
      highRiskCount: allStudents.filter((student) => student.riskLevel === "high").length,
      mediumRiskCount: allStudents.filter((student) => student.riskLevel === "medium").length,
      topSubjects: ["Биология", "Английский язык", "Информатика"],
      weakSubjects: ["Алгебра", "Физика"],
    },
    bilimClass: bilimClassImport,
  };
}

export function getRoleIntro(role: keyof typeof roleLabels) {
  return {
    roleTitle: roleLabels[role],
    freshness: "Обновлено только что",
  };
}
