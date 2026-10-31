"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type BacMateShellProps = {
  children: ReactNode;
  studentName?: string | null;
  profileName?: string | null;
  onSignOut?: () => void | Promise<void>;
  signingOut?: boolean;
};

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: string;
};

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M9.5 21v-7h5v7" />
    </svg>
  );
}

function LessonsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="2"
      />
      <path d="M8 7h8" />
      <path d="M8 11h6" />
      <path d="m8 16 1.5 1.5L13 14" />
    </svg>
  );
}

function EvaluationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="17"
        rx="2"
      />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M7 10h10" />
      <path d="m8 15 2 2 5-5" />
    </svg>
  );
}

function ProgressIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 20V10" />
      <path d="M9 20V5" />
      <path d="M14 20v-8" />
      <path d="M19 20V3" />
      <path d="M2 20h20" />
    </svg>
  );
}

function MateIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 3 9.8 7.5 5 9.2l3.7 3.2-.9 4.8L12 14.8l4.2 2.4-.9-4.8L19 9.2l-4.8-1.7L12 3Z" />
      <path d="M4 4v3" />
      <path d="M2.5 5.5h3" />
      <path d="M20 16v4" />
      <path d="M18 18h4" />
    </svg>
  );
}

function ProgramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z" />
    </svg>
  );
}

function SubscriptionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 3 20 7.5 12 12 4 7.5 12 3Z" />
      <path d="M4 12l8 4.5 8-4.5" />
      <path d="M4 16.5 12 21l8-4.5" />
    </svg>
  );
}

function SimulationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="2"
      />
      <path d="M8 8h8" />
      <path d="M8 12h3" />
      <path d="M8 16h3" />
      <path d="m14 14 3 3" />
      <path d="m17 14-3 3" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="4"
      />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M10 5H5v14h5" />
      <path d="M14 8l4 4-4 4" />
      <path d="M18 12H9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function isRouteActive(
  pathname: string,
  href: string
) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  if (href === "/programa") {
    return pathname === "/programa";
  }

  if (href === "/evaluare") {
    return pathname.startsWith("/evaluare");
  }

  if (href === "/mate") {
    return pathname.startsWith("/mate");
  }

  if (href === "/profil") {
    return pathname.startsWith("/profil");
  }

  if (href === "/lectii") {
    return pathname.startsWith("/lectii");
  }

  if (href === "/abonamente") {
    return pathname.startsWith("/abonamente");
  }

  return pathname.startsWith(href);
}

export default function BacMateShell({
  children,
  studentName,
  profileName,
  onSignOut,
  signingOut = false,
}: BacMateShellProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      label: "Acasă",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Lecții",
      href: "/lectii",
      icon: <LessonsIcon />,
    },
    {
      label: "Evaluări",
      href: "/evaluare",
      icon: <EvaluationIcon />,
    },
    {
      label: "Progres",
      href: "/progres",
      icon: <ProgressIcon />,
    },
    {
      label: "MATE",
      href: "/mate",
      icon: <MateIcon />,
      badge: "NOU",
    },
    {
      label: "Programă",
      href: "/programa",
      icon: <ProgramIcon />,
    },
    {
      label: "Abonamente",
      href: "/abonamente",
      icon: <SubscriptionIcon />,
      badge: "BETA",
    },
    {
      label: "Profil",
      href: "/profil",
      icon: <ProfileIcon />,
    },
  ];

  const initial =
    studentName
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() || "M";

  return (
    <div className="min-h-screen bg-[#03100b] text-white">
      {/* FUNDAL GENERAL */}

      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-[10%] top-[-180px] h-[650px] w-[760px] rounded-full bg-emerald-500/[0.10] blur-[150px]" />

        <div className="absolute right-[-180px] top-[12%] h-[620px] w-[620px] rounded-full bg-orange-500/[0.07] blur-[170px]" />

        <div className="absolute bottom-[-280px] left-[28%] h-[620px] w-[620px] rounded-full bg-emerald-400/[0.06] blur-[180px]" />
      </div>

      {/* SIDEBAR DESKTOP */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[232px] flex-col border-r border-emerald-300/[0.16] bg-[#04150f]/97 shadow-[12px_0_55px_rgba(0,0,0,.30),4px_0_35px_rgba(16,185,129,.055)] backdrop-blur-2xl lg:flex">
        {/* LINIE LUMINOASĂ LATERALĂ */}

        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-emerald-300/5 via-emerald-300/45 to-orange-400/25"
          aria-hidden="true"
        />

        {/* GLOW SIDEBAR */}

        <div
          className="pointer-events-none absolute -left-32 top-[10%] h-[360px] w-[360px] rounded-full bg-emerald-500/[0.07] blur-[120px]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-36 left-[-80px] h-[320px] w-[320px] rounded-full bg-orange-500/[0.055] blur-[120px]"
          aria-hidden="true"
        />

        {/* LOGO */}

        <div className="relative border-b border-emerald-300/[0.12] px-8 py-7">
          <a
            href="/dashboard"
            className="group block"
          >
            <div className="text-[27px] font-black tracking-tight text-white">
              BAC{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(16,185,129,.14)]">
                MATE
              </span>
            </div>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.26em] text-emerald-100/30">
              Matematica. Pas cu pas.
            </p>

            <div className="mt-3 h-px w-12 bg-gradient-to-r from-emerald-300/70 to-orange-400/40 transition-all duration-300 group-hover:w-20" />
          </a>
        </div>

        {/* NAVIGAȚIE */}

        <nav className="relative flex-1 overflow-y-auto px-3 py-6">
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const active = isRouteActive(
                pathname,
                item.href
              );

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "border-emerald-300/25 bg-gradient-to-r from-emerald-500/[0.18] via-emerald-400/[0.10] to-orange-500/[0.08] text-white shadow-[0_0_28px_rgba(16,185,129,.08),0_10px_30px_rgba(0,0,0,.16)]"
                      : "border-transparent text-emerald-50/45 hover:border-emerald-300/[0.10] hover:bg-emerald-300/[0.045] hover:text-white"
                  }`}
                >
                  {active && (
                    <>
                      <span className="absolute -left-[1px] bottom-2 top-2 w-1 rounded-r-full bg-gradient-to-b from-emerald-300 via-emerald-400 to-orange-400 shadow-[0_0_18px_rgba(52,211,153,.85)]" />

                      <span
                        className="pointer-events-none absolute right-[-28px] top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-orange-400/[0.08] blur-2xl"
                        aria-hidden="true"
                      />

                      <span
                        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-orange-300/20"
                        aria-hidden="true"
                      />
                    </>
                  )}

                  <span
                    className={`relative transition ${
                      active
                        ? "text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,.35)]"
                        : "text-emerald-100/35 group-hover:text-orange-200"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span className="relative flex-1">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="relative rounded-full border border-orange-300/30 bg-gradient-to-r from-emerald-400/[0.12] to-orange-400/[0.16] px-2 py-0.5 text-[9px] font-black tracking-wide text-orange-200 shadow-[0_0_16px_rgba(249,115,22,.08)]">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* MESAJ MATE */}

        <div className="relative px-4 pb-5">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-300/20 bg-gradient-to-br from-emerald-500/[0.08] via-[#061710] to-orange-500/[0.055] p-4 shadow-[0_0_28px_rgba(16,185,129,.055),0_14px_35px_rgba(0,0,0,.20)]">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-400/[0.09] blur-2xl"
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/35 to-orange-300/20"
              aria-hidden="true"
            />

            <p className="relative text-sm italic leading-6 text-emerald-50/55">
              „Nu trebuie să fii perfect.
              Trebuie doar să fii consecvent.”
            </p>

            <p className="relative mt-3 text-xs font-black text-orange-300">
              — MATE
            </p>
          </div>
        </div>

        {/* DECONECTARE */}

        {onSignOut && (
          <div className="relative border-t border-emerald-300/[0.12] p-3">
            <button
              type="button"
              onClick={() => {
                void onSignOut();
              }}
              disabled={signingOut}
              className="flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-left text-sm font-semibold text-emerald-100/35 transition hover:border-red-400/15 hover:bg-red-500/[0.08] hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogoutIcon />

              <span>
                {signingOut
                  ? "Se deconectează..."
                  : "Deconectare"}
              </span>
            </button>
          </div>
        )}
      </aside>

      {/* CONȚINUT */}

      <div className="relative lg:pl-[232px]">
        {/* HEADER DESKTOP */}

        <header className="sticky top-0 z-30 hidden h-[68px] border-b border-emerald-300/[0.14] bg-[#04150f]/90 shadow-[0_8px_35px_rgba(0,0,0,.16),0_2px_24px_rgba(16,185,129,.035)] backdrop-blur-2xl lg:block">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/35 to-orange-400/20"
            aria-hidden="true"
          />

          <div className="flex h-full items-center justify-end px-7 xl:px-10">
            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="max-w-[180px] truncate text-sm font-bold text-emerald-50">
                  {studentName ||
                    "Elev BAC MATE"}
                </p>

                <p className="mt-0.5 text-xs text-emerald-100/30">
                  {profileName ||
                    "Profil BAC"}
                </p>
              </div>

              <div className="relative">
                <div
                  className="absolute -inset-2 rounded-full bg-emerald-400/[0.18] blur-xl"
                  aria-hidden="true"
                />

                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-orange-300/35 bg-gradient-to-br from-emerald-400 via-emerald-500 to-orange-500 text-sm font-black text-white shadow-[0_0_24px_rgba(16,185,129,.24),0_0_18px_rgba(249,115,22,.10)]">
                  {initial}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* HEADER MOBIL */}

        <header className="sticky top-0 z-40 border-b border-emerald-300/[0.14] bg-[#04150f]/95 px-4 py-3 shadow-[0_8px_35px_rgba(0,0,0,.20),0_2px_22px_rgba(16,185,129,.04)] backdrop-blur-2xl lg:hidden">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-orange-400/25"
            aria-hidden="true"
          />

          <div className="flex items-center justify-between">
            <a
              href="/dashboard"
              className="group text-xl font-black tracking-tight text-white"
            >
              BAC{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-orange-400 bg-clip-text text-transparent">
                MATE
              </span>
            </a>

            <div className="flex items-center gap-3">
              {/* AVATAR MOBIL */}

              <div className="relative">
                <div
                  className="absolute -inset-2 rounded-full bg-emerald-400/[0.18] blur-xl"
                  aria-hidden="true"
                />

                <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-orange-300/35 bg-gradient-to-br from-emerald-400 via-emerald-500 to-orange-500 text-sm font-black text-white shadow-[0_0_22px_rgba(16,185,129,.22),0_0_16px_rgba(249,115,22,.10)]">
                  {initial}
                </div>
              </div>

              {/* MENIU MOBIL */}

              <details className="relative">
                <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-xl border border-emerald-300/[0.16] bg-emerald-400/[0.055] text-emerald-100/60 shadow-[0_0_18px_rgba(16,185,129,.04)] transition hover:border-orange-300/30 hover:bg-orange-400/[0.08] hover:text-orange-100">
                  <MenuIcon />
                </summary>

                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-emerald-300/20 bg-[#04150f]/98 p-2 shadow-[0_25px_80px_rgba(0,0,0,.55),0_0_40px_rgba(16,185,129,.08)] backdrop-blur-2xl">
                  {/* GLOW DROPDOWN */}

                  <div
                    className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/[0.12] blur-[80px]"
                    aria-hidden="true"
                  />

                  <div
                    className="pointer-events-none absolute -bottom-24 right-[-60px] h-48 w-48 rounded-full bg-orange-500/[0.10] blur-[80px]"
                    aria-hidden="true"
                  />

                  <div
                    className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/45 to-orange-300/30"
                    aria-hidden="true"
                  />

                  {/* PROFIL */}

                  <div className="relative border-b border-emerald-300/[0.12] px-3 py-3">
                    <p className="truncate font-bold text-emerald-50">
                      {studentName ||
                        "Elev BAC MATE"}
                    </p>

                    <p className="mt-1 truncate text-xs text-emerald-100/30">
                      {profileName ||
                        "Profil BAC"}
                    </p>
                  </div>

                  {/* NAVIGAȚIE DROPDOWN */}

                  <nav className="relative mt-2 space-y-1">
                    {navItems.map((item) => {
                      const active =
                        isRouteActive(
                          pathname,
                          item.href
                        );

                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                            active
                              ? "border-emerald-300/25 bg-gradient-to-r from-emerald-500/[0.18] via-emerald-400/[0.10] to-orange-500/[0.08] text-white shadow-[0_0_22px_rgba(16,185,129,.07)]"
                              : "border-transparent text-emerald-50/45 hover:border-emerald-300/[0.10] hover:bg-emerald-300/[0.045] hover:text-white"
                          }`}
                        >
                          {active && (
                            <>
                              <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-gradient-to-b from-emerald-300 to-orange-400 shadow-[0_0_12px_rgba(52,211,153,.65)]" />

                              <span
                                className="pointer-events-none absolute right-[-20px] top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-orange-400/[0.07] blur-xl"
                                aria-hidden="true"
                              />
                            </>
                          )}

                          <span
                            className={`relative ${
                              active
                                ? "text-emerald-300"
                                : "text-emerald-100/35 group-hover:text-orange-200"
                            }`}
                          >
                            {item.icon}
                          </span>

                          <span className="relative flex-1">
                            {item.label}
                          </span>

                          {item.badge && (
                            <span className="relative rounded-full border border-orange-300/25 bg-gradient-to-r from-emerald-400/[0.12] to-orange-400/[0.16] px-2 py-0.5 text-[9px] font-black text-orange-200">
                              {item.badge}
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </nav>

                  {/* DECONECTARE MOBIL */}

                  {onSignOut && (
                    <button
                      type="button"
                      onClick={() => {
                        void onSignOut();
                      }}
                      disabled={signingOut}
                      className="relative mt-2 flex w-full items-center gap-3 border-t border-emerald-300/[0.12] px-3 py-3 text-sm font-semibold text-red-300/80 transition hover:bg-red-500/[0.07] hover:text-red-200 disabled:opacity-50"
                    >
                      <LogoutIcon />

                      {signingOut
                        ? "Se deconectează..."
                        : "Deconectare"}
                    </button>
                  )}
                </div>
              </details>
            </div>
          </div>
        </header>

        {/* PAGINA */}

        <main className="relative min-h-[calc(100vh-68px)]">
          {children}
        </main>

        {/* NAVIGAȚIE RAPIDĂ MOBIL */}

        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-emerald-300/[0.16] bg-[#04150f]/97 px-2 py-2 shadow-[0_-12px_45px_rgba(0,0,0,.28),0_-2px_28px_rgba(16,185,129,.04)] backdrop-blur-2xl lg:hidden">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/45 to-orange-400/30"
            aria-hidden="true"
          />

          <div className="relative mx-auto grid max-w-md grid-cols-5 gap-1">
            {/* ACASĂ */}

            <a
              href="/dashboard"
              className={`relative flex flex-col items-center gap-1 overflow-hidden rounded-xl border px-1 py-2 text-[10px] font-bold transition ${
                pathname === "/dashboard"
                  ? "border-emerald-300/20 bg-gradient-to-b from-emerald-500/[0.16] to-emerald-400/[0.07] text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,.07)]"
                  : "border-transparent text-emerald-100/30 hover:bg-emerald-400/[0.04] hover:text-emerald-100"
              }`}
            >
              {pathname ===
                "/dashboard" && (
                <span
                  className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"
                  aria-hidden="true"
                />
              )}

              <DashboardIcon />
              Acasă
            </a>

            {/* LECȚII */}

            <a
              href="/programa"
              className={`relative flex flex-col items-center gap-1 overflow-hidden rounded-xl border px-1 py-2 text-[10px] font-bold transition ${
                pathname === "/programa" ||
                pathname.startsWith(
                  "/lectii"
                )
                  ? "border-emerald-300/20 bg-gradient-to-b from-emerald-500/[0.16] to-emerald-400/[0.07] text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,.07)]"
                  : "border-transparent text-emerald-100/30 hover:bg-emerald-400/[0.04] hover:text-emerald-100"
              }`}
            >
              {(pathname ===
                "/programa" ||
                pathname.startsWith(
                  "/lectii"
                )) && (
                <span
                  className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"
                  aria-hidden="true"
                />
              )}

              <LessonsIcon />
              Lecții
            </a>

            {/* MATE CENTRAL */}

            <a
              href="/mate"
              className={`relative flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold transition ${
                pathname.startsWith(
                  "/mate"
                )
                  ? "text-orange-200"
                  : "text-emerald-100/30"
              }`}
            >
              <span
                className={`absolute -top-5 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#04150f] text-white transition ${
                  pathname.startsWith(
                    "/mate"
                  )
                    ? "bg-gradient-to-br from-emerald-300 via-emerald-500 to-orange-500 shadow-[0_0_28px_rgba(16,185,129,.38),0_0_22px_rgba(249,115,22,.20)]"
                    : "bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-[0_0_22px_rgba(16,185,129,.18)]"
                }`}
              >
                <MateIcon />
              </span>

              {pathname.startsWith(
                "/mate"
              ) && (
                <span
                  className="pointer-events-none absolute -top-7 h-16 w-16 rounded-full bg-orange-400/[0.10] blur-xl"
                  aria-hidden="true"
                />
              )}

              <span className="relative mt-5">
                MATE
              </span>
            </a>

            {/* EVALUĂRI */}

            <a
              href="/evaluare"
              className={`relative flex flex-col items-center gap-1 overflow-hidden rounded-xl border px-1 py-2 text-[10px] font-bold transition ${
                pathname.startsWith(
                  "/evaluare"
                )
                  ? "border-emerald-300/20 bg-gradient-to-b from-emerald-500/[0.16] to-emerald-400/[0.07] text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,.07)]"
                  : "border-transparent text-emerald-100/30 hover:bg-emerald-400/[0.04] hover:text-emerald-100"
              }`}
            >
              {pathname.startsWith(
                "/evaluare"
              ) && (
                <span
                  className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"
                  aria-hidden="true"
                />
              )}

              <EvaluationIcon />
              Evaluări
            </a>

            {/* PROFIL */}

            <a
              href="/profil"
              className={`relative flex flex-col items-center gap-1 overflow-hidden rounded-xl border px-1 py-2 text-[10px] font-bold transition ${
                pathname.startsWith(
                  "/profil"
                )
                  ? "border-emerald-300/20 bg-gradient-to-b from-emerald-500/[0.16] to-emerald-400/[0.07] text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,.07)]"
                  : "border-transparent text-emerald-100/30 hover:bg-emerald-400/[0.04] hover:text-emerald-100"
              }`}
            >
              {pathname.startsWith(
                "/profil"
              ) && (
                <span
                  className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"
                  aria-hidden="true"
                />
              )}

              <ProfileIcon />
              Profil
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
