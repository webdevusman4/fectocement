/**
 * Request budget for the assistant (server only).
 *
 * Gemini's free tier allows a fixed number of requests per day (about 500 on this project), so the
 * assistant keeps a little headroom and shares it fairly:
 *   ASSISTANT_DAILY_CAP            all visitors together per day      (default 450)
 *   ASSISTANT_PER_USER_DAILY       one visitor (by IP) per day        (default 25)
 *   ASSISTANT_PER_USER_PER_MINUTE  burst limit per visitor            (default 6)
 * The day rolls over at midnight Pacific, the same moment Gemini resets its daily counts.
 *
 * Counters live in this server instance's memory. On serverless hosting each warm instance keeps its
 * own counts, so the caps are a soft guard; Gemini's own limit stays the hard stop, and the API route
 * turns a 429 from Gemini into a friendly "try again tomorrow" message.
 */

const num = (value: string | undefined, fallback: number) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
};

const DAILY_CAP = num(process.env.ASSISTANT_DAILY_CAP, 450);
const PER_USER_DAILY = num(process.env.ASSISTANT_PER_USER_DAILY, 25);
const PER_USER_PER_MINUTE = num(process.env.ASSISTANT_PER_USER_PER_MINUTE, 6);

const pacificDay = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date());

let day = pacificDay();
let usedToday = 0;
const visitors = new Map<string, { count: number; recent: number[] }>();

export type QuotaResult =
  | { ok: true; remainingForUser: number }
  | { ok: false; reason: 'daily_cap' | 'user_cap' | 'rate'; message: string };

export function takeQuota(visitorId: string): QuotaResult {
  const today = pacificDay();
  if (today !== day) {
    day = today;
    usedToday = 0;
    visitors.clear();
  }

  if (usedToday >= DAILY_CAP) {
    return {
      ok: false,
      reason: 'daily_cap',
      message: 'The assistant has answered all the questions it can for today. Please try again tomorrow, or request a quote and our team will help you directly.',
    };
  }

  const visitor = visitors.get(visitorId) ?? { count: 0, recent: [] };
  if (visitor.count >= PER_USER_DAILY) {
    return {
      ok: false,
      reason: 'user_cap',
      message: `You have reached today’s limit of ${PER_USER_DAILY} questions. The Bag Calculator and Curing Planner still work without limits.`,
    };
  }

  const now = Date.now();
  visitor.recent = visitor.recent.filter((t) => now - t < 60_000);
  if (visitor.recent.length >= PER_USER_PER_MINUTE) {
    return { ok: false, reason: 'rate', message: 'That was a lot of questions in a minute. Please wait a few seconds and try again.' };
  }

  visitor.count += 1;
  visitor.recent.push(now);
  visitors.set(visitorId, visitor);
  usedToday += 1;
  return { ok: true, remainingForUser: PER_USER_DAILY - visitor.count };
}
