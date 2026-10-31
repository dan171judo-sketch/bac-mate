"use client";

import { useRouter } from "next/navigation";

const planuri = [
  { nume: "Săptămânal", pret: "10 lei", perioada: "/ săptămână" },
  { nume: "Lunar", pret: "32 lei", perioada: "/ lună" },
  { nume: "6 luni", pret: "170 lei", perioada: "/ 6 luni" },
  { nume: "Anual", pret: "300 lei", perioada: "/ an" },
];

export default function AbonamentePage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06110e] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-[130px]" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-lime-400/10 blur-[140px]" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-[#06110e]/80">
        <div className="mx-auto flex min-h-[76px] max-w-6xl items-center justify-between px-5">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="text-2xl font-black"
          >
            BAC <span className="text-emerald-300">MATE</span>
          </button>
          <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-xs font-black tracking-widest text-emerald-200">
            BETA
          </span>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-16">
        <section className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-emerald-200">
            Versiune BETA • Acces gratuit
          </span>

          <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-6xl">
            Învață pentru BAC.
            <span className="mt-3 block bg-gradient-to-r from-emerald-200 via-lime-200 to-amber-200 bg-clip-text text-transparent">
              Complet gratuit.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300">
            BAC MATE este disponibil gratuit în perioada BETA.
            Ai acces la lecțiile publicate, videoclipuri explicative,
            exerciții și MATE AI, fără abonament și fără card bancar.
          </p>

          <div className="mx-auto mt-9 max-w-2xl rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-7">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-300">
              Acces BETA
            </p>
            <p className="mt-3 text-5xl font-black">0 lei</p>
            <p className="mt-3 text-sm text-slate-300">
              Gratuit pe durata versiunii BETA.
              Este necesar doar un cont BAC MATE.
            </p>

            <a
              href="/dashboard"
              className="mt-7 inline-block w-full rounded-2xl bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 px-6 py-4 text-center text-sm font-black text-[#05110d] transition hover:brightness-110 sm:w-auto"
            >
              Intră în BAC MATE
            </a>
          </div>
        </section>

        <section className="mt-20">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-300">
              După versiunea BETA
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Planuri pentru lansarea finală
            </h2>
            <p className="mt-4 text-sm text-slate-400">
              Prețuri orientative. Abonamentele nu pot fi cumpărate acum.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {planuri.map((plan) => (
              <article
                key={plan.nume}
                className="flex flex-col rounded-3xl border border-white/10 bg-[#091b15] p-6"
              >
                <p className="text-sm font-black text-emerald-200">
                  {plan.nume}
                </p>
                <p className="mt-6 text-4xl font-black">{plan.pret}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {plan.perioada}
                </p>
                <div className="my-7 h-px bg-white/10" />
                <p className="flex-1 text-sm leading-6 text-slate-300">
                  Acces la conținutul BAC MATE și funcțiile disponibile
                  în versiunea finală.
                </p>
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-xs font-black text-slate-400">
                  Plăți indisponibile în BETA
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-3xl rounded-3xl border border-amber-300/20 bg-amber-400/5 p-7 text-center">
          <h2 className="text-lg font-black text-amber-200">
            Platforma este în dezvoltare
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            În această perioadă testăm și îmbunătățim BAC MATE.
            Nu procesăm plăți și nu este necesar un abonament.
            Unele lecții sau funcționalități pot fi încă în pregătire.
          </p>
        </section>

        <footer className="mt-16 text-center">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="text-sm font-black text-emerald-300 hover:text-lime-300"
          >
            Înapoi la BAC MATE
          </button>
          <p className="mt-5 text-xs text-slate-500">
            BAC MATE • Matematică. Pas cu pas.
          </p>
        </footer>
      </div>
    </main>
  );
}

