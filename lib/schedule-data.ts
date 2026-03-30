import { ClassroomAvailability, SchoolEventConstraint, SubjectRequirement, TeacherAvailability, TimeSlot, Weekday } from "@/lib/types";

export const scheduleDays: Weekday[] = ["Пн", "Вт", "Ср", "Чт", "Пт"];

export const timeSlots: TimeSlot[] = [
  { id: "s1", label: "1 урок", start: "08:00", end: "08:45" },
  { id: "s2", label: "2 урок", start: "08:55", end: "09:40" },
  { id: "s3", label: "3 урок", start: "10:00", end: "10:45" },
  { id: "s4", label: "4 урок", start: "10:55", end: "11:40" },
  { id: "s5", label: "5 урок", start: "12:00", end: "12:45" },
  { id: "s6", label: "6 урок", start: "12:55", end: "13:40" },
];

export const classGroups = [{ id: "10A", name: "10A" }, { id: "10B", name: "10B" }];

export const classrooms = [
  { id: "r101", name: "Каб. 101", type: "general" as const },
  { id: "r204", name: "Lab 204", type: "science" as const },
  { id: "r305", name: "IT 305", type: "computer" as const },
  { id: "r210", name: "Lang 210", type: "language" as const },
];

export const teacherAvailability: TeacherAvailability[] = [
  { teacherId: "t-math", teacherName: "М. Исаева", unavailable: { Ср: ["s1"], Пт: ["s5"] } },
  { teacherId: "t-phys", teacherName: "С. Нурбеков", unavailable: { Вт: ["s6"], Чт: ["s1"] } },
  { teacherId: "t-bio", teacherName: "А. Жаксылык", unavailable: { Пн: ["s6"] } },
  { teacherId: "t-eng", teacherName: "Л. Фостер", unavailable: { Ср: ["s5"], Чт: ["s5"] } },
  { teacherId: "t-it", teacherName: "Д. Мусина", unavailable: { Вт: ["s1"] } },
  { teacherId: "t-kz", teacherName: "Г. Нурлан", unavailable: { Пт: ["s1"] } },
  { teacherId: "t-his", teacherName: "Р. Сагинтаева", unavailable: { Чт: ["s6"] } },
];

export const classroomAvailability: ClassroomAvailability[] = [
  { roomId: "r101", roomName: "Каб. 101", unavailable: {} },
  { roomId: "r204", roomName: "Lab 204", unavailable: { Вт: ["s3"] } },
  { roomId: "r305", roomName: "IT 305", unavailable: { Ср: ["s4"] } },
  { roomId: "r210", roomName: "Lang 210", unavailable: { Пн: ["s2"] } },
];

export const scheduleRequirements: SubjectRequirement[] = [
  { id: "10a-math", classId: "10A", className: "10A", subject: "Алгебра", teacherId: "t-math", teacherName: "М. Исаева", roomType: "general", lessonsPerWeek: 3, pairPreferred: true },
  { id: "10a-phys", classId: "10A", className: "10A", subject: "Физика", teacherId: "t-phys", teacherName: "С. Нурбеков", roomType: "science", lessonsPerWeek: 2, pairPreferred: true },
  { id: "10a-bio", classId: "10A", className: "10A", subject: "Биология", teacherId: "t-bio", teacherName: "А. Жаксылык", roomType: "science", lessonsPerWeek: 2 },
  { id: "10a-eng", classId: "10A", className: "10A", subject: "Английский язык", teacherId: "t-eng", teacherName: "Л. Фостер", roomType: "language", lessonsPerWeek: 2, splitGroup: true, parallelGroup: "A1" },
  { id: "10a-it", classId: "10A", className: "10A", subject: "Информатика", teacherId: "t-it", teacherName: "Д. Мусина", roomType: "computer", lessonsPerWeek: 2, splitGroup: true, parallelGroup: "A2" },
  { id: "10b-math", classId: "10B", className: "10B", subject: "Алгебра", teacherId: "t-math", teacherName: "М. Исаева", roomType: "general", lessonsPerWeek: 3, pairPreferred: true },
  { id: "10b-phys", classId: "10B", className: "10B", subject: "Физика", teacherId: "t-phys", teacherName: "С. Нурбеков", roomType: "science", lessonsPerWeek: 2, pairPreferred: true },
  { id: "10b-his", classId: "10B", className: "10B", subject: "История", teacherId: "t-his", teacherName: "Р. Сагинтаева", roomType: "general", lessonsPerWeek: 2 },
  { id: "10b-eng", classId: "10B", className: "10B", subject: "Английский язык", teacherId: "t-eng", teacherName: "Л. Фостер", roomType: "language", lessonsPerWeek: 2, splitGroup: true, parallelGroup: "B1" },
  { id: "10b-kz", classId: "10B", className: "10B", subject: "Казахский язык", teacherId: "t-kz", teacherName: "Г. Нурлан", roomType: "general", lessonsPerWeek: 2, splitGroup: true, parallelGroup: "B2" },
];

export const scheduleEvents: SchoolEventConstraint[] = [
  { id: "ev1", classIds: ["10A", "10B"], day: "Ср", slotIds: ["s5"], title: "Классный час" },
  { id: "ev2", classIds: ["10A"], day: "Пт", slotIds: ["s6"], title: "Показ STEM-клуба" },
];
