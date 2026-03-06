"use client";

import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMarkdownProps {
  content: string;
  tone: "light" | "dark";
}

export function ChatMarkdown({ content, tone }: ChatMarkdownProps) {
  return (
    <div
      className={clsx(
        "text-sm leading-relaxed",
        tone === "dark" ? "text-white" : "text-[var(--ink-800)]",
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          code: ({ children }) => (
            <code
              className={clsx(
                "rounded px-1 py-0.5 text-[0.92em]",
                tone === "dark" ? "bg-white/15" : "bg-[var(--paper-200)]",
              )}
            >
              {children}
            </code>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className={clsx(
                "underline underline-offset-2",
                tone === "dark" ? "text-white" : "text-[var(--ink-900)]",
              )}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
