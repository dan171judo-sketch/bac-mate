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
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-black">
            BAC <span className="text-blue-500">MATE</span>
          </a>

          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            Contul tău
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-xl px-6 py-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10">
          <div className="text-4xl">👋</div>

          <p className="mt-6 font-bold text-blue-400">
            APROAPE GATA
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Cum vrei să-ți spunem?
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            BAC MATE va folosi numele pentru a-ți personaliza
            experiența de învățare.
          </p>

          <label
            htmlFor="nume"
            className="mt-8 block font-bold text-slate-200"
          >
            Prenume sau nume
          </label>

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
            className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-lg text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
          />

          {mesaj && (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {mesaj}
            </p>
          )}

          <button
            onClick={salveaza}
            disabled={loading}
            className={`mt-7 w-full rounded-2xl px-6 py-4 text-lg font-black transition ${
              loading
                ? "cursor-not-allowed bg-slate-800 text-slate-500"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {loading ? "Se salvează..." : "Salvează și continuă →"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Îți vei putea modifica numele mai târziu din cont.
          </p>
        </div>
      </div>
    </main>
  );
}