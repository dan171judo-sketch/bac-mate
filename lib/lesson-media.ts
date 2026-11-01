
import bunnyDurations from "./bunny-durations.json";

export type LessonVideoMedia = {
  videoUrl: string;
  subtitleUrl?: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
};

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function getVideoId(
  moduleNumber: number,
  lessonNumber: number,
  videoNumber: number
): string {
  return `BAC-MATE-M${moduleNumber}-L${pad(lessonNumber)}-V${videoNumber}`;
}

function getExpectedVideoCount(
  moduleNumber: number,
  lessonNumber: number
): number {
  switch (moduleNumber) {
    case 1:
      return lessonNumber >= 1 && lessonNumber <= 10 ? 4 : 0;

    case 2:
      return lessonNumber >= 1 && lessonNumber <= 14 ? 3 : 0;

    case 3:
      return lessonNumber >= 1 && lessonNumber <= 9 ? 4 : 0;

    case 4:
      return lessonNumber >= 1 && lessonNumber <= 13 ? 3 : 0;

    case 5:
      return lessonNumber >= 1 && lessonNumber <= 18 ? 4 : 0;

    default:
      return 0;
  }
}

export function getLessonVideoMedia(
  moduleNumber: number,
  lessonNumber: number,
  videoNumber: number
): LessonVideoMedia | null {
  const expectedCount = getExpectedVideoCount(
    moduleNumber,
    lessonNumber
  );

  if (
    !Number.isInteger(moduleNumber) ||
    !Number.isInteger(lessonNumber) ||
    !Number.isInteger(videoNumber) ||
    videoNumber < 1 ||
    videoNumber > expectedCount
  ) {
    return null;
  }

  const videoId = getVideoId(
    moduleNumber,
    lessonNumber,
    videoNumber
  );

  const durations: Record<string, number> = bunnyDurations;
  const durationSeconds = durations[videoId];

  const videoUrl = `https://ujkqlrgbpfihubbusttq.supabase.co/storage/v1/object/public/bac-mate-videos/module-${moduleNumber}/lesson-${pad(lessonNumber)}/video-${videoNumber}.mp4`;

  return {
    videoUrl,
    durationSeconds:
      typeof durationSeconds === "number" &&
      Number.isFinite(durationSeconds) &&
      durationSeconds > 0
        ? durationSeconds
        : undefined,
  };
}

export function formatVideoDuration(
  seconds?: number
): string | null {
  if (
    typeof seconds !== "number" ||
    !Number.isFinite(seconds) ||
    seconds <= 0
  ) {
    return null;
  }

  const totalSeconds = Math.round(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return (
    `${String(minutes).padStart(2, "0")}:` +
    `${String(remainingSeconds).padStart(2, "0")}`
  );
}
