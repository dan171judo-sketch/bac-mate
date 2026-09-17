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
      label: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Lecții",
      href: "/programa",
      icon: <LessonsIcon />,
    },
    {
      label: "Evaluări",
      href: "/evaluare",
      icon: <EvaluationIcon />,
    },
    {
      label: "Progres",
      href: "/dashboard#progres",
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
      label: "Simulări BAC",
      href: "/dashboard#simulari",
      icon: <SimulationIcon />,
    },
    {
      label: "Profil",
      href: "/profil",
      icon: <ProfileIcon />,
    },
  ];

  const initial =
    studentName?.trim()?.charAt(0)?.toUpperCase() ||
    "M";

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      {/* FUNDAL GENERAL */}

      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-[18%] top-0 h-[420px] w-[620px] rounded-full bg-blue-600/[0.06] blur-[130px]" />
        <div className="absolute right-0 top-[20%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.04] blur-[150px]" />
      </div>

      {/* SIDEBAR DESKTOP */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[232px] border-r border-slate-800/80 bg-[#030b1b]/95 lg:flex lg:flex-col">
        <div className="border-b border-slate-800/80 px-8 py-7">
          <a
            href="/dashboard"
            className="block"
          >
            <div className="text-[27px] font-black tracking-tight text-white">
              BAC{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                MATE
              </span>
            </div>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.26em] text-slate-500">
              Matematica. Pas cu pas.
            </p>
          </a>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const active =
                item.label === "Progres"
                  ? pathname === "/dashboard"
                  : isRouteActive(
                      pathname,
                      item.href.split("#")[0]
                    );

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    active
                      ? "bg-blue-500/15 text-white"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  {active && (
                    <span className="absolute -left-3 top-2 bottom-2 w-1 rounded-r-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.8)]" />
                  )}

                  <span
                    className={`transition ${
                      active
                        ? "text-blue-400"
                        : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span className="flex-1">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-black tracking-wide text-cyan-300">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        <div className="px-4 pb-5">
          <div className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.04] p-4">
            <p className="text-sm italic leading-6 text-slate-400">
              „Nu trebuie să fii perfect.
              Trebuie doar să fii consecvent.”
            </p>

            <p className="mt-3 text-xs font-bold text-blue-400">
              — MATE
            </p>
          </div>
        </div>

        {onSignOut && (
          <div className="border-t border-slate-800/80 p-3">
            <button
              type="button"
              onClick={() => {
                void onSignOut();
              }}
              disabled={signingOut}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
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

        <header className="sticky top-0 z-30 hidden h-[68px] border-b border-slate-800/80 bg-[#030b1b]/85 backdrop-blur-xl lg:block">
          <div className="flex h-full items-center justify-end px-7 xl:px-10">
            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="max-w-[180px] truncate text-sm font-bold text-slate-100">
                  {studentName || "Elev BAC MATE"}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {profileName || "Profil BAC"}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/30 bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black shadow-[0_0_22px_rgba(59,130,246,0.25)]">
                {initial}
              </div>
            </div>
          </div>
        </header>

        {/* HEADER MOBIL */}

        <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#030b1b]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <a
              href="/dashboard"
              className="text-xl font-black tracking-tight"
            >
              BAC{" "}
              <span className="text-blue-500">
                MATE
              </span>
            </a>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-black">
                {initial}
              </div>

              <details className="relative">
                <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300">
                  <MenuIcon />
                </summary>

                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-800 bg-[#07101f] p-2 shadow-2xl">
                  <div className="border-b border-slate-800 px-3 py-3">
                    <p className="font-bold text-white">
                      {studentName ||
                        "Elev BAC MATE"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {profileName ||
                        "Profil BAC"}
                    </p>
                  </div>

                  <nav className="mt-2 space-y-1">
                    {navItems.map((item) => {
                      const active =
                        item.label === "Progres"
                          ? pathname ===
                            "/dashboard"
                          : isRouteActive(
                              pathname,
                              item.href.split(
                                "#"
                              )[0]
                            );

                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
                            active
                              ? "bg-blue-500/15 text-blue-300"
                              : "text-slate-400 hover:bg-slate-900 hover:text-white"
                          }`}
                        >
                          {item.icon}

                          <span className="flex-1">
                            {item.label}
                          </span>

                          {item.badge && (
                            <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[9px] font-black text-cyan-300">
                              {item.badge}
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </nav>

                  {onSignOut && (
                    <button
                      type="button"
                      onClick={() => {
                        void onSignOut();
                      }}
                      disabled={signingOut}
                      className="mt-2 flex w-full items-center gap-3 rounded-xl border-t border-slate-800 px-3 py-3 text-sm font-semibold text-red-300 disabled:opacity-50"
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

        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-800/90 bg-[#030b1b]/95 px-2 py-2 backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
            <a
              href="/dashboard"
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold ${
                pathname === "/dashboard"
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-slate-500"
              }`}
            >
              <DashboardIcon />
              Acasă
            </a>

            <a
              href="/programa"
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold ${
                pathname === "/programa" ||
                pathname.startsWith("/lectii")
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-slate-500"
              }`}
            >
              <LessonsIcon />
              Lecții
            </a>

            <a
              href="/mate"
              className={`relative flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold ${
                pathname.startsWith("/mate")
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-slate-500"
              }`}
            >
              <span className="absolute -top-4 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#030b1b] bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.4)]">
                <MateIcon />
              </span>

              <span className="mt-5">
                MATE
              </span>
            </a>

            <a
              href="/evaluare"
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold ${
                pathname.startsWith(
                  "/evaluare"
                )
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-slate-500"
              }`}
            >
              <EvaluationIcon />
              Evaluări
            </a>

            <a
              href="/profil"
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold ${
                pathname.startsWith("/profil")
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-slate-500"
              }`}
            >
              <ProfileIcon />
              Profil
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}