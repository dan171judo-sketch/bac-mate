const SKILL_TO_LESSON: Record<string, string> = {
  "algebră": "numere-reale",
  "algebra": "numere-reale",

  "calcul numeric": "numere-reale",

  "funcții": "functii",
  "functii": "functii",

  "ecuații": "ecuatii",
  "ecuatii": "ecuatii",

  "procente": "procente",
};

function normalizeSkillId(
  value: string
) {
  return value
    .trim()
    .toLocaleLowerCase("ro-RO");
}

export function resolveSkillToLesson(
  skillId: string
): string {
  const normalized =
    normalizeSkillId(skillId);

  return (
    SKILL_TO_LESSON[normalized] ??
    skillId
  );
}

export function getLessonHrefForSkill(
  skillId: string
): string {
  const lessonSlug =
    resolveSkillToLesson(skillId);

  return `/lectii/${encodeURIComponent(
    lessonSlug
  )}`;
}