export type Role = "student" | "teacher" | "parent" | "admin";

export type SubjectGrade = {
  subject: string;
  average: number;
  trend: number;
  latest: number[];
  teacher: string;
};

export type Achievement = {
  id: string;
  title: string;
  category: string;
  date: string;
  level: string;
  description: string;
};

export type SchoolEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  audience: string;
  location: string;
  description: string;
};

export type ActivityItem = {
  id: string;
  type: "grade" | "achievement" | "attendance" | "teacher";
  title: string;
  description: string;
  time: string;
};

export type Student = {
  id: string;
  name: string;
  className: string;
  avatar: string;
  bio: string;
  interests: string[];
  attendance: number;
  averageScore: number;
  performanceTrend: number;
  riskLevel: "low" | "medium" | "high";
  strengths: string[];
  growthZones: string[];
  goals: string[];
  parentName: string;
  curator: string;
  grades: SubjectGrade[];
  achievements: Achievement[];
  activity: ActivityItem[];
  attendanceWeekly: { week: string; attendance: number; score: number }[];
};

export type BilimClassImport = {
  status: "connected" | "syncing";
  lastSync: string;
  importedSubjects: number;
  recentUpdates: {
    subject: string;
    value: number;
    time: string;
  }[];
};

export type RatingStudent = {
  id: string;
  name: string;
  averageScore: number;
  achievementPoints: number;
  attendance: number;
  streak: number;
  movement: number;
};

export type StudentAIInsight = {
  role: "student";
  updatedAt: string;
  diagnostics: {
    confidence: number;
    rankingPosition: number;
    rankingTotal: number;
    predictedRisk: number;
  };
  summary: string;
  strengths: string[];
  growthAreas: string[];
  risks: string[];
  recommendations: string[];
  weeklyPlan: string[];
  prediction: string;
  supportiveNote: string;
};

export type TeacherRiskStudent = {
  studentId: string;
  name: string;
  riskScore: number;
  riskLevel: "high" | "medium";
  trend: number;
  attendance: number;
  explanation: string;
  nextRisk: string;
};

export type TeacherAIInsight = {
  role: "teacher";
  updatedAt: string;
  diagnostics: {
    confidence: number;
    riskStudents: number;
    classAverageTrend: number;
  };
  summary: string;
  trendSummary: string[];
  riskStudents: TeacherRiskStudent[];
  recommendations: string[];
};

export type ParentAIInsight = {
  role: "parent";
  updatedAt: string;
  diagnostics: {
    confidence: number;
    rankingPosition: number;
    attendance: number;
  };
  summary: string;
  strengths: string[];
  attentionPoints: string[];
  recommendations: string[];
  prediction: string;
};

export type AdminAIInsight = {
  role: "admin";
  updatedAt: string;
  diagnostics: {
    confidence: number;
    highRiskCount: number;
    mediumRiskCount: number;
    averageAttendance: number;
  };
  pulse: string;
  strongestSubjects: string[];
  weakestSubjects: string[];
  riskDistribution: string[];
  recommendations: string[];
};

export type AIInsight = StudentAIInsight | TeacherAIInsight | ParentAIInsight | AdminAIInsight;

export type Weekday = "Пн" | "Вт" | "Ср" | "Чт" | "Пт";

export type TimeSlot = {
  id: string;
  label: string;
  start: string;
  end: string;
};

export type TeacherAvailability = {
  teacherId: string;
  teacherName: string;
  unavailable: Partial<Record<Weekday, string[]>>;
};

export type ClassroomAvailability = {
  roomId: string;
  roomName: string;
  unavailable: Partial<Record<Weekday, string[]>>;
};

export type SubjectRequirement = {
  id: string;
  classId: string;
  className: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  roomType: "general" | "science" | "computer" | "language";
  lessonsPerWeek: number;
  pairPreferred?: boolean;
  splitGroup?: boolean;
  parallelGroup?: string;
};

export type SchoolEventConstraint = {
  id: string;
  classIds: string[];
  day: Weekday;
  slotIds: string[];
  title: string;
};

export type ScheduledLesson = {
  id: string;
  classId: string;
  className: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  roomId: string;
  roomName: string;
  day: Weekday;
  slotId: string;
  pairId?: string;
  splitGroup?: boolean;
  parallelGroup?: string;
  status: "scheduled" | "updated";
};

export type ScheduleConflict = {
  id: string;
  type: "teacher" | "room" | "class";
  day: Weekday;
  slotId: string;
  message: string;
};

export type ScheduleChangeLog = {
  id: string;
  scope: "student" | "teacher" | "admin";
  audience: string;
  message: string;
};

export type ScheduleGenerationResult = {
  generatedAt: string;
  lessons: ScheduledLesson[];
  conflicts: ScheduleConflict[];
  changeLog: ScheduleChangeLog[];
  notifications: string[];
};
