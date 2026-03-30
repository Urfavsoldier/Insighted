import { NextResponse } from "next/server";
import { fetchBilimClassGrades } from "@/lib/backend/bilimclass-service";

export async function GET() {
  const response = await fetchBilimClassGrades("st-001");
  const student = response.students[0];

  return NextResponse.json({
    status: "connected",
    importedSubjects: student.grades.length,
    lastSync: "Только что",
    recentUpdates: student.grades.slice(0, 3).map((grade, index) => ({
      subject: grade.subjectName,
      value: grade.recentGrades[grade.recentGrades.length - 1] ?? 4,
      time: index === 0 ? "Сейчас" : index === 1 ? "2 мин назад" : "Сегодня",
    })),
  });
}
