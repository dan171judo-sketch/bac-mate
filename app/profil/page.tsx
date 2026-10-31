"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

/* =========================================================
   TIPURI
========================================================= */

type AvatarGender = "male" | "female";

type ProfilBac = {
  id: string;
  cod: string;
  simbol: string;
  titlu: string;
  descriere: string;
  accent: "emerald" | "lime" | "amber" | "orange";
};

/* =========================================================
   PROFILURI BAC
========================================================= */

const profiluri: ProfilBac[] = [
  {
    id: "mate-info",
    cod: "M_mate-info",
    simbol: "MI",
    titlu: "Matematică-Informatică",
    descriere:
      "Pentru elevii de la profilul real, specializarea Matematică-Informatică.",
    accent: "emerald",
  },
  {
    id: "stiinte",
    cod: "M_șt-nat",
    simbol: "SN",
    titlu: "Științe ale Naturii",
    descriere:
      "Pentru elevii de la profilul real, specializarea Științe ale Naturii.",
    accent: "lime",
  },
  {
    id: "tehnologic",
    cod: "M_tehnologic",
    simbol: "T",
    titlu: "Profil Tehnologic",
    descriere:
      "Pentru elevii care susțin varianta de matematică M_tehnologic.",
    accent: "amber",
  },
  {
    id: "pedagogic",
    cod: "M_pedagogic",
    simbol: "P",
    titlu: "Profil Pedagogic",
    descriere:
      "Pentru elevii care susțin varianta de matematică M_pedagogic.",
    accent: "orange",
  },
];

/* =========================================================
   PAGINA PROFIL
========================================================= */

export default function ProfilPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [profilSelectat, setProfilSelectat] = useState("");
  const [avatarSelectat, setAvatarSelectat] =
    useState<AvatarGender>("male");

  const [loading, setLoading] = useState(false);
  const [incarcare, setIncarcare] = useState(true);
  const [mesaj, setMesaj] = useState("");

  /* =======================================================
     ÎNCĂRCARE PROFIL EXISTENT
  ======================================================= */

  useEffect(() => {
    let activ = true;

    async function incarcaProfilul() {
      try {
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

        const { data, error } = await supabase
          .from("profiles")
          .select("profil_bac, avatar_gender")
          .eq("id", user.id)
          .maybeSingle();

        if (!activ) {
          return;
        }

        if (error) {
          console.error(
            "Eroare la încărcarea profilului:",
            error
          );

          setMesaj(
            "Profilul nu a putut fi încărcat momentan."
          );

          setIncarcare(false);
          return;
        }

        if (data?.profil_bac) {
          const profilGasit = profiluri.find(
            (profil) => profil.cod === data.profil_bac
          );

          if (profilGasit) {
            setProfilSelectat(profilGasit.id);
          }
        }

        if (
          data?.avatar_gender === "male" ||
          data?.avatar_gender === "female"
        ) {
          setAvatarSelectat(
            data.avatar_gender as AvatarGender
          );
        }

        setIncarcare(false);
      } catch (error) {
        console.error(
          "Eroare neașteptată profil:",
          error
        );

        if (activ) {
          setMesaj(
            "A apărut o problemă la încărcarea profilului."
          );

          setIncarcare(false);
        }
      }
    }

    incarcaProfilul();

    return () => {
      activ = false;
    };
  }, [router, supabase]);

  /* =======================================================
     SALVARE
  ======================================================= */

  async function continua() {
    if (loading) {
      return;
    }

    if (!profilSelectat) {
      setMesaj(
        "Alege profilul pentru care te pregătești la Bac."
      );
      return;
    }

    const profil = profiluri.find(
      (item) => item.id === profilSelectat
    );

    if (!profil) {
      setMesaj("Profilul selectat nu este valid.");
      return;
    }

    setLoading(true);
    setMesaj("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMesaj(
          "Trebuie să fii autentificat pentru a salva profilul."
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
            avatar_gender: avatarSelectat,
          },
          {
            onConflict: "id",
          }
        );

      if (profilError) {
        throw profilError;
      }

      localStorage.setItem(
        "bac-mate-profil",
        profil.id
      );

      localStorage.setItem(
        "bac-mate-profil-cod",
        profil.cod
      );

      localStorage.setItem(
        "bac-mate-profil-nume",
        profil.titlu
      );

      localStorage.setItem(
        "bac-mate-avatar-gender",
        avatarSelectat
      );

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(
        "Eroare salvare profil:",
        error
      );

      setMesaj(
        error instanceof Error
          ? `Nu am putut salva profilul: ${error.message}`
          : "Nu am putut salva profilul. Încearcă din nou."
      );

      setLoading(false);
    }
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (incarcare) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06110e] text-white">
        <div className="text-center">
          <div className="relative mx-auto h-14 w-14">
            <div className="absolute inset-0 rounded-full bg-emerald-400/15 blur-xl" />

            <div className="relative h-14 w-14 animate-spin rounded-full border-[4px] border-emerald-400/15 border-t-lime-300" />
          </div>

          <p className="mt-5 text-sm font-black text-slate-300">
            Încărcăm profilul...
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Pregătim experiența ta BAC MATE.
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06110e] text-white">
      {/* FUNDAL */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-360px] h-[900px] w-[1200px] -translate-x-1/2 rounded-full bg-emerald-500/[0.11] blur-[170px]" />

        <div className="absolute -left-[260px] top-[430px] h-[620px] w-[620px] rounded-full bg-lime-400/[0.055] blur-[160px]" />

        <div className="absolute -right-[260px] top-[500px] h-[620px] w-[620px] rounded-full bg-orange-500/[0.07] blur-[160px]" />

        <div className="absolute bottom-[-380px] left-1/2 h-[720px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-600/[0.06] blur-[170px]" />
      </div>

      {/* HEADER */}

      <header className="relative z-30 border-b border-white/[0.07] bg-[#06110e]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-lime-300 to-amber-300 font-black text-[#06110e] shadow-lg shadow-emerald-500/20 transition group-hover:scale-105">
              B
            </div>

            <span className="text-lg font-black tracking-tight">
              BAC{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 bg-clip-text text-transparent">
                MATE
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-3 md:flex">
            <Step
              number="1"
              text="Alege MATE"
              active
            />

            <span className="h-px w-8 bg-emerald-300/15" />

            <Step
              number="2"
              text="Profil BAC"
              active={Boolean(profilSelectat)}
            />

            <span className="h-px w-8 bg-emerald-300/15" />

            <Step
              number="3"
              text="Continuă"
            />
          </div>

          <p className="hidden text-right text-xs font-semibold leading-5 text-slate-500 lg:block">
            Un pas mai aproape
            <br />
            de BAC.
          </p>
        </div>
      </header>

      {/* CONȚINUT */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 lg:px-8">
        {/* HERO */}

        <section className="mx-auto max-w-4xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[0.07] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(190,242,100,0.8)]" />

            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">
              Profilul tău BAC MATE
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Personalizează-ți
            <br />

            <span className="bg-gradient-to-r from-emerald-200 via-lime-200 to-orange-200 bg-clip-text text-transparent">
              experiența.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Alege varianta lui MATE care te va însoți și
            profilul pentru care te pregătești la Bac.
          </p>
        </section>

        {/* PASUL 1 */}

        <section className="mt-12">
          <SectionTitle
            step="Pasul 1"
            title="Alege-l pe MATE"
            description="Îl vei vedea în Dashboard, lecții și sesiunile cu MATE."
          />

          <div className="mx-auto mt-7 grid max-w-5xl gap-5 lg:grid-cols-2">
            <AvatarCard
              gender="male"
              selected={avatarSelectat === "male"}
              onSelect={() => {
                setAvatarSelectat("male");
                setMesaj("");
              }}
            />

            <AvatarCard
              gender="female"
              selected={avatarSelectat === "female"}
              onSelect={() => {
                setAvatarSelectat("female");
                setMesaj("");
              }}
            />
          </div>
        </section>

        {/* PASUL 2 */}

        <section className="mt-14">
          <SectionTitle
            step="Pasul 2"
            title="Pentru ce profil dai Bacul?"
            description="Programa și traseul de pregătire vor ține cont de această alegere."
          />

          <div className="mx-auto mt-7 grid max-w-5xl gap-3 md:grid-cols-2">
            {profiluri.map((profil) => (
              <ProfileCard
                key={profil.id}
                profil={profil}
                selected={
                  profilSelectat === profil.id
                }
                onSelect={() => {
                  setProfilSelectat(profil.id);
                  setMesaj("");
                }}
              />
            ))}
          </div>
        </section>

        {/* REZUMAT */}

        <section className="mx-auto mt-9 max-w-6xl">
          <div className="relative overflow-hidden rounded-[28px] border border-emerald-300/[0.15] bg-[radial-gradient(circle_at_0%_50%,rgba(52,211,153,0.12),transparent_35%),radial-gradient(circle_at_100%_50%,rgba(251,146,60,0.10),transparent_38%),linear-gradient(135deg,#091a14,#0b2119,#19190f)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-6">
            <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-lime-400/[0.07] blur-3xl" />

            <div className="pointer-events-none absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-orange-400/[0.07] blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <MiniAvatar
                  gender={avatarSelectat}
                />

                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
                    Configurația ta
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-base font-black sm:text-lg">
                    <span>
                      {avatarSelectat === "female"
                        ? "MATE roșu"
                        : "MATE albastru"}
                    </span>

                    <span className="text-emerald-700">
                      •
                    </span>

                    <span>
                      {profilSelectat
                        ? profiluri.find(
                            (item) =>
                              item.id ===
                              profilSelectat
                          )?.titlu
                        : "Alege profilul BAC"}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Poți reveni oricând aici pentru a
                    modifica aceste alegeri.
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-auto lg:min-w-[315px]">
                <button
                  type="button"
                  onClick={continua}
                  disabled={
                    !profilSelectat || loading
                  }
                  className={`flex min-h-[54px] w-full items-center justify-center gap-3 rounded-xl px-7 text-sm font-black transition-all duration-300 ${
                    profilSelectat && !loading
                      ? "bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300 text-[#06110e] shadow-xl shadow-emerald-500/15 hover:-translate-y-0.5 hover:brightness-110"
                      : "cursor-not-allowed border border-white/[0.08] bg-white/[0.04] text-slate-600"
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#06110e]/30 border-t-[#06110e]" />

                      Salvăm...
                    </>
                  ) : (
                    <>
                      Salvează și continuă

                      <span className="text-lg">
                        →
                      </span>
                    </>
                  )}
                </button>

                {!profilSelectat && (
                  <p className="mt-2 text-center text-[11px] font-semibold text-slate-600">
                    Alege un profil pentru a continua.
                  </p>
                )}
              </div>
            </div>

            {mesaj && (
              <div className="relative mt-4 rounded-xl border border-amber-300/20 bg-amber-300/[0.07] px-4 py-3 text-sm font-semibold text-amber-200">
                {mesaj}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   TITLU SECȚIUNE
========================================================= */

function SectionTitle({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-300">
        {step}
      </p>

      <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
        {title}
      </h2>

      <p className="mt-2 text-xs font-medium text-slate-500 sm:text-sm">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   STEPS HEADER
========================================================= */

function Step({
  number,
  text,
  active = false,
}: {
  number: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-black transition ${
          active
            ? "border-emerald-300/30 bg-gradient-to-br from-emerald-400 to-lime-300 text-[#06110e] shadow-[0_0_18px_rgba(52,211,153,0.18)]"
            : "border-white/[0.08] bg-white/[0.035] text-slate-600"
        }`}
      >
        {number}
      </span>

      <span
        className={`text-xs font-bold ${
          active
            ? "text-emerald-100"
            : "text-slate-600"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   AVATAR CARD
========================================================= */

function AvatarCard({
  gender,
  selected,
  onSelect,
}: {
  gender: AvatarGender;
  selected: boolean;
  onSelect: () => void;
}) {
  const female = gender === "female";

  const avatarSrc = female
    ? "/avatars/mate-girl.png"
    : "/avatars/mate-boy.png";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`
        group relative min-h-[330px] overflow-hidden rounded-[30px]
        border text-left transition-all duration-500
        hover:-translate-y-1
        ${
          selected
            ? "border-emerald-300/45 bg-gradient-to-br from-[#0d392a] via-[#10291f] to-[#241d10] shadow-[0_28px_90px_rgba(16,185,129,0.16)]"
            : "border-emerald-300/[0.1] bg-gradient-to-br from-[#0a2119] via-[#091913] to-[#16160f] hover:border-emerald-300/25 hover:shadow-[0_25px_80px_rgba(16,185,129,0.09)]"
        }
      `}
    >
      {/* FUNDAL */}

      <div className="pointer-events-none absolute -left-24 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[95px] transition-transform duration-700 group-hover:scale-110" />

      <div className="pointer-events-none absolute right-[-80px] top-[-60px] h-[260px] w-[260px] rounded-full bg-lime-400/[0.08] blur-[85px]" />

      <div className="pointer-events-none absolute bottom-[-100px] right-[-30px] h-[250px] w-[300px] rounded-full bg-orange-500/[0.09] blur-[80px]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent" />

      {/* BIFĂ */}

      {selected && (
        <div className="absolute right-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-lime-100/30 bg-gradient-to-br from-emerald-400 via-lime-300 to-amber-300 text-base font-black text-[#06110e] shadow-[0_0_28px_rgba(52,211,153,0.25)]">
          ✓
        </div>
      )}

      <div className="relative z-10 flex min-h-[330px] flex-col sm:flex-row">
        {/* AVATAR */}

        <div className="relative flex min-h-[300px] w-full shrink-0 items-end justify-center overflow-hidden sm:w-[52%]">
          <div className="pointer-events-none absolute left-1/2 top-[42px] h-[225px] w-[225px] -translate-x-1/2 rounded-full border-[3px] border-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.55),0_0_65px_rgba(132,204,22,0.18),inset_0_0_25px_rgba(52,211,153,0.12)]" />

          <div className="pointer-events-none absolute left-1/2 top-[30px] h-[250px] w-[250px] -translate-x-1/2 rounded-full border border-lime-200/10" />

          <img
            src={avatarSrc}
            alt={female ? "MATE Red" : "MATE Blue"}
            draggable={false}
            className="
              pointer-events-none
              relative
              z-20
              h-[315px]
              w-auto
              max-w-none
              select-none
              object-contain
              object-bottom
              drop-shadow-[0_25px_30px_rgba(0,0,0,0.45)]
              transition-transform
              duration-700
              group-hover:scale-[1.035]
            "
          />

          <div className="pointer-events-none absolute bottom-[-25px] left-1/2 z-10 h-28 w-[260px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[35px]" />

          <div className="pointer-events-none absolute bottom-[45px] left-4 z-30 hidden -rotate-6 text-left text-[11px] font-semibold italic leading-5 text-emerald-100/65 sm:block">
            {female ? (
              <>
                Tu poți.
                <br />
                Eu cred
                <br />
                în tine!
              </>
            ) : (
              <>
                Împreună
                <br />
                rezolvăm
                <br />
                mai mult!
              </>
            )}
          </div>
        </div>

        {/* TEXT */}

        <div className="relative z-30 flex flex-1 flex-col justify-center px-6 pb-7 pt-2 text-center sm:px-5 sm:py-7 sm:text-left">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-emerald-300">
            {female ? "MATE RED" : "MATE BLUE"}
          </p>

          <h3 className="mt-3 text-3xl font-black leading-[0.98] tracking-[-0.03em] text-white">
            Varianta
            <br />

            <span className="bg-gradient-to-r from-emerald-200 via-lime-200 to-amber-200 bg-clip-text text-transparent">
              {female ? "roșie" : "albastră"}
            </span>
          </h3>

          <p className="mt-5 text-sm font-medium leading-6 text-slate-400">
            Același profesor MATE,
            <br className="hidden xl:block" /> aceeași
            experiență de învățare. Alegi doar personajul
            care te va însoți.
          </p>

          <div
            className={`mt-6 flex min-h-[44px] items-center justify-center gap-2 rounded-xl border px-4 text-xs font-black transition-all duration-300 ${
              selected
                ? "border-emerald-300/35 bg-emerald-400/15 text-emerald-50 shadow-[0_0_25px_rgba(52,211,153,0.10)]"
                : "border-emerald-300/15 bg-emerald-400/[0.05] text-emerald-100 group-hover:border-lime-300/25 group-hover:bg-emerald-400/10"
            }`}
          >
            {selected ? (
              <>
                <span>✓</span>
                <span>MATE selectat</span>
              </>
            ) : (
              <>
                <span>
                  {female
                    ? "Alege MATE roșu"
                    : "Alege MATE albastru"}
                </span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ONLINE */}

      <div className="absolute bottom-5 left-[46%] z-50 hidden -translate-x-1/2 sm:flex">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-[4px] border-[#0a1813] bg-[#062b20] shadow-xl">
          <span className="relative flex h-[17px] w-[17px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-40" />

            <span className="relative flex h-[17px] w-[17px] items-center justify-center rounded-full bg-emerald-400">
              <span className="h-[6px] w-[6px] rounded-full bg-white" />
            </span>
          </span>
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   PROFILE CARD
========================================================= */

function ProfileCard({
  profil,
  selected,
  onSelect,
}: {
  profil: ProfilBac;
  selected: boolean;
  onSelect: () => void;
}) {
  const accentClasses = {
    emerald:
      "from-emerald-500/35 to-emerald-400/10 text-emerald-200 border-emerald-300/20",
    lime:
      "from-lime-500/30 to-emerald-400/10 text-lime-200 border-lime-300/20",
    amber:
      "from-amber-500/30 to-orange-400/10 text-amber-200 border-amber-300/20",
    orange:
      "from-orange-500/30 to-amber-400/10 text-orange-200 border-orange-300/20",
  }[profil.accent];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex min-h-[112px] items-center gap-4 rounded-[20px] border p-4 text-left transition-all duration-300 ${
        selected
          ? "border-emerald-300/40 bg-gradient-to-r from-emerald-400/[0.1] via-lime-400/[0.04] to-orange-400/[0.04] shadow-[0_15px_50px_rgba(16,185,129,0.08)]"
          : "border-white/[0.07] bg-[#091913]/85 hover:-translate-y-0.5 hover:border-emerald-300/15 hover:bg-[#0b2119]"
      }`}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br text-lg font-black ${accentClasses}`}
      >
        {profil.simbol}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-black text-slate-100">
          {profil.titlu}
        </h3>

        <p className="mt-0.5 text-[11px] font-black text-emerald-300">
          {profil.cod}
        </p>

        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          {profil.descriere}
        </p>
      </div>

      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
          selected
            ? "border-lime-300 bg-gradient-to-br from-emerald-400 to-lime-300 shadow-[0_0_15px_rgba(190,242,100,0.18)]"
            : "border-slate-600 bg-transparent"
        }`}
      >
        {selected && (
          <span className="h-2 w-2 rounded-full bg-[#06110e]" />
        )}
      </div>
    </button>
  );
}

/* =========================================================
   MINI AVATAR
========================================================= */

function MiniAvatar({
  gender,
}: {
  gender: AvatarGender;
}) {
  const female = gender === "female";

  return (
    <div className="relative shrink-0">
      <div className="absolute inset-[-6px] rounded-full bg-emerald-400/20 blur-lg" />

      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-emerald-300/60 bg-[#0b2119] shadow-[0_0_22px_rgba(52,211,153,0.22)]">
        <img
          src={
            female
              ? "/avatars/mate-girl.png"
              : "/avatars/mate-boy.png"
          }
          alt="MATE"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-[3px] border-[#0b1813] bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.45)]" />
    </div>
  );
}