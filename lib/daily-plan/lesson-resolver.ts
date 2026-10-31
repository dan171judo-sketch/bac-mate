import { lectii } from "../../data/lectii/index";

const SKILL_TO_LESSON: Record<string, string> = {
  algebra: "numere-reale",
  "calcul numeric": "numere-reale",
  functii: "functii",
  ecuatii: "ecuatii",
  procente: "procente",
};

function normalizeText(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("ro-RO")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_–—]/g, "-")
    .replace(/\s+/g, " ");
}

function normalizeForComparison(value: string): string {
  return normalizeText(value)
    .replace(/-/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function findLessonSlug(skillId: string): string | null {
  const normalizedSkill = normalizeForComparison(skillId);

  if (!normalizedSkill) {
    return null;
  }

  const manualSlug =
    SKILL_TO_LESSON[normalizedSkill];

  if (manualSlug) {
    const manualLesson = lectii.find(
      (lectie) =>
        normalizeForComparison(lectie.slug) ===
        normalizeForComparison(manualSlug)
    );

    if (manualLesson) {
      return manualLesson.slug;
    }
  }

  const exactLesson = lectii.find((lectie) => {
    const normalizedId =
      normalizeForComparison(lectie.id);

    const normalizedSlug =
      normalizeForComparison(lectie.slug);

    const normalizedTitle =
      normalizeForComparison(lectie.titlu);

    return (
      normalizedSkill === normalizedId ||
      normalizedSkill === normalizedSlug ||
      normalizedSkill === normalizedTitle
    );
  });

  if (exactLesson) {
    return exactLesson.slug;
  }

  const partialLesson = lectii.find((lectie) => {
    const normalizedTitle =
      normalizeForComparison(lectie.titlu);

    if (
      normalizedSkill.length < 5 ||
      normalizedTitle.length < 5
    ) {
      return false;
    }

    return (
      normalizedTitle.includes(normalizedSkill) ||
      normalizedSkill.includes(normalizedTitle)
    );
  });

  if (partialLesson) {
    return partialLesson.slug;
  }

  return null;
}

export function resolveSkillToLesson(
  skillId: string
): string | null {
  return findLessonSlug(skillId);
}

export function getLessonHrefForSkill(
  skillId: string
): string {
  const lessonSlug =
    resolveSkillToLesson(skillId);

  if (!lessonSlug) {
    return "/lectii";
  }

  return `/lectii/${encodeURIComponent(
    lessonSlug
  )}`;
}