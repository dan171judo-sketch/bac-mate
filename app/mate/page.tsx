"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import BacMateShell from "../../components/BacMateShell";
import { createClient } from "../../lib/supabase/client";
import {
  getDailyPlan,
  type DailyPlanData,
} from "../../lib/daily-plan/service";
import {
  getLessonHrefForSkill,
} from "../../lib/daily-plan/lesson-resolver";

type AvatarGender =
  | "male"
  | "female"
  | "standard";

type ProfileRow = {
  nume: string | null;
  profil_bac: string | null;
  avatar_gender: string | null;
  evaluare_initiala_finalizata:
    | boolean
    | null;
};

type MasteryRow = {
  skill_id: string;
  mastery_score: number | null;
  total_attempts: number | null;
  correct_attempts: number | null;
  consecutive_correct: number | null;
  next_review_at: string | null;
};

type MistakeRow = {
  skill_id: string | null;
  lesson_id: string | null;
  exercise_id: string | null;
 mistake_type: string | null;
  resolved: boolean | null;
  updated_at: string | null;
};

type MascotStateRow = {
  current_focus_skill_id: string | null;
  preferred_difficulty: string | null;
  confidence_score: number | null;
  independence_score: number | null;
  weekly_streak: number | null;
  last_weekly_assessment_at: string | null;
  next_weekly_assessment_at: string | null;
  updated_at: string | null;
};

type ChatMessage = {
  id: string;
  author: "mate" | "student";
  text: string;
};

function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.max(
    min,
    Math.min(max, value)
  );
}

function normaliseGender(
  value: string | null | undefined
): AvatarGender {
  if (value === "male") {
    return "male";
  }

  if (value === "female") {
    return "female";
  }

  return "standard";
}

function formatSkill(skillId: string) {
  return skillId
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatDate(
  value: string | null
) {
  if (!value) {
    return "Nu este programată";
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return "Nu este programată";
  }

  return new Intl.DateTimeFormat(
    "ro-RO",
    {
      day: "2-digit",
      month: "short",
    }
  ).format(date);
}

function MateAvatar({
  gender,
  size = "large",
}: {
  gender: AvatarGender;
  size?: "small" | "large";
}) {
  const isFemale =
    gender === "female";

  const wrapper =
    size === "large"
      ? "h-44 w-44 sm:h-52 sm:w-52"
      : "h-14 w-14";

  if (size === "small") {
    return (
      <div
        className={`${wrapper} relative shrink-0 overflow-hidden rounded-full border border-blue-400/30 bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-violet-500/30 shadow-[0_0_30px_rgba(59,130,246,0.18)]`}
      >
        <div className="absolute inset-x-0 bottom-0 h-[55%] rounded-t-[50%] bg-blue-600/60" />

        <div className="absolute left-1/2 top-[17%] h-[48%] w-[48%] -translate-x-1/2 rounded-[45%] bg-[#f1c5a5]" />

        <div
          className={`absolute left-1/2 top-[10%] h-[30%] -translate-x-1/2 bg-slate-950 ${
            isFemale
              ? "w-[65%] rounded-t-full rounded-bl-[70%] rounded-br-[30%]"
              : "w-[55%] rounded-t-[60%] rounded-bl-[35%] rounded-br-[60%]"
          }`}
        />

        {isFemale && (
          <>
            <div className="absolute left-[18%] top-[25%] h-[45%] w-[14%] rounded-full bg-slate-950" />
            <div className="absolute right-[18%] top-[25%] h-[45%] w-[14%] rounded-full bg-slate-950" />
          </>
        )}

        <div className="absolute left-[36%] top-[38%] h-1.5 w-1.5 rounded-full bg-slate-900" />
        <div className="absolute right-[36%] top-[38%] h-1.5 w-1.5 rounded-full bg-slate-900" />
      </div>
    );
  }

  return (
    <div
      className={`${wrapper} relative shrink-0`}
    >
      <div className="absolute inset-2 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute inset-0 overflow-hidden rounded-[42%] border border-blue-400/20 bg-gradient-to-b from-[#101f42] via-[#08142c] to-[#06101f] shadow-[0_0_50px_rgba(59,130,246,0.2)]">
        <div className="absolute -bottom-[15%] left-1/2 h-[55%] w-[80%] -translate-x-1/2 rounded-t-[45%] bg-gradient-to-b from-blue-600 to-indigo-950" />

        <div className="absolute left-1/2 top-[23%] h-[43%] w-[40%] -translate-x-1/2 rounded-[42%] bg-[#f0c5a6]" />

        <div
          className={`absolute left-1/2 top-[15%] -translate-x-1/2 bg-[#07101f] ${
            isFemale
              ? "h-[31%] w-[54%] rounded-t-[50%] rounded-bl-[75%] rounded-br-[35%]"
              : "h-[26%] w-[48%] rounded-t-[55%] rounded-bl-[35%] rounded-br-[70%]"
          }`}
        />

        {isFemale && (
          <>
            <div className="absolute left-[25%] top-[32%] h-[47%] w-[12%] rounded-full bg-[#07101f]" />
            <div className="absolute right-[25%] top-[32%] h-[47%] w-[12%] rounded-full bg-[#07101f]" />
          </>
        )}

        {!isFemale && (
          <div className="absolute left-[31%] top-[18%] h-[13%] w-[18%] -rotate-[20deg] rounded-full bg-[#07101f]" />
        )}

        <div className="absolute left-[39%] top-[43%] h-2 w-2 rounded-full bg-[#07101f]" />
        <div className="absolute right-[39%] top-[43%] h-2 w-2 rounded-full bg-[#07101f]" />

        <div className="absolute left-1/2 top-[55%] h-[2px] w-[12%] -translate-x-1/2 rounded-full bg-[#b87567]" />

        <div className="absolute bottom-[18%] left-[31%] h-[5%] w-[38%] rounded-full bg-blue-400/70" />
      </div>

      <div className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#07101f] bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  helper,
  accent = "blue",
}: {
  label: string;
  value: string;
  helper: string;
  accent?:
    | "blue"
    | "green"
    | "amber"
    | "violet";
}) {
  const accentClass = {
    blue: "text-blue-400",
    green: "text-emerald-400",
    amber: "text-amber-400",
    violet: "text-violet-400",
  }[accent];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#07101f]/90 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p
        className={`mt-3 text-3xl font-black ${accentClass}`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {helper}
      </p>
    </div>
  );
}

export default function MatePage() {
  const router = useRouter();

  const [supabase] = useState(
    () => createClient()
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [studentName, setStudentName] =
    useState("");

  const [profileName, setProfileName] =
    useState("");

  const [gender, setGender] =
    useState<AvatarGender>(
      "standard"
    );

  const [
    savingGender,
    setSavingGender,
  ] = useState(false);

  const [
    masteryRows,
    setMasteryRows,
  ] = useState<MasteryRow[]>([]);

  const [
    mistakeRows,
    setMistakeRows,
  ] = useState<MistakeRow[]>([]);

  const [
    mascotState,
    setMascotState,
  ] =
    useState<MascotStateRow | null>(
      null
    );

  const [
    signingOut,
    setSigningOut,
  ] = useState(false);

  const [input, setInput] =
    useState("");

  const [
    chatMessages,
    setChatMessages,
  ] = useState<ChatMessage[]>([]);

  const [
    activeAction,
    setActiveAction,
  ] = useState<
    | "today"
    | "weakness"
    | "challenge"
    | null
  >(null);

  const [
    dailyPlanData,
    setDailyPlanData,
  ] = useState<DailyPlanData | null>(
    null
  );

  useEffect(() => {
    let active = true;

    async function loadMate() {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (!active) {
        return;
      }

      if (
        userError ||
        !user
      ) {
        router.replace("/cont");
        return;
      }

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select(
          "nume, profil_bac, avatar_gender, evaluare_initiala_finalizata"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (!active) {
        return;
      }

      if (
        profileError ||
        !profileData
      ) {
        console.error(
          "Eroare profil MATE:",
          profileError
        );

        setError(
          "Profilul tău nu a putut fi încărcat."
        );

        setLoading(false);
        return;
      }

      const profile =
        profileData as ProfileRow;

      if (!profile.nume) {
        router.replace(
          "/date-personale"
        );
        return;
      }

      if (!profile.profil_bac) {
        router.replace("/profil");
        return;
      }

      if (
        !profile.evaluare_initiala_finalizata
      ) {
        router.replace("/evaluare");
        return;
      }

      setStudentName(profile.nume);
      setProfileName(
        profile.profil_bac
      );

      setGender(
        normaliseGender(
          profile.avatar_gender
        )
      );

      const [
        masteryResult,
        mistakesResult,
        stateResult,
      ] = await Promise.all([
        supabase
          .from("student_mastery")
          .select(
            "skill_id, mastery_score, total_attempts, correct_attempts, consecutive_correct, next_review_at"
          )
          .eq("user_id", user.id),

        supabase
          .from("student_mistakes")
          .select(
         "skill_id, lesson_id, exercise_id, mistake_type, resolved, updated_at"
          )
          .eq("user_id", user.id)
          .eq("resolved", false)
          .order(
            "updated_at",
            {
              ascending: false,
            }
          )
          .limit(20),

        supabase
          .from(
            "mascot_student_state"
          )
          .select(
            "current_focus_skill_id, preferred_difficulty, confidence_score, independence_score, weekly_streak, last_weekly_assessment_at, next_weekly_assessment_at, updated_at"
          )
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      if (!active) {
        return;
      }

      if (masteryResult.error) {
        console.error(
          "Eroare student_mastery:",
          masteryResult.error
        );
      } else {
        setMasteryRows(
          (masteryResult.data ??
            []) as unknown as MasteryRow[]
        );
      }

      if (mistakesResult.error) {
        console.error(
          "Eroare student_mistakes:",
          mistakesResult.error
        );
      } else {
        setMistakeRows(
          (mistakesResult.data ??
            []) as unknown as MistakeRow[]
        );
      }

      if (stateResult.error) {
        console.error(
          "Eroare mascot_student_state:",
          stateResult.error
        );
      } else {
        setMascotState(
          (stateResult.data ??
            null) as unknown as MascotStateRow | null
        );
      }

      try {
        const dailyPlan =
          await getDailyPlan(
            supabase,
            {
              maxActions: 3,
            }
          );

        if (active) {
          setDailyPlanData(
            dailyPlan
          );
        }
      } catch (dailyPlanError) {
        console.error(
          "Eroare Daily Plan:",
          dailyPlanError
        );

        if (active) {
          setDailyPlanData(null);
        }
      }

      setLoading(false);
    }

    void loadMate();

    return () => {
      active = false;
    };
  }, [router, supabase]);

  const weakestSkill =
    useMemo(() => {
      if (
        masteryRows.length === 0
      ) {
        return null;
      }

      return [...masteryRows].sort(
        (a, b) =>
          (a.mastery_score ?? 0) -
          (b.mastery_score ?? 0)
      )[0];
    }, [masteryRows]);

  const strongestSkill =
    useMemo(() => {
      if (
        masteryRows.length === 0
      ) {
        return null;
      }

      return [...masteryRows].sort(
        (a, b) =>
          (b.mastery_score ?? 0) -
          (a.mastery_score ?? 0)
      )[0];
    }, [masteryRows]);

  const averageMastery =
    useMemo(() => {
      if (
        masteryRows.length === 0
      ) {
        return 0;
      }

      const total =
        masteryRows.reduce(
          (sum, row) =>
            sum +
            clamp(
              row.mastery_score ??
                0,
              0,
              100
            ),
          0
        );

      return Math.round(
        total /
          masteryRows.length
      );
    }, [masteryRows]);

  const dueForReview =
    useMemo(() => {
      const now = Date.now();

      return masteryRows.filter(
        (row) => {
          if (
            !row.next_review_at
          ) {
            return false;
          }

          const time = new Date(
            row.next_review_at
          ).getTime();

          return (
            !Number.isNaN(time) &&
            time <= now
          );
        }
      );
    }, [masteryRows]);

  const unresolvedMistakes =
    mistakeRows.length;

  const independenceScore =
    clamp(
      mascotState?.independence_score ??
        0,
      0,
      100
    );

  const confidenceScore =
    clamp(
      mascotState?.confidence_score ??
        0,
      0,
      100
    );

  const weeklyStreak =
    Math.max(
      0,
      mascotState?.weekly_streak ??
        0
    );

  const focusSkill =
    mascotState
      ?.current_focus_skill_id ||
    weakestSkill?.skill_id ||
    null;

  const welcomeMessage =
    useMemo(() => {
      if (
        masteryRows.length === 0
      ) {
        return `Salut, ${studentName}! Sunt MATE. Deocamdată nu am suficiente răspunsuri ca să îți construiesc o analiză precisă. Rezolvă câteva exerciții, iar eu voi începe să observ ce stăpânești și unde merită să revenim.`;
      }

      if (
        dueForReview.length > 0
      ) {
        const skill =
          dueForReview[0]
            ?.skill_id;

        return `Salut, ${studentName}! Am găsit ${dueForReview.length} ${
          dueForReview.length === 1
            ? "competență care trebuie revăzută"
            : "competențe care trebuie revăzute"
        }. Aș începe cu ${
          skill
            ? `„${formatSkill(
                skill
              )}”`
            : "cea mai importantă dintre ele"
        }.`;
      }

      if (weakestSkill) {
        return `Salut, ${studentName}! Din datele pe care le avem acum, cea mai bună zonă pentru următoarea recapitulare este „${formatSkill(
          weakestSkill.skill_id
        )}”. O putem lucra pas cu pas.`;
      }

      return `Salut, ${studentName}! Sunt pregătit pentru următoarea sesiune.`;
    }, [
      dueForReview,
      masteryRows.length,
      studentName,
      weakestSkill,
    ]);

  useEffect(() => {
    if (
      loading ||
      !studentName
    ) {
      return;
    }

    setChatMessages((current) => {
      if (
        current.length > 0
      ) {
        return current;
      }

      return [
        {
          id: "mate-welcome",
          author: "mate",
          text: welcomeMessage,
        },
      ];
    });
  }, [
    loading,
    studentName,
    welcomeMessage,
  ]);

  async function chooseGender(
    selectedGender:
      | "male"
      | "female"
  ) {
    if (savingGender) {
      return;
    }

    setSavingGender(true);
    setError("");

    try {
      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (
        userError ||
        !user
      ) {
        router.replace("/cont");
        return;
      }

      const { error: updateError } =
        await supabase
          .from("profiles")
          .update({
            avatar_gender:
              selectedGender,
          })
          .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      setGender(selectedGender);
    } catch (saveError) {
      console.error(
        "Eroare salvare avatar:",
        saveError
      );

      setError(
        "Alegerea personajului nu a putut fi salvată. Încearcă din nou."
      );
    } finally {
      setSavingGender(false);
    }
  }

  async function signOut() {
    setSigningOut(true);

    const { error: signOutError } =
      await supabase.auth.signOut();

    if (signOutError) {
      console.error(
        "Eroare deconectare:",
        signOutError
      );

      setSigningOut(false);
      return;
    }

    localStorage.removeItem(
      "bac-mate-nume"
    );

    localStorage.removeItem(
      "bac-mate-profil-cod"
    );

    localStorage.removeItem(
      "bac-mate-profil-nume"
    );

    localStorage.removeItem(
      "bac-mate-evaluare-initiala-finalizata"
    );

    router.replace("/cont");
    router.refresh();
  }

  function addMateMessage(
    text: string
  ) {
    setChatMessages(
      (current) => [
        ...current,
        {
          id: `mate-${Date.now()}-${Math.random()}`,
          author: "mate",
          text,
        },
      ]
    );
  }

  function startTodayPlan() {
    setActiveAction("today");

    const plan =
      dailyPlanData?.plan;

    if (!plan) {
      addMateMessage(
        "Planul adaptiv nu este disponibil momentan. Poți continua cu următoarea lecție, iar progresul tău va alimenta Mastery Engine."
      );

      return;
    }

    const primary =
      plan.primaryAction;

    if (!primary) {
      addMateMessage(
        plan.message
      );

      return;
    }

    const actionLabel = {
      retest: "o retestare",
      review: "o recapitulare",
      consolidate: "o consolidare",
      continue:
        "continuarea materiei",
    }[primary.action];

    const secondaryText =
      plan.secondaryActions.length > 0
        ? ` După aceea: ${plan.secondaryActions
            .map(
              (item) =>
                `„${formatSkill(
                  item.skillId
                )}”`
            )
            .join(", ")}.`
        : "";

    addMateMessage(
      `Planul tău de azi începe cu ${actionLabel} la „${formatSkill(
        primary.skillId
      )}”. Mastery: ${
        primary.masteryScore
      }/100. ${
        primary.reason
      }${secondaryText}`
    );
  }
function openDailyPlanLesson() {
  const primary =
    dailyPlanData?.plan.primaryAction;

  if (!primary) {
    startTodayPlan();
    return;
  }

  const skillToLesson: Record<
    string,
    string
  > = {
    "algebră": "numere-reale",
    "algebra": "numere-reale",

    "calcul numeric": "numere-reale",

    "funcții": "functii",
    "functii": "functii",

    "ecuații": "ecuatii",
    "ecuatii": "ecuatii",

    "procente": "procente",
  };

  const normalizedSkill =
    primary.skillId
      .trim()
      .toLocaleLowerCase("ro-RO");

  const lessonSlug =
    skillToLesson[normalizedSkill] ??
    primary.skillId;

  router.push(
    `/lectii/${encodeURIComponent(
      lessonSlug
    )}`
  );
}

function explainWeakness() {
  setActiveAction(
    "weakness"
  );

  if (!weakestSkill) {
    addMateMessage(
      "Nu am încă suficiente încercări pentru a identifica în mod responsabil un punct slab. Nu vreau să ghicesc."
    );

    return;
  }

  const score =
    clamp(
      weakestSkill.mastery_score ??
        0,
      0,
      100
    );

  addMateMessage(
    `Zona cu scorul Mastery cel mai mic este „${formatSkill(
      weakestSkill.skill_id
    )}”, cu ${score}/100. Asta nu înseamnă că „nu știi” materia; înseamnă doar că, dintre datele disponibile acum, aici avem cel mai puternic motiv să verificăm din nou.`
  );
}

function startChallenge() {
  setActiveAction(
    "challenge"
  );

  if (!focusSkill) {
    addMateMessage(
      "Provocarea adaptivă va deveni disponibilă după ce avem suficiente date din exercițiile tale. Nu voi inventa acum o problemă matematică neverificată."
    );

    return;
  }

  addMateMessage(
    `Provocarea ta va fi construită în jurul competenței „${formatSkill(
      focusSkill
    )}”. Pentru problemele efective vom folosi numai exerciții verificate din BAC MATE, nu răspunsuri matematice inventate de chat.`
  );
}

  function submitMessage() {
    const text =
      input.trim();

    if (!text) {
      return;
    }

    setChatMessages(
      (current) => [
        ...current,
        {
          id: `student-${Date.now()}`,
          author: "student",
          text,
        },
      ]
    );

    setInput("");

    const lower =
      text.toLocaleLowerCase(
        "ro-RO"
      );

    if (
      lower.includes(
        "nu știu"
      ) ||
      lower.includes(
        "nu stiu"
      )
    ) {
      addMateMessage(
        "E în regulă să marchezi „Nu știu”. Într-o sesiune de exerciții nu voi transforma asta într-un răspuns corect. Vom porni cu un indiciu mic, apoi încă unul doar dacă este necesar."
      );

      return;
    }

    if (
      lower.includes(
        "indiciu"
      )
    ) {
      addMateMessage(
        focusSkill
          ? `Pentru „${formatSkill(
              focusSkill
            )}”, indiciile vor veni gradual și vor fi legate de exercițiul verificat pe care îl rezolvi. Nu îți voi da direct rezultatul.`
          : "Îți pot da indicii gradual în timpul unui exercițiu verificat. Mai întâi trebuie să avem exercițiul concret."
      );

      return;
    }

    if (
      lower.includes(
        "slab"
      ) ||
      lower.includes(
        "greș"
      ) ||
      lower.includes(
        "gres"
      )
    ) {
      explainWeakness();
      return;
    }

    if (
      lower.includes(
        "azi"
      ) ||
      lower.includes(
        "fac"
      ) ||
      lower.includes(
        "învăț"
      ) ||
      lower.includes(
        "invat"
      )
    ) {
      startTodayPlan();
      return;
    }

    addMateMessage(
      "În această versiune MATE folosesc conversația pentru a naviga progresul și pentru a organiza învățarea. Componenta de profesor AI complet va fi conectată separat, cu verificări matematice înainte să îi permitem să explice sau să evalueze exerciții."
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020817] text-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-blue-500/30" />

            <div>
              <p className="font-bold">
                MATE se pregătește...
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Îți citesc progresul și datele de învățare.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error && !studentName) {
    return (
      <main className="min-h-screen bg-[#020817] text-white">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-7">
            <p className="text-sm font-black uppercase tracking-wider text-red-400">
              MATE indisponibil
            </p>

            <h1 className="mt-3 text-3xl font-black">
              Nu am putut încărca profilul.
            </h1>

            <p className="mt-4 text-slate-300">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-bold transition hover:bg-blue-500"
            >
              Încearcă din nou
            </button>
          </div>
        </div>
      </main>
    );
  }

  /*
   * Prima intrare:
   * elevul își alege explicit
   * varianta personajului.
   */
  if (gender === "standard") {
    return (
      <BacMateShell
        studentName={
          studentName
        }
        profileName={
          profileName
        }
        onSignOut={signOut}
        signingOut={
          signingOut
        }
      >
        <div className="mx-auto flex min-h-[calc(100vh-68px)] max-w-6xl items-center px-5 py-12 pb-28 sm:px-8 lg:px-10 lg:pb-12">
          <div className="w-full">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                Bun venit în MATE
              </span>

              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                Alege-l pe{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  MATE
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Este același sistem de învățare.
                Alegerea schimbă doar personajul
                care te însoțește prin BAC MATE.
              </p>
            </div>

            {error && (
              <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-300">
                {error}
              </div>
            )}

            <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
              <button
                type="button"
                disabled={
                  savingGender
                }
                onClick={() =>
                  void chooseGender(
                    "male"
                  )
                }
                className="group rounded-[28px] border border-slate-800 bg-[#07101f] p-7 text-left transition hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/[0.05] disabled:cursor-wait disabled:opacity-60"
              >
                <div className="flex justify-center">
                  <MateAvatar
                    gender="male"
                  />
                </div>

                <div className="mt-7 text-center">
                  <p className="text-2xl font-black">
                    MATE
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Varianta masculină
                  </p>

                  <div className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition group-hover:bg-blue-500">
                    Alege această variantă
                  </div>
                </div>
              </button>

              <button
                type="button"
                disabled={
                  savingGender
                }
                onClick={() =>
                  void chooseGender(
                    "female"
                  )
                }
                className="group rounded-[28px] border border-slate-800 bg-[#07101f] p-7 text-left transition hover:-translate-y-1 hover:border-violet-500/50 hover:bg-violet-500/[0.05] disabled:cursor-wait disabled:opacity-60"
              >
                <div className="flex justify-center">
                  <MateAvatar
                    gender="female"
                  />
                </div>

                <div className="mt-7 text-center">
                  <p className="text-2xl font-black">
                    MATE
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Varianta feminină
                  </p>

                  <div className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-black text-white transition group-hover:bg-violet-500">
                    Alege această variantă
                  </div>
                </div>
              </button>
            </div>

            <p className="mt-7 text-center text-xs text-slate-600">
              Alegerea poate fi mutată ulterior
              în setările profilului.
            </p>
          </div>
        </div>
      </BacMateShell>
    );
  }

  return (
    <BacMateShell
      studentName={studentName}
      profileName={profileName}
      onSignOut={signOut}
      signingOut={signingOut}
    >
      <div className="mx-auto max-w-[1450px] px-5 py-7 pb-28 sm:px-7 lg:px-9 lg:pb-12 xl:px-10">
        {/* TITLU */}

        <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
              Centrul tău de pregătire
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Salut, {studentName}! 👋
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              MATE folosește progresul tău
              pentru a decide ce merită
              revăzut și care este următorul
              pas.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
              ● MATE activ
            </span>

            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-400">
              {masteryRows.length} competențe urmărite
            </span>
          </div>
        </section>

        {/* HERO MATE */}

        <section className="relative mt-7 overflow-hidden rounded-[28px] border border-blue-500/20 bg-gradient-to-br from-[#091a38] via-[#071225] to-[#080d1b]">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[90px]" />
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-violet-500/[0.08] blur-[100px]" />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[240px_1fr] lg:items-center lg:p-9">
            <div className="flex justify-center">
              <MateAvatar
                gender={gender}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-blue-300">
                  MATE
                </span>

                <span className="text-xs font-semibold text-emerald-400">
                  ● online
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                Partenerul tău personal de matematică
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                {welcomeMessage}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={
                    startTodayPlan
                  }
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black transition hover:bg-blue-500"
                >
                  Planul meu de azi →
                </button>

                <button
                  type="button"
                  onClick={
                    explainWeakness
                  }
                  className="rounded-xl border border-slate-700 bg-slate-950/40 px-5 py-3 text-sm font-black text-slate-200 transition hover:border-slate-600 hover:bg-slate-900"
                >
                  Ce trebuie să repet?
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* STATISTICI */}

        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Mastery mediu"
            value={`${averageMastery}%`}
            helper={
              masteryRows.length > 0
                ? `Calculat din ${masteryRows.length} competențe urmărite`
                : "Așteptăm mai multe răspunsuri"
            }
            accent="blue"
          />

          <StatCard
            label="De repetat"
            value={String(
              dueForReview.length
            )}
            helper="Competențe ajunse la termen pentru recapitulare"
            accent="amber"
          />

          <StatCard
            label="Greșeli active"
            value={String(
              unresolvedMistakes
            )}
            helper="Greșeli încă nerezolvate în istoricul tău"
            accent="violet"
          />

          <StatCard
            label="Serie săptămânală"
            value={`${weeklyStreak}`}
            helper="Săptămâni consecutive înregistrate de MATE"
            accent="green"
          />
        </section>
{/* PLANUL ADAPTIV DE AZI */}

{dailyPlanData?.plan.primaryAction && (
  <section className="mt-5 overflow-hidden rounded-[26px] border border-blue-500/25 bg-gradient-to-br from-blue-500/[0.10] via-[#07101f] to-violet-500/[0.07]">
    <div className="p-6 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-blue-300">
              Planul tău de azi
            </span>

            <span className="rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1 text-[11px] font-bold text-slate-400">
              {dailyPlanData.plan.primaryAction.priority ===
              "critical"
                ? "Prioritate critică"
                : dailyPlanData.plan.primaryAction
                      .priority === "high"
                  ? "Prioritate mare"
                  : dailyPlanData.plan.primaryAction
                        .priority === "normal"
                    ? "Prioritate normală"
                    : "Menținere"}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-white">
            {formatSkill(
              dailyPlanData.plan.primaryAction.skillId
            )}
          </h2>

          <p className="mt-2 text-sm font-bold text-blue-300">
            {dailyPlanData.plan.primaryAction.action ===
            "retest"
              ? "Retestare recomandată"
              : dailyPlanData.plan.primaryAction.action ===
                  "review"
                ? "Recapitulare recomandată"
                : dailyPlanData.plan.primaryAction.action ===
                    "consolidate"
                  ? "Consolidare recomandată"
                  : "Continuă materia"}
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
            {dailyPlanData.plan.primaryAction.reason}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-lg bg-slate-950/60 px-3 py-2 text-xs font-bold text-slate-300">
              Mastery{" "}
              {
                dailyPlanData.plan.primaryAction
                  .masteryScore
              }
              /100
            </span>

            <span className="rounded-lg bg-slate-950/60 px-3 py-2 text-xs font-bold text-slate-300">
              {
                dailyPlanData.plan.primaryAction
                  .totalAttempts
              }{" "}
              încercări
            </span>

            {dailyPlanData.plan.primaryAction
              .unresolvedMistakes > 0 && (
              <span className="rounded-lg bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-300">
                {
                  dailyPlanData.plan.primaryAction
                    .unresolvedMistakes
                }{" "}
                greșeli active
              </span>
            )}

            {dailyPlanData.plan.primaryAction.reviewDue && (
              <span className="rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300">
                Recapitulare scadentă
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={openDailyPlanLesson}
            className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 lg:w-auto"
          >
            Începe acum →
          </button>
        </div>
      </div>

      {dailyPlanData.plan.secondaryActions.length >
        0 && (
        <div className="mt-6 border-t border-slate-800/80 pt-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            După aceea
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {dailyPlanData.plan.secondaryActions.map(
              (item) => (
                <span
                  key={`${item.skillId}-${item.action}`}
                  className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2 text-xs font-bold text-slate-300"
                >
                  {formatSkill(item.skillId)} ·{" "}
                  {item.action === "retest"
                    ? "retestare"
                    : item.action === "review"
                      ? "recapitulare"
                      : item.action ===
                          "consolidate"
                        ? "consolidare"
                        : "continuare"}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  </section>
)}

{/* GRID PRINCIPAL */}
        {/* GRID PRINCIPAL */}

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(330px,0.7fr)]">
          {/* CHAT */}

          <section className="overflow-hidden rounded-[26px] border border-slate-800 bg-[#07101f]">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <MateAvatar
                  gender={gender}
                  size="small"
                />

                <div>
                  <p className="font-black">
                    Vorbește cu MATE
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Ghid pentru progres și învățare
                  </p>
                </div>
              </div>

              <span className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300 sm:inline-flex">
                activ
              </span>
            </div>

            <div className="h-[420px] space-y-4 overflow-y-auto p-5 sm:p-6">
              {chatMessages.map(
                (message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.author ===
                      "student"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[78%] ${
                        message.author ===
                        "student"
                          ? "rounded-br-md bg-blue-600 text-white"
                          : "rounded-bl-md border border-slate-800 bg-slate-950 text-slate-300"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="border-t border-slate-800 p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={
                    startTodayPlan
                  }
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                    activeAction ===
                    "today"
                      ? "border-blue-400/40 bg-blue-500/15 text-blue-300"
                      : "border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  Ce fac azi?
                </button>

                <button
                  type="button"
                  onClick={
                    explainWeakness
                  }
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                    activeAction ===
                    "weakness"
                      ? "border-violet-400/40 bg-violet-500/15 text-violet-300"
                      : "border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  Unde am probleme?
                </button>

                <button
                  type="button"
                  onClick={
                    startChallenge
                  }
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                    activeAction ===
                    "challenge"
                      ? "border-amber-400/40 bg-amber-500/15 text-amber-300"
                      : "border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  Provocarea mea
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) =>
                    setInput(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                      "Enter"
                    ) {
                      submitMessage();
                    }
                  }}
                  placeholder="Scrie-i lui MATE..."
                  className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60"
                />

                <button
                  type="button"
                  onClick={
                    submitMessage
                  }
                  className="rounded-xl bg-blue-600 px-4 font-black transition hover:bg-blue-500"
                  aria-label="Trimite mesajul"
                >
                  ↑
                </button>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-slate-600">
                În V1, conversația organizează
                progresul. Corectitudinea
                matematică rămâne în sistemele
                verificate BAC MATE.
              </p>
            </div>
          </section>

          {/* COLOANA DREAPTA */}

          <div className="space-y-5">
            {/* FOCUS */}

            <section className="rounded-[26px] border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.09] to-violet-500/[0.04] p-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-400">
                Focus curent
              </p>

              <h3 className="mt-3 text-xl font-black">
                {focusSkill
                  ? formatSkill(
                      focusSkill
                    )
                  : "În curs de identificare"}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {focusSkill
                  ? "Aceasta este zona pe care MATE o prioritizează momentan pe baza datelor disponibile."
                  : "Rezolvă exerciții pentru ca MATE să poată identifica o prioritate reală."}
              </p>

              {weakestSkill && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">
                      Mastery
                    </span>

                    <span className="text-blue-300">
                      {clamp(
                        weakestSkill.mastery_score ??
                          0,
                        0,
                        100
                      )}
                      %
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-950">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                      style={{
                        width: `${clamp(
                          weakestSkill.mastery_score ??
                            0,
                          0,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* STARE PEDAGOGICĂ */}

            <section className="rounded-[26px] border border-slate-800 bg-[#07101f] p-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-400">
                Starea mea de învățare
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-400">
                      Independență
                    </span>

                    <span className="font-black text-white">
                      {independenceScore}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-950">
                    <div
                      className="h-full rounded-full bg-violet-500"
                      style={{
                        width: `${independenceScore}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-400">
                      Încredere
                    </span>

                    <span className="font-black text-white">
                      {confidenceScore}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-950">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${confidenceScore}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-5 text-xs leading-5 text-slate-600">
                Aceste scoruri sunt afișate
                numai din starea salvată a
                elevului. Dacă nu există încă
                date, pornesc de la 0.
              </p>
            </section>

            {/* EVALUARE SĂPTĂMÂNALĂ */}

            <section className="rounded-[26px] border border-amber-500/20 bg-amber-500/[0.04] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-400">
                    Evaluare săptămânală
                  </p>

                  <h3 className="mt-2 text-lg font-black">
                    Verifică progresul
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-xl">
                  ✓
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Următoarea evaluare:{" "}
                <span className="font-bold text-slate-200">
                  {formatDate(
                    mascotState
                      ?.next_weekly_assessment_at ??
                      null
                  )}
                </span>
              </p>

              <a
               href="/evaluare-saptamanala"
                className="mt-5 block rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-center text-sm font-black text-amber-300 transition hover:bg-amber-500/15"
              >
                Deschide evaluările →
              </a>
            </section>
          </div>
        </div>

        {/* ZONA DE JOS */}

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* PUNCT SLAB */}

          <section className="rounded-[26px] border border-slate-800 bg-[#07101f] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-400">
                  De consolidat
                </p>

                <h3 className="mt-2 text-xl font-black">
                  {weakestSkill
                    ? formatSkill(
                        weakestSkill.skill_id
                      )
                    : "Așteptăm date suficiente"}
                </h3>
              </div>

              {weakestSkill && (
                <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-black text-rose-300">
                  {clamp(
                    weakestSkill.mastery_score ??
                      0,
                    0,
                    100
                  )}
                  /100
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              {weakestSkill
                ? "Este competența cu cel mai mic scor Mastery dintre datele disponibile în acest moment."
                : "MATE nu va declara un punct slab până când nu există suficiente încercări salvate."}
            </p>

            <button
              type="button"
              onClick={
                explainWeakness
              }
              className="mt-5 rounded-xl border border-slate-700 px-4 py-3 text-sm font-black text-slate-200 transition hover:bg-slate-900"
            >
              Analizează cu MATE
            </button>
          </section>

          {/* PUNCT FORTE */}

          <section className="rounded-[26px] border border-slate-800 bg-[#07101f] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-400">
                  Punct forte
                </p>

                <h3 className="mt-2 text-xl font-black">
                  {strongestSkill
                    ? formatSkill(
                        strongestSkill.skill_id
                      )
                    : "Încă ne cunoaștem"}
                </h3>
              </div>

              {strongestSkill && (
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                  {clamp(
                    strongestSkill.mastery_score ??
                      0,
                    0,
                    100
                  )}
                  /100
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              {strongestSkill
                ? "Aceasta este competența cu cel mai mare scor Mastery din datele actuale."
                : "După mai multe exerciții, aici va apărea zona în care demonstrezi cea mai bună stăpânire."}
            </p>

            <button
              type="button"
              onClick={
                startChallenge
              }
              className="mt-5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-3 text-sm font-black transition hover:opacity-90"
            >
              Încearcă o provocare →
            </button>
          </section>
        </div>

        {/* DISCLAIMER DE DATE */}

        <section className="mt-5 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-5 py-4">
          <p className="text-xs leading-5 text-slate-600">
            MATE V1 personalizează recomandările
            folosind datele reale salvate în
            cont. Nu estimează pregătirea pentru
            BAC atunci când nu există suficiente
            date și nu folosește conversația ca
            sursă de adevăr pentru verificarea
            matematică.
          </p>
        </section>
      </div>
    </BacMateShell>
  );
}