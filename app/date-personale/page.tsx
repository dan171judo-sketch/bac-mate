"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function DatePersonalePage() {
  const [supabase] = useState(() => createClient());

  const [nume, setNume] = useState("");
  const [loading, setLoading] = useState(false);
  const [mesaj, setMesaj] = useState("");

  async function salveaza() {
    const numeCurat = nume.trim();

    if (!numeCurat) {
      setMesaj("❌ Scrie numele tău pentru a continua.");
      return;
    }

    setLoading(true);
    setMesaj("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMesaj("❌ Trebuie să fii autentificat.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        nume: numeCurat,
      },
      {
        onConflict: "id",
      }
    );

    if (error) {
      setMesaj(`❌ Nu am putut salva numele: ${error.message}`);
      setLoading(false);
      return;
    }

    localStorage.setItem("bac-mate-nume", numeCurat);

    window.location.href = "/profil";
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06110e] text-white">
      {/* Glow-uri ambientale */}
      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-220px] right-[-160px] h-[500px] w-[500px] rounded-full bg-lime-400/5 blur-[120px]" />

      {/* Header */}
      <header className="relative z-10 border-b border-emerald-400/10 bg-[#06110e]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-6">
          <a
            href="/"
            className="text-xl font-black tracking-tight text-white"
          >
            BAC{" "}
            <span className="text-emerald-400">
              MATE
            </span>
          </a>

          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            Contul tău
          </span>
        </div>
      </header>

      {/* Conținut */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-81px)] max-w-xl items-center px-5 py-10 sm:px-6 sm:py-16">
        <div className="w-full rounded-[28px] border border-emerald-400/15 bg-[#0a1b16]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 md:p-10">
          {/* Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-3xl shadow-lg shadow-emerald-950/30">
            👋
          </div>

          {/* Etichetă */}
          <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-emerald-400">
            Aproape gata
          </p>

          {/* Titlu */}
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            Cum vrei să-ți spunem?
          </h1>

          {/* Descriere */}
          <p className="mt-4 text-base leading-7 text-emerald-50/60 sm:text-lg">
            BAC MATE va folosi numele pentru a-ți personaliza experiența
            de învățare.
          </p>

          {/* Separator */}
          <div className="my-7 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

          {/* Label */}
          <label
            htmlFor="nume"
            className="block text-sm font-bold text-emerald-50/90"
          >
            Prenume sau nume
          </label>

          {/* Input */}
          <input
            id="nume"
            type="text"
            value={nume}
            onChange={(e) => {
              setNume(e.target.value);
              setMesaj("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                salveaza();
              }
            }}
            placeholder="Exemplu: Andrei"
            autoComplete="name"
            maxLength={60}
            disabled={loading}
            className="mt-3 w-full rounded-2xl border border-emerald-400/15 bg-[#06110e] px-5 py-4 text-base text-white outline-none transition placeholder:text-emerald-50/25 focus:border-emerald-400/60 focus:ring-4 focus:ring-emerald-400/5 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
          />

          {/* Mesaj eroare */}
          {mesaj && (
            <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm font-medium leading-6 text-red-200">
              {mesaj}
            </p>
          )}

          {/* Buton */}
          <button
            onClick={salveaza}
            disabled={loading}
            className={`mt-7 w-full rounded-2xl px-6 py-4 text-base font-black transition sm:text-lg ${
              loading
                ? "cursor-not-allowed border border-white/5 bg-white/5 text-white/30"
                : "border border-emerald-300/30 bg-emerald-400 text-[#06110e] shadow-lg shadow-emerald-950/40 hover:bg-emerald-300 active:scale-[0.99]"
            }`}
          >
            {loading ? "Se salvează..." : "Salvează și continuă →"}
          </button>

          {/* Notă */}
          <div className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-emerald-50/35">
            <span className="text-emerald-400/60">●</span>
            <span>Îți vei putea modifica numele mai târziu din cont.</span>
          </div>
        </div>
      </div>
    </main>
  );
}