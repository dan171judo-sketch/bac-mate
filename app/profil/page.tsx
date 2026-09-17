"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

const profiluri = [
  {
    id: "mate-info",
    cod: "M_mate-info",
    icon: "💻",
    titlu: "Matematică-Informatică",
    descriere:
      "Pentru elevii de la profilul real, specializarea Matematică-Informatică.",
  },
  {
    id: "stiinte",
    cod: "M_șt-nat",
    icon: "🔬",
    titlu: "Științe ale Naturii",
    descriere:
      "Pentru elevii de la profilul real, specializarea Științe ale Naturii.",
  },
  {
    id: "tehnologic",
    cod: "M_tehnologic",
    icon: "⚙️",
    titlu: "Profil Tehnologic",
    descriere:
      "Pentru elevii care susțin varianta de matematică M_tehnologic.",
  },
  {
    id: "pedagogic",
    cod: "M_pedagogic",
    icon: "📚",
    titlu: "Profil Pedagogic",
    descriere:
      "Pentru elevii care susțin varianta de matematică M_pedagogic.",
  },
];

export default function ProfilPage() {
  const [supabase] = useState(() => createClient());

  const [profilSelectat, setProfilSelectat] = useState("");
  const [loading, setLoading] = useState(false);
  const [mesaj, setMesaj] = useState("");

  async function continua() {
    if (!profilSelectat || loading) {
      return;
    }

    const profil = profiluri.find(
      (item) => item.id === profilSelectat
    );

    if (!profil) {
      return;
    }

    setLoading(true);
    setMesaj("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMesaj(
        "❌ Trebuie să fii autentificat pentru a salva profilul în cont."
      );
      setLoading(false);
      return;
    }

    const { error: profilError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          profil_bac: profil.cod,
        },
        {
          onConflict: "id",
        }
      );

    if (profilError) {
      setMesaj(
        `❌ Nu am putut salva profilul: ${profilError.message}`
      );
      setLoading(false);
      return;
    }

    localStorage.setItem("bac-mate-profil", profil.id);
    localStorage.setItem(
      "bac-mate-profil-cod",
      profil.cod
    );
    localStorage.setItem(
      "bac-mate-profil-nume",
      profil.titlu
    );

    window.location.href = "/evaluare";
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-black">
            BAC <span className="text-blue-500">MATE</span>
          </a>

          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            Configurare profil
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold text-blue-400">
            PASUL 2 DIN PREGĂTIREA TA
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-5xl">
            Ce profil ai la Bac?
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Alege varianta de matematică pe care o susții.
            BAC MATE va folosi această alegere pentru a-ți construi
            traseul de învățare potrivit.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {profiluri.map((profil) => {
            const selectat =
              profilSelectat === profil.id;

            return (
              <button
                key={profil.id}
                onClick={() => {
                  setProfilSelectat(profil.id);
                  setMesaj("");
                }}
                disabled={loading}
                className={`rounded-3xl border p-7 text-left transition ${
                  selectat
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-800 bg-slate-900 hover:border-slate-600"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-4xl">
                    {profil.icon}
                  </div>

                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      selectat
                        ? "border-blue-500 bg-blue-500"
                        : "border-slate-600"
                    }`}
                  >
                    {selectat && (
                      <span className="text-sm font-black text-white">
                        ✓
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-5 text-sm font-bold text-blue-400">
                  {profil.cod}
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {profil.titlu}
                </h2>

                <p className="mt-3 leading-7 text-slate-400">
                  {profil.descriere}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex gap-4">
            <div className="text-2xl">🎯</div>

            <div>
              <p className="font-bold">
                De ce avem nevoie de profilul tău?
              </p>

              <p className="mt-2 leading-7 text-slate-400">
                Materia și dificultatea exercițiilor diferă în
                funcție de varianta de matematică. În etapele
                următoare, lecțiile, testele și recomandările vor
                fi adaptate profilului ales.
              </p>
            </div>
          </div>
        </div>

        {mesaj && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-300">
            {mesaj}
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={continua}
            disabled={!profilSelectat || loading}
            className={`w-full rounded-2xl px-8 py-5 text-lg font-black transition ${
              profilSelectat && !loading
                ? "bg-blue-600 hover:bg-blue-500"
                : "cursor-not-allowed bg-slate-800 text-slate-500"
            }`}
          >
            {loading
              ? "Se salvează profilul..."
              : profilSelectat
              ? "Continuă cu evaluarea inițială →"
              : "Selectează profilul pentru a continua"}
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          Profilul poate fi modificat ulterior din contul tău.
        </p>
      </div>
    </main>
  );
}