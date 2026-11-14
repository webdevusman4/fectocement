'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUp,
  Calculator,
  CalendarCheck2,
  ChevronDown,
  ChevronLeft,
  Copy,
  Check,
  Cpu,
  Droplets,
  ExternalLink,
  Gauge,
  Menu,
  MessageSquare,
  Mic,
  MicOff,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  RefreshCw,
  RotateCcw,
  ShieldQuestion,
  Sparkles,
  Square,
  X,
} from 'lucide-react';
import { FectoLogo } from '@/components/FectoLogo';
import Markdown from './Markdown';
import BagCalculator from './BagCalculator';
import CuringPlanner from './CuringPlanner';

/* ───────────── types & constants ───────────── */

type View = 'chat' | 'bags' | 'curing';
type Role = 'user' | 'assistant' | 'error';

interface Message {
  id: string;
  role: Role;
  text: string;
}

const STORAGE_KEY = 'fecto-assistant-chat-v1';
const MODEL_STORAGE_KEY = 'fecto-assistant-model-v1';
const MAX_INPUT = 2000;

export const MODEL_OPTIONS = [
  { id: 'gemini-3.5-flash-lite', label: 'Gemini 3.5 Flash Lite', tag: 'Fast · 500 RPD' },
  { id: 'gemini-4-hydrogen', label: 'Gemini 4 Hydrogen', tag: 'Deep Reasoning' },
  { id: 'gemini-3.8-flash', label: 'Gemini 3.8 Flash', tag: 'Balanced' },
] as const;

const STARTER_CARDS: {
  label: string;
  image: string;
  action: 'prompt' | 'view';
  prompt?: string;
  view?: View;
}[] = [
  {
    label: 'Material estimate',
    image: '/images/contractors-infra.jpg',
    action: 'prompt',
    prompt:
      'I am building a 30 × 20 ft slab, 5 inches thick, in Islamabad. How many bags of Fecto cement do I need, how much sand and crush, and what mix ratio should I use?',
  },
  {
    label: 'Bag calculator',
    image: '/images/dealers-warehouse.jpg',
    action: 'view',
    view: 'bags',
  },
  {
    label: 'Curing planner',
    image: '/images/project-towers.jpg',
    action: 'view',
    view: 'curing',
  },
  {
    label: 'Seepage & leakage',
    image: '/images/hero-skyline.jpg',
    action: 'prompt',
    prompt:
      'My basement walls are seeping water after the monsoon. What waterproofing method do you recommend, and which Fecto cement product is best for repair plaster?',
  },
  {
    label: 'OPC or SRC?',
    image: '/images/company-plant.jpg',
    action: 'prompt',
    prompt:
      'What is the difference between OPC and Sulphate Resistant Cement? When should I use SRC instead of ordinary cement?',
  },
];

const NAV_ITEMS: { key: View | 'quote'; label: string; icon: React.ElementType; href?: string }[] = [
  { key: 'chat', label: 'My chat', icon: MessageSquare },
  { key: 'bags', label: 'Bag calculator', icon: Calculator },
  { key: 'curing', label: 'Curing planner', icon: CalendarCheck2 },
  { key: 'quote', label: 'Request a quote', icon: ExternalLink, href: '/request-quote' },
];

let msgCounter = 0;
function nextId(): string {
  return `m-${Date.now()}-${++msgCounter}`;
}

/* ───────────── component ───────────── */

export default function AssistantApp() {
  /* state */
  const [view, setView] = useState<View>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.5-flash-lite');

  const abortRef = useRef<AbortController | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  /* persistence */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        if (Array.isArray(parsed)) setMessages(parsed);
      }
    } catch {
      /* ignore corrupt data */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* quota exceeded */
    }
  }, [messages]);

  useEffect(() => {
    try {
      const savedModel = localStorage.getItem(MODEL_STORAGE_KEY);
      if (savedModel && MODEL_OPTIONS.some((m) => m.id === savedModel)) {
        setSelectedModel(savedModel);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    try {
      localStorage.setItem(MODEL_STORAGE_KEY, modelId);
    } catch {
      /* ignore */
    }
  };

  /* scroll to bottom on new messages */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* auto-resize textarea */
  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  /* speech recognition */
  const toggleMic = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = new SR() as any;
    r.lang = 'en-US';
    r.continuous = false;
    r.interimResults = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    r.onresult = (e: any) => {
      const t = e.results?.[0]?.[0]?.transcript;
      if (t) setInput((prev) => (prev ? `${prev} ${t}` : t));
    };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    recognitionRef.current = r;
    r.start();
    setListening(true);
  }, [listening]);

  /* send */
  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim().slice(0, MAX_INPUT);
      if (!trimmed || isStreaming) return;

      /* switch to chat view */
      setView('chat');
      setDrawerOpen(false);

      const userMsg: Message = { id: nextId(), role: 'user', text: trimmed };
      const assistantMsg: Message = { id: nextId(), role: 'assistant', text: '' };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput('');
      setIsStreaming(true);

      const ac = new AbortController();
      abortRef.current = ac;

      try {
        /* build history without error messages */
        const history = [...messages, userMsg]
          .filter((m) => m.role !== 'error')
          .map((m) => ({ role: m.role as 'user' | 'assistant', text: m.text }));

        const res = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history, model: selectedModel }),
          signal: ac.signal,
        });

        /* remaining header */
        const rem = res.headers.get('X-Assistant-Remaining');
        if (rem !== null) setRemaining(Number(rem));

        if (!res.ok) {
          const json = await res.json().catch(() => ({ message: 'Something went wrong.' }));
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsg.id ? { ...m, role: 'error' as const, text: json.message || 'Something went wrong.' } : m)),
          );
          setIsStreaming(false);
          return;
        }

        /* stream the body */
        const reader = res.body?.getReader();
        if (!reader) throw new Error('No reader');
        const decoder = new TextDecoder();
        let buf = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const snapshot = buf;
          setMessages((prev) => prev.map((m) => (m.id === assistantMsg.id ? { ...m, text: snapshot } : m)));
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          /* user stopped */
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id && !m.text ? { ...m, role: 'error' as const, text: 'Network error. Please try again.' } : m,
            ),
          );
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [isStreaming, messages, selectedModel],
  );

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setIsStreaming(false);
    setView('chat');
  }, []);

  const retry = useCallback(
    (errMsg: Message) => {
      /* find the user message before this error */
      const idx = messages.findIndex((m) => m.id === errMsg.id);
      const userMsg = messages
        .slice(0, idx)
        .reverse()
        .find((m) => m.role === 'user');
      if (!userMsg) return;
      /* remove error message, then resend */
      setMessages((prev) => prev.filter((m) => m.id !== errMsg.id));
      send(userMsg.text);
    },
    [messages, send],
  );

  const copyText = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  // Detect voice input after mount, so the server HTML and the first client render match (no hydration error)
  const [hasMic, setHasMic] = useState(false);
  useEffect(() => {
    setHasMic('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  }, []);
  const hasMessages = messages.length > 0;

  /* ─── Sidebar content (shared between desktop sidebar and mobile drawer) ─── */

  const sidebarContent = (
    <>
      {/* Logo + New chat */}
      <div className="px-4 pt-5 pb-4">
        <Link href="/" className="mb-5 flex items-center gap-2.5">
          <FectoLogo className="h-7 w-auto" color="#000080" />
        </Link>
        <button
          type="button"
          onClick={() => {
            resetChat();
            setDrawerOpen(false);
          }}
          className="flex w-full items-center gap-2.5 rounded-xl border border-[#000080]/15 bg-[#000080]/[0.04] px-3.5 py-2.5 text-sm font-semibold text-[#000080] transition hover:bg-[#000080]/[0.08]"
        >
          <Plus className="h-4 w-4" />
          New chat
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-0.5 px-3">
        <span className="mb-1.5 block px-2 pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          My chat
        </span>
        <button
          type="button"
          onClick={() => {
            setView('chat');
            setDrawerOpen(false);
          }}
          className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
            view === 'chat' ? 'bg-[#000080]/[0.07] font-semibold text-[#000080]' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          Chat
        </button>

        <span className="mb-1.5 block px-2 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Homebuilder tools
        </span>
        {NAV_ITEMS.slice(1).map((item) =>
          item.href ? (
            <Link
              key={item.key}
              href={item.href}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ) : (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setView(item.key as View);
                setDrawerOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
                view === item.key ? 'bg-[#000080]/[0.07] font-semibold text-[#000080]' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ),
        )}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto space-y-3 px-4 pb-5">
        {/* Promo card */}
        <Link
          href="/request-quote"
          className="block rounded-2xl bg-[linear-gradient(150deg,#000080_0%,#0B1245_100%)] p-4 text-white shadow-lg transition hover:shadow-xl"
        >
          <Gauge className="mb-2 h-5 w-5 text-[#F4D5AB]" />
          <div className="text-sm font-semibold">Need a bulk quote?</div>
          <p className="mt-0.5 text-xs text-white/70">Get personalised pricing from our sales team.</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4D5AB]">
            Request a quote <ExternalLink className="h-3 w-3" />
          </span>
        </Link>

        {/* Back to website */}
        <Link
          href="/"
          className="flex items-center gap-2 px-1 text-xs text-slate-400 transition hover:text-[#000080]"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to website
        </Link>
      </div>
    </>
  );

  /* ─── Render ─── */

  return (
    <div className="flex h-[100dvh] bg-[#F6F7FB]">
      {/* ── Desktop Sidebar ── */}
      <aside
        className={`hidden flex-col border-r border-slate-200 bg-white transition-[width] duration-200 md:flex ${
          sidebarOpen ? 'w-[264px]' : 'w-16'
        }`}
      >
        {sidebarOpen ? (
          sidebarContent
        ) : (
          /* Collapsed: icons only */
          <div className="flex flex-1 flex-col items-center gap-2 py-4">
            <Link href="/">
              <FectoLogo viewBox="5 5 185 230" className="h-8 w-8" color="#000080" />
            </Link>
            <button type="button" onClick={resetChat} className="mt-3 rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-[#000080]" aria-label="New chat">
              <Plus className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => setView('chat')} className={`rounded-xl p-2.5 transition ${view === 'chat' ? 'bg-[#000080]/[0.07] text-[#000080]' : 'text-slate-500 hover:bg-slate-100'}`} aria-label="Chat">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => setView('bags')} className={`rounded-xl p-2.5 transition ${view === 'bags' ? 'bg-[#000080]/[0.07] text-[#000080]' : 'text-slate-500 hover:bg-slate-100'}`} aria-label="Bag calculator">
              <Calculator className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => setView('curing')} className={`rounded-xl p-2.5 transition ${view === 'curing' ? 'bg-[#000080]/[0.07] text-[#000080]' : 'text-slate-500 hover:bg-slate-100'}`} aria-label="Curing planner">
              <CalendarCheck2 className="h-5 w-5" />
            </button>
            <div className="mt-auto">
              <Link href="/" className="rounded-xl p-2.5 text-slate-400 transition hover:text-[#000080]" aria-label="Back to website">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </div>
          </div>
        )}
      </aside>

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="relative z-10 flex w-[280px] flex-col bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 md:px-6">
          {/* Mobile hamburger */}
          <button type="button" onClick={() => setDrawerOpen(true)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="hidden rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 md:block"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#000080]" />
            <h1 className="text-sm font-bold text-slate-900 sm:text-base">Fecto Smart Assistant</h1>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Model Selector */}
            <div className="relative">
              <label htmlFor="model-select" className="sr-only">
                Choose AI model
              </label>
              <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => handleModelChange(e.target.value)}
                className="cursor-pointer appearance-none rounded-full border border-slate-200 bg-slate-50 py-1 pl-7 pr-7 text-xs font-semibold text-[#000080] shadow-sm outline-none transition hover:bg-slate-100 focus:border-[#000080]/40 focus:ring-2 focus:ring-[#000080]/15 max-w-[155px] sm:max-w-none truncate"
                aria-label="Select AI model"
              >
                {MODEL_OPTIONS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label} ({m.tag})
                  </option>
                ))}
              </select>
              <Cpu className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#000080]/70" />
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>

            {remaining !== null && (
              <span className="hidden sm:inline-flex rounded-full bg-[#F4D5AB]/40 px-3 py-1 text-xs font-semibold text-[#000080]">
                {remaining} question{remaining !== 1 ? 's' : ''} left today
              </span>
            )}
            <button
              type="button"
              onClick={resetChat}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Reset chat"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto" data-lenis-prevent>
          {view === 'bags' && (
            <div className="mx-auto max-w-4xl p-4 md:p-8" data-lenis-prevent>
              <BagCalculator onAsk={send} />
            </div>
          )}

          {view === 'curing' && (
            <div className="mx-auto max-w-4xl p-4 md:p-8" data-lenis-prevent>
              <CuringPlanner onAsk={send} />
            </div>
          )}

          {view === 'chat' && (
            <div className="flex h-full flex-col" data-lenis-prevent>
              {!hasMessages ? (
                /* ── Empty state ── */
                <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
                  {/* Crest badge */}
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[linear-gradient(150deg,#000080_0%,#0B1245_100%)] shadow-lg shadow-[#000080]/20">
                    <FectoLogo viewBox="5 5 185 230" className="h-10 w-10" color="#fff" />
                  </div>

                  <h2 className="text-center text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    How can I help with your build?
                  </h2>
                  <p className="mt-2 max-w-md text-center text-sm text-slate-500">
                    Ask about cement quantities, mix ratios, curing, waterproofing, or anything about construction with Fecto products.
                  </p>

                  {/* Starter cards */}
                  <div className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {STARTER_CARDS.map((card) => (
                      <button
                        key={card.label}
                        type="button"
                        onClick={() => {
                          if (card.action === 'prompt' && card.prompt) send(card.prompt);
                          else if (card.action === 'view' && card.view) setView(card.view);
                        }}
                        className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-md transition hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <div className="relative aspect-[4/5] w-full">
                          <Image
                            src={card.image}
                            alt=""
                            fill
                            sizes="200px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Navy gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#000080]/90 via-[#000080]/40 to-transparent" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
                          {card.action === 'view' ? (
                            card.view === 'bags' ? <Calculator className="h-3.5 w-3.5 shrink-0 text-[#F4D5AB]" /> : <Droplets className="h-3.5 w-3.5 shrink-0 text-[#F4D5AB]" />
                          ) : (
                            <ShieldQuestion className="h-3.5 w-3.5 shrink-0 text-[#F4D5AB]" />
                          )}
                          <span className="text-xs font-semibold leading-tight text-white">{card.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* ── Message list ── */
                <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 md:px-8" data-lenis-prevent>
                  {messages.map((msg) => {
                    if (msg.role === 'user') {
                      return (
                        <div key={msg.id} className="flex justify-end">
                          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[#000080] px-4 py-3 text-sm leading-relaxed text-white shadow-sm sm:max-w-[65%]">
                            {msg.text}
                          </div>
                        </div>
                      );
                    }
                    if (msg.role === 'error') {
                      return (
                        <div key={msg.id} className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                            <ShieldQuestion className="h-4 w-4 text-red-500" />
                          </div>
                          <div className="max-w-[80%] sm:max-w-[65%]">
                            <div className="rounded-2xl rounded-tl-md border border-red-100 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700 shadow-sm">
                              {msg.text}
                            </div>
                            <button
                              type="button"
                              onClick={() => retry(msg)}
                              className="mt-1.5 flex items-center gap-1.5 px-1 text-xs font-medium text-slate-400 transition hover:text-[#000080]"
                            >
                              <RefreshCw className="h-3 w-3" /> Retry
                            </button>
                          </div>
                        </div>
                      );
                    }
                    /* assistant */
                    const isEmpty = !msg.text;
                    const isLast = msg.id === messages[messages.length - 1]?.id;
                    return (
                      <div key={msg.id} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(150deg,#000080_0%,#0B1245_100%)]">
                          <FectoLogo viewBox="5 5 185 230" className="h-4 w-4" color="#fff" />
                        </div>
                        <div className="max-w-[80%] sm:max-w-[65%]">
                          <div className="rounded-2xl rounded-tl-md border border-slate-100 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm">
                            {isEmpty ? (
                              <span className="inline-flex items-center gap-1 text-slate-400">
                                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#000080]" />
                                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#000080] [animation-delay:150ms]" />
                                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#000080] [animation-delay:300ms]" />
                              </span>
                            ) : (
                              <>
                                <Markdown text={msg.text} />
                                {isStreaming && isLast && <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-[#000080]" />}
                              </>
                            )}
                          </div>
                          {/* Actions */}
                          {!isEmpty && !(isStreaming && isLast) && (
                            <div className="mt-1.5 flex items-center gap-2 px-1">
                              <button
                                type="button"
                                onClick={() => copyText(msg.id, msg.text)}
                                className="flex items-center gap-1 text-xs text-slate-400 transition hover:text-[#000080]"
                                aria-label="Copy"
                              >
                                {copied === msg.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                {copied === msg.id ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                          )}
                          {/* Stop button during streaming */}
                          {isStreaming && isLast && (
                            <button
                              type="button"
                              onClick={stopStreaming}
                              className="mt-2 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm transition hover:bg-slate-50"
                            >
                              <Square className="h-3 w-3 fill-current" /> Stop
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>
              )}

              {/* ── Composer ── */}
              <div className="border-t border-slate-200 bg-white px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:px-8">
                <div className="mx-auto flex max-w-3xl items-end gap-2">
                  {hasMic && (
                    <button
                      type="button"
                      onClick={toggleMic}
                      className={`shrink-0 rounded-full p-2.5 transition ${
                        listening ? 'bg-red-50 text-red-500' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                      }`}
                      aria-label={listening ? 'Stop recording' : 'Voice input'}
                    >
                      {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </button>
                  )}
                  <div className="relative flex-1">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value.slice(0, MAX_INPUT));
                        resizeTextarea();
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about cement, construction, materials…"
                      rows={1}
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-[#F6F7FB] px-4 py-3 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#000080]/30 focus:ring-2 focus:ring-[#000080]/10"
                      data-lenis-prevent
                    />
                    <button
                      type="button"
                      onClick={() => send(input)}
                      disabled={!input.trim() || isStreaming}
                      className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#000080] text-white shadow-sm transition hover:bg-[#000080]/90 disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Send"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-center text-[11px] text-slate-400">
                  Estimates are approximate. Please consult a qualified engineer or contractor for final quantities.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
