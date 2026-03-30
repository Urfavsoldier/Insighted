import { allStudents } from "@/lib/mock-data";
import { BilimClassGradesResponse } from "@/lib/backend/models";

export async function fetchBilimClassGrades(studentId?: string): Promise<BilimClassGradesResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const selected = studentId ? allStudents.filter((student) => student.id === studentId) : allStudents;

  return {
    syncedAt: "обновлено только что",
    students: selected.map((student) => ({
      studentId: student.id,
      studentName: student.name,
      className: student.className,
      source: "BilimClass" as const,
      importedAt: "обновлено только что",
      grades: student.grades.map((grade) => ({
        subjectId: grade.subject,
        subjectName: grade.subject,
        teacherName: grade.teacher,
        average: grade.average,
        trend: grade.trend,
        recentGrades: grade.latest,
      })),
    })),
  };
}
