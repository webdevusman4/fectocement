/**
 * Minimal Gemini REST client (server only). No SDK: one streaming call per user question.
 *
 * Models come from the environment so they can follow Google's lineup without a code change:
 *   GEMINI_MODEL           primary model   (default: gemini-3.8-flash, the stable Flash in Nov 2026)
 *   GEMINI_FALLBACK_MODEL  used when the primary is unavailable or its daily quota is spent
 *                          (default: gemini-3.5-flash-lite)
 * Free-tier limits are per Google Cloud project and per model; daily counts reset at midnight Pacific.
 */

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

export interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const DEFAULT_MODEL = 'gemini-3.5-flash-lite';

export const MODEL_OPTIONS = [
  { id: 'gemini-3.5-flash-lite', label: 'Gemini 3.5 Flash Lite', tag: 'Fast · 500 RPD', default: true },
  { id: 'gemini-4-hydrogen', label: 'Gemini 4 Hydrogen', tag: 'Deep Reasoning' },
  { id: 'gemini-3.8-flash', label: 'Gemini 3.8 Flash', tag: 'Balanced' },
] as const;

export type SupportedModelId = typeof MODEL_OPTIONS[number]['id'];

export function geminiModels(preferred?: string): string[] {
  const parseList = (val?: string) =>
    (val || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

  const primary = parseList(process.env.GEMINI_MODEL);
  const fallback = parseList(process.env.GEMINI_FALLBACK_MODEL);

  const configured = [...primary, ...fallback];
  const defaults: string[] = [DEFAULT_MODEL, 'gemini-4-hydrogen', 'gemini-3.8-flash'];
  const base = configured.length > 0 ? configured : defaults;

  if (preferred && preferred.trim()) {
    return Array.from(new Set([preferred.trim(), ...base]));
  }

  return Array.from(new Set(base));
}

export function openGeminiStream(opts: {
  apiKey: string;
  model: string;
  system: string;
  contents: GeminiContent[];
  signal?: AbortSignal;
}): Promise<Response> {
  return fetch(`${API_BASE}/${encodeURIComponent(opts.model)}:streamGenerateContent?alt=sse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': opts.apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: opts.system }] },
      contents: opts.contents,
      generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
    }),
    signal: opts.signal,
    cache: 'no-store',
  });
}

interface StreamChunk {
  candidates?: {
    content?: { parts?: { text?: string; thought?: boolean }[] };
    finishReason?: string;
  }[];
  promptFeedback?: { blockReason?: string };
}

/** Turns Gemini's server-sent events into a plain UTF-8 stream of answer text (thought parts skipped). */
export function sseToText(body: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = body.getReader();
  let buffer = '';

  const handleLine = (line: string, controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (!line.startsWith('data:')) return;
    const payload = line.slice(5).trim();
    if (!payload || payload === '[DONE]') return;
    let chunk: StreamChunk;
    try {
      chunk = JSON.parse(payload) as StreamChunk;
    } catch {
      return; // a malformed event is skipped rather than failing the whole answer
    }
    const candidate = chunk.candidates?.[0];
    for (const part of candidate?.content?.parts ?? []) {
      if (part.text && !part.thought) controller.enqueue(encoder.encode(part.text));
    }
    const reason = candidate?.finishReason;
    if (chunk.promptFeedback?.blockReason || reason === 'SAFETY' || reason === 'PROHIBITED_CONTENT') {
      controller.enqueue(encoder.encode('\n\n_I can’t help with that request. Please ask something about construction or cement._'));
    } else if (reason === 'MAX_TOKENS') {
      controller.enqueue(encoder.encode('\n\n_(The answer was cut short. Ask me to continue.)_'));
    }
  };

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let newline: number;
          while ((newline = buffer.indexOf('\n')) >= 0) {
            const line = buffer.slice(0, newline).replace(/\r$/, '');
            buffer = buffer.slice(newline + 1);
            handleLine(line, controller);
          }
        }
        if (buffer.trim()) handleLine(buffer.trim(), controller);
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
    cancel() {
      reader.cancel().catch(() => undefined);
    },
  });
}
