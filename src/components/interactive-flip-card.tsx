"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { useState } from "react";

interface InteractiveFlipCardProps {
  front: ReactNode;
  back: ReactNode;
  label: string;
  className?: string;
}

export function InteractiveFlipCard({
  front,
  back,
  label,
  className,
}: InteractiveFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isFlipped}
      className={clsx(
        "flip-card h-full w-full cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline-none",
        className,
      )}
      onClick={() => setIsFlipped((current) => !current)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onBlur={() => setIsFlipped(false)}
    >
      <span className={clsx("flip-card__inner", isFlipped && "is-flipped")}>
        <span className="flip-card__face flip-card__face--front">{front}</span>
        <span className="flip-card__face flip-card__face--back">{back}</span>
      </span>
    </button>
  );
}
