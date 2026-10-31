"use client";

import {
  Bot,
  Camera,
  UserRound,
} from "lucide-react";

import MateAvatar from "./MateAvatar";
import MateMath from "./MateMath";

type MateMessageProps = {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string | null;
  avatarGender?: string | null;
  streaming?: boolean;
};

export default function MateMessage({
  role,
  content,
  imageUrl,
  avatarGender,
  streaming = false,
}: MateMessageProps) {
  const assistant =
    role === "assistant";

  return (
    <div
      className={`flex gap-3 ${
        assistant
          ? "justify-start"
          : "justify-end"
      }`}
    >
      {assistant && (
        <div className="mt-1">
          <MateAvatar
            gender={avatarGender}
            size="small"
            state={
              streaming
                ? "thinking"
                : "idle"
            }
          />
        </div>
      )}

      <div
        className={`max-w-[88%] sm:max-w-[78%] ${
          assistant
            ? ""
            : "order-first"
        }`}
      >
        <div className="mb-1.5 flex items-center gap-2 px-1">
          {assistant ? (
            <>
              <Bot className="h-3.5 w-3.5 text-cyan-400" />

              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-400">
                MATE
              </span>
            </>
          ) : (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                TU
              </span>

              <UserRound className="h-3.5 w-3.5 text-slate-500" />
            </div>
          )}
        </div>

        <div
          className={`overflow-hidden rounded-[22px] border ${
            assistant
              ? "rounded-tl-md border-white/[0.07] bg-white/[0.035] px-5 py-4 shadow-[0_16px_50px_rgba(0,0,0,.18)]"
              : "rounded-tr-md border-blue-400/20 bg-gradient-to-br from-blue-600/90 to-indigo-700/90 px-5 py-4 text-white shadow-[0_16px_45px_rgba(37,99,235,.16)]"
          }`}
        >
          {imageUrl && (
            <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Problemă trimisă lui MATE"
                className="max-h-[340px] w-full object-contain"
              />

              <div className="flex items-center gap-2 border-t border-white/[0.07] px-3 py-2 text-[11px] font-bold text-slate-400">
                <Camera className="h-3.5 w-3.5" />
                Imagine atașată
              </div>
            </div>
          )}

          {assistant ? (
            <>
              {content ? (
                <MateMath
                  content={content}
                />
              ) : (
                <div className="flex items-center gap-1.5 py-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
                </div>
              )}

              {streaming &&
                content && (
                  <span className="ml-1 inline-block h-4 w-1 animate-pulse rounded-full bg-cyan-300 align-middle" />
                )}
            </>
          ) : (
            <p className="whitespace-pre-wrap text-[15px] leading-7 text-blue-50">
              {content ||
                "Analizează această imagine."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}