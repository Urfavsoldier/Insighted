import { allStudents, leaderboard, schoolEvents } from "@/lib/mock-data";
import { classroomAvailability, scheduleEvents, scheduleRequirements, teacherAvailability } from "@/lib/schedule-data";
import {
  AchievementRecord,
  AttendanceRecord,
  GradeRecord,
  ParentRecord,
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
