"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "../../lib/supabase/client";
import { saveStudentAttempt } from "../../lib/mastery/service";

const questions = [
  {
    question: "Rezolvă ecuația: 2x + 6 = 14",
    answers: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correct: 1,
    topic: "Algebră",
    difficulty: "Ușor",
    explanation:
      "Scădem 6 din ambele părți: 2x = 8. Împărțim la 2 și obținem x = 4.",
  },
  {
    question: "Care este valoarea lui 3² + 4²?",
    answers: ["7", "12", "25", "49"],
    correct: 2,
    topic: "Calcul numeric",
    difficulty: "Ușor",
    explanation:
      "3² = 9 și 4² = 16. Deci 9 + 16 = 25.",
  },
  {
    question: "Dacă f(x) = 2x + 1, cât este f(3)?",
    answers: ["5", "6", "7", "8"],
    correct: 2,
    topic: "Funcții",
    difficulty: "Mediu",
    explanation: "f(3) = 2 × 3 + 1 = 7.",
  },
  {
    question: "Care este soluția ecuației x² = 16?",
    answers: ["x = 4", "x = -4", "x = ±4", "x = 8"],
    correct: 2,
    topic: "Ecuații",
    difficulty: "Mediu",
    explanation:
      "4² = 16 și (-4)² = 16, deci soluțiile sunt x = ±4.",
  },
  {
    question: "Cât este 20% din 150?",
    answers: ["15", "20", "30", "35"],
    correct: 2,
    topic: "Procente",
    difficulty: "Ușor",
    explanation:
      "20% = 0,2, iar 0,2 × 150 = 30.",
  },
];

export default function EvaluarePage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [gata, setGata] = useState(false);

  const [current, setCurrent] = useState(0);

  const [selected, setSelected] = useState<number | null>(
    null
  );

  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [finished, setFinished] = useState(false);

  const [wrongTopics, setWrongTopics] = useState<string[]>(
    []
  );

  const [saving, setSaving] = useState(false);
  const [mesaj, setMesaj] = useState("");

  useEffect(() => {
    let activ = true;

    async function verificaAccesul() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!activ) {
        return;
      }

      if (userError || !user) {
        router.replace("/cont");
        return;
      }

      const { data: profil, error: profilError } =
        await supabase
          .from("profiles")
          .select(
            "nume, profil_bac, evaluare_initiala_finalizata"
          )
          .eq("id", user.id)
          .maybeSingle();

      if (!activ) {
        return;
      }

      if (profilError) {
        router.replace("/cont");
        return;
      }

      if (!profil?.nume) {
        router.replace("/date-personale");
        return;
      }

      if (!profil.profil_bac) {
        router.replace("/profil");
        return;
      }

      localStorage.setItem(
        "bac-mate-nume",
        profil.nume
      );

      localStorage.setItem(
        "bac-mate-profil-cod",
        profil.profil_bac
      );

      if (profil.evaluare_initiala_finalizata) {
        localStorage.setItem(
          "bac-mate-evaluare-initiala-finalizata",
          "da"
        );
      }

      setGata(true);
    }

    verificaAccesul();

    return () => {
      activ = false;
    };
  }, [router, supabase]);

  const question = questions[current];

  const progress =
    ((current + 1) / questions.length) * 100;

  async function checkAnswer() {
    if (
      selected === null ||
      checked ||
      saving
    ) {
      return;
    }

    const isCorrect =
      selected === question.correct;

    setChecked(true);

    if (isCorrect) {
      setScore((value) => value + 1);
      setXp((value) => value + 20);
    } else {
      setXp((value) => value + 5);

      setWrongTopics((topics) =>
        topics.includes(question.topic)
          ? topics
          : [...topics, question.topic]
      );
    }

    /*
     * MASTERY ENGINE V1
     *
     * Evaluarea inițială alimentează acum
     * același sistem de mastery folosit
     * de exercițiile din lecții.
     *
     * Pentru această evaluare folosim
     * topicul întrebării drept skillId.
     */

    try {
      const exerciseId =
        `evaluare-initiala-${current + 1}`;

      const answerGiven =
        question.answers[selected];

      const correctAnswer =
        question.answers[question.correct];

      await saveStudentAttempt(
        supabase,
        {
          lessonId: "evaluare-initiala",

          exerciseId,

          skillId: question.topic,

          answerGiven,

          correctAnswer,

          isCorrect,

          usedHint: false,

          source: "lesson",
        }
      );
    } catch (error) {
      /*
       * Mastery nu trebuie să blocheze
       * evaluarea dacă Supabase are
       * temporar o problemă.
       */

      console.error(
        "Eroare Mastery evaluare inițială:",
        error
      );
    }
  }

  async function finalizeazaEvaluarea() {
    if (saving) {
      return;
    }

    setSaving(true);
    setMesaj("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMesaj(
        "❌ Sesiunea ta nu mai este activă. Autentifică-te din nou."
      );

      setSaving(false);
      return;
    }

    const { error: salvareError } = await supabase
      .from("profiles")
      .update({
        evaluare_initiala_finalizata: true,
      })
      .eq("id", user.id);

    if (salvareError) {
      setMesaj(
        `❌ Nu am putut salva finalizarea evaluării: ${salvareError.message}`
      );

      setSaving(false);
      return;
    }

    localStorage.setItem(
      "bac-mate-evaluare-initiala-finalizata",
      "da"
    );

    setSaving(false);
    setFinished(true);
  }

  async function nextQuestion() {
    if (current === questions.length - 1) {
      await finalizeazaEvaluarea();
      return;
    }

    setCurrent((value) => value + 1);
    setSelected(null);
    setChecked(false);
    setMesaj("");
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setXp(0);
    setFinished(false);
    setWrongTopics([]);
    setMesaj("");
  }

  if (!gata) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-slate-400">
            Se verifică autentificarea și se pregătește
            evaluarea...
          </p>
        </div>
      </main>
    );
  }

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    const dashboardUrl =
      `/dashboard?score=${score}` +
      `&total=${questions.length}` +
      `&xp=${xp}` +
      `&topics=${encodeURIComponent(
        wrongTopics.join(",")
      )}`;

    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
          <div className="text-6xl">🏆</div>

          <p className="mt-5 text-sm font-bold uppercase tracking-widest text-blue-400">
            Evaluare finalizată
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Rezultatul tău BAC MATE
          </h1>

          <div className="mx-auto mt-8 flex h-44 w-44 items-center justify-center rounded-full border-8 border-blue-500 bg-slate-950">
            <div>
              <p className="text-4xl font-bold">
                {percentage}%
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {score}/{questions.length} corecte
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-sm text-slate-400">
                Scor
              </p>

              <p className="mt-2 text-3xl font-bold">
                {score}/{questions.length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-sm text-slate-400">
                Experiență
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-400">
                ⭐ {xp} XP
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-left">
            <p className="font-bold text-green-300">
              ✓ Evaluarea a fost salvată în contul tău
            </p>

            <p className="mt-2 leading-7 text-slate-300">
              BAC MATE știe acum că ai terminat evaluarea
              inițială.
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 text-left">
            <p className="font-bold text-blue-300">
              🤖 Recomandarea BAC MATE
            </p>

            <p className="mt-3 leading-7 text-slate-300">
              Rezultatul și răspunsurile tale sunt folosite
              pentru construirea profilului de învățare și
              identificarea capitolelor care trebuie
              consolidate.
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={restart}
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
            >
              Repetă testul
            </button>

            <a
              href={dashboardUrl}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
            >
              Intră în Dashboard →
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="/dashboard"
            className="text-slate-400 transition hover:text-white"
          >
            ← Dashboard
          </a>

          <div className="flex gap-3">
            <div className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2">
              ⭐ {xp} XP
            </div>

            <div className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2">
              {current + 1} / {questions.length}
            </div>
          </div>
        </div>

        <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-300">
              {question.topic}
            </span>

            <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
              {question.difficulty}
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            {question.question}
          </h1>

          <p className="mt-3 text-slate-400">
            Selectează varianta corectă.
          </p>

          <div className="mt-8 grid gap-4">
            {question.answers.map((answer, index) => {
              const isCorrect =
                index === question.correct;

              const isSelected =
                index === selected;

              let style =
                "border-slate-700 bg-slate-950 hover:border-slate-500";

              if (!checked && isSelected) {
                style =
                  "border-blue-500 bg-blue-500/10";
              }

              if (checked && isCorrect) {
                style =
                  "border-green-500 bg-green-500/10";
              }

              if (
                checked &&
                isSelected &&
                !isCorrect
              ) {
                style =
                  "border-red-500 bg-red-500/10";
              }

              return (
                <button
                  key={answer}
                  type="button"
                  disabled={checked}
                  onClick={() => setSelected(index)}
                  className={`rounded-2xl border p-5 text-left transition ${style}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 font-bold">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span className="flex-1 font-semibold">
                      {answer}
                    </span>

                    {checked && isCorrect && (
                      <span className="text-xl text-green-400">
                        ✓
                      </span>
                    )}

                    {checked &&
                      isSelected &&
                      !isCorrect && (
                        <span className="text-xl text-red-400">
                          ✕
                        </span>
                      )}
                  </div>
                </button>
              );
            })}
          </div>

          {!checked && (
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={checkAnswer}
                disabled={selected === null}
                className="rounded-xl bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Verifică răspunsul
              </button>
            </div>
          )}

          {mesaj && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {mesaj}
            </div>
          )}

          {checked && (
            <div
              className={`mt-8 rounded-2xl border p-6 ${
                selected === question.correct
                  ? "border-green-500/30 bg-green-500/10"
                  : "border-red-500/30 bg-red-500/10"
              }`}
            >
              <h2 className="text-lg font-bold">
                {selected === question.correct
                  ? "🎉 Corect! +20 XP"
                  : "Mai încercăm. +5 XP pentru efort."}
              </h2>

              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Explicație
              </p>

              <p className="mt-2 leading-7 text-slate-200">
                {question.explanation}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={nextQuestion}
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Se salvează evaluarea..."
                    : current ===
                        questions.length - 1
                      ? "Vezi rezultatul →"
                      : "Următoarea întrebare →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}