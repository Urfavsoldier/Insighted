import { NextRequest, NextResponse } from "next/server";
import { processStudentAiData } from "@/lib/backend/ai-service";
import { Role } from "@/lib/types";

function parseRole(value: string | null): Role {
  if (value === "teacher" || value === "parent" || value === "admin") {
    return value;
  }

  return "student";
}

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const role = parseRole(request.nextUrl.searchParams.get("role"));
  const studentId = request.nextUrl.searchParams.get("studentId") ?? undefined;
  const payload = processStudentAiData({ role, studentId });
  return NextResponse.json(payload.data);
}
