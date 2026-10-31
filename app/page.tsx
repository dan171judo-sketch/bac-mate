import Link from "next/link";

const features = [
  {
    number: "01",
    icon: "▶",
    title: "Lecții pas cu pas",
    description:
      "Matematica explicată clar, cu exemple și materiale vizuale, exact cât ai nevoie pentru a înțelege.",
    accent: "emerald",
  },
  {
    number: "02",
    icon: "✓",
    title: "Exerciții inteligente",
    description:
      "Aplici imediat ce ai învățat, primești verificare și vezi unde mai trebuie să lucrezi.",
    accent: "amber",
  },
  {
    number: "03",
    icon: "M",
    title: "MATE AI",
    description:
      "Primești explicații personalizate și ajutor exact atunci când te blochezi.",
    accent: "cyan",
  },
] as const;

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06110e] text-white">
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-52 top-24 h-[560px] w-[560px] rounded-full bg-emerald-500/12 blur-[150px]" />

        <div className="absolute -right-52 top-16 h-[620px] w-[620px] rounded-full bg-orange-500/10 blur-[170px]" />

        <div className="absolute left-1/2 top-[620px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-400/5 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent" />
      </div>

      {/* HEADER */}
      <header className="relative z-30 border-b border-white/[0.06]">
        <div className="mx-auto flex h-[78px] max-w-[1180px] items-center justify-between px-5 sm:px-7 lg:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-[15px] border border-lime-200/40 bg-gradient-to-br from-emerald-400 via-lime-300 to-yellow-300 text-lg font-black text-[#07110d] shadow-[0_0_30px_rgba(132,204,22,0.18)] transition group-hover:scale-105">
              M
            </div>

            <div>
              <div className="text-[18px] font-black tracking-[-0.02em] text-white">
                BAC MATE
              </div>

              <div className="mt-0.5 text-[10px] font-bold text-emerald-100/55">
                Matematica explicată simplu.
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link
              href="/lectii"
              className="text-[15px] font-bold text-white/70 transition hover:text-white"
            >
              Lecții
            </Link>

            <Link
              href="/mate"
              className="text-[15px] font-bold text-white/70 transition hover:text-white"
            >
              MATE AI
            </Link>

            <a
              href="#cum-functioneaza"
              className="text-[15px] font-bold text-white/70 transition hover:text-white"
            >
              Cum funcționează
            </a>

            <Link
              href="/cont"
              className="rounded-xl border border-white/15 bg-white/[0.05] px-5 py-2.5 text-[14px] font-black text-white transition hover:border-white/25 hover:bg-white/[0.08]"
            >
              Intră în cont
            </Link>

            <Link
              href="/cont"
              className="rounded-xl border border-lime-200/60 bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 px-5 py-2.5 text-[14px] font-black text-[#07110d] shadow-[0_10px_35px_rgba(163,230,53,0.16)] transition hover:-translate-y-0.5"
            >
              Începe gratuit →
            </Link>
          </nav>

          <Link
            href="/cont"
            className="rounded-xl bg-gradient-to-r from-emerald-400 to-lime-300 px-4 py-2.5 text-xs font-black text-[#07110d] lg:hidden"
          >
            Începe gratuit
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 pb-16 pt-14 sm:px-7 md:pt-16 lg:min-h-[665px] lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 lg:px-8 lg:pb-20 lg:pt-12">
          {/* LEFT */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/[0.08] px-4 py-2 shadow-[inset_0_0_20px_rgba(52,211,153,0.04)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-300 text-[11px] font-black text-[#06110e]">
                ✦
              </span>

              <span className="text-[13px] font-black tracking-[0.02em] text-emerald-100">
                Pregătire inteligentă pentru Bacalaureat
              </span>
            </div>

            <h1 className="mt-7 max-w-[690px] text-[50px] font-black leading-[0.95] tracking-[-0.055em] text-[#fff8e8] sm:text-[58px] md:text-[64px] lg:text-[68px]">
              De la{" "}
              <span className="text-emerald-300">
                „nu înțeleg nimic”
              </span>{" "}
              la nota pe care{" "}
              <span className="bg-gradient-to-r from-lime-200 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                ți-o dorești
              </span>{" "}
              la Bac.
            </h1>

            <p className="mt-6 max-w-[620px] text-[17px] font-medium leading-7 text-white/68 md:text-[18px]">
              BAC MATE îți explică matematica pas cu pas,
              îți arată unde ai lacune și te ajută să
              progresezi în ritmul tău.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cont"
                className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-lime-200/60 bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 px-7 py-3.5 text-[15px] font-black text-[#07110d] shadow-[0_15px_45px_rgba(163,230,53,0.18)] transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(163,230,53,0.25)]"
              >
                Începe gratuit
                <span className="ml-2 text-lg">→</span>
              </Link>

              <Link
                href="/lectii"
                className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.045] px-7 py-3.5 text-[15px] font-black text-white transition hover:border-emerald-300/30 hover:bg-white/[0.07]"
              >
                Vezi lecțiile
              </Link>
            </div>

            <div className="mt-7 grid max-w-[630px] grid-cols-3 gap-2.5">
              <MiniBenefit text="Lecții video" />
              <MiniBenefit text="Exerciții" />
              <MiniBenefit text="MATE AI" />
            </div>
          </div>

          {/* RIGHT / MATE AI */}
          <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
            {/* EXTERIOR GLOW */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.12] blur-[105px]"
            />

            <div
              aria-hidden="true"
              className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-orange-400/[0.11] blur-[100px]"
            />

            <div
              aria-hidden="true"
              className="absolute -left-10 bottom-4 h-52 w-52 rounded-full bg-lime-300/[0.08] blur-[90px]"
            />

            <div className="relative overflow-hidden rounded-[34px] border border-emerald-200/25 bg-gradient-to-b from-[#0c211b]/95 via-[#091b16]/95 to-[#07130f]/95 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.42),0_0_50px_rgba(52,211,153,0.07)] backdrop-blur-xl sm:p-5">
              {/* CARD HEADER */}
              <div className="flex items-center justify-between px-2 pb-4">
                <div>
                  <p className="text-[12px] font-black uppercase tracking-[0.16em] text-emerald-300">
                    MATE AI
                  </p>

                  <p className="mt-1 text-[15px] font-bold text-white/70">
                    Profesorul tău digital
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />

                  <span className="text-[10px] font-black uppercase tracking-[0.12em] text-emerald-200">
                    Online
                  </span>
                </div>
              </div>

              {/* AVATAR STAGE */}
              <div className="relative flex h-[390px] items-end justify-center overflow-hidden rounded-[28px] border border-emerald-200/15 bg-[radial-gradient(circle_at_50%_48%,rgba(74,222,128,0.24),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(251,146,60,0.10),transparent_30%),linear-gradient(145deg,#10392b,#0a211a_55%,#201b12)] sm:h-[410px]">
                {/* mathematical grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.055]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.9) 1px, transparent 1px)",
                    backgroundSize: "31px 31px",
                  }}
                />

                {/* RINGS */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[48%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/[0.12]"
                />

                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[48%] h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-200/[0.10]"
                />

                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[48%] h-[205px] w-[205px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/[0.10]"
                />

                {/* EQUATIONS */}
                <div className="absolute left-5 top-[105px] rotate-[-7deg] text-[17px] font-black text-emerald-200/35">
                  f(x) = x²
                </div>

                <div className="absolute right-6 top-[145px] rotate-[5deg] text-[15px] font-black text-amber-200/30">
                  x → ∞
                </div>

                <div className="absolute left-8 bottom-[105px] text-[14px] font-black text-lime-200/25">
                  √x
                </div>

                <div className="absolute right-8 bottom-[120px] text-[16px] font-black text-emerald-200/25">
                  π
                </div>

                {/* TOP LEFT LABEL */}
                <div className="absolute left-5 top-5 z-20 rounded-xl border border-white/10 bg-[#07130f]/65 px-3 py-2 shadow-xl backdrop-blur-md">
                  <p className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-300">
                    Acum înveți
                  </p>

                  <p className="mt-0.5 text-xs font-black text-white">
                    Matematică pentru Bac
                  </p>
                </div>

                {/* TOP RIGHT LABEL */}
                <div className="absolute right-4 top-[86px] z-20 rounded-xl border border-amber-200/15 bg-[#1b160e]/75 px-3 py-2 shadow-xl backdrop-blur-md">
                  <p className="text-[10px] font-black text-amber-200">
                    ✦ Explicații clare
                  </p>
                </div>

                {/* AVATAR GLOW */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-4 left-1/2 h-[280px] w-[270px] -translate-x-1/2 rounded-full bg-emerald-300/[0.13] blur-[48px]"
                />

                {/* AVATAR */}
                <img
                  src="/mate/mate-tutor-boy.png"
                  alt="MATE AI - profesorul digital BAC MATE"
                  className="relative z-10 h-[96%] w-auto max-w-[98%] object-contain object-bottom drop-shadow-[0_28px_35px_rgba(0,0,0,0.42)]"
                />

                {/* BOTTOM FADE */}
                <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#081611] via-[#081611]/55 to-transparent" />

                {/* SMALL STATUS */}
                <div className="absolute bottom-[78px] left-5 z-30 hidden rounded-xl border border-emerald-200/15 bg-[#081611]/75 px-3 py-2 shadow-xl backdrop-blur-md sm:block">
                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300">
                    Lecție
                  </p>

                  <p className="mt-0.5 text-[11px] font-bold text-white">
                    Înțelegi pas cu pas ✓
                  </p>
                </div>

                <div className="absolute bottom-[92px] right-4 z-30 hidden rounded-xl border border-orange-200/15 bg-[#19140e]/80 px-3 py-2 shadow-xl backdrop-blur-md sm:block">
                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-300">
                    Te-ai blocat?
                  </p>

                  <p className="mt-0.5 text-[11px] font-bold text-white">
                    Întreabă MATE →
                  </p>
                </div>
              </div>

              {/* MATE MESSAGE */}
              <div className="relative z-30 -mt-6 mx-3 rounded-[22px] border border-white/10 bg-[#091712]/95 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-lime-200/25 bg-gradient-to-br from-emerald-400 to-lime-300 font-black text-[#06110e] shadow-[0_0_20px_rgba(74,222,128,0.14)]">
                    M
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-300">
                        MATE
                      </p>

                      <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-black text-emerald-200">
                        AI
                      </span>

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    </div>

                    <p className="mt-1 text-[15px] font-bold leading-5 text-white">
                      Salut! 👋 Hai să facem matematica mai simplă.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* OUTSIDE FLOATING ELEMENTS */}
            <div className="absolute -left-7 top-[42%] z-30 hidden rounded-2xl border border-emerald-200/15 bg-[#0b1c17]/90 p-3 shadow-[0_15px_40px_rgba(0,0,0,0.30)] backdrop-blur-xl sm:block">
              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300">
                Progres
              </p>

              <p className="mt-1 text-[12px] font-black text-white">
                Pas cu pas ✓
              </p>
            </div>

            <div className="absolute -right-6 top-[57%] z-30 hidden rounded-2xl border border-amber-200/15 bg-[#18140e]/90 p-3 shadow-[0_15px_40px_rgba(0,0,0,0.30)] backdrop-blur-xl sm:block">
              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-300">
                MATE AI
              </p>

              <p className="mt-1 text-[12px] font-black text-white">
                Sunt aici ✦
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-200/15 to-transparent" />
      </div>

      {/* FEATURES */}
      <section
        id="cum-functioneaza"
        className="relative z-10 scroll-mt-24"
      >
        <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-7 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[13px] font-black uppercase tracking-[0.18em] text-emerald-300">
              BAC MATE
            </p>

            <h2 className="mt-3 text-[34px] font-black tracking-[-0.04em] text-[#fff8e8] sm:text-[40px] lg:text-[46px]">
              Tot ce ai nevoie pentru Bac,{" "}
              <span className="text-lime-200">
                într-un singur loc.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-[650px] text-[15px] font-medium leading-6 text-white/58 sm:text-[16px]">
              Înveți, exersezi și primești ajutor atunci când
              ai nevoie, fără să pierzi timpul între zeci de
              materiale.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.number}
                number={feature.number}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                accent={feature.accent}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="relative mt-10 overflow-hidden rounded-[30px] border border-emerald-200/15 bg-gradient-to-r from-emerald-500/[0.10] via-lime-400/[0.06] to-orange-400/[0.10] px-6 py-8 sm:px-9">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-orange-400/10 blur-[80px]"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-[80px]"
            />

            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-[13px] font-black uppercase tracking-[0.16em] text-emerald-300">
                  Începe acum
                </p>

                <h3 className="mt-2 text-[26px] font-black tracking-[-0.03em] text-white sm:text-[32px]">
                  Pregătirea pentru Bac poate fi mai simplă.
                </h3>

                <p className="mt-2 max-w-[650px] text-[15px] leading-6 text-white/58">
                  Intră în BAC MATE și începe direct cu
                  lecțiile, exercițiile și profesorul tău AI.
                </p>
              </div>

              <Link
                href="/cont"
                className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-lime-200/60 bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 px-7 py-3.5 text-[15px] font-black text-[#07110d] shadow-[0_15px_40px_rgba(163,230,53,0.15)] transition hover:-translate-y-1"
              >
                Începe gratuit
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-7 text-center sm:px-7 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-lime-300 text-xs font-black text-[#06110e]">
              M
            </div>

            <span className="text-sm font-black text-white">
              BAC MATE
            </span>
          </div>

          <p className="text-xs font-medium text-white/35">
            Matematica explicată simplu, pas cu pas.
          </p>

          <div className="flex items-center justify-center gap-5 text-xs font-bold text-white/45">
            <Link
              href="/lectii"
              className="transition hover:text-white"
            >
              Lecții
            </Link>

            <Link
              href="/mate"
              className="transition hover:text-white"
            >
              MATE AI
            </Link>

            <Link
              href="/cont"
              className="transition hover:text-white"
            >
              Cont
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function MiniBenefit({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-2.5 py-2 text-center">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-[10px] font-black text-emerald-300">
        ✓
      </span>

      <span className="text-[12px] font-black text-white/72 sm:text-[13px]">
        {text}
      </span>
    </div>
  );
}

function FeatureCard({
  number,
  icon,
  title,
  description,
  accent,
}: {
  number: string;
  icon: string;
  title: string;
  description: string;
  accent: "emerald" | "amber" | "cyan";
}) {
  const styles = {
    emerald: {
      icon: "border-emerald-300/20 bg-emerald-400/10 text-emerald-300",
      glow: "bg-emerald-400/10",
      line: "from-emerald-400/60",
    },
    amber: {
      icon: "border-amber-300/20 bg-amber-400/10 text-amber-300",
      glow: "bg-amber-400/10",
      line: "from-amber-400/60",
    },
    cyan: {
      icon: "border-cyan-300/20 bg-cyan-400/10 text-cyan-300",
      glow: "bg-cyan-400/10",
      line: "from-cyan-400/60",
    },
  }[accent];

  return (
    <article className="group relative min-h-[235px] overflow-hidden rounded-[26px] border border-white/10 bg-[#0b1c17]/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-white/15">
      <div
        aria-hidden="true"
        className={`absolute -right-16 -top-16 h-44 w-44 rounded-full ${styles.glow} blur-[60px]`}
      />

      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${styles.line} via-white/10 to-transparent opacity-70`}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-[14px] border text-lg font-black ${styles.icon}`}
          >
            {icon}
          </div>

          <span className="text-[11px] font-black tracking-[0.12em] text-white/20">
            {number}
          </span>
        </div>

        <h3 className="mt-6 text-[21px] font-black tracking-[-0.025em] text-white">
          {title}
        </h3>

        <p className="mt-3 text-[15px] font-medium leading-6 text-white/55">
          {description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-[13px] font-black text-emerald-200/80">
          <span>Descoperă</span>

          <span className="transition group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </article>
  );
}