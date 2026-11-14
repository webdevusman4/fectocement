'use client';

/**
 * ChatWidget — the floating "Ask Fecto AI" assistant shown bottom-right on every page.
 *
 * Shares its conversation and model choice with the full /assistant page (same localStorage keys),
 * so "Open full assistant" continues the same chat. Hidden on /assistant itself. Uses /api/assistant;
 * the Gemini key stays on the server.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, Calculator, CalendarClock, Maximize2, RotateCcw, Sparkles, Square, X } from 'lucide-react';
import FectoLogo from '@/components/FectoLogo';
import Markdown from './Markdown';

type Role = 'user' | 'assistant' | 'error';
interface Message {
  id: string;
  role: Role;
  text: string;
}

const STORAGE_KEY = 'fecto-assistant-chat-v1'; // same keys as AssistantApp
const MODEL_STORAGE_KEY = 'fecto-assistant-model-v1';
const MAX_INPUT = 2000;

const SUGGESTIONS = [
  'How many cement bags for a 10 marla roof slab?',
  'OPC or SRC for a foundation in salty soil?',
  'How do I stop seepage in a bathroom wall?',
];

const uid = () => Math.random().toString(36).slice(2, 10);

function Crest({ className = 'h-5 w-5', color }: { className?: string; color?: string }) {
  return <FectoLogo viewBox="5 5 185 230" className={className} color={color} aria-hidden="true" />;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const loaded = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  /* load the shared conversation when the panel first opens, save after that */
  useEffect(() => {
    if (!open || loaded.current) return;
    loaded.current = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as Message[]) : [];
      if (Array.isArray(parsed)) setMessages(parsed.filter((m) => m && typeof m.text === 'string'));
    } catch {
      /* ignore corrupt data */
    }
  }, [open]);

  useEffect(() => {
    if (!loaded.current || streaming) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage full or blocked */
    }
  }, [messages, streaming]);

  /* focus, Escape to close, keep the newest message in view */
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  /* grow the textarea with its content */
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  const setBot = (id: string, text: string, role: Role = 'assistant') =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text, role } : m)));

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, MAX_INPUT);
      if (!text || streaming) return;
      const user: Message = { id: uid(), role: 'user', text };
      const botId = uid();
      const history = [...messages, user].filter((m) => m.role !== 'error').map(({ role, text: t }) => ({ role, text: t }));
      setMessages((prev) => [...prev, user, { id: botId, role: 'assistant', text: '' }]);
      setInput('');
      setStreaming(true);

      let model: string | undefined;
      try {
        model = localStorage.getItem(MODEL_STORAGE_KEY) || undefined;
      } catch {
        model = undefined;
      }

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history, model }),
          signal: controller.signal,
        });
        const left = res.headers.get('X-Assistant-Remaining');
        if (left) setRemaining(Number(left));
        if (!res.ok || !res.body) {
          let message = 'The assistant is unavailable right now. Please try again.';
          try {
            const data = await res.json();
            if (data?.message) message = data.message;
          } catch {
            /* not JSON */
          }
          setBot(botId, message, 'error');
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = '';
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setBot(botId, answer);
        }
        if (!answer.trim()) setBot(botId, 'I could not answer that this time. Please try rephrasing.', 'error');
      } catch {
        if (controller.signal.aborted) {
          setMessages((prev) => prev.map((m) => (m.id === botId && !m.text ? { ...m, text: '_Stopped._' } : m)));
        } else {
          setBot(botId, 'Connection problem. Please check your internet and try again.', 'error');
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming]
  );

  const retry = (errorId: string) => {
    const idx = messages.findIndex((m) => m.id === errorId);
    const lastUser = [...messages.slice(0, idx)].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    setMessages((prev) => prev.filter((m) => m.id !== errorId && m.id !== lastUser.id));
    setTimeout(() => send(lastUser.text), 0);
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setInput('');
    inputRef.current?.focus();
  };

  if (pathname?.startsWith('/assistant')) return null;

  const panelMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
      };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            key="fecto-chat"
            id="fecto-chat-panel"
            role="dialog"
            aria-label="Fecto Smart Assistant"
            {...panelMotion}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-white shadow-[0_30px_80px_-20px_rgba(0,0,60,0.45)] sm:inset-auto sm:bottom-[9.5rem] sm:right-6 sm:h-[min(600px,calc(100dvh-11.5rem))] sm:w-[400px] sm:rounded-3xl sm:border sm:border-slate-200"
          >
            {/* Header */}
            <header className="flex items-center gap-3 bg-[linear-gradient(135deg,#000080_0%,#0B1245_100%)] px-4 py-3.5 text-white">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                <Crest className="h-7 w-7" color="#000080" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">Fecto Smart Assistant</div>
                <div className="truncate text-[11px] text-white/65">
                  {remaining !== null ? `${remaining} questions left today` : 'AI help for cement & construction'}
                </div>
              </div>
              <Link
                href="/assistant"
                aria-label="Open full assistant"
                title="Open full assistant"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <Maximize2 className="h-4 w-4" />
              </Link>
              <button type="button" onClick={reset} aria-label="New chat" title="New chat" className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
                aria-label="Close assistant"
                className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Messages */}
            <div ref={scrollRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto bg-[#F6F7FB] px-4 py-4">
              {messages.length === 0 ? (
                <div className="space-y-3">
                  <div className="flex gap-2.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#000080]">
                      <Crest className="h-4 w-4" color="#fff" />
                    </span>
                    <div className="rounded-2xl rounded-tl-md bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-100">
                      Assalam-o-Alaikum! I can help with cement quantities, mix ratios, curing, seepage and choosing the right cement. What are you building?
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 pt-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border border-[#000080]/15 bg-white px-3.5 py-2 text-left text-xs font-medium text-[#000080] shadow-sm transition hover:border-[#000080]/40 hover:bg-[#000080]/[0.03]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link href="/assistant" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:ring-[#000080]/30">
                      <Calculator className="h-4 w-4 text-[#000080]" /> Bag calculator
                    </Link>
                    <Link href="/assistant" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:ring-[#000080]/30">
                      <CalendarClock className="h-4 w-4 text-[#000080]" /> Curing planner
                    </Link>
                  </div>
                </div>
              ) : (
                messages.map((m, i) => {
                  const isLast = i === messages.length - 1;
                  if (m.role === 'user') {
                    return (
                      <div key={m.id} className="flex justify-end">
                        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-md bg-[#000080] px-3.5 py-2.5 text-sm text-white shadow-sm">{m.text}</div>
                      </div>
                    );
                  }
                  return (
                    <div key={m.id} className="flex gap-2.5">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#000080]">
                        <Crest className="h-4 w-4" color="#fff" />
                      </span>
                      <div
                        className={`min-w-0 max-w-[85%] rounded-2xl rounded-tl-md px-3.5 py-3 text-sm shadow-sm ring-1 ${
                          m.role === 'error' ? 'bg-red-50 text-red-700 ring-red-100' : 'bg-white ring-slate-100'
                        }`}
                      >
                        {m.role === 'error' ? (
                          <>
                            <p>{m.text}</p>
                            <button type="button" onClick={() => retry(m.id)} className="mt-2 text-xs font-semibold text-red-700 underline underline-offset-2">
                              Try again
                            </button>
                          </>
                        ) : m.text ? (
                          <div className="[&_*]:text-[0.875rem]">
                            <Markdown text={m.text} />
                            {streaming && isLast && <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse rounded-sm bg-[#000080]/60 align-middle" />}
                          </div>
                        ) : (
                          <span className="flex gap-1 py-1" aria-label="Assistant is typing">
                            {[0, 1, 2].map((d) => (
                              <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#000080]/50" style={{ animationDelay: `${d * 120}ms` }} />
                            ))}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-slate-200 bg-white px-3 pb-3 pt-2.5"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-[#000080]/40 focus-within:ring-2 focus-within:ring-[#000080]/10">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_INPUT}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Ask about cement, mixes, curing…"
                  aria-label="Your question"
                  className="max-h-[120px] flex-1 resize-none bg-transparent py-1.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
                {streaming ? (
                  <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop answer" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700">
                    <Square className="h-3.5 w-3.5 fill-current" />
                  </button>
                ) : (
                  <button type="submit" disabled={!input.trim()} aria-label="Send question" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#000080] text-white transition hover:bg-[#000066] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="mt-2 text-center text-[10px] text-slate-400">AI answers are approximate. Please confirm with a qualified engineer.</p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="fecto-chat-panel"
        aria-label={open ? 'Close assistant' : 'Ask Fecto AI'}
        // Raised above the bottom-right "Powered by Netlify" badge that Netlify adds on the live site
        className={`fixed bottom-20 right-5 z-40 items-center gap-2.5 rounded-full bg-[#000080] p-1.5 pr-1.5 text-white shadow-[0_18px_40px_-12px_rgba(0,0,128,0.65)] ring-1 ring-white/20 transition hover:bg-[#000066] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D5AB] sm:bottom-20 sm:right-6 sm:pr-5 ${
          open ? 'hidden sm:flex' : 'flex'
        }`}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4D5AB] text-[#000080]">
          {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        </span>
        <span className="hidden text-sm font-semibold sm:inline">{open ? 'Close' : 'Ask Fecto AI'}</span>
      </button>
    </>
  );
}
