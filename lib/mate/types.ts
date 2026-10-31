export type MateTutorMode =
  | "general"
  | "hint"
  | "explain"
  | "check"
  | "solve"
  | "similar"
  | "quiz";

export type MateContentType =
  | "text"
  | "image"
  | "mixed"
  | "voice";

export type MateConversationMode =
  | "text"
  | "voice"
  | "mixed";

export type MateConversation = {
  id: string;
  user_id: string;
  title: string;
  mode: MateConversationMode;
  archived: boolean;
  created_at: string;
  updated_at: string;
  last_message_at: string;
};

export type MateMessage = {
  id: string;
  conversation_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  content_type: MateContentType;
  attachment_path: string | null;
  attachment_mime_type: string | null;
  transcript: string | null;
  tutor_mode: string;
  metadata: Record<string, unknown> | null;
  provider: string | null;
  model: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
  created_at: string;
};

export type MateProfileContext = {
  name: string;
  bacProfile: string;
  avatarGender: string | null;
};

export type MateMasteryContext = {
  skillId: string;
  masteryScore: number;
  totalAttempts: number;
  correctAttempts: number;
  consecutiveCorrect: number;
  nextReviewAt: string | null;
};

export type MateMistakeContext = {
  skillId: string | null;
  lessonId: string | null;
  exerciseId: string | null;
  mistakeType: string | null;
  updatedAt: string | null;
};

export type MateProgressContext = {
  lessonId: string;
  completed: boolean;
  xp: number;
};

export type MateAssessmentContext = {
  score: number;
  strongestSkillId: string | null;
  weakestSkillId: string | null;
  completedAt: string | null;
};

export type MateStudentContext = {
  profile: MateProfileContext;

  mastery: MateMasteryContext[];
  activeMistakes: MateMistakeContext[];
  completedLessons: MateProgressContext[];
  recentAssessments: MateAssessmentContext[];

  summary: {
    completedLessonCount: number;
    totalXp: number;
    activeMistakeCount: number;
    averageMastery: number | null;
    weakestSkillId: string | null;
    strongestSkillId: string | null;
    latestAssessmentScore: number | null;
  };
};

export type MateChatRequest = {
  conversationId?: string | null;
  message?: string;
  tutorMode?: MateTutorMode;
  attachmentPath?: string | null;
  attachmentMimeType?: string | null;
};