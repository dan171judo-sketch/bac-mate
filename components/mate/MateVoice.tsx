
"use client";

import {
  AudioLines,
  LoaderCircle,
  Mic,
  MicOff,
  PhoneOff,
  Sparkles,
  Volume2,
} from "lucide-react";
import { GoogleGenAI, Modality } from "@google/genai";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import MateAvatar, {
  type MateAvatarState,
} from "./MateAvatar";

type MateVoiceProps = {
  open: boolean;
  avatarGender?: string | null;
  state?: MateAvatarState;
  onClose: () => void;
  onStartRealtime: () => void;
  realtimeReady?: boolean;
};

type LiveTokenResponse = {
  token: string;
  model: string;
  systemInstruction: string;
};

type LiveSessionLike = {
  sendRealtimeInput: (
    input: Record<string, unknown>
  ) => void;
  close: () => void;
};

type LiveMessage = {
  serverContent?: {
    modelTurn?: {
      parts?: Array<{
        inlineData?: {
          data?: string;
          mimeType?: string;
        };
      }>;
    };
    inputTranscription?: {
      text?: string;
    };
    outputTranscription?: {
      text?: string;
    };
    interrupted?: boolean;
    turnComplete?: boolean;
  };
};

const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;

function floatTo16BitPCM(input: Float32Array) {
  const buffer = new ArrayBuffer(input.length * 2);
  const view = new DataView(buffer);

  for (let i = 0; i < input.length; i++) {
    const sample = Math.max(
      -1,
      Math.min(1, input[i])
    );

    view.setInt16(
      i * 2,
      sample < 0
        ? sample * 0x8000
        : sample * 0x7fff,
      true
    );
  }

  return new Uint8Array(buffer);
}

function resampleTo16k(
  input: Float32Array,
  sourceRate: number
) {
  if (sourceRate === INPUT_SAMPLE_RATE) {
    return input;
  }

  const ratio = sourceRate / INPUT_SAMPLE_RATE;
  const length = Math.max(
    1,
    Math.round(input.length / ratio)
  );
  const output = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const position = i * ratio;
    const left = Math.floor(position);
    const right = Math.min(
      left + 1,
      input.length - 1
    );
    const fraction = position - left;

    output[i] =
      input[left] * (1 - fraction) +
      input[right] * fraction;
  }

  return output;
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";

  for (
    let offset = 0;
    offset < bytes.length;
    offset += 0x8000
  ) {
    binary += String.fromCharCode(
      ...bytes.subarray(offset, offset + 0x8000)
    );
  }

  return btoa(binary);
}

function base64ToInt16(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const length = bytes.byteLength -
    (bytes.byteLength % 2);

  return new Int16Array(
    bytes.buffer,
    bytes.byteOffset,
    length / 2
  );
}

function int16ToFloat32(input: Int16Array) {
  const output = new Float32Array(input.length);

  for (let i = 0; i < input.length; i++) {
    output[i] =
      input[i] < 0
        ? input[i] / 0x8000
        : input[i] / 0x7fff;
  }

  return output;
}

function withTimeout<T>(
  promise: Promise<T>,
  milliseconds: number,
  message: string
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(
      () => reject(new Error(message)),
      milliseconds
    );

    promise.then(
      (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timer);
        reject(error);
      }
    );
  });
}

export default function MateVoice({
  open,
  avatarGender,
  onClose,
}: MateVoiceProps) {
  const [voiceState, setVoiceState] =
    useState<MateAvatarState>("idle");

  const [connecting, setConnecting] =
    useState(false);

  const [active, setActive] =
    useState(false);

  const [muted, setMuted] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [userTranscript, setUserTranscript] =
    useState("");

  const [mateTranscript, setMateTranscript] =
    useState("");

  const sessionRef =
    useRef<LiveSessionLike | null>(null);

  const mediaStreamRef =
    useRef<MediaStream | null>(null);

  const inputContextRef =
    useRef<AudioContext | null>(null);

  const outputContextRef =
    useRef<AudioContext | null>(null);

  const processorRef =
    useRef<ScriptProcessorNode | null>(null);

  const sourceRef =
    useRef<MediaStreamAudioSourceNode | null>(null);

  const silentGainRef =
    useRef<GainNode | null>(null);

  const playingSourcesRef =
    useRef<Set<AudioBufferSourceNode>>(new Set());

  const nextPlaybackTimeRef = useRef(0);
  const activeRef = useRef(false);
  const mutedRef = useRef(false);
  const startingRef = useRef(false);
  const generationRef = useRef(0);
  const mountedRef = useRef(true);

  const stopPlayback = useCallback(() => {
    generationRef.current += 1;

    for (const source of playingSourcesRef.current) {
      try {
        source.stop();
      } catch {
        // Sursa poate fi deja oprită.
      }
    }

    playingSourcesRef.current.clear();

    nextPlaybackTimeRef.current =
      outputContextRef.current?.currentTime ?? 0;
  }, []);

  const stopMicrophone = useCallback(() => {
    const session = sessionRef.current;

    if (session) {
      try {
        session.sendRealtimeInput({
          audioStreamEnd: true,
        });
      } catch {
        // Conexiunea poate fi deja închisă.
      }
    }

    if (processorRef.current) {
      processorRef.current.onaudioprocess = null;

      try {
        processorRef.current.disconnect();
      } catch {}
    }

    try {
      sourceRef.current?.disconnect();
    } catch {}

    try {
      silentGainRef.current?.disconnect();
    } catch {}

    processorRef.current = null;
    sourceRef.current = null;
    silentGainRef.current = null;

    if (mediaStreamRef.current) {
      for (
        const track of
        mediaStreamRef.current.getTracks()
      ) {
        track.stop();
      }
    }

    mediaStreamRef.current = null;

    const context = inputContextRef.current;
    inputContextRef.current = null;

    if (context && context.state !== "closed") {
      void context.close().catch(() => {});
    }
  }, []);

  const closeOutputAudio = useCallback(async () => {
    const context = outputContextRef.current;
    outputContextRef.current = null;
    nextPlaybackTimeRef.current = 0;

    if (context && context.state !== "closed") {
      try {
        await context.close();
      } catch {
        // Contextul poate fi deja închis.
      }
    }
  }, []);

  const playAudioChunk = useCallback(
    async (base64: string) => {
      const generation = generationRef.current;
      const context = outputContextRef.current;

      if (
        !context ||
        context.state === "closed" ||
        !activeRef.current
      ) {
        return;
      }

      try {
        if (context.state === "suspended") {
          await withTimeout(
            context.resume(),
            8000,
            "Sunetul nu a putut fi reluat."
          );
        }

        if (
          generation !== generationRef.current ||
          !activeRef.current
        ) {
          return;
        }

        const pcm = base64ToInt16(base64);

        if (pcm.length === 0) {
          return;
        }

        const floatData = int16ToFloat32(pcm);
        const buffer = context.createBuffer(
          1,
          floatData.length,
          OUTPUT_SAMPLE_RATE
        );

        buffer.getChannelData(0).set(floatData);

        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);

        const startAt = Math.max(
          context.currentTime + 0.02,
          nextPlaybackTimeRef.current
        );

        source.start(startAt);

        nextPlaybackTimeRef.current =
          startAt + buffer.duration;

        playingSourcesRef.current.add(source);

        source.onended = () => {
          playingSourcesRef.current.delete(source);
          source.disconnect();
        };
      } catch (playError) {
        console.error(
          "MATE Voice playback:",
          playError
        );
      }
    },
    []
  );

  const handleLiveMessage = useCallback(
    (message: LiveMessage) => {
      const content = message.serverContent;

      if (!content) {
        return;
      }

      if (content.interrupted) {
        stopPlayback();

        if (activeRef.current) {
          setVoiceState("listening");
        }
      }

      const inputText =
        content.inputTranscription?.text;

      if (inputText) {
        setUserTranscript(
          (current) => current + inputText
        );
        setVoiceState("thinking");
      }

      const outputText =
        content.outputTranscription?.text;

      if (outputText) {
        setMateTranscript(
          (current) => current + outputText
        );
        setVoiceState("speaking");
      }

      const parts = content.modelTurn?.parts ?? [];

      for (const part of parts) {
        const inlineData = part.inlineData;

        if (!inlineData?.data) {
          continue;
        }

        if (
          inlineData.mimeType &&
          !inlineData.mimeType.startsWith("audio/")
        ) {
          continue;
        }

        setVoiceState("speaking");
        void playAudioChunk(inlineData.data);
      }

      if (
        content.turnComplete &&
        activeRef.current
      ) {
        setVoiceState(
          mutedRef.current ? "idle" : "listening"
        );
      }
    },
    [playAudioChunk, stopPlayback]
  );

  const startMicrophone = useCallback(
    async (session: LiveSessionLike) => {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Browserul nu oferă acces la microfon."
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
          video: false,
        });

      mediaStreamRef.current = stream;

      const context = new AudioContext();
      inputContextRef.current = context;

      if (context.state === "suspended") {
        await withTimeout(
          context.resume(),
          10000,
          "Microfonul nu a putut activa procesarea audio."
        );
      }

      const source =
        context.createMediaStreamSource(stream);

      sourceRef.current = source;

      const processor =
        context.createScriptProcessor(4096, 1, 1);

      processorRef.current = processor;

      const silentGain = context.createGain();
      silentGain.gain.value = 0;
      silentGainRef.current = silentGain;

      processor.onaudioprocess = (event) => {
        if (
          !activeRef.current ||
          mutedRef.current
        ) {
          return;
        }

        const input =
          event.inputBuffer.getChannelData(0);

        const copy = new Float32Array(input.length);
        copy.set(input);

        const resampled = resampleTo16k(
          copy,
          context.sampleRate
        );

        const pcm = floatTo16BitPCM(resampled);
        const base64 = bytesToBase64(pcm);

        try {
          session.sendRealtimeInput({
            audio: {
              data: base64,
              mimeType: "audio/pcm;rate=16000",
            },
          });
        } catch (sendError) {
          console.error(
            "MATE Voice microphone:",
            sendError
          );
        }
      };

      source.connect(processor);
      processor.connect(silentGain);
      silentGain.connect(context.destination);
    },
    []
  );

  const endSession = useCallback(
    async (closeModal = false) => {
      startingRef.current = false;
      activeRef.current = false;
      mutedRef.current = false;

      setActive(false);
      setConnecting(false);
      setMuted(false);

      stopMicrophone();
      stopPlayback();

      const session = sessionRef.current;
      sessionRef.current = null;

      if (session) {
        try {
          session.close();
        } catch {}
      }

      await closeOutputAudio();

      setVoiceState("idle");

      if (closeModal) {
        onClose();
      }
    },
    [
      onClose,
      stopMicrophone,
      stopPlayback,
      closeOutputAudio,
    ]
  );

  const startSession = useCallback(async () => {
    if (
      startingRef.current ||
      activeRef.current
    ) {
      return;
    }

    startingRef.current = true;

    /*
     * IMPORTANT PENTRU iPHONE:
     * Creăm și pornim contextul audio imediat,
     * înainte de primul await sau fetch.
     * Apelul resume() se face în gestul
     * utilizatorului.
     */
    let audioReady: Promise<void>;

    try {
      let outputContext = outputContextRef.current;

      if (
        !outputContext ||
        outputContext.state === "closed"
      ) {
        outputContext = new AudioContext({
          sampleRate: OUTPUT_SAMPLE_RATE,
        });

        outputContextRef.current = outputContext;
      }

      audioReady = outputContext.resume();
    } catch (audioError) {
      startingRef.current = false;

      setError(
        audioError instanceof Error
          ? audioError.message
          : "Nu am putut inițializa sunetul."
      );

      await closeOutputAudio();
      return;
    }

    setError(null);
    setUserTranscript("");
    setMateTranscript("");
    setConnecting(true);
    setVoiceState("thinking");

    try {
      /*
       * Verificăm pornirea sunetului înainte
       * de conectarea la Gemini.
       * Nu mai pierdem gestul utilizatorului,
       * deoarece resume() a fost deja apelat.
       */
      await withTimeout(
        audioReady,
        8000,
        "Pornirea sunetului a durat prea mult. Încearcă din nou."
      );

      const outputContext = outputContextRef.current;

      if (
        !outputContext ||
        outputContext.state !== "running"
      ) {
        throw new Error(
          "Sunetul nu este activ. Încearcă din nou."
        );
      }

      nextPlaybackTimeRef.current =
        outputContext.currentTime;

      /*
       * Solicităm tokenul efemer de la server.
       * Cheia GEMINI_API_KEY rămâne pe server.
       */
      const tokenController =
        new AbortController();

      const tokenTimer = window.setTimeout(
        () => tokenController.abort(),
        20000
      );

      let response: Response;

      try {
        response = await fetch(
          "/api/mate/live-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
            signal: tokenController.signal,
          }
        );
      } catch (tokenError) {
        if (
          tokenError instanceof Error &&
          tokenError.name === "AbortError"
        ) {
          throw new Error(
            "Serverul MATE Voice nu a răspuns în 20 de secunde."
          );
        }

        throw tokenError;
      } finally {
        window.clearTimeout(tokenTimer);
      }

      const json = (await response
        .json()
        .catch(() => null)) as
        | LiveTokenResponse
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          json &&
            "error" in json &&
            json.error
            ? json.error
            : "MATE Voice nu a putut porni."
        );
      }

      if (
        !json ||
        !("token" in json) ||
        !json.token ||
        !("model" in json) ||
        !json.model ||
        !("systemInstruction" in json)
      ) {
        throw new Error(
          "Serverul nu a returnat configurația Live completă."
        );
      }

      const ai = new GoogleGenAI({
        apiKey: json.token,
        apiVersion: "v1beta",
      });

      let openedResolve:
        | (() => void)
        | null = null;

      let openedReject:
        | ((reason?: unknown) => void)
        | null = null;

      const opened = new Promise<void>(
        (resolve, reject) => {
          openedResolve = resolve;
          openedReject = reject;
        }
      );

      /*
       * Conectăm sesiunea Gemini Live.
       */
      const session = (await withTimeout(
        ai.live.connect({
          model: json.model,

          config: {
            responseModalities: [
              Modality.AUDIO,
            ],

            systemInstruction:
              json.systemInstruction,

            inputAudioTranscription: {},
            outputAudioTranscription: {},

            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Sulafat",
                },
              },
            },

            realtimeInputConfig: {
              automaticActivityDetection: {
                disabled: false,
              },
            },

            sessionResumption: {},

            contextWindowCompression: {
              slidingWindow: {},
            },
          },

          callbacks: {
            onopen: () => {
              openedResolve?.();
            },

            onmessage: (message) => {
              handleLiveMessage(
                message as LiveMessage
              );
            },

            onerror: (event) => {
              console.error(
                "MATE Voice Live:",
                event
              );

              const message =
                event instanceof ErrorEvent
                  ? event.message
                  : "Conexiunea vocală a întâmpinat o eroare.";

              setError(message);

              openedReject?.(
                new Error(message)
              );
            },

            onclose: () => {
              if (activeRef.current) {
                activeRef.current = false;
                setActive(false);
                setVoiceState("idle");
              }
            },
          },
        }),
        20000,
        "Gemini nu a răspuns în 20 de secunde."
      )) as unknown as LiveSessionLike;

      sessionRef.current = session;

      await withTimeout(
        opened,
        20000,
        "Conexiunea Gemini nu s-a deschis în 20 de secunde."
      );

      /*
       * Pornim microfonul după ce conexiunea
       * este deschisă.
       */
      activeRef.current = true;
      setActive(true);

      mutedRef.current = false;
      setMuted(false);

      await withTimeout(
        startMicrophone(session),
        15000,
        "Microfonul nu a pornit în 15 secunde. Verifică permisiunile și încearcă din nou."
      );

      setVoiceState("listening");
    } catch (startError) {
      console.error(
        "MATE Voice start:",
        startError
      );

      activeRef.current = false;
      setActive(false);

      stopMicrophone();
      stopPlayback();

      const session = sessionRef.current;
      sessionRef.current = null;

      if (session) {
        try {
          session.close();
        } catch {}
      }

      await closeOutputAudio();

      setVoiceState("idle");

      let message =
        startError instanceof Error
          ? startError.message
          : "MATE Voice nu a putut porni.";

      if (
        startError instanceof Error &&
        (
          startError.name === "NotFoundError" ||
          message.includes(
            "Requested device not found"
          )
        )
      ) {
        message =
          "Nu am găsit un microfon. Folosește telefonul sau conectează un microfon.";
      }

      if (
        startError instanceof Error &&
        startError.name === "NotAllowedError"
      ) {
        message =
          "Accesul la microfon a fost refuzat. Permite microfonul din setările browserului.";
      }

      setError(message);
    } finally {
      startingRef.current = false;
      setConnecting(false);
    }
  }, [
    handleLiveMessage,
    startMicrophone,
    stopMicrophone,
    stopPlayback,
    closeOutputAudio,
  ]);

  const toggleMute = useCallback(() => {
    if (!activeRef.current) {
      return;
    }

    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);

    const tracks =
      mediaStreamRef.current
        ?.getAudioTracks() ?? [];

    for (const track of tracks) {
      track.enabled = !next;
    }

    if (next) {
      try {
        sessionRef.current?.sendRealtimeInput({
          audioStreamEnd: true,
        });
      } catch {}

      setVoiceState("idle");
    } else {
      setVoiceState("listening");
    }
  }, []);

  useEffect(() => {
    if (!open) {
      void endSession(false);
      setError(null);
      setUserTranscript("");
      setMateTranscript("");
    }
  }, [open, endSession]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      activeRef.current = false;
      startingRef.current = false;

      stopMicrophone();
      stopPlayback();

      try {
        sessionRef.current?.close();
      } catch {}

      sessionRef.current = null;

      const context = outputContextRef.current;
      outputContextRef.current = null;

      if (
        context &&
        context.state !== "closed"
      ) {
        void context.close().catch(() => {});
      }
    };
  }, [stopMicrophone, stopPlayback]);

  if (!open) {
    return null;
  }

  const statusTitle = connecting
    ? "Conectez MATE Voice..."
    : !active
      ? "Pornește conversația vocală"
      : muted
        ? "Microfon oprit"
        : voiceState === "listening"
          ? "Te ascult..."
          : voiceState === "speaking"
            ? "MATE îți răspunde..."
            : voiceState === "thinking"
              ? "MATE se gândește..."
              : "Conversație activă";

  const closeVoice = () => {
    void endSession(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#01040c]/90 p-4 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[8%] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      <div className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-[34px] border border-white/[0.08] bg-[#06101f]/95 shadow-[0_40px_120px_rgba(0,0,0,.65)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

        <div className="px-6 pb-8 pt-7 sm:px-10 sm:pb-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-300">
                <AudioLines className="h-4 w-4" />

                <span className="text-[10px] font-black uppercase tracking-[0.22em]">
                  MATE VOICE
                </span>

                {active && (
                  <span className="ml-1 flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                    Live
                  </span>
                )}
              </div>

              <h2 className="mt-2 text-2xl font-black text-white">
                Vorbește cu MATE
              </h2>
            </div>

            <button
              type="button"
              onClick={closeVoice}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-slate-400 transition hover:bg-red-500/10 hover:text-red-300"
              aria-label="Închide conversația vocală"
            >
              <PhoneOff className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 flex justify-center sm:mt-7">
            <MateAvatar
              gender={avatarGender}
              state={
                connecting
                  ? "thinking"
                  : voiceState
              }
            />
          </div>

          <div className="mt-5 text-center">
            <p className="text-lg font-bold text-white">
              {statusTitle}
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {active
                ? "Poți vorbi natural. MATE te ascultă și îți răspunde vocal în timp real."
                : "MATE folosește același context educațional ca tutorul din chat."}
            </p>
          </div>

          {error && (
            <div className="mx-auto mt-5 max-w-lg rounded-2xl border border-red-400/20 bg-red-500/[0.07] px-4 py-3 text-center text-xs leading-5 text-red-200">
              {error}
            </div>
          )}

          {(userTranscript || mateTranscript) && (
            <div className="mx-auto mt-6 max-w-lg space-y-3">
              {userTranscript && (
                <div className="rounded-2xl border border-blue-400/10 bg-blue-500/[0.06] px-4 py-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-300">
                    TU
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {userTranscript}
                  </p>
                </div>
              )}

              {mateTranscript && (
                <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.05] px-4 py-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    MATE
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {mateTranscript}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-7 flex items-center justify-center gap-3">
            {!active ? (
              <button
                type="button"
                onClick={() => void startSession()}
                disabled={connecting}
                className="group flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_50px_rgba(34,211,238,.22)] transition hover:scale-105 disabled:cursor-wait disabled:opacity-60"
                aria-label="Pornește MATE Voice"
              >
                {connecting ? (
                  <LoaderCircle className="h-7 w-7 animate-spin" />
                ) : (
                  <Mic className="h-7 w-7" />
                )}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={toggleMute}
                  className={`flex h-16 w-16 items-center justify-center rounded-full border transition ${
                    muted
                      ? "border-red-300/30 bg-red-500/15 text-red-300"
                      : "border-cyan-300/25 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/15"
                  }`}
                  aria-label={
                    muted
                      ? "Pornește microfonul"
                      : "Oprește microfonul"
                  }
                >
                  {muted ? (
                    <MicOff className="h-6 w-6" />
                  ) : (
                    <Mic className="h-6 w-6" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => void endSession(false)}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-red-300/25 bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
                  aria-label="Oprește conversația"
                >
                  <PhoneOff className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Mic className="h-3.5 w-3.5 text-cyan-400" />
              microfon live
            </span>

            <span className="flex items-center gap-1.5">
              <Volume2 className="h-3.5 w-3.5 text-blue-400" />
              răspuns vocal
            </span>

            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              context personal
            </span>
          </div>

          <p className="mx-auto mt-4 max-w-md text-center text-[10px] leading-5 text-slate-700">
            Browserul îți va cere permisiunea pentru microfon la prima pornire. Oprește conversația când ai terminat.
          </p>
        </div>
      </div>
    </div>
  );
}
