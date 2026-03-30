import { BilimClassImport, RatingStudent, SchoolEvent, Student } from "@/lib/types";

export const roleLabels = {
  student: "Ученик",
  teacher: "Учитель",
  parent: "Родитель",
  admin: "Администрация",
} as const;

export const primaryStudent: Student = {
  id: "st-001",
  name: "Айлин Серик",
  className: "10A",
  avatar: "АС",
  bio: "Участвует в STEM-кружке, любит биологию и проектную работу. Готовится к школьной олимпиаде и хочет усилить математическую базу.",
  interests: ["STEM", "Биология", "Дебаты", "UX-исследования"],
  attendance: 96.8,
  averageScore: 4.63,
  performanceTrend: 0.34,
  riskLevel: "low",
  strengths: ["Биология", "Английский язык", "Проектная работа"],
  growthZones: ["Алгебра", "Физика"],
  goals: [
    "Поднять средний балл по алгебре до 4.4 за две недели",
    "Сдать лабораторный модуль по физике без просрочек",
    "Подготовить портфолио достижений к школьной конференции",
  ],
  parentName: "Серикова Дина",
  curator: "Ерлан Айтжанов",
  grades: [
    { subject: "Алгебра", average: 4.1, trend: -0.2, latest: [4, 4, 5, 3], teacher: "М. Исаева" },
    { subject: "Физика", average: 4.2, trend: -0.1, latest: [4, 5, 4, 4], teacher: "С. Нурбеков" },
    { subject: "Биология", average: 4.9, trend: 0.3, latest: [5, 5, 5, 4], teacher: "А. Жаксылык" },
    { subject: "Английский язык", average: 4.8, trend: 0.2, latest: [5, 5, 4, 5], teacher: "Л. Фостер" },
    { subject: "Информатика", average: 4.6, trend: 0.4, latest: [4, 5, 5, 5], teacher: "Д. Мусина" },
  ],
  achievements: [
    {
      id: "a1",
      title: "2 место на дне STEM-хакатона",
      category: "Проект",
      date: "24 марта",
      level: "Школьный",
      description: "Командный проект по системе рекомендаций для библиотеки.",
    },
    {
      id: "a2",
      title: "Победа в дебатном турнире",
      category: "Коммуникация",
      date: "18 марта",
      level: "Городской",
      description: "Лучшая аргументация в финальном раунде.",
    },
    {
      id: "a3",
      title: "Сертификат по исследованию пользовательского опыта",
      category: "Внешний курс",
      date: "9 марта",
      level: "Онлайн",
      description: "Базовый курс по исследованию пользовательского опыта.",
    },
  ],
  activity: [
    { id: "act1", type: "grade", title: "Новая оценка по алгебре", description: "Контрольная работа: 3/5. Требуется разбор ошибок.", time: "Сегодня, 10:20" },
    { id: "act2", type: "teacher", title: "Комментарий куратора", description: "Отмечен высокий вклад в проектной неделе.", time: "Вчера, 16:40" },
    { id: "act3", type: "achievement", title: "Добавлено достижение", description: "Сертификат по исследованию пользовательского опыта опубликован в портфолио.", time: "26 марта, 18:00" },
    { id: "act4", type: "attendance", title: "Посещаемость стабильна", description: "4 недели подряд без пропусков по неуважительной причине.", time: "25 марта, 09:00" },
  ],
  attendanceWeekly: [
    { week: "1 нед", attendance: 95, score: 4.2 },
    { week: "2 нед", attendance: 96, score: 4.3 },
    { week: "3 нед", attendance: 97, score: 4.5 },
    { week: "4 нед", attendance: 98, score: 4.6 },
    { week: "5 нед", attendance: 96, score: 4.7 },
    { week: "6 нед", attendance: 97, score: 4.6 },
  ],
};

export const secondStudent: Student = {
  id: "st-002",
  name: "Дамир Ахметов",
  className: "10A",
  avatar: "ДА",
  bio: "Сильный в информатике, но теряет темп в математике и начал пропускать часть занятий.",
  interests: ["Робототехника", "Киберспорт"],
  attendance: 89.4,
  averageScore: 3.92,
  performanceTrend: -0.42,
  riskLevel: "high",
  strengths: ["Информатика", "Практическое мышление"],
  growthZones: ["Алгебра", "Казахский язык", "Самоорганизация"],
  goals: ["Стабилизировать посещаемость", "Вернуть ритм по алгебре"],
  parentName: "Ахметова Ляззат",
  curator: "Ерлан Айтжанов",
  grades: [
    { subject: "Алгебра", average: 3.4, trend: -0.5, latest: [3, 3, 4, 3], teacher: "М. Исаева" },
    { subject: "Физика", average: 3.8, trend: -0.2, latest: [4, 4, 3, 4], teacher: "С. Нурбеков" },
    { subject: "Информатика", average: 4.8, trend: 0.2, latest: [5, 5, 4, 5], teacher: "Д. Мусина" },
    { subject: "Казахский язык", average: 3.6, trend: -0.4, latest: [4, 3, 3, 4], teacher: "Г. Нурлан" },
  ],
  achievements: [{ id: "d1", title: "Финалист спринта по робототехнике", category: "Техника", date: "15 марта", level: "Городской", description: "Команда дошла до финала в категории автономных роботов." }],
  activity: [],
  attendanceWeekly: [
    { week: "1 нед", attendance: 92, score: 4.1 },
    { week: "2 нед", attendance: 90, score: 4.0 },
    { week: "3 нед", attendance: 89, score: 3.9 },
    { week: "4 нед", attendance: 88, score: 3.8 },
    { week: "5 нед", attendance: 90, score: 3.8 },
    { week: "6 нед", attendance: 87, score: 3.7 },
  ],
};

export const thirdStudent: Student = {
  id: "st-003",
  name: "Малика Орынбасар",
  className: "10A",
  avatar: "МО",
  bio: "Сильна в гуманитарном блоке и выступлениях, но просела по физике и темпу выполнения лабораторных работ.",
  interests: ["Журналистика", "Волонтерство"],
  attendance: 93.1,
  averageScore: 4.08,
  performanceTrend: -0.19,
  riskLevel: "medium",
  strengths: ["История", "Английский язык", "Публичные выступления"],
  growthZones: ["Физика", "Стабильность дедлайнов"],
  goals: ["Подтянуть физику до 4.2", "Сдавать лабораторные вовремя"],
  parentName: "Орынбасарова Айжан",
  curator: "Ерлан Айтжанов",
  grades: [
    { subject: "Физика", average: 3.9, trend: -0.3, latest: [4, 4, 3, 4], teacher: "С. Нурбеков" },
    { subject: "История", average: 4.8, trend: 0.1, latest: [5, 5, 4, 5], teacher: "Р. Сагинтаева" },
    { subject: "Английский язык", average: 4.7, trend: 0.2, latest: [5, 4, 5, 5], teacher: "Л. Фостер" },
    { subject: "Алгебра", average: 4.0, trend: -0.1, latest: [4, 4, 4, 4], teacher: "М. Исаева" },
  ],
  achievements: [{ id: "m1", title: "Лучший спикер молодежного форума", category: "Коммуникация", date: "21 марта", level: "Городской", description: "Отмечена за сильное публичное выступление на молодежном форуме." }],
  activity: [],
  attendanceWeekly: [
    { week: "1 нед", attendance: 95, score: 4.2 },
    { week: "2 нед", attendance: 94, score: 4.2 },
    { week: "3 нед", attendance: 93, score: 4.1 },
    { week: "4 нед", attendance: 94, score: 4.0 },
    { week: "5 нед", attendance: 92, score: 4.0 },
    { week: "6 нед", attendance: 93, score: 4.0 },
  ],
};

export const allStudents: Student[] = [primaryStudent, secondStudent, thirdStudent];

export const bilimClassImport: BilimClassImport = {
  status: "connected",
  lastSync: "Обновлено только что",
  importedSubjects: 12,
  recentUpdates: [
    { subject: "Алгебра", value: 3, time: "10:20" },
    { subject: "Информатика", value: 5, time: "Вчера" },
    { subject: "Биология", value: 5, time: "26 марта" },
  ],
};

export const schoolEvents: SchoolEvent[] = [
  { id: "e1", title: "Открытая лаборатория: AI и робототехника", date: "31 марта", time: "15:30", audience: "8-11 классы", location: "STEM Lab", description: "Демонстрация ученических проектов и мини-воркшоп от наставников." },
  { id: "e2", title: "Родительский обзор четверти", date: "2 апреля", time: "18:00", audience: "Родители", location: "Актовый зал", description: "Прогресс по классам, AI-аналитика и новые цифровые инструменты школы." },
  { id: "e3", title: "Олимпиадный интенсив", date: "4 апреля", time: "14:00", audience: "10-11 классы", location: "Кабинет 305", description: "Подготовка к областному этапу по математике и физике." },
];

export const leaderboard: RatingStudent[] = [
  { id: "r1", name: "Айлин Серик", averageScore: 4.63, achievementPoints: 98, attendance: 96.8, streak: 4, movement: 1 },
  { id: "r2", name: "Алихан Төлеу", averageScore: 4.58, achievementPoints: 90, attendance: 98.1, streak: 5, movement: 0 },
  { id: "r3", name: "Жанель Абдулла", averageScore: 4.52, achievementPoints: 87, attendance: 97.5, streak: 2, movement: 2 },
  { id: "r4", name: "Малика Орынбасар", averageScore: 4.08, achievementPoints: 74, attendance: 93.1, streak: 1, movement: -1 },
  { id: "r5", name: "Дамир Ахметов", averageScore: 3.92, achievementPoints: 71, attendance: 89.4, streak: 0, movement: -2 },
];
