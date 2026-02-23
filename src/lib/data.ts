import type { Model } from "./types";

/**
 * Full list of Google Gemini / AI models (display names and API model IDs).
 * Model IDs are from https://ai.google.dev/gemini-api/docs/models and related docs.
 * Placeholder rpm/tpm/rpd/contextWindow until per-model API or models.get is used.
 */
export const models: Model[] = [
  { id: "gemini-2.5-computer-use-preview-10-2025", name: "Computer Use Preview", type: "agent", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 128000 },
  { id: "deep-research-pro-preview", name: "Deep Research Pro Preview", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.0-flash", name: "Gemini 2 Flash", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.0-flash-exp", name: "Gemini 2 Flash Exp", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.0-flash-lite", name: "Gemini 2 Flash Lite", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.0-pro-exp", name: "Gemini 2 Pro Exp", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.5-flash-native-audio-dialog", name: "Gemini 2.5 Flash Native Audio Dialog", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.5-flash-tts", name: "Gemini 2.5 Flash TTS", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.5-pro-tts", name: "Gemini 2.5 Pro TTS", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-3-flash-preview", name: "Gemini 3 Flash", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-3-pro-preview", name: "Gemini 3 Pro", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "text-embedding-004", name: "Gemini Embedding 1", type: "embedding", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-robotics-er-1.5-preview", name: "Gemini Robotics ER 1.5 Preview", type: "agent", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemma-3-12b", name: "Gemma 3 12B", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemma-3-1b", name: "Gemma 3 1B", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemma-3-27b", name: "Gemma 3 27B", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemma-3-2b", name: "Gemma 3 2B", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemma-3-4b", name: "Gemma 3 4B", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "imagen-4.0-fast-generate-001", name: "Imagen 4 Fast Generate", type: "image", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "imagen-4.0-generate-001", name: "Imagen 4 Generate", type: "image", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "imagen-4.0-ultra-generate-001", name: "Imagen 4 Ultra Generate", type: "image", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-2.5-flash-image", name: "Nano Banana (Gemini 2.5 Flash Preview Image)", type: "image", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "gemini-3-pro-image-preview", name: "Nano Banana Pro (Gemini 3 Pro Image)", type: "image", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "veo-3.1-fast-generate-001", name: "Veo 3 Fast Generate", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
  { id: "veo-3.1-generate-001", name: "Veo 3 Generate", type: "text", status: "working", rpm: 0, tpm: 0, rpd: 0, contextWindow: 0 },
];
