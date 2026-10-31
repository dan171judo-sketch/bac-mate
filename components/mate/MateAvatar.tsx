"use client";

import Image from "next/image";

export type MateAvatarState =
  | "idle"
  | "thinking"
  | "listening"
  | "speaking";

type MateAvatarProps = {
  gender?: string | null;
  state?: MateAvatarState;
  size?: "small" | "large";
};

export default function MateAvatar({
  state = "idle",
  size = "large",
}: MateAvatarProps) {
  const imageSrc = "/mate/mate-tutor-boy.png";

  /*
   * AVATAR MIC
   * Header / zone compacte
   */
  if (size === "small") {
    return (
      <div
        className="relative h-[52px] w-[52px] shrink-0"
        title="MATE"
      >
        <div className="absolute -inset-1 rounded-[18px] bg-gradient-to-br from-cyan-400/50 via-blue-500/30 to-violet-500/50 blur-md" />

        <div className="relative h-[52px] w-[52px] overflow-hidden rounded-[17px] border border-cyan-300/40 bg-[#06142e] shadow-[0_0_24px_rgba(34,211,238,0.20)]">
          <Image
            src={imageSrc}
            alt="MATE"
            width={128}
            height={128}
            priority
            className="h-full w-full object-cover object-[50%_18%]"
          />
        </div>

        <span className="absolute -bottom-1 -right-1 z-20 h-[14px] w-[14px] rounded-full border-[3px] border-[#061126] bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
      </div>
    );
  }

  /*
   * AVATAR MARE
   * Personaj mai mare + status mutat sub imagine.
   */
  return (
    <div
      className="relative z-[50] mx-auto flex h-[430px] w-[430px] max-w-[94vw] items-start justify-center sm:h-[470px] sm:w-[470px] lg:h-[500px] lg:w-[500px]"
      data-mate-state={state}
    >
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[65px] sm:h-[430px] sm:w-[430px]" />

      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[55px] sm:h-[380px] sm:w-[380px]" />

      {/* cercuri decorative */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[405px] w-[405px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 sm:h-[445px] sm:w-[445px]" />

      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[345px] w-[345px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/10 sm:h-[385px] sm:w-[385px]" />

      {/* PERSONAJ MATE */}
      <div className="relative z-[100] mt-0 h-[390px] w-[390px] overflow-hidden rounded-[42px] border border-cyan-300/20 bg-[#07101f] shadow-[0_30px_80px_rgba(0,0,0,0.40),0_0_50px_rgba(34,211,238,0.14)] sm:h-[430px] sm:w-[430px] lg:h-[455px] lg:w-[455px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt="MATE, tutorul tau AI"
          draggable={false}
          className="block h-full w-full object-cover object-center"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            opacity: 1,
            visibility: "visible",
          }}
        />
      </div>

      {/* STATUS - sub personaj, nu peste el */}
      <div className="absolute bottom-0 left-1/2 z-[150] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-cyan-300/20 bg-[#07101f]/95 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100 shadow-[0_12px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />

        {state === "thinking"
          ? "MATE gandeste"
          : state === "listening"
            ? "MATE asculta"
            : state === "speaking"
              ? "MATE vorbeste"
              : "MATE este aici"}
      </div>
    </div>
  );
}