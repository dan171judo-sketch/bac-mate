
"use client";

import { useEffect, useState } from "react";

type BacMateVideoPlayerProps = {
  videoUrl: string;
  subtitleUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  durationSeconds?: number;
};

function formatDuration(seconds?: number): string | null {
  if (
    typeof seconds !== "number" ||
    !Number.isFinite(seconds) ||
    seconds <= 0
  ) {
    return null;
  }

  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const remaining = total % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remaining
  ).padStart(2, "0")}`;
}

export default function BacMateVideoPlayer({
  videoUrl,
  subtitleUrl,
  thumbnailUrl,
  title = "Lecție video BAC MATE",
  durationSeconds,
}: BacMateVideoPlayerProps) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStarted(false);
  }, [videoUrl]);

  const duration = formatDuration(durationSeconds);

  const isBunnyVideo = videoUrl.startsWith(
    "https://iframe.mediadelivery.net/embed/"
  );

  const separator = videoUrl.includes("?") ? "&" : "?";
  const embedUrl = `${videoUrl}${separator}autoplay=false&preload=false`;

  const startVideo = () => {
    window.dispatchEvent(
      new CustomEvent("bac-mate-video-start", {
        detail: { videoUrl },
      })
    );

    setStarted(true);
  };

  useEffect(() => {
    const handleOtherVideo = (event: Event) => {
      const customEvent = event as CustomEvent<{
        videoUrl: string;
      }>;

      if (customEvent.detail?.videoUrl !== videoUrl) {
        setStarted(false);
      }
    };

    window.addEventListener(
      "bac-mate-video-start",
      handleOtherVideo
    );

    return () => {
      window.removeEventListener(
        "bac-mate-video-start",
        handleOtherVideo
      );
    };
  }, [videoUrl]);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[#06150f]">
      {!started ? (
        <button
          type="button"
          onClick={startVideo}
          aria-label={`Pornește videoclipul: ${title}`}
          className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0c3325] via-[#071d15] to-[#030a07] px-5 text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(110,231,183,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(110,231,183,.13) 1px,transparent 1px)",
              backgroundSize: "42px 42px",
              maskImage:
                "radial-gradient(ellipse at center,black,transparent 80%)",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl"
          />

          <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-emerald-300/25 bg-black/25 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200 sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            BAC MATE ACADEMY
          </div>

          {duration && (
            <div className="absolute right-5 top-5 z-10 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-bold text-white/90">
              {duration}
            </div>
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[8%] top-[28%] -rotate-12 text-xl font-semibold text-emerald-300/15 sm:text-3xl"
          >
            f(x) = ax² + bx + c
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[22%] right-[7%] rotate-6 text-xl font-semibold text-emerald-300/15 sm:text-3xl"
          >
            Δ = b² − 4ac
          </div>

          <div className="relative z-10 flex max-w-xl flex-col items-center gap-3 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200/60 bg-emerald-400/20 shadow-[0_0_55px_rgba(52,211,153,0.18)] transition duration-300 group-hover:scale-110 group-hover:bg-emerald-400/35 sm:h-24 sm:w-24">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="ml-1 h-9 w-9 text-emerald-100 sm:h-11 sm:w-11"
              >
                <path d="M8 5.5a1 1 0 0 1 1.52-.85l10 6.5a1 1 0 0 1 0 1.7l-10 6.5A1 1 0 0 1 8 18.5v-13Z" />
              </svg>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300/75 sm:text-xs">
              Lecție video interactivă
            </p>

            <h3 className="line-clamp-2 text-lg font-black tracking-tight text-white sm:text-2xl">
              {title}
            </h3>

            <p className="text-xs font-medium text-emerald-100/65 sm:text-sm">
              Învață matematica pas cu pas
            </p>

            <span className="mt-2 rounded-full bg-emerald-300 px-5 py-2.5 text-xs font-black text-[#063522] shadow-lg shadow-emerald-500/15 transition group-hover:bg-emerald-200 sm:text-sm">
              ▶ Începe lecția
            </span>
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-semibold tracking-[0.18em] text-white/40 sm:text-xs">
            ÎNVAȚĂ • ÎNȚELEGE • REUȘEȘTE
          </div>
        </button>
      ) : isBunnyVideo ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <video
          key={videoUrl}
          controls
          autoPlay
          preload="metadata"
          poster={thumbnailUrl}
          className="absolute inset-0 h-full w-full bg-black object-contain"
        >
          <source src={videoUrl} type="video/mp4" />

          {subtitleUrl && (
            <track
              kind="subtitles"
              src={subtitleUrl}
              srcLang="ro"
              label="Română"
              default
            />
          )}

          Browserul tău nu poate reda acest videoclip.
        </video>
      )}
    </div>
  );
}
