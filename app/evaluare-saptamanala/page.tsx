"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import BacMateShell from "../../components/BacMateShell";
import { createClient } from "../../lib/supabase/client";
import {
  createWeeklyAssessment,
  completeWeeklyAssessment,
} from "../../lib/weekly-assessment/service";

type AvatarGender = "male" | "female" | "standard";

type ProfileRow = {
  nume: string | null;
  profil_bac: string | null;
  avatar_gender: string | null;
  evaluare_initiala_finalizata: boolean | null;
};

type MasteryRow = {
  skill_id: string;
  mastery_score: number | null;
  total_attempts: number | null;
  correct_attempts: number | null;
  consecutive_correct: number | null;
  next_review_at: string | null;
};

type WeeklyQuestion = {
  id: string;
  skillId: string;
  title: string;
  statement: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
};

type SessionQuestion = WeeklyQuestion & {
  requestedSkillId: string;
};

type AnswerRecord = {
  questionId: string;
  skillId: string;
  isCorrect: boolean;
  selectedIndex: number;
};

type WeeklyResult = {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  strongestSkillId: string | null;
  weakestSkillId: string | null;
};

type AssessmentPlanLike = {
  selectedSkills?: Array<
    | string
    | {
        skillId?: string;
        skill_id?: string;
      }
  >;
  skills?: Array<
    | string
    | {
        skillId?: string;
        skill_id?: string;
      }
  >;
  questions?: Array<{
    skillId?: string;
    skill_id?: string;
  }>;
};

type CreatedAssessmentLike = {
  assessmentId?: string;
  assessment_id?: string;
  id?: string;
  plan?: AssessmentPlanLike;
};

const QUESTION_BANK: WeeklyQuestion[] = [
  {
    id: "weekly-modul-1",
    skillId: "modul-numar-real",
    title: "Modulul unui număr real",
    statement: "Care este valoarea lui |−7|?",
    answers: ["−7", "0", "7", "14"],
    correctIndex: 2,
    explanation:
      "Modulul reprezintă distanța față de 0, deci |−7| = 7.",
  },
  {
    id: "weekly-modul-2",
    skillId: "modul-numar-real",
    title: "Modulul unui număr real",
    statement: "Care afirmație este corectă?",
    answers: [
      "|5| = −5",
      "|−3| = 3",
      "|0| = 1",
      "|−8| = −8",
    ],
    correctIndex: 1,
    explanation:
      "Modulul unui număr negativ este opusul acelui număr. Prin urmare |−3| = 3.",
  },
  {
    id: "weekly-intervale-1",
    skillId: "intervale-numere-reale",
    title: "Intervale de numere reale",
    statement: "Care număr aparține intervalului [2, 5]?",
    answers: ["1", "2", "6", "−2"],
    correctIndex: 1,
    explanation:
      "Intervalul [2, 5] conține toate numerele de la 2 la 5, inclusiv capetele.",
  },
  {
    id: "weekly-intervale-2",
    skillId: "intervale-numere-reale",
    title: "Intervale de numere reale",
    statement: "Care descriere corespunde intervalului (−∞, 4)?",
    answers: ["x < 4", "x ≤ 4", "x > 4", "x ≥ 4"],
    correctIndex: 0,
    explanation:
      "Paranteza rotundă la 4 arată că 4 nu este inclus, deci x < 4.",
  },
  {
    id: "weekly-numere-reale-1",
    skillId: "numere-reale",
    title: "Numere reale",
    statement: "Care dintre următoarele numere este irațional?",
    answers: ["0,5", "3", "√2", "−7"],
    correctIndex: 2,
    explanation:
      "√2 este irațional. Celelalte variante sunt numere raționale.",
  },
  {
    id: "weekly-estimari-1",
    skillId: "estimari-aproximari",
    title: "Estimări și aproximări",
    statement: "Rotunjirea numărului 7,46 la o zecimală este:",
    answers: ["7,4", "7,5", "7,46", "8"],
    correctIndex: 1,
    explanation:
      "Cifra sutimilor este 6, deci cifra zecimilor crește de la 4 la 5.",
  },
  {
    id: "weekly-procente-1",
    skillId: "procente",
    title: "Procente",
    statement: "Cât reprezintă 20% din 150?",
    answers: ["20", "25", "30", "35"],
    correctIndex: 2,
    explanation:
      "20% din 150 înseamnă 0,20 × 150 = 30.",
  },
  {
    id: "weekly-procente-2",
    skillId: "procente",
    title: "Procente",
    statement: "Un produs costă 200 lei și se reduce cu 10%. Noul preț este:",
    answers: ["180 lei", "190 lei", "210 lei", "220 lei"],
    correctIndex: 0,
    explanation:
      "10% din 200 este 20, iar 200 − 20 = 180 lei.",
  },
  {
    id: "weekly-ecuatii-1",
    skillId: "ecuatii",
    title: "Ecuații",
    statement: "Soluția ecuației 2x + 3 = 11 este:",
    answers: ["2", "3", "4", "7"],
    correctIndex: 2,
    explanation:
      "2x + 3 = 11 ⇒ 2x = 8 ⇒ x = 4.",
  },
  {
    id: "weekly-functii-1",
    skillId: "functii",
    title: "Funcții",
    statement: "Dacă f(x) = 2x + 1, atunci f(3) este:",
    answers: ["5", "6", "7", "8"],
    correctIndex: 2,
    explanation:
      "Înlocuim x cu 3: f(3) = 2 × 3 + 1 = 7.",
  },
];

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

function normaliseSkillId(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("ro-RO")
    .replaceAll("_", "-")
    .replace(/\s+/g, "-");
}

function formatSkill(skillId: string | null) {
  if (!skillId) {
    return "—";
  }

  return skillId
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toLocaleUpperCase("ro-RO")
    );
}

function extractPlanSkills(
  plan: AssessmentPlanLike | undefined
) {
  if (!plan) {
    return [];
  }

  const source =
    plan.selectedSkills ??
    plan.skills ??
    plan.questions ??
    [];

  return source
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      return (
        item.skillId ??
        item.skill_id ??
        ""
      );
    })
    .filter(Boolean);
}

function findQuestionForSkill(
  skillId: string,
  alreadyUsed: Set<string>
) {
  const normalised =
    normaliseSkillId(skillId);

  const exact = QUESTION_BANK.find(
    (question) =>
      !alreadyUsed.has(question.id) &&
      normaliseSkillId(
        question.skillId
      ) === normalised
  );

  if (exact) {
    return exact;
  }

  const partial = QUESTION_BANK.find(
    (question) => {
      if (
        alreadyUsed.has(question.id)
      ) {
        return false;
      }

      const questionSkill =
        normaliseSkillId(
          question.skillId
        );

      return (
        questionSkill.includes(
          normalised
        ) ||
        normalised.includes(
          questionSkill
        )
      );
    }
  );

  return partial ?? null;
}

function buildQuestions(
  requestedSkills: string[],
  masteryRows: MasteryRow[],
  maxQuestions = 5
): SessionQuestion[] {
  const used = new Set<string>();
  const result: SessionQuestion[] = [];

  const orderedSkills =
    requestedSkills.length > 0
      ? requestedSkills
      : [...masteryRows]
          .sort(
            (a, b) =>
              (a.mastery_score ?? 0) -
              (b.mastery_score ?? 0)
          )
          .map(
            (row) => row.skill_id
          );

  for (const skillId of orderedSkills) {
    if (
      result.length >= maxQuestions
    ) {
      break;
    }

    const question =
      findQuestionForSkill(
        skillId,
        used
      );

    if (!question) {
      continue;
    }

    used.add(question.id);

    result.push({
      ...question,
      requestedSkillId: skillId,
    });
  }

  if (result.length < maxQuestions) {
    for (const question of QUESTION_BANK) {
      if (
        result.length >= maxQuestions
      ) {
        break;
      }

      if (
        used.has(question.id)
      ) {
        continue;
      }

      used.add(question.id);

      result.push({
        ...question,
        requestedSkillId:
          question.skillId,
      });
    }
  }

  return result;
}

function MateAssessmentAvatar({
  gender,
}: {
  gender: AvatarGender;
}) {
  const isFemale =
    gender === "female";

  return (
    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
      <div className="absolute inset-1 rounded-full bg-blue-500/20 blur-2xl" />

      <div className="absolute inset-0 overflow-hidden rounded-[38%] border border-blue-400/20 bg-gradient-to-b from-[#101f42] via-[#08142c] to-[#06101f]">
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

        <div className="absolute left-[39%] top-[43%] h-1.5 w-1.5 rounded-full bg-[#07101f]" />
        <div className="absolute right-[39%] top-[43%] h-1.5 w-1.5 rounded-full bg-[#07101f]" />

        <div className="absolute left-1/2 top-[55%] h-[2px] w-[12%] -translate-x-1/2 rounded-full bg-[#b87567]" />
      </div>

      <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#07101f] bg-emerald-500">
        <span className="h-2 w-2 rounded-full bg-white" />
      </div>
    </div>
  );
}

function ProgressDots({
  total,
  current,
  answers,
}: {
  total: number;
  current: number;
  answers: AnswerRecord[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({
        length: total,
      }).map((_, index) => {
        const answer =
          answers[index];

        let className =
          "border-slate-700 bg-slate-950 text-slate-500";

        if (answer) {
          className = answer.isCorrect
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
            : "border-rose-500/30 bg-rose-500/10 text-rose-300";
        } else if (index === current) {
          className =
            "border-blue-500/40 bg-blue-500/15 text-blue-300";
        }

        return (
          <div
            key={index}
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-black ${className}`}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
}

export default function WeeklyAssessmentPage() {
  const router = useRouter();

  const [supabase] = useState(
    () => createClient()
  );

  const [loading, setLoading] =
    useState(true);

  const [starting, setStarting] =
    useState(false);

  const [finishing, setFinishing] =
    useState(false);

  const [signingOut, setSigningOut] =
    useState(false);

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
    masteryRows,
    setMasteryRows,
  ] = useState<MasteryRow[]>([]);

  const [
    assessmentId,
    setAssessmentId,
  ] = useState<string | null>(
    null
  );

  const [
    questions,
    setQuestions,
  ] = useState<SessionQuestion[]>(
    []
  );

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState<number | null>(
    null
  );

  const [
    answerChecked,
    setAnswerChecked,
  ] = useState(false);

  const [
    answers,
    setAnswers,
  ] = useState<AnswerRecord[]>(
    []
  );

  const [
    result,
    setResult,
  ] = useState<WeeklyResult | null>(
    null
  );

  useEffect(() => {
    let active = true;

    async function loadPage() {
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
          "Eroare profil evaluare săptămânală:",
          profileError
        );

        setError(
          "Profilul nu a putut fi încărcat."
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

      setStudentName(
        profile.nume
      );

      setProfileName(
        profile.profil_bac
      );

      setGender(
        normaliseGender(
          profile.avatar_gender
        )
      );

      const {
        data: masteryData,
        error: masteryError,
      } = await supabase
        .from("student_mastery")
        .select(
          "skill_id, mastery_score, total_attempts, correct_attempts, consecutive_correct, next_review_at"
        )
        .eq("user_id", user.id);

      if (!active) {
        return;
      }

      if (masteryError) {
        console.error(
          "Eroare Mastery:",
          masteryError
        );
      } else {
        setMasteryRows(
          (masteryData ??
            []) as unknown as MasteryRow[]
        );
      }

      setLoading(false);
    }

    void loadPage();

    return () => {
      active = false;
    };
  }, [router, supabase]);

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
            Math.max(
              0,
              Math.min(
                100,
                row.mastery_score ??
                  0
              )
            ),
          0
        );

      return Math.round(
        total /
          masteryRows.length
      );
    }, [masteryRows]);

  const currentQuestion =
    questions[currentIndex] ??
    null;

  const progress =
    questions.length > 0
      ? Math.round(
          ((currentIndex +
            (answerChecked ? 1 : 0)) /
            questions.length) *
            100
        )
      : 0;

  async function signOut() {
    setSigningOut(true);

    const {
      error: signOutError,
    } =
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

  async function startAssessment() {
    if (starting) {
      return;
    }

    setStarting(true);
    setError("");

    try {
      if (
        masteryRows.length === 0
      ) {
        setError(
          "MATE nu are încă suficiente date pentru evaluarea săptămânală. Rezolvă mai întâi câteva exerciții din lecții."
        );

        return;
      }

      const created =
        (await createWeeklyAssessment(
          supabase
        )) as unknown as CreatedAssessmentLike;

      const id =
        created.assessmentId ??
        created.assessment_id ??
        created.id ??
        null;

      if (!id) {
        throw new Error(
          "Evaluarea a fost creată fără identificator."
        );
      }

      const requestedSkills =
        extractPlanSkills(
          created.plan
        );

      const builtQuestions =
        buildQuestions(
          requestedSkills,
          masteryRows,
          5
        );

      if (
        builtQuestions.length === 0
      ) {
        throw new Error(
          "Nu există încă întrebări verificate pentru competențele selectate."
        );
      }

      setAssessmentId(id);
      setQuestions(
        builtQuestions
      );

      setCurrentIndex(0);
      setSelectedIndex(null);
      setAnswerChecked(false);
      setAnswers([]);
      setResult(null);
    } catch (startError) {
      console.error(
        "Eroare pornire evaluare săptămânală:",
        startError
      );

      setError(
        startError instanceof Error
          ? startError.message
          : "Evaluarea săptămânală nu a putut fi pornită."
      );
    } finally {
      setStarting(false);
    }
  }

  function checkAnswer() {
    if (
      !currentQuestion ||
      selectedIndex === null ||
      answerChecked
    ) {
      return;
    }

    const isCorrect =
      selectedIndex ===
      currentQuestion.correctIndex;

    const record: AnswerRecord = {
      questionId:
        currentQuestion.id,
      skillId:
        currentQuestion.requestedSkillId ||
        currentQuestion.skillId,
      isCorrect,
      selectedIndex,
    };

    setAnswers(
      (current) => [
        ...current,
        record,
      ]
    );

    setAnswerChecked(true);
  }

  async function finishAssessment(
    finalAnswers: AnswerRecord[]
  ) {
    if (
      !assessmentId ||
      finishing
    ) {
      return;
    }

    setFinishing(true);
    setError("");

    try {
      const serviceResults =
        finalAnswers.map(
          (answer) => ({
            skillId:
              answer.skillId,
            isCorrect:
              answer.isCorrect,
          })
        );

      const completed =
        await completeWeeklyAssessment(
          supabase,
          assessmentId,
          serviceResults
        );

      const completedResult =
        completed as unknown as {
          totalQuestions?: number;
          correctAnswers?: number;
          score?: number;
          strongestSkillId?:
            | string
            | null;
          weakestSkillId?:
            | string
            | null;
          result?: WeeklyResult;
        };

      const serviceResult =
        completedResult.result;

      if (serviceResult) {
        setResult(
          serviceResult
        );
      } else {
        const correct =
          finalAnswers.filter(
            (answer) =>
              answer.isCorrect
          ).length;

        const total =
          finalAnswers.length;

        const score =
          total > 0
            ? Math.round(
                (correct /
                  total) *
                  100
              )
            : 0;

        setResult({
          totalQuestions:
            completedResult.totalQuestions ??
            total,

          correctAnswers:
            completedResult.correctAnswers ??
            correct,

          score:
            completedResult.score ??
            score,

          strongestSkillId:
            completedResult.strongestSkillId ??
            null,

          weakestSkillId:
            completedResult.weakestSkillId ??
            null,
        });
      }
    } catch (finishError) {
      console.error(
        "Eroare finalizare evaluare:",
        finishError
      );

      setError(
        finishError instanceof Error
          ? finishError.message
          : "Rezultatul nu a putut fi salvat."
      );
    } finally {
      setFinishing(false);
    }
  }

  async function nextQuestion() {
    if (
      !answerChecked ||
      !currentQuestion
    ) {
      return;
    }

    if (
      currentIndex <
      questions.length - 1
    ) {
      setCurrentIndex(
        (current) =>
          current + 1
      );

      setSelectedIndex(null);
      setAnswerChecked(false);

      return;
    }

    await finishAssessment(
      answers
    );
  }

  function restartLocalView() {
    setAssessmentId(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswerChecked(false);
    setAnswers([]);
    setResult(null);
    setError("");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020817] text-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 animate-pulse rounded-full bg-blue-500/30" />

            <div>
              <p className="font-black">
                MATE pregătește evaluarea...
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Analizez progresul tău pentru a alege zonele potrivite.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (
    error &&
    !studentName
  ) {
    return (
      <main className="min-h-screen bg-[#020817] text-white">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-7">
            <p className="text-sm font-black uppercase tracking-wider text-red-400">
              Evaluare indisponibilă
            </p>

            <h1 className="mt-3 text-3xl font-black">
              Nu am putut încărca pagina.
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

  return (
    <BacMateShell
      studentName={studentName}
      profileName={profileName}
      onSignOut={signOut}
      signingOut={signingOut}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-7 pb-28 sm:px-7 lg:px-9 lg:pb-12">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">
              MATE · verificare săptămânală
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Evaluarea ta săptămânală
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              O verificare scurtă construită din progresul tău. Scopul nu este să te noteze, ci să afle ce ai consolidat și ce merită repetat.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push("/mate")
            }
            className="self-start rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-2.5 text-sm font-bold text-slate-400 transition hover:border-slate-700 hover:text-white"
          >
            ← Înapoi la MATE
          </button>
        </section>

        {error && studentName && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm leading-6 text-red-300">
            {error}
          </div>
        )}

        {!assessmentId &&
          !result && (
            <>
              <section className="relative mt-7 overflow-hidden rounded-[30px] border border-blue-500/20 bg-gradient-to-br from-[#091a38] via-[#071225] to-[#080d1b]">
                <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[90px]" />

                <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-500/[0.07] blur-[100px]" />

                <div className="relative grid gap-7 p-6 sm:p-8 md:grid-cols-[140px_1fr] md:items-center lg:p-10">
                  <div className="flex justify-center">
                    <MateAssessmentAvatar
                      gender={gender}
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-blue-300">
                        MATE
                      </span>

                      <span className="text-xs font-semibold text-emerald-400">
                        ● pregătit
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                      Salut, {studentName}. Hai să vedem ce a rămas cu tine.
                    </h2>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                      Voi prioritiza competențele care au nevoie de verificare. După răspunsuri îți arăt rezultatul și zona pe care merită să o lucrăm în continuare.
                    </p>

                    <button
                      type="button"
                      disabled={
                        starting
                      }
                      onClick={() =>
                        void startAssessment()
                      }
                      className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                    >
                      {starting
                        ? "MATE pregătește întrebările..."
                        : "Începe evaluarea →"}
                    </button>
                  </div>
                </div>
              </section>

              <section className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-[#07101f] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Mastery actual
                  </p>

                  <p className="mt-3 text-3xl font-black text-cyan-400">
                    {averageMastery}%
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Media competențelor urmărite până acum.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#07101f] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Competențe urmărite
                  </p>

                  <p className="mt-3 text-3xl font-black text-violet-400">
                    {masteryRows.length}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Date reale salvate de Mastery Engine.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#07101f] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Durată
                  </p>

                  <p className="mt-3 text-3xl font-black text-amber-400">
                    ~5 min
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    O verificare scurtă, nu o simulare BAC.
                  </p>
                </div>
              </section>

              <section className="mt-5 rounded-[26px] border border-slate-800 bg-[#07101f] p-6">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-400">
                  Cum funcționează
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-slate-950/60 p-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-black text-blue-300">
                      1
                    </div>

                    <h3 className="mt-4 font-black">
                      MATE alege focusul
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Mastery Engine prioritizează zonele care merită reverificate.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-950/60 p-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-sm font-black text-violet-300">
                      2
                    </div>

                    <h3 className="mt-4 font-black">
                      Tu răspunzi
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Primești o sesiune scurtă cu întrebări controlate de BAC MATE.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-950/60 p-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-sm font-black text-emerald-300">
                      3
                    </div>

                    <h3 className="mt-4 font-black">
                      Primești direcția
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Rezultatul este salvat și folosit pentru următoarele recomandări.
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}

        {assessmentId &&
          !result &&
          currentQuestion && (
            <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
              <section className="overflow-hidden rounded-[28px] border border-slate-800 bg-[#07101f]">
                <div className="border-b border-slate-800 px-6 py-5 sm:px-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-400">
                        Întrebarea{" "}
                        {currentIndex + 1} din{" "}
                        {questions.length}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {currentQuestion.title}
                      </p>
                    </div>

                    <ProgressDots
                      total={
                        questions.length
                      }
                      current={
                        currentIndex
                      }
                      answers={
                        answers
                      }
                    />
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-950">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-black leading-8 sm:text-2xl">
                    {currentQuestion.statement}
                  </h2>

                  <div className="mt-7 grid gap-3">
                    {currentQuestion.answers.map(
                      (
                        answer,
                        index
                      ) => {
                        const selected =
                          selectedIndex ===
                          index;

                        const correct =
                          index ===
                          currentQuestion.correctIndex;

                        let style =
                          "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-blue-500/40 hover:bg-blue-500/[0.05]";

                        if (
                          answerChecked &&
                          correct
                        ) {
                          style =
                            "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
                        } else if (
                          answerChecked &&
                          selected &&
                          !correct
                        ) {
                          style =
                            "border-rose-500/40 bg-rose-500/10 text-rose-200";
                        } else if (
                          selected
                        ) {
                          style =
                            "border-blue-500/50 bg-blue-500/10 text-white";
                        }

                        return (
                          <button
                            key={
                              answer
                            }
                            type="button"
                            disabled={
                              answerChecked
                            }
                            onClick={() =>
                              setSelectedIndex(
                                index
                              )
                            }
                            className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${style}`}
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-sm font-black">
                              {String.fromCharCode(
                                65 +
                                  index
                              )}
                            </span>

                            <span className="font-semibold">
                              {answer}
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>

                  {answerChecked && (
                    <div
                      className={`mt-6 rounded-2xl border p-5 ${
                        selectedIndex ===
                        currentQuestion.correctIndex
                          ? "border-emerald-500/30 bg-emerald-500/[0.08]"
                          : "border-amber-500/30 bg-amber-500/[0.07]"
                      }`}
                    >
                      <p
                        className={`font-black ${
                          selectedIndex ===
                          currentQuestion.correctIndex
                            ? "text-emerald-300"
                            : "text-amber-300"
                        }`}
                      >
                        {selectedIndex ===
                        currentQuestion.correctIndex
                          ? "Corect ✓"
                          : "Mai avem ceva de consolidat"}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {
                          currentQuestion.explanation
                        }
                      </p>
                    </div>
                  )}

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs leading-5 text-slate-600">
                      Răspunsul este verificat determinist, nu decis de conversația AI.
                    </p>

                    {!answerChecked ? (
                      <button
                        type="button"
                        disabled={
                          selectedIndex ===
                          null
                        }
                        onClick={
                          checkAnswer
                        }
                        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Verifică răspunsul
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={
                          finishing
                        }
                        onClick={() =>
                          void nextQuestion()
                        }
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-black transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                      >
                        {finishing
                          ? "Salvez rezultatul..."
                          : currentIndex ===
                            questions.length -
                              1
                          ? "Finalizează evaluarea →"
                          : "Următoarea întrebare →"}
                      </button>
                    )}
                  </div>
                </div>
              </section>

              <aside className="space-y-5">
                <section className="rounded-[26px] border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.08] to-violet-500/[0.04] p-6">
                  <div className="flex justify-center">
                    <MateAssessmentAvatar
                      gender={gender}
                    />
                  </div>

                  <p className="mt-5 text-center text-xs font-black uppercase tracking-[0.16em] text-blue-400">
                    MATE
                  </p>

                  <h3 className="mt-2 text-center text-lg font-black">
                    Lucrăm pas cu pas.
                  </h3>

                  <p className="mt-3 text-center text-sm leading-6 text-slate-400">
                    Nu contează să nimerești tot. Răspunsurile îmi arată ce trebuie verificat mai târziu.
                  </p>
                </section>

                <section className="rounded-[26px] border border-slate-800 bg-[#07101f] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Focus verificat
                  </p>

                  <p className="mt-3 font-black text-white">
                    {formatSkill(
                      currentQuestion.requestedSkillId
                    )}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Selectat din planul săptămânal pe baza datelor disponibile.
                  </p>
                </section>
              </aside>
            </div>
          )}

        {result && (
          <section className="relative mt-7 overflow-hidden rounded-[30px] border border-emerald-500/20 bg-gradient-to-br from-[#071b25] via-[#071225] to-[#080d1b]">
            <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

            <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/[0.08] blur-[100px]" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <MateAssessmentAvatar
                  gender={gender}
                />

                <div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
                    Evaluare finalizată
                  </span>

                  <h2 className="mt-4 text-3xl font-black">
                    Sesiunea este gata, {studentName}.
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    Rezultatul a fost calculat din răspunsurile acestei sesiuni și salvat în istoricul evaluărilor săptămânale.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Scor
                  </p>

                  <p className="mt-3 text-4xl font-black text-emerald-400">
                    {result.score}%
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Răspunsuri corecte
                  </p>

                  <p className="mt-3 text-4xl font-black text-blue-400">
                    {result.correctAnswers}/
                    {result.totalQuestions}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    De revăzut
                  </p>

                  <p className="mt-3 text-lg font-black text-amber-300">
                    {formatSkill(
                      result.weakestSkillId
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/[0.05] p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-400">
                    Punct forte în această sesiune
                  </p>

                  <h3 className="mt-3 text-xl font-black">
                    {formatSkill(
                      result.strongestSkillId
                    )}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Este zona cu rezultatul cel mai bun dintre competențele verificate în această evaluare.
                  </p>
                </div>

                <div className="rounded-[24px] border border-amber-500/20 bg-amber-500/[0.05] p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-400">
                    Prioritate pentru recapitulare
                  </p>

                  <h3 className="mt-3 text-xl font-black">
                    {formatSkill(
                      result.weakestSkillId
                    )}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    MATE poate folosi această informație împreună cu Mastery Engine pentru următorul plan de recapitulare.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/mate"
                    )
                  }
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black transition hover:bg-blue-500"
                >
                  Continuă cu MATE →
                </button>

                <button
                  type="button"
                  onClick={
                    restartLocalView
                  }
                  className="rounded-xl border border-slate-700 bg-slate-950/50 px-6 py-3 text-sm font-black text-slate-300 transition hover:bg-slate-900"
                >
                  Înapoi la pagina evaluării
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="mt-5 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-5 py-4">
          <p className="text-xs leading-5 text-slate-600">
            Evaluarea săptămânală este separată de evaluarea inițială și de simulările BAC. MATE folosește aici Mastery Engine pentru prioritizare; verificarea răspunsurilor matematice nu este delegată conversației AI.
          </p>
        </section>
      </div>
    </BacMateShell>
  );
}