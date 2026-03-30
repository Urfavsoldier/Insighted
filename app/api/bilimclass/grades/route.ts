import { NextRequest, NextResponse } from "next/server";
import { fetchBilimClassGrades } from "@/lib/backend/bilimclass-service";

export async function GET(request: NextRequest) {
  const studentId = request.nextUrl.searchParams.get("studentId") ?? undefined;
  const response = await fetchBilimClassGrades(studentId);
  return NextResponse.json(response);
}
