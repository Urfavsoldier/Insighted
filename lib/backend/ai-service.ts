import { generateAiInsight } from "@/lib/ai";
import { allStudents, primaryStudent } from "@/lib/mock-data";
import { StructuredAIRequest, StructuredAIResponse } from "@/lib/backend/models";

export function processStudentAiData(request: StructuredAIRequest): StructuredAIResponse {
  const student = request.studentId ? allStudents.find((item) => item.id === request.studentId) ?? primaryStudent : primaryStudent;

  return {
    generatedAt: "обновлено только что",
    studentId: student.id,
    role: request.role,
    data: generateAiInsight(request.role, student),
  };
}
