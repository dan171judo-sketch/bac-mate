"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type MateMathProps = {
  content: string;
};

const ACTION_PATTERN =
  /(\[LECTIE:[^\]]+\]|\[EVALUARE\])/g;

function MarkdownBlock({
  content,
}: {
  content: string;
}) {
  if (!content) {
    return null;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        remarkMath,
      ]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-3 mt-4 text-xl font-black text-white">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mb-2 mt-4 text-lg font-black text-white">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mb-2 mt-3 font-black text-white">
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p className="mb-3 last:mb-0">
            {children}
          </p>
        ),

        strong: ({ children }) => (
          <strong className="font-extrabold text-white">
            {children}
          </strong>
        ),

        ul: ({ children }) => (
          <ul className="mb-3 ml-5 list-disc space-y-1.5 marker:text-cyan-400">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="mb-3 ml-5 list-decimal space-y-1.5 marker:font-bold marker:text-cyan-400">
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="pl-1">
            {children}
          </li>
        ),

        blockquote: ({ children }) => (
          <blockquote className="my-3 rounded-r-xl border-l-2 border-cyan-400 bg-cyan-400/[0.05] px-4 py-2 text-slate-300">
            {children}
          </blockquote>
        ),

        code: ({ children }) => (
          <code className="rounded-md border border-white/[0.08] bg-black/30 px-1.5 py-0.5 font-mono text-[.92em] text-cyan-200">
            {children}
          </code>
        ),

        a: ({
          href,
          children,
        }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-cyan-300 underline decoration-cyan-400/30 underline-offset-4 hover:text-cyan-200"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function MateMath({
  content,
}: MateMathProps) {
  const parts =
    content.split(ACTION_PATTERN);

  return (
    <div className="mate-markdown text-[15px] leading-7 text-slate-200">
      {parts.map((part, index) => {
        if (
          part === "[EVALUARE]"
        ) {
          return (
            <Link
              key={`${part}-${index}`}
              href="/evaluare-saptamanala"
              className="my-3 inline-flex rounded-xl border border-violet-400/25 bg-violet-400/10 px-4 py-2 text-sm font-extrabold text-violet-200 transition hover:border-violet-300/40 hover:bg-violet-400/15"
            >
              Pornește evaluarea adaptivă →
            </Link>
          );
        }

        if (
          part.startsWith(
            "[LECTIE:"
          ) &&
          part.endsWith("]")
        ) {
          const lessonId =
            part
              .slice(
                "[LECTIE:".length,
                -1
              )
              .trim();

          return (
            <Link
              key={`${part}-${index}`}
              href={`/lectii/${encodeURIComponent(
                lessonId
              )}`}
              className="my-3 inline-flex rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-extrabold text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/15"
            >
              Deschide lecția recomandată →
            </Link>
          );
        }

        return (
          <MarkdownBlock
            key={index}
            content={part}
          />
        );
      })}
    </div>
  );
}