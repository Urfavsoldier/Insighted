import { allStudents, leaderboard, schoolEvents } from "@/lib/mock-data";
import { classroomAvailability, scheduleEvents, scheduleRequirements, teacherAvailability } from "@/lib/schedule-data";
import {
  AdminRecord,
  AchievementRecord,
  AttendanceRecord,
  ClassRecord,
  EventRecord,
  GradeRecord,
  NotificationRecord,
  ParentRecord,
  PortfolioRecord,
  SchoolAnalyticsRecord,
  StudentRecord,
  SubjectRecord,
  TeacherRecord,
} from "@/lib/backend/models";

export const studentsTable: StudentRecord[] = allStudents.map((student) => ({
  id: student.id,
  fullName: student.name,
  classId: student.className,
  parentId: `p-${student.id}`,
  curatorTeacherId: "t-curator-1",
}));

export const teachersTable: TeacherRecord[] = teacherAvailability.map((teacher) => ({
  id: teacher.teacherId,
  fullName: teacher.teacherName,
  subjectIds: [],
}));

export const parentsTable: ParentRecord[] = allStudents.map((student) => ({
  id: `p-${student.id}`,
  fullName: student.parentName,
  studentIds: [student.id],
}));

export const adminsTable: AdminRecord[] = [
  { id: "admin-1", fullName: "Асия Кенжебаева", permissions: ["analytics", "schedule", "events", "announcements"] },
];

export const classesTable: ClassRecord[] = [
  {
    id: "10A",
    title: "10A",
    curatorTeacherId: "t-curator-1",
    studentIds: allStudents.filter((student) => student.className === "10A").map((student) => student.id),
  },
  {
    id: "10B",
    title: "10B",
    curatorTeacherId: "t-curator-1",
    studentIds: [],
  },
];

export const subjectsTable: SubjectRecord[] = [
  { id: "sub-math", name: "Алгебра", roomType: "general" },
  { id: "sub-phys", name: "Физика", roomType: "science" },
  { id: "sub-bio", name: "Биология", roomType: "science" },
  { id: "sub-eng", name: "Английский язык", roomType: "language" },
  { id: "sub-it", name: "Информатика", roomType: "computer" },
  { id: "sub-kz", name: "Казахский язык", roomType: "general" },
  { id: "sub-his", name: "История", roomType: "general" },
];

export const gradesTable: GradeRecord[] = allStudents.flatMap((student) =>
  student.grades.flatMap((grade, index) =>
    grade.latest.map((value, gradeIndex) => ({
      id: `${student.id}-${index}-${gradeIndex}`,
      studentId: student.id,
      subjectId: subjectsTable.find((subject) => subject.name === grade.subject)?.id ?? grade.subject,
      teacherId: scheduleRequirements.find((item) => item.teacherName === grade.teacher)?.teacherId ?? "unknown",
      value,
      recordedAt: `2026-03-${10 + gradeIndex}`,
      source: "BilimClass" as const,
    })),
  ),
);

export const attendanceTable: AttendanceRecord[] = allStudents.flatMap((student) =>
  student.attendanceWeekly.map((entry, index) => ({
    id: `${student.id}-att-${index}`,
    studentId: student.id,
    date: `2026-W${index + 1}`,
    status: entry.attendance >= 95 ? "present" : entry.attendance >= 90 ? "late" : "absent",
  })),
);

export const achievementsTable: AchievementRecord[] = allStudents.flatMap((student) =>
  student.achievements.map((achievement) => ({
    id: achievement.id,
    studentId: student.id,
    title: achievement.title,
    level: achievement.level,
    recordedAt: achievement.date,
  })),
);

export const portfoliosTable: PortfolioRecord[] = allStudents.map((student) => ({
  studentId: student.id,
  verifiedEntries: student.achievements.length,
  entries: student.achievements.map((achievement) => ({
    id: achievement.id,
    title: achievement.title,
    type: "достижение" as const,
    date: achievement.date,
    verified: true,
    issuer: "Лицей Aqbobek",
    description: achievement.description,
  })),
}));

export const eventsTable: EventRecord[] = schoolEvents.map((event) => ({
  id: event.id,
  title: event.title,
  date: event.date,
  audience: event.audience,
  targetRoles: event.audience === "Родители" ? ["parent", "admin"] : ["student", "teacher", "admin"],
  classIds: event.audience.includes("10-11") ? ["10A", "10B"] : ["10A"],
}));

export const notificationsTable: NotificationRecord[] = [
  {
    id: "n-1",
    recipients: ["10A", "parent"],
    type: "AI",
    source: "InsightED",
    text: "AI зафиксировал ранний риск по физике и предложил недельный план.",
    isRead: false,
    priority: "высокий",
  },
  {
    id: "n-2",
    recipients: ["teacher", "10A"],
    type: "расписание",
    source: "Умное расписание",
    text: "После отсутствия преподавателя обновлены два слота в расписании 10A.",
    isRead: false,
    priority: "средний",
  },
  {
    id: "n-3",
    recipients: ["student", "parent"],
    type: "событие",
    source: "InsightED",
    text: "Открыта регистрация на олимпиадный интенсив и инженерный показ.",
    isRead: true,
    priority: "низкий",
  },
];

export const schoolAnalyticsTable: SchoolAnalyticsRecord = {
  classes: 2,
  students: allStudents.length,
  averageScore: Number((allStudents.reduce((acc, student) => acc + student.averageScore, 0) / allStudents.length).toFixed(2)),
  averageAttendance: Number((allStudents.reduce((acc, student) => acc + student.attendance, 0) / allStudents.length).toFixed(1)),
  highRiskCount: allStudents.filter((student) => student.riskLevel === "high").length,
  mediumRiskCount: allStudents.filter((student) => student.riskLevel === "medium").length,
  strongestSubjects: ["Биология", "Английский язык", "Информатика"],
  weakestSubjects: ["Алгебра", "Физика", "Казахский язык"],
};

export const scheduleConstraintsTable = {
  teacherAvailability,
  classroomAvailability,
  scheduleRequirements,
  scheduleEvents,
};

export const schoolPulseContext = {
  leaderboard,
  schoolEvents,
};
