import { NextRequest, NextResponse } from "next/server";
import { buildSmartSchedule } from "@/lib/backend/schedule-service";

export async function GET(request: NextRequest) {
  const absent = request.nextUrl.searchParams.get("absent");
  const absentTeacherIds = absent ? absent.split(",").filter(Boolean) : [];
  await new Promise((resolve) => setTimeout(resolve, 900));
  return NextResponse.json(buildSmartSchedule(absentTeacherIds));
}
