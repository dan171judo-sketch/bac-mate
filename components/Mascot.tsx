"use client";

export type MascotMood =
  | "idle"
  | "happy"
  | "thinking"
  | "encouraging"
  | "celebrating"
  | "warning";

type MascotProps = {
  mood?: MascotMood;
  message?: string;
  studentName?: string | null;
  compact?: boolean;
};

const moodConfig: Record<
  MascotMood,
  {
    emoji: string;
    label: string;
  }
> = {
  idle: {
    emoji: "🦊",
    label: "Pregătit",
  },

  happy: {
    emoji: "🦊",
    label: "Bravo!",
  },

  thinking: {
    emoji: "🤔",
    label: "Mă gândesc...",
  },

  encouraging: {
    emoji: "💪",
    label: "Continuăm!",
  },

  celebrating: {
    emoji: "🎉",
    label: "Excelent!",
  },

  warning: {
    emoji: "🧠",
    label: "Avem ceva de repetat",
  },
};

export default function Mascot({
  mood = "idle",
  message,
  studentName,
  compact = false,
}: MascotProps) {
  const config = moodConfig[mood];

  const defaultMessage = studentName
    ? `Salut, ${studentName}! Ce zici, facem puțină matematică?`
    : "Salut! Ce zici, facem puțină matematică?";

  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-slate-900 p-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-3xl">
          {config.emoji}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
            BAC MATE
          </p>

          <p className="mt-1 text-sm text-slate-200">
            {message ?? defaultMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-900">
      <div className="relative p-6 sm:p-8">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-blue-400/20 bg-slate-950 text-6xl shadow-lg">
              {config.emoji}
            </div>

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-blue-300">
              {config.label}
            </div>
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              MATE
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Partenerul tău de pregătire
            </h2>

            <div className="relative mt-4 rounded-2xl border border-slate-700 bg-slate-950 p-5">
              <div className="absolute -left-2 top-6 h-4 w-4 rotate-45 border-b border-l border-slate-700 bg-slate-950" />

              <p className="relative leading-7 text-slate-200">
                {message ?? defaultMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}