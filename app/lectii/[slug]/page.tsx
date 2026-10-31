import Link from "next/link";
import { notFound } from "next/navigation";

import LectieUniversala from "../../../components/LectieUniversala";
import { lectii } from "../../../data/lectii/index";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const ULTIMUL_MODUL_BETA = 5;

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const lectie = lectii.find(
    (item) => item.slug === slug
  );

  if (!lectie) {
    notFound();
  }

  // Modulele 6–17 sunt indisponibile în versiunea BETA.
  if (lectie.modul > ULTIMUL_MODUL_BETA) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06110e] px-5 py-12 text-white">
        <section className="w-full max-w-xl rounded-3xl border border-emerald-300/20 bg-[#0b1d17] p-7 text-center shadow-2xl sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-300/10 text-3xl">
            🔒
          </div>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
            BAC MATE BETA
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            În curând!
          </h1>

          <p className="mt-5 text-sm leading-7 text-slate-300">
            Lecția aceasta face parte din Modulul{" "}
            <strong>{lectie.modul}</strong>, care va deveni
            disponibil într-o actualizare viitoare.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Până atunci, poți învăța folosind primele
            5 module disponibile în versiunea BETA.
          </p>

          <Link
            href="/lectii"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-300 to-lime-300 px-6 py-4 text-sm font-black text-slate-950 transition hover:brightness-110 sm:w-auto"
          >
            Vezi lecțiile disponibile →
          </Link>

          <Link
            href="/dashboard"
            className="mt-5 block text-sm font-bold text-slate-400 transition hover:text-white"
          >
            Înapoi la Dashboard
          </Link>
        </section>
      </main>
    );
  }

  return <LectieUniversala lectie={lectie} />;
}