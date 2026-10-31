"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  ArrowUp,
  BrainCircuit,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  History,
  Lightbulb,
  Menu,
  MessageSquarePlus,
  Mic,
  RefreshCw,
  Sparkles,
  Square,
  Target,
  Trash2,
  WandSparkles,
  X,
} from "lucide-react";

import "katex/dist/katex.min.css";

import BacMateShell from "../../components/BacMateShell";

import MateAvatar, {
  type MateAvatarState,
} from "../../components/mate/MateAvatar";

import MateMessage from "../../components/mate/MateMessage";
import MateVoice from "../../components/mate/MateVoice";

import { createClient } from "../../lib/supabase/client";

import type {
  MateConversation,
  MateMessage as StoredMateMessage,
  MateTutorMode,
} from "../../lib/mate/types";

type ProfileRow = {
  nume: string | null;
  profil_bac: string | null;
  avatar_gender: string | null;
};

type UiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string | null;
  attachmentPath?: string | null;
  streaming?: boolean;
};

type ModeDefinition = {
  id: MateTutorMode;
  label: string;
  shortLabel: string;
  description: string;
  icon: typeof Lightbulb;
};

const MODES: ModeDefinition[] = [
  {
    id: "general",
    label: "Întreabă orice",
    shortLabel: "General",
    description: "Discută liber despre matematică.",
    icon: Sparkles,
  },
  {
    id: "hint",
    label: "Dă-mi un indiciu",
    shortLabel: "Indiciu",
    description: "Te ajută fără să-ți dea direct soluția.",
    icon: Lightbulb,
  },
  {
    id: "explain",
    label: "Explică-mi",
    shortLabel: "Explică",
    description: "Explicație intuitivă și apoi matematică.",
    icon: BrainCircuit,
  },
  {
    id: "check",
    label: "Verifică soluția mea",
    shortLabel: "Verifică",
    description: "Găsește exact unde apare greșeala.",
    icon: CheckCircle2,
  },
  {
    id: "solve",
    label: "Rezolvă pas cu pas",
    shortLabel: "Rezolvă",
    description: "Rezolvare riguroasă, explicată.",
    icon: Target,
  },
  {
    id: "similar",
    label: "Dă-mi unul similar",
    shortLabel: "Similar",
    description: "Primești un exercițiu apropiat.",
    icon: RefreshCw,
  },
  {
    id: "quiz",
    label: "Testează-mă",
    shortLabel: "Quiz",
    description: "MATE pune întrebările pe rând.",
    icon: CircleHelp,
  },
];

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

function uniqueFileName(originalName: string) {
  const extension =
    originalName
      .split(".")
      .pop()
      ?.toLowerCase() || "jpg";

  return `${Date.now()}-${crypto.randomUUID()}.${extension}`;
}

export default function MatePage() {
  const router = useRouter();

  const supabaseRef = useRef(createClient());
  const supabase = supabaseRef.current;

  const textareaRef =
    useRef<HTMLTextAreaElement | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const bottomRef =
    useRef<HTMLDivElement | null>(null);

  const abortRef =
    useRef<AbortController | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [signingOut, setSigningOut] =
    useState(false);

  const [profile, setProfile] =
    useState<ProfileRow | null>(null);

  const [conversations, setConversations] =
    useState<MateConversation[]>([]);

  const [
    activeConversationId,
    setActiveConversationId,
  ] = useState<string | null>(null);

  const [messages, setMessages] =
    useState<UiMessage[]>([]);

  const [input, setInput] =
    useState("");

  const [mode, setMode] =
    useState<MateTutorMode>("general");

  const [sending, setSending] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [historyOpen, setHistoryOpen] =
    useState(true);

  const [mobileHistory, setMobileHistory] =
    useState(false);

  const [voiceOpen, setVoiceOpen] =
    useState(false);

  const [voiceState] =
    useState<MateAvatarState>("idle");

  const [
    voiceRealtimeReady,
    setVoiceRealtimeReady,
  ] = useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [
    selectedPreview,
    setSelectedPreview,
  ] = useState<string | null>(null);

  const [
    uploadingImage,
    setUploadingImage,
  ] = useState(false);

  const selectedMode =
    MODES.find(
      (item) => item.id === mode
    ) ?? MODES[0];

  const SelectedModeIcon =
    selectedMode.icon;

  useEffect(() => {
    void initialise();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, sending]);

  useEffect(() => {
    if (!selectedFile) {
      setSelectedPreview(null);
      return;
    }

    const url =
      URL.createObjectURL(selectedFile);

    setSelectedPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  async function initialise() {
    setLoading(true);
    setError(null);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      router.replace("/cont");
      return;
    }

    const [
      profileResult,
      conversationsResponse,
    ] = await Promise.all([
      supabase
        .from("profiles")
        .select(
          "nume, profil_bac, avatar_gender"
        )
        .eq("id", user.id)
        .maybeSingle(),

      fetch("/api/mate/conversations", {
        cache: "no-store",
      }),
    ]);

    if (
      profileResult.error ||
      !profileResult.data
    ) {
      setError(
        "Profilul tău nu a putut fi încărcat."
      );

      setLoading(false);
      return;
    }

    const loadedProfile =
      profileResult.data as ProfileRow;

    setProfile(loadedProfile);

    if (conversationsResponse.ok) {
      const json =
        await conversationsResponse.json();

      setConversations(
        json.conversations ?? []
      );
    }

    setLoading(false);
  }

  async function refreshConversations(
    preferredId?: string | null
  ) {
    const response = await fetch(
      "/api/mate/conversations",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return;
    }

    const json =
      await response.json();

    const next =
      (json.conversations ??
        []) as MateConversation[];

    setConversations(next);

    if (preferredId) {
      setActiveConversationId(
        preferredId
      );
    }
  }

  async function loadConversation(
    conversationId: string
  ) {
    if (sending) {
      return;
    }

    setError(null);
    setMobileHistory(false);

    setActiveConversationId(
      conversationId
    );

    const response = await fetch(
      `/api/mate/conversations/${conversationId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      setError(
        "Conversația nu a putut fi încărcată."
      );

      return;
    }

    const json =
      await response.json();

    const stored =
      (json.messages ??
        []) as StoredMateMessage[];

    const uiMessages: UiMessage[] =
      await Promise.all(
        stored.map(
          async (
            item
          ): Promise<UiMessage> => {
            let imageUrl:
              | string
              | null = null;

            if (item.attachment_path) {
              const { data } =
                await supabase.storage
                  .from("mate-media")
                  .createSignedUrl(
                    item.attachment_path,
                    60 * 30
                  );

              imageUrl =
                data?.signedUrl ?? null;
            }

            return {
              id: item.id,
              role: item.role,
              content: item.content,
              imageUrl,
              attachmentPath:
                item.attachment_path,
            };
          }
        )
      );

    setMessages(uiMessages);
  }

  function startNewConversation() {
    if (sending) {
      return;
    }

    setActiveConversationId(null);
    setMessages([]);
    setInput("");
    setSelectedFile(null);
    setMode("general");
    setError(null);
    setMobileHistory(false);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  }

  async function archiveConversation(
    id: string
  ) {
    if (sending) {
      return;
    }

    const response = await fetch(
      `/api/mate/conversations/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      setError(
        "Conversația nu a putut fi arhivată."
      );

      return;
    }

    if (
      activeConversationId === id
    ) {
      startNewConversation();
    }

    await refreshConversations();
  }

  function handleFile(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowed.includes(file.type)) {
      setError(
        "Poți trimite imagini JPG, PNG sau WEBP."
      );
      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Imaginea poate avea maximum 10 MB."
      );
      return;
    }

    setError(null);
    setSelectedFile(file);
  }

  async function ensureConversationForUpload() {
    if (activeConversationId) {
      return activeConversationId;
    }

    const response = await fetch(
      "/api/mate/conversations",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title:
            input
              .trim()
              .slice(0, 70) ||
            "Problemă din imagine",
          mode: "mixed",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Conversația nu a putut fi creată."
      );
    }

    const json =
      await response.json();

    const id =
      json.conversation?.id as string;

    if (!id) {
      throw new Error(
        "Conversația nu are ID."
      );
    }

    setActiveConversationId(id);

    await refreshConversations(id);

    return id;
  }

  async function uploadSelectedImage(
    conversationId: string
  ) {
    if (!selectedFile) {
      return {
        path: null,
        mimeType: null,
        previewUrl: null,
      };
    }

    setUploadingImage(true);

    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          "Sesiunea a expirat."
        );
      }

      const path = `${user.id}/${conversationId}/${uniqueFileName(
        selectedFile.name
      )}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("mate-media")
        .upload(
          path,
          selectedFile,
          {
            cacheControl: "3600",
            upsert: false,
            contentType:
              selectedFile.type,
          }
        );

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: signedData,
      } = await supabase.storage
        .from("mate-media")
        .createSignedUrl(
          path,
          60 * 30
        );

      return {
        path,
        mimeType:
          selectedFile.type,
        previewUrl:
          signedData?.signedUrl ??
          selectedPreview,
      };
    } finally {
      setUploadingImage(false);
    }
  }

  async function sendMessage() {
    const clean =
      input.trim();

    if (
      sending ||
      (!clean && !selectedFile)
    ) {
      return;
    }

    setError(null);
    setSending(true);

    const localUserId =
      crypto.randomUUID();

    const localAssistantId =
      crypto.randomUUID();

    let conversationId =
      activeConversationId;

    try {
      if (selectedFile) {
        conversationId =
          await ensureConversationForUpload();
      }

      let uploaded: {
        path: string | null;
        mimeType: string | null;
        previewUrl: string | null;
      } = {
        path: null,
        mimeType: null,
        previewUrl: null,
      };

      if (
        selectedFile &&
        conversationId
      ) {
        uploaded =
          await uploadSelectedImage(
            conversationId
          );
      }

      setMessages(
        (current) => [
          ...current,
          {
            id: localUserId,
            role: "user",
            content: clean,
            imageUrl:
              uploaded.previewUrl ??
              selectedPreview,
            attachmentPath:
              uploaded.path,
          },
          {
            id: localAssistantId,
            role: "assistant",
            content: "",
            streaming: true,
          },
        ]
      );

      setInput("");
      setSelectedFile(null);

      const controller =
        new AbortController();

      abortRef.current =
        controller;

      const response = await fetch(
        "/api/mate/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            conversationId,
            message: clean,
            tutorMode: mode,
            attachmentPath:
              uploaded.path,
            attachmentMimeType:
              uploaded.mimeType,
          }),
          signal:
            controller.signal,
        }
      );

      if (!response.ok) {
        const json =
          await response
            .json()
            .catch(() => null);

        throw new Error(
          json?.error ||
            "MATE nu a putut răspunde."
        );
      }

      const returnedId =
        response.headers.get(
          "X-Mate-Conversation-Id"
        );

      if (returnedId) {
        conversationId =
          returnedId;

        setActiveConversationId(
          returnedId
        );
      }

      if (!response.body) {
        throw new Error(
          "Răspunsul MATE nu conține date."
        );
      }

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let fullText = "";

      while (true) {
        const {
          value,
          done,
        } = await reader.read();

        if (done) {
          break;
        }

        const delta =
          decoder.decode(value, {
            stream: true,
          });

        fullText += delta;

        setMessages(
          (current) =>
            current.map(
              (item) =>
                item.id ===
                localAssistantId
                  ? {
                      ...item,
                      content:
                        fullText,
                    }
                  : item
            )
        );
      }

      setMessages(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              localAssistantId
                ? {
                    ...item,
                    streaming:
                      false,
                  }
                : item
          )
      );

      await refreshConversations(
        conversationId
      );
    } catch (sendError) {
      if (
        sendError instanceof
          DOMException &&
        sendError.name ===
          "AbortError"
      ) {
        setMessages(
          (current) =>
            current.map(
              (item) =>
                item.id ===
                localAssistantId
                  ? {
                      ...item,
                      streaming:
                        false,
                    }
                  : item
            )
        );
      } else {
        console.error(
          "MATE send:",
          sendError
        );

        setMessages(
          (current) =>
            current.filter(
              (item) =>
                item.id !==
                localAssistantId
            )
        );

        setError(
          sendError instanceof Error
            ? sendError.message
            : "A apărut o eroare."
        );
      }
    } finally {
      abortRef.current = null;
      setSending(false);
    }
  }

  function stopGeneration() {
    abortRef.current?.abort();
    abortRef.current = null;
    setSending(false);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      void sendMessage();
    }
  }

  async function signOut() {
    setSigningOut(true);

    await supabase.auth.signOut();

    router.replace("/cont");
    router.refresh();
  }

  function openVoice() {
    setVoiceOpen(true);
  }

  function handleRealtimeButton() {
    setVoiceRealtimeReady(
      (current) => !current
    );
  }
    if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#03100b] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,.04) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.18] blur-[120px]" />

        <div className="absolute left-[57%] top-[53%] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.13] blur-[110px]" />

        <div className="relative text-center">
          <div className="relative mx-auto h-20 w-20">
            <div className="absolute -inset-3 animate-pulse rounded-full border border-emerald-300/20 shadow-[0_0_45px_rgba(16,185,129,.35)]" />

            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/10" />

            <div className="absolute inset-1 animate-spin rounded-full border-2 border-orange-400/25 border-t-emerald-300 shadow-[0_0_30px_rgba(16,185,129,.22)]" />

            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-400 to-orange-500 shadow-[0_0_38px_rgba(16,185,129,.55),0_0_22px_rgba(249,115,22,.28)]" />
          </div>

          <p className="mt-6 text-sm font-black tracking-wide text-white">
            MATE se pregătește
          </p>

          <p className="mt-1 text-xs text-emerald-100/40">
            Un moment și intrăm în matematică.
          </p>
        </div>
      </div>
    );
  }

  return (
    <BacMateShell
      studentName={profile?.nume}
      profileName={profile?.profil_bac}
      onSignOut={signOut}
      signingOut={signingOut}
    >
      <div className="relative h-[calc(100vh-68px)] min-h-[720px] overflow-hidden bg-[#03100b] text-white lg:h-[calc(100vh-68px)]">
        {/* FUNDAL MATE */}

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 opacity-[0.85]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(16,185,129,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 94%)",
            }}
          />

          <div className="absolute -left-48 -top-64 h-[760px] w-[760px] rounded-full bg-emerald-500/[0.18] blur-[165px]" />

          <div className="absolute right-[-220px] top-[4%] h-[720px] w-[720px] rounded-full bg-orange-500/[0.15] blur-[180px]" />

          <div className="absolute bottom-[-360px] left-[22%] h-[760px] w-[760px] rounded-full bg-emerald-400/[0.10] blur-[190px]" />

          <div className="absolute left-[38%] top-[5%] h-[500px] w-[500px] rounded-full bg-lime-400/[0.055] blur-[170px]" />

          <div className="absolute bottom-[-240px] right-[8%] h-[500px] w-[500px] rounded-full bg-orange-600/[0.10] blur-[160px]" />

          <div className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent" />

          <span className="math-symbol absolute left-[8%] top-[17%] hidden text-5xl font-black text-emerald-300/[0.10] md:block">
            π
          </span>

          <span className="math-symbol absolute right-[10%] top-[19%] hidden text-4xl font-black text-orange-300/[0.10] md:block">
            ∑
          </span>

          <span className="math-symbol absolute bottom-[24%] left-[18%] hidden text-4xl font-black text-emerald-300/[0.08] lg:block">
            √x
          </span>

          <span className="math-symbol absolute bottom-[16%] right-[16%] hidden text-6xl font-black text-orange-300/[0.075] lg:block">
            ∞
          </span>

          <span className="math-symbol absolute left-[52%] top-[31%] hidden text-2xl font-black text-lime-200/[0.06] xl:block">
            f(x)
          </span>
        </div>

        <div className="relative flex h-full">
          {/* ISTORIC DESKTOP */}

          <aside
            className={`relative hidden shrink-0 border-r border-emerald-400/[0.16] bg-[#04150f]/90 shadow-[12px_0_55px_rgba(0,0,0,.26),4px_0_30px_rgba(16,185,129,.045)] backdrop-blur-2xl transition-all duration-300 xl:flex xl:flex-col ${
              historyOpen
                ? "w-[300px]"
                : "w-[76px]"
            }`}
          >
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-emerald-400/30 to-orange-400/15"
              aria-hidden="true"
            />

            <div className="flex h-[76px] items-center border-b border-emerald-300/[0.10] px-4">
              {historyOpen ? (
                <>
                  <button
                    type="button"
                    onClick={startNewConversation}
                    className="group relative flex flex-1 items-center gap-3 overflow-hidden rounded-2xl border border-emerald-300/30 bg-gradient-to-r from-emerald-500/[0.18] via-emerald-400/[0.10] to-orange-500/[0.14] px-4 py-3 text-sm font-black text-white shadow-[0_0_28px_rgba(16,185,129,.10),0_10px_35px_rgba(0,0,0,.20)] transition hover:border-emerald-200/55 hover:shadow-[0_0_38px_rgba(16,185,129,.18),0_0_22px_rgba(249,115,22,.08)]"
                  >
                    <span
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full"
                      aria-hidden="true"
                    />

                    <span className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[0.12] text-emerald-100 shadow-[0_0_18px_rgba(52,211,153,.12)] transition group-hover:scale-105">
                      <MessageSquarePlus className="h-4 w-4" />
                    </span>

                    <span className="relative">
                      Chat nou
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setHistoryOpen(false)
                    }
                    className="ml-2 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/[0.08] text-emerald-100/40 transition hover:border-orange-300/20 hover:bg-orange-400/[0.07] hover:text-orange-100"
                    title="Ascunde istoricul"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setHistoryOpen(true)
                  }
                  className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.07] text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,.08)] transition hover:border-orange-300/30 hover:bg-orange-400/[0.08] hover:text-orange-100"
                  title="Arată istoricul"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>

            {historyOpen && (
              <div className="flex-1 overflow-y-auto p-3">
                <div className="mb-3 flex items-center gap-2 px-2 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-100/30">
                  <History className="h-3.5 w-3.5 text-orange-300/45" />
                  Istoric
                </div>

                {conversations.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-emerald-300/[0.16] bg-gradient-to-br from-emerald-400/[0.045] to-orange-400/[0.025] px-4 py-7 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-400/[0.08] shadow-[0_0_22px_rgba(249,115,22,.08)]">
                      <Sparkles className="h-4 w-4 text-orange-300/80" />
                    </div>

                    <p className="mt-3 text-xs font-bold text-emerald-50/50">
                      Încă nu ai conversații.
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-emerald-100/25">
                      Prima discuție cu MATE va apărea aici.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {conversations.map(
                      (conversation) => {
                        const active =
                          activeConversationId ===
                          conversation.id;

                        return (
                          <div
                            key={conversation.id}
                            className={`group flex items-center rounded-2xl border transition ${
                              active
                                ? "border-emerald-300/30 bg-gradient-to-r from-emerald-500/[0.15] via-emerald-400/[0.08] to-orange-500/[0.08] shadow-[0_0_25px_rgba(16,185,129,.07)]"
                                : "border-transparent hover:border-emerald-300/[0.12] hover:bg-emerald-300/[0.035]"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                void loadConversation(
                                  conversation.id
                                )
                              }
                              className="min-w-0 flex-1 px-3 py-3 text-left"
                            >
                              <p
                                className={`truncate text-xs font-bold ${
                                  active
                                    ? "text-emerald-50"
                                    : "text-emerald-50/45"
                                }`}
                              >
                                {conversation.title}
                              </p>

                              <p className="mt-1 text-[10px] text-emerald-100/20">
                                {formatDate(
                                  conversation.last_message_at
                                )}
                              </p>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                void archiveConversation(
                                  conversation.id
                                )
                              }
                              className="mr-2 hidden h-8 w-8 items-center justify-center rounded-lg text-emerald-100/20 transition hover:bg-red-500/10 hover:text-red-300 group-hover:flex"
                              title="Arhivează"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            )}
          </aside>

          {/* CHAT */}

          <section className="relative flex min-w-0 flex-1 flex-col">
            {/* HEADER MATE */}

            <div className="relative flex h-[76px] shrink-0 items-center justify-between border-b border-emerald-300/[0.14] bg-[#04150f]/80 px-4 shadow-[0_8px_40px_rgba(0,0,0,.18),0_2px_22px_rgba(16,185,129,.04)] backdrop-blur-2xl sm:px-6">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/45 to-orange-400/30"
                aria-hidden="true"
              />

              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setMobileHistory(true)
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/[0.07] text-emerald-200 transition hover:border-orange-300/30 hover:bg-orange-400/[0.08] hover:text-orange-100 xl:hidden"
                  title="Istoric"
                >
                  <Menu className="h-4 w-4" />
                </button>

                <div className="relative shrink-0">
                  <div className="absolute -inset-2 rounded-full bg-emerald-400/25 blur-xl" />

                  <div className="absolute -inset-1 rounded-full border border-orange-300/15" />

                  <div className="relative">
                    <MateAvatar
                      gender={profile?.avatar_gender}
                      size="small"
                      state={
                        sending
                          ? "thinking"
                          : "idle"
                      }
                    />
                  </div>

                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#04150f] bg-emerald-300 shadow-[0_0_13px_rgba(52,211,153,.95)]" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="bg-gradient-to-r from-emerald-100 via-white to-orange-200 bg-clip-text text-base font-black tracking-tight text-transparent">
                      MATE
                    </h1>

                    <span className="hidden rounded-full border border-orange-300/25 bg-gradient-to-r from-emerald-400/[0.13] to-orange-500/[0.13] px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.18em] text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,.06)] min-[390px]:inline-flex">
                      AI Tutor
                    </span>
                  </div>

                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,1)]" />

                    <p className="truncate text-[10px] font-medium text-emerald-100/35 sm:text-[11px]">
                      Aici să facem matematica mai simplă.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={startNewConversation}
                  className="hidden items-center gap-2 rounded-xl border border-emerald-300/[0.14] bg-emerald-400/[0.045] px-3 py-2 text-xs font-bold text-emerald-100/50 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.08] hover:text-emerald-50 sm:flex"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  Chat nou
                </button>

                <button
                  type="button"
                  onClick={openVoice}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-orange-300/45 bg-gradient-to-r from-emerald-500/[0.22] via-emerald-400/[0.14] to-orange-500/[0.24] px-3 py-2 text-xs font-black text-white shadow-[0_0_26px_rgba(16,185,129,.12),0_0_22px_rgba(249,115,22,.09)] transition hover:border-orange-200/70 hover:shadow-[0_0_34px_rgba(16,185,129,.17),0_0_30px_rgba(249,115,22,.16)]"
                >
                  <span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    aria-hidden="true"
                  />

                  <Mic className="relative h-4 w-4 text-orange-200" />

                  <span className="relative hidden sm:inline">
                    Vorbește
                  </span>
                </button>
              </div>
            </div>

            {/* MESAJE / START SCREEN */}

            <div className="relative flex-1 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="relative mx-auto flex min-h-full w-full max-w-6xl items-center px-4 py-7 sm:px-7 lg:py-10">
                  {/* DECORAȚII */}

                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                    aria-hidden="true"
                  >
                    <div className="absolute left-[5%] top-[10%] h-24 w-24 rounded-full border border-emerald-300/[0.08] shadow-[0_0_30px_rgba(16,185,129,.03)]" />

                    <div className="absolute left-[7%] top-[13%] h-16 w-16 rounded-full border border-orange-300/[0.055]" />

                    <div className="absolute right-[6%] top-[13%] h-32 w-32 rounded-full border border-orange-300/[0.08] shadow-[0_0_35px_rgba(249,115,22,.03)]" />

                    <div className="absolute bottom-[10%] right-[12%] h-20 w-20 rotate-12 rounded-3xl border border-emerald-300/[0.07]" />

                    <span className="math-symbol absolute left-[4%] top-[37%] hidden text-4xl font-black text-emerald-300/[0.11] lg:block">
                      π
                    </span>

                    <span className="math-symbol absolute right-[5%] top-[40%] hidden text-3xl font-black text-orange-300/[0.11] lg:block">
                      ∫
                    </span>

                    <span className="math-symbol absolute bottom-[12%] left-[12%] hidden text-2xl font-black text-emerald-300/[0.09] lg:block">
                      x²
                    </span>

                    <span className="math-symbol absolute right-[22%] top-[8%] hidden text-2xl font-black text-orange-300/[0.08] xl:block">
                      Δ
                    </span>
                  </div>

                  <div className="relative grid w-full items-center gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
                    {/* AVATAR HERO */}

                    <div className="relative flex min-h-[310px] items-center justify-center lg:min-h-[440px]">
                      {/* HALO MARE */}

                      <div
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.14] blur-[85px] sm:h-[480px] sm:w-[480px]"
                        aria-hidden="true"
                      />

                      <div
                        className="pointer-events-none absolute left-[58%] top-[56%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.14] blur-[80px] sm:h-[320px] sm:w-[320px]"
                        aria-hidden="true"
                      />

                      {/* CHENAR EXTERIOR SMARALD + PORTOCALIU */}

                      <div
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-500 to-orange-500 p-[2px] shadow-[0_0_40px_rgba(16,185,129,.30),0_0_70px_rgba(16,185,129,.12),0_0_35px_rgba(249,115,22,.15)] sm:h-[390px] sm:w-[390px]"
                        aria-hidden="true"
                      >
                        <div className="h-full w-full rounded-full bg-[#04150f]/95" />
                      </div>

                      {/* INEL SMARALD */}

                      <div
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[286px] w-[286px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/35 shadow-[inset_0_0_35px_rgba(16,185,129,.08),0_0_25px_rgba(16,185,129,.13)] sm:h-[360px] sm:w-[360px]"
                        aria-hidden="true"
                      />

                      {/* INEL PORTOCALIU */}

                      <div
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[252px] w-[252px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/25 shadow-[0_0_22px_rgba(249,115,22,.08)] sm:h-[320px] sm:w-[320px]"
                        aria-hidden="true"
                      />

                      {/* INEL DASHED */}

                      <div
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[218px] w-[218px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-emerald-200/25 sm:h-[280px] sm:w-[280px]"
                        aria-hidden="true"
                      />

                      {/* ACCENTE ORBITALE */}

                      <div
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 sm:h-[420px] sm:w-[420px]"
                        aria-hidden="true"
                      >
                        <span className="absolute left-[13%] top-[10%] h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,.95)]" />

                        <span className="absolute right-[8%] top-[33%] h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,.95)]" />

                        <span className="absolute bottom-[10%] left-[28%] h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_15px_rgba(190,242,100,.85)]" />
                      </div>

                      <span
                        className="math-symbol absolute left-[7%] top-[16%] hidden rounded-2xl border border-emerald-300/25 bg-[#061b13]/90 px-3 py-2 text-xl font-black text-emerald-200/80 shadow-[0_0_25px_rgba(16,185,129,.10),0_10px_30px_rgba(0,0,0,.25)] backdrop-blur-xl sm:block"
                        aria-hidden="true"
                      >
                        π
                      </span>

                      <span
                        className="math-symbol absolute right-[4%] top-[23%] hidden rounded-2xl border border-orange-300/25 bg-[#1a1108]/85 px-3 py-2 text-lg font-black text-orange-200/80 shadow-[0_0_25px_rgba(249,115,22,.10),0_10px_30px_rgba(0,0,0,.25)] backdrop-blur-xl sm:block"
                        aria-hidden="true"
                      >
                        √x
                      </span>

                      <span
                        className="math-symbol absolute bottom-[16%] left-[3%] hidden rounded-2xl border border-emerald-300/20 bg-[#061b13]/90 px-3 py-2 text-lg font-black text-emerald-200/65 shadow-[0_0_20px_rgba(16,185,129,.08)] backdrop-blur-xl sm:block"
                        aria-hidden="true"
                      >
                        ∑
                      </span>

                      <span
                        className="math-symbol absolute bottom-[11%] right-[7%] hidden rounded-2xl border border-orange-300/20 bg-[#1a1108]/85 px-3 py-2 text-xl font-black text-orange-200/65 shadow-[0_0_20px_rgba(249,115,22,.08)] backdrop-blur-xl sm:block"
                        aria-hidden="true"
                      >
                        ∞
                      </span>

                      {/* AVATAR */}

                      <div className="relative z-10 transition duration-500 hover:scale-[1.025]">
                        <div className="absolute inset-x-[18%] bottom-[8%] h-[20%] rounded-full bg-emerald-400/20 blur-3xl" />

                        <MateAvatar
                          gender={profile?.avatar_gender}
                          state="idle"
                        />
                      </div>

                      {/* VOICE CTA */}

                      <div className="absolute -bottom-10 left-1/2 z-20 -translate-x-1/2 sm:-bottom-8">
                        <button
                          type="button"
                          onClick={openVoice}
                          className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-orange-300/45 bg-gradient-to-r from-[#062219]/95 via-[#083021]/95 to-[#2b1609]/95 px-4 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-white shadow-[0_0_30px_rgba(16,185,129,.18),0_0_26px_rgba(249,115,22,.12),0_14px_40px_rgba(0,0,0,.35)] backdrop-blur-xl transition hover:border-orange-200/70 hover:shadow-[0_0_40px_rgba(16,185,129,.24),0_0_32px_rgba(249,115,22,.20)]"
                        >
                          <span
                            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.10] to-transparent transition-transform duration-700 group-hover:translate-x-full"
                            aria-hidden="true"
                          />

                          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 via-emerald-400 to-orange-400 text-[#03100b] shadow-[0_0_18px_rgba(52,211,153,.35)]">
                            <Mic className="h-3.5 w-3.5" />
                          </span>

                          <span className="relative">
                            Vorbește cu MATE
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* INTRO + MODURI */}

                    <div className="relative">
                      <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-gradient-to-r from-emerald-500/[0.15] via-emerald-400/[0.09] to-orange-500/[0.13] px-3 py-1.5 shadow-[0_0_25px_rgba(16,185,129,.08),0_0_18px_rgba(249,115,22,.05)]">
                        <WandSparkles className="h-3.5 w-3.5 text-orange-300" />

                        <span className="text-[9px] font-black uppercase tracking-[0.22em] text-emerald-100">
                          Tutorul tău de mate
                        </span>
                      </div>

                      <h2 className="mt-5 max-w-2xl text-3xl font-black leading-[1.03] tracking-[-0.04em] text-white sm:text-4xl lg:text-[46px]">
                        Hei
                        {profile?.nume
                          ? `, ${
                              profile.nume
                                .trim()
                                .split(" ")[0]
                            }`
                          : ""}
                        !

                        <span className="mt-1 block">
                          Cu ce ne luptăm
                        </span>

                        <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(16,185,129,.14)]">
                          azi?
                        </span>
                      </h2>

                      <p className="mt-4 max-w-lg text-sm font-medium leading-6 text-emerald-50/45 sm:text-[15px]">
                        Trimite problema sau alege cum vrei să te ajut.
                        O luăm împreună, pas cu pas.
                      </p>

                      <div className="mt-6 grid grid-cols-2 gap-2.5">
                        {MODES.slice(1).map(
                          (item) => {
                            const Icon =
                              item.icon;

                            const active =
                              mode ===
                              item.id;

                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setMode(
                                    item.id
                                  );

                                  textareaRef.current?.focus();
                                }}
                                className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition duration-200 sm:p-3.5 ${
                                  active
                                    ? "border-emerald-300/45 bg-gradient-to-br from-emerald-500/[0.20] via-emerald-400/[0.10] to-orange-500/[0.15] shadow-[0_0_30px_rgba(16,185,129,.12),0_0_22px_rgba(249,115,22,.06)]"
                                    : "border-emerald-300/[0.10] bg-[#061710]/75 shadow-[inset_0_1px_0_rgba(255,255,255,.02)] hover:-translate-y-0.5 hover:border-orange-300/30 hover:bg-gradient-to-br hover:from-emerald-400/[0.08] hover:to-orange-500/[0.07] hover:shadow-[0_0_24px_rgba(16,185,129,.07)]"
                                }`}
                              >
                                <div
                                  className={`absolute right-0 top-0 h-20 w-20 translate-x-7 -translate-y-7 rounded-full blur-2xl transition ${
                                    active
                                      ? "bg-orange-400/20"
                                      : "bg-emerald-400/0 group-hover:bg-emerald-400/12"
                                  }`}
                                  aria-hidden="true"
                                />

                                <div
                                  className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent transition ${
                                    active
                                      ? "via-emerald-300/50 to-orange-300/20"
                                      : "via-emerald-300/0 to-transparent group-hover:via-emerald-300/25"
                                  }`}
                                  aria-hidden="true"
                                />

                                <div className="relative flex items-center gap-2.5">
                                  <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${
                                      active
                                        ? "border-orange-300/30 bg-gradient-to-br from-emerald-300/20 to-orange-400/15 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,.10)]"
                                        : "border-emerald-300/[0.10] bg-emerald-400/[0.045] text-emerald-100/35 group-hover:border-orange-300/25 group-hover:bg-orange-400/[0.07] group-hover:text-orange-100"
                                    }`}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </div>

                                  <div className="min-w-0">
                                    <p
                                      className={`truncate text-[11px] font-black sm:text-xs ${
                                        active
                                          ? "text-white"
                                          : "text-emerald-50/65 group-hover:text-white"
                                      }`}
                                    >
                                      {item.shortLabel}
                                    </p>

                                    <p className="mt-0.5 hidden truncate text-[9px] text-emerald-100/25 sm:block">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          }
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold text-emerald-100/30">
                        <span className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,.7)]" />
                          Explicații adaptate
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Camera className="h-3 w-3 text-orange-300/80" />
                          Poze cu exerciții
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Mic className="h-3 w-3 text-emerald-300/80" />
                          Conversație vocală
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative mx-auto w-full max-w-4xl space-y-7 px-4 py-8 sm:px-7">
                  <div
                    className="pointer-events-none absolute left-1/2 top-0 h-64 w-[90%] -translate-x-1/2 rounded-full bg-emerald-500/[0.075] blur-[110px]"
                    aria-hidden="true"
                  />

                  <div
                    className="pointer-events-none absolute right-[5%] top-[20%] h-52 w-52 rounded-full bg-orange-500/[0.05] blur-[100px]"
                    aria-hidden="true"
                  />

                  <div className="relative space-y-7">
                    {messages.map(
                      (message) => (
                        <MateMessage
                          key={message.id}
                          role={message.role}
                          content={message.content}
                          imageUrl={
                            message.imageUrl
                          }
                          avatarGender={
                            profile?.avatar_gender
                          }
                          streaming={
                            message.streaming
                          }
                        />
                      )
                    )}

                    <div ref={bottomRef} />
                  </div>
                </div>
              )}
            </div>
                        {/* COMPOSER */}

            <div className="relative shrink-0 border-t border-emerald-300/[0.14] bg-[#04150f]/88 px-3 pb-3 pt-2 shadow-[0_-12px_45px_rgba(0,0,0,.22),0_-2px_28px_rgba(16,185,129,.035)] backdrop-blur-2xl sm:px-5 sm:pb-4">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/55 to-orange-400/35"
                aria-hidden="true"
              />

              <div className="mx-auto w-full max-w-4xl">
                {error && (
                  <div className="mb-2 flex items-center justify-between gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3 text-xs font-medium text-red-200 shadow-[0_10px_35px_rgba(0,0,0,.18)]">
                    <span>{error}</span>

                    <button
                      type="button"
                      onClick={() =>
                        setError(null)
                      }
                      className="shrink-0 text-red-300/60 transition hover:text-red-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* MODURI RAPIDE */}

                <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
                  {MODES.map((item) => {
                    const Icon =
                      item.icon;

                    const active =
                      mode === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setMode(item.id)
                        }
                        className={`relative flex shrink-0 items-center gap-2 overflow-hidden rounded-xl border px-3 py-2 text-[10px] font-black transition sm:text-[11px] ${
                          active
                            ? "border-emerald-300/45 bg-gradient-to-r from-emerald-500/[0.20] via-emerald-400/[0.12] to-orange-500/[0.16] text-white shadow-[0_0_25px_rgba(16,185,129,.12),0_0_18px_rgba(249,115,22,.06)]"
                            : "border-emerald-300/[0.10] bg-[#061710]/80 text-emerald-100/35 hover:border-orange-300/30 hover:bg-gradient-to-r hover:from-emerald-400/[0.08] hover:to-orange-500/[0.07] hover:text-white"
                        }`}
                      >
                        {active && (
                          <span
                            className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-orange-300/35"
                            aria-hidden="true"
                          />
                        )}

                        <Icon
                          className={`relative h-3.5 w-3.5 ${
                            active
                              ? "text-orange-200"
                              : ""
                          }`}
                        />

                        <span className="relative">
                          {item.shortLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* PREVIEW IMAGINE */}

                {selectedPreview && (
                  <div className="mb-2 flex items-center gap-3 rounded-2xl border border-emerald-300/30 bg-gradient-to-r from-emerald-500/[0.12] via-emerald-400/[0.06] to-orange-500/[0.08] p-2.5 shadow-[0_0_25px_rgba(16,185,129,.07)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedPreview}
                      alt="Imagine selectată"
                      className="h-16 w-16 rounded-xl border border-orange-300/20 object-cover shadow-[0_8px_25px_rgba(0,0,0,.28)]"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-emerald-50">
                        {selectedFile?.name}
                      </p>

                      <p className="mt-1 text-[10px] text-emerald-100/35">
                        MATE va analiza imaginea împreună cu mesajul tău.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedFile(null)
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent text-emerald-100/35 transition hover:border-orange-300/20 hover:bg-orange-400/[0.08] hover:text-orange-100"
                      title="Elimină imaginea"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* INPUT PRINCIPAL */}

                <div className="group/composer relative overflow-hidden rounded-[26px] border border-emerald-300/35 bg-gradient-to-r from-[#061b13]/98 via-[#071d15]/98 to-[#171208]/98 p-[1px] shadow-[0_0_34px_rgba(16,185,129,.14),0_0_24px_rgba(249,115,22,.07),0_22px_70px_rgba(0,0,0,.35)] transition duration-300 focus-within:border-emerald-200/65 focus-within:shadow-[0_0_48px_rgba(16,185,129,.22),0_0_34px_rgba(249,115,22,.12),0_24px_80px_rgba(0,0,0,.42)]">
                  {/* GLOW EXTERIOR */}

                  <div
                    className="pointer-events-none absolute -left-24 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-[55px]"
                    aria-hidden="true"
                  />

                  <div
                    className="pointer-events-none absolute -right-20 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-orange-500/[0.18] blur-[55px]"
                    aria-hidden="true"
                  />

                  <div className="relative overflow-hidden rounded-[25px] bg-[#06130e]/95 p-2">
                    <div
                      className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/75 to-orange-300/55"
                      aria-hidden="true"
                    />

                    <div
                      className="pointer-events-none absolute bottom-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"
                      aria-hidden="true"
                    />

                    <div className="flex items-end gap-2">
                      <div className="flex items-center gap-1 pb-1 pl-1">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          capture="environment"
                          onChange={handleFile}
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                          disabled={
                            sending ||
                            uploadingImage
                          }
                          className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/[0.08] bg-emerald-400/[0.035] text-emerald-100/35 transition hover:border-orange-300/30 hover:bg-orange-400/[0.09] hover:text-orange-100 hover:shadow-[0_0_20px_rgba(249,115,22,.08)] disabled:cursor-not-allowed disabled:opacity-40"
                          title="Fotografiază sau încarcă un exercițiu"
                        >
                          <Camera className="h-5 w-5 transition group-hover:scale-105" />
                        </button>
                      </div>

                      <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(event) =>
                          setInput(
                            event.target.value
                          )
                        }
                        onKeyDown={
                          handleKeyDown
                        }
                        rows={1}
                        disabled={sending}
                        placeholder={
                          mode === "hint"
                            ? "Arată-mi unde te-ai blocat..."
                            : mode === "check"
                              ? "Scrie sau fotografiază rezolvarea ta..."
                              : mode === "quiz"
                                ? "Spune-mi ce vrei să exersezi..."
                                : mode ===
                                    "explain"
                                  ? "Ce vrei să-ți explic?"
                                  : mode ===
                                      "solve"
                                    ? "Trimite problema și o rezolvăm pas cu pas..."
                                    : mode ===
                                        "similar"
                                      ? "Spune-mi ce tip de exercițiu vrei să exersezi..."
                                      : "Întreabă-l pe MATE orice problemă de matematică..."
                        }
                        className="max-h-36 min-h-[44px] flex-1 resize-none bg-transparent px-1 py-3 text-sm font-medium leading-6 text-emerald-50 outline-none placeholder:text-emerald-100/25 disabled:opacity-60"
                      />

                      {sending ? (
                        <button
                          type="button"
                          onClick={
                            stopGeneration
                          }
                          className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-200/40 bg-gradient-to-br from-orange-300 to-orange-500 text-[#1a0b03] shadow-[0_0_28px_rgba(249,115,22,.25)] transition hover:scale-[1.03] hover:shadow-[0_0_34px_rgba(249,115,22,.38)]"
                          title="Oprește răspunsul"
                        >
                          <Square className="h-4 w-4 fill-current" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            void sendMessage()
                          }
                          disabled={
                            (!input.trim() &&
                              !selectedFile) ||
                            uploadingImage
                          }
                          className="group/send relative mb-1 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-100/30 bg-gradient-to-br from-emerald-300 via-emerald-400 to-orange-400 text-[#02110b] shadow-[0_0_30px_rgba(16,185,129,.30),0_0_18px_rgba(249,115,22,.16)] transition hover:scale-[1.06] hover:border-white/50 hover:shadow-[0_0_42px_rgba(16,185,129,.42),0_0_28px_rgba(249,115,22,.25)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
                          title="Trimite"
                        >
                          <span
                            className="absolute inset-0 translate-y-full bg-white/25 transition-transform duration-300 group-hover/send:translate-y-0"
                            aria-hidden="true"
                          />

                          <ArrowUp className="relative h-5 w-5" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-1">
                      <div className="flex min-w-0 items-center gap-2 text-[10px] font-semibold text-emerald-100/35">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-emerald-300/15 bg-emerald-400/[0.06]">
                          <SelectedModeIcon className="h-3 w-3 text-emerald-300" />
                        </span>

                        <span className="truncate">
                          {selectedMode.label}
                        </span>
                      </div>

                      <div className="hidden shrink-0 items-center gap-1 text-[9px] font-medium text-emerald-100/20 sm:flex">
                        Enter trimite · Shift + Enter rând nou
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-center gap-1.5 px-3 text-center text-[9px] font-medium text-emerald-100/22">
                  <Sparkles className="h-3 w-3 shrink-0 text-orange-300/70" />

                  <span>
                    MATE poate greși. Verifică rezultatele importante și folosește explicația pentru a înțelege metoda.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ISTORIC MOBIL */}

        {mobileHistory && (
          <div className="fixed inset-0 z-[80] xl:hidden">
            <button
              type="button"
              aria-label="Închide istoricul"
              onClick={() =>
                setMobileHistory(false)
              }
              className="absolute inset-0 bg-[#010805]/85 backdrop-blur-md"
            />

            <div className="absolute inset-y-0 left-0 w-[88%] max-w-[340px] overflow-hidden border-r border-emerald-300/25 bg-[#04150f]/98 shadow-[25px_0_80px_rgba(0,0,0,.55),8px_0_45px_rgba(16,185,129,.08)] backdrop-blur-2xl">
              {/* GLOW MOBIL */}

              <div
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/[0.18] blur-[100px]"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -bottom-24 right-[-80px] h-72 w-72 rounded-full bg-orange-500/[0.15] blur-[105px]"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-emerald-300/45 to-orange-400/30"
                aria-hidden="true"
              />

              <div className="relative flex h-full flex-col p-4">
                <div className="flex items-center justify-between border-b border-emerald-300/[0.12] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-full bg-emerald-400/30 blur-xl" />

                      <div className="absolute -inset-1 rounded-full border border-orange-300/20" />

                      <div className="relative">
                        <MateAvatar
                          gender={
                            profile?.avatar_gender
                          }
                          size="small"
                          state="idle"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="bg-gradient-to-r from-emerald-100 to-orange-200 bg-clip-text text-sm font-black text-transparent">
                          MATE
                        </p>

                        <span className="rounded-full border border-orange-300/25 bg-gradient-to-r from-emerald-400/[0.13] to-orange-400/[0.13] px-1.5 py-0.5 text-[7px] font-black uppercase tracking-[0.14em] text-emerald-100">
                          AI
                        </span>
                      </div>

                      <p className="mt-0.5 text-[10px] font-medium text-emerald-100/30">
                        Conversațiile tale
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setMobileHistory(
                        false
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/[0.12] bg-emerald-400/[0.04] text-emerald-100/45 transition hover:border-orange-300/30 hover:bg-orange-400/[0.08] hover:text-orange-100"
                    title="Închide"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={
                    startNewConversation
                  }
                  className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-emerald-300/35 bg-gradient-to-r from-emerald-500/[0.20] via-emerald-400/[0.12] to-orange-500/[0.16] px-4 py-3 text-sm font-black text-white shadow-[0_0_28px_rgba(16,185,129,.11),0_0_20px_rgba(249,115,22,.06)] transition hover:border-orange-300/50 hover:shadow-[0_0_38px_rgba(16,185,129,.17),0_0_28px_rgba(249,115,22,.12)]"
                >
                  <span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    aria-hidden="true"
                  />

                  <span className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-200/20 bg-emerald-300/[0.12] text-emerald-100">
                    <MessageSquarePlus className="h-4 w-4" />
                  </span>

                  <span className="relative">
                    Conversație nouă
                  </span>
                </button>

                <div className="mt-5 flex items-center gap-2 px-1 text-[9px] font-black uppercase tracking-[0.22em] text-emerald-100/30">
                  <History className="h-3.5 w-3.5 text-orange-300/55" />
                  Istoric
                </div>

                <div className="mt-2 flex-1 space-y-1 overflow-y-auto pr-1">
                  {conversations.length ===
                  0 ? (
                    <div className="mt-3 rounded-2xl border border-dashed border-emerald-300/[0.16] bg-gradient-to-br from-emerald-400/[0.05] to-orange-400/[0.03] px-4 py-7 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-orange-300/15 bg-orange-400/[0.07]">
                        <Sparkles className="h-5 w-5 text-orange-300/70" />
                      </div>

                      <p className="mt-3 text-xs font-bold text-emerald-50/50">
                        Încă nu ai conversații.
                      </p>

                      <p className="mt-1 text-[10px] leading-4 text-emerald-100/25">
                        Începe o discuție cu MATE și o vei găsi aici.
                      </p>
                    </div>
                  ) : (
                    conversations.map(
                      (conversation) => {
                        const active =
                          activeConversationId ===
                          conversation.id;

                        return (
                          <div
                            key={
                              conversation.id
                            }
                            className={`group flex items-center rounded-2xl border transition ${
                              active
                                ? "border-emerald-300/30 bg-gradient-to-r from-emerald-500/[0.16] via-emerald-400/[0.08] to-orange-500/[0.09] shadow-[0_0_24px_rgba(16,185,129,.07)]"
                                : "border-transparent hover:border-emerald-300/[0.12] hover:bg-emerald-300/[0.035]"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                void loadConversation(
                                  conversation.id
                                )
                              }
                              className="min-w-0 flex-1 px-3 py-3 text-left"
                            >
                              <p
                                className={`truncate text-xs font-bold ${
                                  active
                                    ? "text-emerald-50"
                                    : "text-emerald-50/45"
                                }`}
                              >
                                {
                                  conversation.title
                                }
                              </p>

                              <p className="mt-1 text-[10px] text-emerald-100/20">
                                {formatDate(
                                  conversation.last_message_at
                                )}
                              </p>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                void archiveConversation(
                                  conversation.id
                                )
                              }
                              className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-emerald-100/20 transition hover:bg-red-500/10 hover:text-red-300"
                              title="Arhivează"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      }
                    )
                  )}
                </div>

                <div className="mt-4 border-t border-emerald-300/[0.12] pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileHistory(
                        false
                      );
                      openVoice();
                    }}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-orange-300/35 bg-gradient-to-r from-emerald-500/[0.14] via-emerald-400/[0.08] to-orange-500/[0.18] px-4 py-3 text-xs font-black text-white shadow-[0_0_26px_rgba(16,185,129,.08),0_0_22px_rgba(249,115,22,.08)] transition hover:border-orange-200/55 hover:shadow-[0_0_34px_rgba(249,115,22,.15)]"
                  >
                    <span
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full"
                      aria-hidden="true"
                    />

                    <Mic className="relative h-4 w-4 text-orange-200" />

                    <span className="relative">
                      Vorbește cu MATE
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MATE VOICE */}

        <MateVoice
          open={voiceOpen}
          avatarGender={
            profile?.avatar_gender
          }
          state={voiceState}
          realtimeReady={
            voiceRealtimeReady
          }
          onClose={() => {
            setVoiceOpen(false);
            setVoiceRealtimeReady(
              false
            );
          }}
          onStartRealtime={
            handleRealtimeButton
          }
        />
      </div>
    </BacMateShell>
  );
}