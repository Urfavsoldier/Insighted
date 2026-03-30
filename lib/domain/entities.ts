import { AIInsight, Achievement, ActivityItem, BilimClassImport, Role, ScheduledLesson, ScheduleChangeLog, ScheduleGenerationResult, SchoolEvent, Student, SubjectGrade } from "@/lib/types";

export type PlatformUser = {
  id: string;
  fullName: string;
  role: Role;
};

export type StudentEntity = PlatformUser & {
  role: "student";
  profile: Student;
  grades: SubjectGrade[];
  attendance: number;
  achievements: Achievement[];
  goals: string[];
  activity: ActivityItem[];
  aiAnalysis: AIInsight;
};

export type TeacherEntity = PlatformUser & {
  role: "teacher";
  subjects: string[];
  classes: string[];
  riskStudents: string[];
};

export type ParentEntity = PlatformUser & {
  role: "parent";
  childrenIds: string[];
  notifications: string[];
};

export type AdminEntity = PlatformUser & {
  role: "admin";
  permissions: string[];
};

export type ClassEntity = {
  id: string;
  title: string;
  curator: string;
  studentIds: string[];
  averageScore: number;
  schedule: ScheduleGenerationResult;
};

export type PortfolioEntity = {
  studentId: string;
  achievements: Achievement[];
  certificates: string[];
  extracurriculars: string[];
};

export type AIAnalysisEntity = {
  studentId?: string;
  analysis: AIInsight;
  freshnessLabel: string;
};

export type EventEntity = {
  event: SchoolEvent;
  targetRoles: Role[];
  targetClasses: string[];
};

export type NotificationEntity = {
  id: string;
  recipients: string[];
  type: "расписание" | "оценка" | "событие" | "AI";
  source: "InsightED" | "BilimClass" | "Умное расписание";
  text: string;
  isRead: boolean;
  priority: "низкий" | "средний" | "высокий";
};

export type ScheduleEntity = {
  generatedAt: string;
  lessons: ScheduledLesson[];
  updates: ScheduleChangeLog[];
};

export type SchoolAnalyticsEntity = {
  averageScore: number;
  averageAttendance: number;
  highRiskCount: number;
  mediumRiskCount: number;
  topSubjects: string[];
  weakSubjects: string[];
};

export type PlatformSnapshot = {
  students: StudentEntity[];
  teachers: TeacherEntity[];
  parents: ParentEntity[];
  admins: AdminEntity[];
  classes: ClassEntity[];
  portfolios: PortfolioEntity[];
  analyses: AIAnalysisEntity[];
  events: EventEntity[];
  notifications: NotificationEntity[];
  schedule: ScheduleEntity;
  analytics: SchoolAnalyticsEntity;
  bilimClass: BilimClassImport;
};
