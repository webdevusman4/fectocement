'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Small, safe Markdown renderer for assistant answers: headings, paragraphs, bullet and numbered
 * lists, simple pipe tables, code blocks and inline bold / italic / code / links. It builds React
 * elements (no innerHTML), and links are limited to site paths and https URLs.
 */

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*|_[^_\s][^_]*_)/g;

function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const match of text.matchAll(INLINE)) {
    const token = match[0];
    const start = match.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const key = `${keyBase}-${i++}`;
    if (token.startsWith('**')) {
      out.push(<strong key={key} className="font-semibold text-slate-900">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      out.push(<code key={key} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-[#000080]">{token.slice(1, -1)}</code>);
    } else if (token.startsWith('[')) {
      const [, label, href] = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/) ?? [];
      if (href?.startsWith('/')) {
        out.push(<Link key={key} href={href} className="font-medium text-[#000080] underline underline-offset-2">{label}</Link>);
      } else if (href?.startsWith('https://')) {
        out.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-[#000080] underline underline-offset-2">{label}</a>);
      } else {
        out.push(label ?? token);
      }
    } else {
      out.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    last = start + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const isTableRow = (line: string) => /^\s*\|.*\|\s*$/.test(line);
const isTableDivider = (line: string) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(line);
const cells = (line: string) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

export default function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = `b${k++}`;

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.trim().startsWith('```')) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) code.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={key} className="overflow-x-auto rounded-xl bg-slate-900 p-3 font-mono text-xs leading-relaxed text-slate-100">
          {code.join('\n')}
        </pre>
      );
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      blocks.push(
        <p key={key} className={`font-semibold text-slate-900 ${level <= 2 ? 'text-base' : 'text-[0.95rem]'}`}>
          {renderInline(heading[2], key)}
        </p>
      );
      i++;
      continue;
    }

    if (isTableRow(line) && i + 1 < lines.length && isTableDivider(lines[i + 1])) {
      const head = cells(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && isTableRow(lines[i])) rows.push(cells(lines[i++]));
      blocks.push(
        <div key={key} className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>{head.map((h, j) => <th key={j} className="px-3 py-2 font-semibold">{renderInline(h, `${key}h${j}`)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-t border-slate-100">
                  {r.map((c, ci) => <td key={ci} className="px-3 py-2 align-top text-slate-700">{renderInline(c, `${key}r${ri}c${ci}`)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (/^\s*([-*•])\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      const ordered = /^\s*\d+[.)]\s+/.test(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? /^\s*\d+[.)]\s+/ : /^\s*([-*•])\s+/).test(lines[i])) {
        items.push(lines[i].replace(ordered ? /^\s*\d+[.)]\s+/ : /^\s*([-*•])\s+/, ''));
        i++;
      }
      const ListTag = ordered ? 'ol' : 'ul';
      blocks.push(
        <ListTag key={key} className={`space-y-1 pl-5 ${ordered ? 'list-decimal' : 'list-disc'} marker:text-[#000080]/60`}>
          {items.map((item, j) => <li key={j}>{renderInline(item, `${key}i${j}`)}</li>)}
        </ListTag>
      );
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith('```') &&
      !/^\s*([-*•])\s+/.test(lines[i]) &&
      !/^\s*\d+[.)]\s+/.test(lines[i]) &&
      !(isTableRow(lines[i]) && i + 1 < lines.length && isTableDivider(lines[i + 1]))
    ) {
      para.push(lines[i++]);
    }
    blocks.push(
      <p key={key}>
        {para.map((p, j) => (
          <React.Fragment key={j}>
            {j > 0 && <br />}
            {renderInline(p, `${key}p${j}`)}
          </React.Fragment>
        ))}
      </p>
    );
  }

  return <div className="space-y-3 text-[0.95rem] leading-relaxed text-slate-700">{blocks}</div>;
}
