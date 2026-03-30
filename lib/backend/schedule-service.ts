import { scheduleConstraintsTable } from "@/lib/backend/mock-database";
import { generateSchedule } from "@/lib/schedule";
import { StructuredScheduleResponse } from "@/lib/backend/models";

export function buildSmartSchedule(absentTeacherIds: string[] = []): StructuredScheduleResponse {
  return {
    generatedAt: "обновлено только что",
    data: generateSchedule({
      teacherAvailability: scheduleConstraintsTable.teacherAvailability,
      classroomAvailability: scheduleConstraintsTable.classroomAvailability,
      requirements: scheduleConstraintsTable.scheduleRequirements,
      events: scheduleConstraintsTable.scheduleEvents,
      absentTeacherIds,
    }),
  };
}
