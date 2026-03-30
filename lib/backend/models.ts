import { AIInsight, Role, ScheduleGenerationResult } from "@/lib/types";

export type StudentRecord = {
  id: string;
  fullName: string;
  classId: string;
  parentId: string;
  curatorTeacherId: string;
};

export type TeacherRecord = {
  id: string;
  fullName: string;
  subjectIds: string[];
};

export type ParentRecord = {
  id: string;
  fullName: string;
  studentIds: string[];
};

export type SubjectRecord = {
  id: string;
  name: string;
  roomType: "general" | "science" | "computer" | "language";
};

export type GradeRecord = {
  id: string;
  studentId: string;
  subjectId: string;
  teacherId: string;
  value: number;
  recordedAt: string;
  source: "BilimClass" | "InsightED";
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "late" | "absent";
};

export type AchievementRecord = {
  id: string;
  studentId: string;
  title: string;
  level: string;
  recordedAt: string;
};

export type BilimClassStudentPayload = {
  studentId: string;
  studentName: string;
  className: string;
  source: "BilimClass";
  importedAt: string;
  grades: {
    subjectId: string;
    subjectName: string;
    teacherName: string;
    average: number;
    trend: number;
    recentGrades: number[];
  }[];
};

export type BilimClassGradesResponse = {
  syncedAt: string;
  students: BilimClassStudentPayload[];
};

export type StructuredAIRequest = {
  role: Role;
  studentId?: string;
};

export type StructuredAIResponse = {
  generatedAt: string;
  studentId?: string;
  role: Role;
  data: AIInsight;
};

export type StructuredScheduleResponse = {
  generatedAt: string;
  data: ScheduleGenerationResult;
};
