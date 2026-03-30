import {
  ClassroomAvailability,
  ScheduleChangeLog,
  ScheduleConflict,
  ScheduleGenerationResult,
  ScheduledLesson,
  SchoolEventConstraint,
  SubjectRequirement,
  TeacherAvailability,
  Weekday,
} from "@/lib/types";
import { classrooms, scheduleDays, timeSlots } from "@/lib/schedule-data";

type SchedulerOptions = {
  teacherAvailability: TeacherAvailability[];
  classroomAvailability: ClassroomAvailability[];
  requirements: SubjectRequirement[];
  events: SchoolEventConstraint[];
  absentTeacherIds?: string[];
  previousLessons?: ScheduledLesson[];
};

function nowLabel() {
  return "обновлено только что";
}

function isTeacherUnavailable(teacherAvailability: TeacherAvailability[], teacherId: string, day: Weekday, slotId: string, absentTeacherIds: string[]) {
  if (absentTeacherIds.includes(teacherId)) {
    return true;
  }
  const availability = teacherAvailability.find((item) => item.teacherId === teacherId);
  return Boolean(availability?.unavailable[day]?.includes(slotId));
}

function isRoomUnavailable(classroomAvailability: ClassroomAvailability[], roomId: string, day: Weekday, slotId: string) {
  const availability = classroomAvailability.find((item) => item.roomId === roomId);
  return Boolean(availability?.unavailable[day]?.includes(slotId));
}

function isEventBlocked(events: SchoolEventConstraint[], classId: string, day: Weekday, slotId: string) {
  return events.some((event) => event.classIds.includes(classId) && event.day === day && event.slotIds.includes(slotId));
}

function getRoomCandidates(roomType: SubjectRequirement["roomType"]) {
  const exact = classrooms.filter((room) => room.type === roomType);
  const general = classrooms.filter((room) => room.type === "general");
  return roomType === "general" ? general : [...exact, ...general];
}

function slotIndex(slotId: string) {
  return timeSlots.findIndex((slot) => slot.id === slotId);
}

export function generateSchedule(options: SchedulerOptions): ScheduleGenerationResult {
  const absentTeacherIds = options.absentTeacherIds ?? [];
  const lessons: ScheduledLesson[] = [];
  const conflicts: ScheduleConflict[] = [];
  const teacherBusy = new Set<string>();
  const roomBusy = new Set<string>();
  const classBusy = new Set<string>();

  const queue = [...options.requirements].sort((a, b) => Number(Boolean(b.pairPreferred)) - Number(Boolean(a.pairPreferred)));

  for (const requirement of queue) {
    let remaining = requirement.lessonsPerWeek;

    while (remaining > 0) {
      const wantsPair = requirement.pairPreferred && remaining >= 2;
      let placed = false;

      for (const day of scheduleDays) {
        for (const slot of timeSlots) {
          const busyTeacherKey = `${requirement.teacherId}-${day}-${slot.id}`;
          const busyClassKey = `${requirement.classId}-${day}-${slot.id}`;

          if (teacherBusy.has(busyTeacherKey) || classBusy.has(busyClassKey)) {
            continue;
          }

          if (isTeacherUnavailable(options.teacherAvailability, requirement.teacherId, day, slot.id, absentTeacherIds)) {
            continue;
          }

          if (isEventBlocked(options.events, requirement.classId, day, slot.id)) {
            continue;
          }

          const pairSlot = wantsPair ? timeSlots[slotIndex(slot.id) + 1] : undefined;
          if (wantsPair && !pairSlot) {
            continue;
          }

          if (
            pairSlot &&
            (teacherBusy.has(`${requirement.teacherId}-${day}-${pairSlot.id}`) ||
              classBusy.has(`${requirement.classId}-${day}-${pairSlot.id}`) ||
              isTeacherUnavailable(options.teacherAvailability, requirement.teacherId, day, pairSlot.id, absentTeacherIds) ||
              isEventBlocked(options.events, requirement.classId, day, pairSlot.id))
          ) {
            continue;
          }

          const room = getRoomCandidates(requirement.roomType).find((candidate) => {
            const roomKey = `${candidate.id}-${day}-${slot.id}`;
            const pairRoomKey = pairSlot ? `${candidate.id}-${day}-${pairSlot.id}` : null;
            return (
              !roomBusy.has(roomKey) &&
              !isRoomUnavailable(options.classroomAvailability, candidate.id, day, slot.id) &&
              (!pairSlot || (!roomBusy.has(pairRoomKey!) && !isRoomUnavailable(options.classroomAvailability, candidate.id, day, pairSlot.id)))
            );
          });

          if (!room) {
            continue;
          }

          const pairId = wantsPair ? `${requirement.id}-${day}-${slot.id}` : undefined;
          const lesson: ScheduledLesson = {
            id: `${requirement.id}-${day}-${slot.id}`,
            classId: requirement.classId,
            className: requirement.className,
            subject: requirement.subject,
            teacherId: requirement.teacherId,
            teacherName: requirement.teacherName,
            roomId: room.id,
            roomName: room.name,
            day,
            slotId: slot.id,
            pairId,
            splitGroup: requirement.splitGroup,
            parallelGroup: requirement.parallelGroup,
            status: "scheduled",
          };

          lessons.push(lesson);
          teacherBusy.add(busyTeacherKey);
          roomBusy.add(`${room.id}-${day}-${slot.id}`);
          classBusy.add(busyClassKey);

          if (pairSlot) {
            lessons.push({
              ...lesson,
              id: `${requirement.id}-${day}-${pairSlot.id}`,
              slotId: pairSlot.id,
            });
            teacherBusy.add(`${requirement.teacherId}-${day}-${pairSlot.id}`);
            roomBusy.add(`${room.id}-${day}-${pairSlot.id}`);
            classBusy.add(`${requirement.classId}-${day}-${pairSlot.id}`);
            remaining -= 2;
          } else {
            remaining -= 1;
          }

          placed = true;
          break;
        }
        if (placed) {
          break;
        }
      }

      if (!placed) {
        conflicts.push({
          id: `conf-${requirement.id}-${remaining}`,
          type: "class",
          day: "Пн",
          slotId: "s1",
          message: `Не удалось автоматически назначить ${requirement.subject} для ${requirement.className}. Требуется ручная корректировка ограничений.`,
        });
        break;
      }
    }
  }

  const changeLog: ScheduleChangeLog[] = [];

  if (options.previousLessons?.length) {
    const previousMap = new Map(options.previousLessons.map((lesson) => [lesson.id, lesson]));
    for (const lesson of lessons) {
      const previous = previousMap.get(lesson.id);
      if (previous && (previous.day !== lesson.day || previous.slotId !== lesson.slotId || previous.teacherId !== lesson.teacherId || previous.roomId !== lesson.roomId)) {
        lesson.status = "updated";
        changeLog.push({
          id: `chg-${lesson.id}`,
          scope: "admin",
          audience: lesson.className,
          message: `${lesson.className}: ${lesson.subject} перенесен на ${lesson.day}, ${lesson.slotId} в ${lesson.roomName}.`,
        });
        changeLog.push({
          id: `chg-st-${lesson.id}`,
          scope: "student",
          audience: lesson.className,
          message: `Ученики ${lesson.className} получили обновление по предмету ${lesson.subject}.`,
        });
        changeLog.push({
          id: `chg-t-${lesson.id}`,
          scope: "teacher",
          audience: lesson.teacherName,
          message: `${lesson.teacherName} получил обновление по своему расписанию.`,
        });
      }
    }
  } else {
    changeLog.push({
      id: "initial-admin",
      scope: "admin",
      audience: "Администрация",
      message: "Черновик расписания сгенерирован автоматически без ручных правок.",
    });
  }

  const notifications = [
    "Ученики получили обновления по затронутым урокам.",
    "Учителя получили обновленные слоты и кабинеты.",
    "Журнал изменений сохранен для администрации.",
  ];

  return {
    generatedAt: nowLabel(),
    lessons,
    conflicts,
    changeLog,
    notifications,
  };
}
