import { allStudents, leaderboard, primaryStudent } from "@/lib/mock-data";
import { AIInsight, AdminAIInsight, ParentAIInsight, Role, Student, StudentAIInsight, TeacherAIInsight, TeacherRiskStudent } from "@/lib/types";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function formatNow() {
  return "обновлено только что";
}

function getRank(student: Student) {
  const index = leaderboard.findIndex((item) => item.name === student.name);
  return {
    position: index >= 0 ? index + 1 : leaderboard.length,
    total: leaderboard.length,
  };
}

function getWeakSubjects(student: Student) {
  return [...student.grades]
    .filter((grade) => grade.average < 4.4 || grade.trend < 0)
    .sort((a, b) => a.average + a.trend - (b.average + b.trend));
}

function getStrongSubjects(student: Student) {
  return [...student.grades]
    .filter((grade) => grade.average >= 4.6 || grade.trend > 0.15)
    .sort((a, b) => b.average + b.trend - (a.average + a.trend));
}

function getRiskProbability(student: Student, weakCount: number) {
  let score = 38;
  score += weakCount * 10;
  score += student.performanceTrend < 0 ? Math.abs(student.performanceTrend) * 40 : 0;
  score += student.attendance < 94 ? (94 - student.attendance) * 2.2 : 0;
  score -= Math.min(student.achievements.length, 3) * 3;
  return Math.round(clamp(score, 22, 91));
}

function buildPrediction(student: Student) {
  const weakSubjects = getWeakSubjects(student);
  const subject = weakSubjects[0] ?? student.grades[0];
  const risk = getRiskProbability(student, weakSubjects.length);
  const topicHint =
    subject.subject === "Физика"
      ? "пробелов в расчетных задачах и лабораторной последовательности"
      : subject.subject === "Алгебра"
        ? "пробелов в функциях и неустойчивого качества контрольных работ"
        : "накопленных пробелов по последним темам";

  return `С вероятностью ${risk}% ${student.name.toLowerCase()} может снизить результат по предмету «${subject.subject}» на следующем суммативном оценивании из-за текущего тренда, ${topicHint} и того, что последние оценки пока не показывают стабильного восстановления.`;
}

function buildStudentInsight(student: Student = primaryStudent): StudentAIInsight {
  const weakSubjects = getWeakSubjects(student);
  const strongSubjects = getStrongSubjects(student);
  const rank = getRank(student);
  const probability = getRiskProbability(student, weakSubjects.length);
  const mainWeak = weakSubjects[0];
  const secondaryWeak = weakSubjects[1];

  return {
    role: "student",
    updatedAt: formatNow(),
    diagnostics: {
      confidence: 94,
      rankingPosition: rank.position,
      rankingTotal: rank.total,
      predictedRisk: probability,
    },
    summary: `${student.name} держит сильный общий профиль и сейчас входит в число лидеров класса по оценкам, достижениям и посещаемости. Главный резерв роста находится в предмете «${mainWeak?.subject ?? "алгебра"}»: именно он сейчас сдерживает дальнейший рост, несмотря на сильные результаты в областях ${strongSubjects.slice(0, 2).map((item) => item.subject.toLowerCase()).join(" и ")}.`,
    strengths: [
      ...student.strengths.slice(0, 2).map((item) => `${item}: уже дает ученику устойчивое преимущество в профиле.`),
      `Рейтинг ${rank.position}/${rank.total}: позиция подтверждает, что базовый уровень уже высокий и рост возможен за счет точечной коррекции, а не полной перестройки.`,
      student.achievements.length > 0
        ? `Достижения вне уроков: ${student.achievements[0].title.toLowerCase()} усиливает вовлеченность и добавляет уверенности.`
        : "Вовлеченность в школьную жизнь поддерживает внутреннюю мотивацию.",
    ],
    growthAreas: [
      mainWeak
        ? `${mainWeak.subject}: средний балл ${mainWeak.average.toFixed(1)}, тренд ${mainWeak.trend.toFixed(1)}. Проблема уже не разовая, а повторяющаяся.`
        : "Есть предметы, где результат пока не стабилен.",
      secondaryWeak
        ? `${secondaryWeak.subject}: пока держится на приемлемом уровне, но без дополнительного внимания может стать второй точкой просадки.`
        : "Важно не допустить, чтобы слабый предмет потянул за собой общий темп.",
      student.attendance < 94
        ? `Посещаемость ${student.attendance.toFixed(1)}% уже влияет на ритм подготовки и закрепление тем.`
        : `Посещаемость ${student.attendance.toFixed(1)}% хорошая, значит главный вопрос не в дисциплине, а в качестве подготовки к сложным темам.`,
    ],
    risks: [
      `Если не стабилизировать ${mainWeak?.subject ?? "ключевой предмет"} в ближайшие 7-10 дней, ученик может потерять еще 1 позицию в рейтинге.`,
      student.performanceTrend < 0
        ? `Общий тренд ${student.performanceTrend.toFixed(2)} указывает на реальное снижение темпа, а не на случайное колебание.`
        : `Даже при позитивном общем тренде отдельный предмет уже дает ранний сигнал риска.`,
      `Внеучебная активность помогает мотивации, но без жесткого фокуса на одной слабой теме может усилить ощущение перегрузки.`,
    ],
    recommendations: [
      `На этой неделе нужно не «подтянуть предмет», а закрыть одну конкретную тему по предмету «${mainWeak?.subject ?? "алгебра"}» и проверить ее мини-квизом в конце недели.`,
      `Запросить у преподавателя ${mainWeak?.subject ?? "ключевого предмета"} короткий разбор двух типовых ошибок и зафиксировать их в заметке своими словами.`,
      `Сохранить сильную сторону через маленький быстрый успех: один заметный результат в области ${strongSubjects[0]?.subject ?? student.strengths[0]}.`,
    ],
    weeklyPlan: [
      `Понедельник: разобрать последние оценки по предмету «${mainWeak?.subject ?? "алгебра"}» и выделить 3 повторяющиеся ошибки.`,
      "Среда: 35 минут глубокой практики без отвлечений и короткая самопроверка после задач.",
      `Пятница: получить обратную связь от учителя и проверить, ушла ли ключевая ошибка.`,
      "Воскресенье: обновить прогресс в InsightED, оценить неделю по 10-балльной шкале и скорректировать следующий фокус.",
    ],
    prediction: buildPrediction(student),
    supportiveNote:
      "Потенциал роста высокий: здесь не нужно начинать с нуля, достаточно сделать слабую зону управляемой и вернуть стабильность в одном-двух предметах.",
  };
}

function buildTeacherInsight(): TeacherAIInsight {
  const flagged = allStudents
    .filter((student) => student.riskLevel !== "low")
    .map((student): TeacherRiskStudent => {
      const weakSubjects = getWeakSubjects(student);
      const riskScore = getRiskProbability(student, weakSubjects.length);
      return {
        studentId: student.id,
        name: student.name,
        riskScore,
        riskLevel: student.riskLevel === "high" ? "high" : "medium",
        trend: student.performanceTrend,
        attendance: student.attendance,
        explanation: `${student.name} попал в зону риска из-за сочетания ${weakSubjects.slice(0, 2).map((item) => item.subject.toLowerCase()).join(" и ")}, снижения общего тренда до ${student.performanceTrend.toFixed(2)} и посещаемости ${student.attendance.toFixed(1)}%.`,
        nextRisk: buildPrediction(student),
      };
    })
    .sort((a, b) => b.riskScore - a.riskScore);

  const avgTrend = Number((allStudents.reduce((acc, student) => acc + student.performanceTrend, 0) / allStudents.length).toFixed(2));

  return {
    role: "teacher",
    updatedAt: formatNow(),
    diagnostics: {
      confidence: 92,
      riskStudents: flagged.length,
      classAverageTrend: avgTrend,
    },
    summary:
      "AI выделяет не просто слабые оценки, а устойчивые траектории риска. В 10A сейчас есть один ученик с высоким риском и один с умеренным: проблема у обоих не в единичной плохой работе, а в повторяющемся снижении темпа.",
    trendSummary: [
      "Алгебра и физика чаще других становятся источником просадки в динамике.",
      `Средний тренд класса ${avgTrend >= 0 ? "+" : ""}${avgTrend}: класс в целом стабилен, но распределение неоднородно.`,
      "У сильных учеников рост поддерживается достижениями и высокой посещаемостью, у риск-группы просадка идет одновременно по дисциплине и ритму.",
    ],
    riskStudents: flagged,
    recommendations: [
      "Для высокого риска нужен короткий индивидуальный план поддержки на 7 дней, а не общий разговор о мотивации.",
      "Для учеников под наблюдением лучше сработает ранняя точечная помощь по одному предмету до следующего суммативного оценивания.",
      "Сильных учеников важно использовать как ресурс класса: поддержка сверстников снижает барьер обращения за помощью.",
    ],
  };
}

function buildParentInsight(student: Student = primaryStudent): ParentAIInsight {
  const rank = getRank(student);
  return {
    role: "parent",
    updatedAt: formatNow(),
    diagnostics: {
      confidence: 93,
      rankingPosition: rank.position,
      attendance: student.attendance,
    },
    summary: `${student.name} показывает хороший общий прогресс и держится среди лидеров класса. Сейчас важно спокойно поддержать ребенка в двух предметах, где результаты стали менее стабильными, чтобы небольшая просадка не превратилась в устойчивую проблему.`,
    strengths: [
      `Сильные стороны ребенка: ${student.strengths.slice(0, 2).join(" и ")}.`,
      `Посещаемость ${student.attendance.toFixed(1)}% говорит о хорошем базовом ритме.`,
      `Внеучебные достижения помогают сохранять уверенность и интерес к школе.`,
    ],
    attentionPoints: [
      "Алгебра требует более регулярной короткой практики, а не подготовки в последний момент.",
      "По физике важно следить за дедлайнами и заранее закрывать лабораторные задания.",
      "При высокой нагрузке ребенку нужен понятный приоритет на неделю, иначе усилия распыляются.",
    ],
    recommendations: [
      "Помогите ребенку выбрать одну учебную цель на неделю и каждый вечер коротко проверяйте прогресс по ней.",
      "Лучший формат поддержки сейчас: не давление на оценки, а спокойный разговор о том, что именно вызвало трудность.",
      "Если в конце недели не будет улучшения по слабому предмету, стоит попросить у учителя конкретный комментарий по пробелам.",
    ],
    prediction: buildPrediction(student),
  };
}

function buildAdminInsight(): AdminAIInsight {
  const subjectMap = new Map<string, number[]>();

  for (const student of allStudents) {
    for (const grade of student.grades) {
      const current = subjectMap.get(grade.subject) ?? [];
      current.push(grade.average + grade.trend);
      subjectMap.set(grade.subject, current);
    }
  }

  const sortedSubjects = [...subjectMap.entries()]
    .map(([subject, values]) => ({
      subject,
      score: values.reduce((acc, value) => acc + value, 0) / values.length,
    }))
    .sort((a, b) => b.score - a.score);

  const highRiskCount = allStudents.filter((student) => student.riskLevel === "high").length;
  const mediumRiskCount = allStudents.filter((student) => student.riskLevel === "medium").length;
  const averageAttendance = Number((allStudents.reduce((acc, student) => acc + student.attendance, 0) / allStudents.length).toFixed(1));

  return {
    role: "admin",
    updatedAt: formatNow(),
    diagnostics: {
      confidence: 91,
      highRiskCount,
      mediumRiskCount,
      averageAttendance,
    },
    pulse:
      "AI-пульс школы показывает, что школа в целом держит сильный академический контур, но зоны риска распределены неравномерно: сильные результаты поддерживаются за счет естественно-научного и языкового ядра, тогда как математика и физика чаще становятся источником раннего снижения мотивации и рейтинга.",
    strongestSubjects: sortedSubjects.slice(0, 3).map((item) => `${item.subject}: стабильный высокий результат и положительная динамика.`),
    weakestSubjects: sortedSubjects.slice(-3).reverse().map((item) => `${item.subject}: чаще всего дает сигнал риска и требует ранней поддержки.`),
    riskDistribution: [
      `Высокий риск: ${highRiskCount} ученик.`,
      `Умеренный риск: ${mediumRiskCount} ученик.`,
      `Средняя посещаемость по выборке: ${averageAttendance.toFixed(1)}%.`,
    ],
    recommendations: [
      "Самый быстрый эффект на уровне школы даст ранняя поддержка по алгебре и физике до следующего цикла оценивания.",
      "Стоит формализовать публикацию достижений в InsightED: у вовлеченных учеников AI фиксирует более устойчивый рост.",
      "Для демо и управленческого контура важно показывать не только оценки, но и predictive risk, потому что он объясняет, где школе действовать заранее.",
    ],
  };
}

export function generateAiInsight(role: Role = "student", student: Student = primaryStudent): AIInsight {
  switch (role) {
    case "teacher":
      return buildTeacherInsight();
    case "parent":
      return buildParentInsight(student);
    case "admin":
      return buildAdminInsight();
    default:
      return buildStudentInsight(student);
  }
}
