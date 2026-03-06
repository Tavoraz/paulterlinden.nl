"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

interface AviMascotProps {
  size?: "xs" | "sm";
  className?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function AviMascot({ size = "sm", className }: AviMascotProps) {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [excited, setExcited] = useState(false);

  useEffect(() => {
    if (!excited) {
      return;
    }

    const timer = window.setTimeout(() => setExcited(false), 900);
    return () => window.clearTimeout(timer);
  }, [excited]);

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = clamp((event.clientX - centerX) / 10, -2.6, 2.6);
    const y = clamp((event.clientY - centerY) / 10, -2.2, 2.2);
    setPupilOffset({ x, y });
  }

  function onPointerLeave() {
    setPupilOffset({ x: 0, y: 0 });
  }

  return (
    <button
      type="button"
      aria-label="Avi mascot"
      className={clsx(
        "avi-mascot",
        size === "xs" ? "avi-mascot--xs" : "avi-mascot--sm",
        excited && "avi-mascot--excited",
        className,
      )}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={() => setExcited(true)}
      style={
        {
          "--avi-pupil-x": `${pupilOffset.x}px`,
          "--avi-pupil-y": `${pupilOffset.y}px`,
        } as CSSProperties
      }
    >
      <span className="avi-mascot__aura" />
      <span className="avi-mascot__shadow" />
      <span className="avi-mascot__body">
        <span className="avi-mascot__shine" />
        <span className="avi-mascot__face">
          <span className="avi-mascot__brow avi-mascot__brow--left" />
          <span className="avi-mascot__brow avi-mascot__brow--right" />
          <span className="avi-mascot__eye">
            <span className="avi-mascot__pupil" />
          </span>
          <span className="avi-mascot__eye">
            <span className="avi-mascot__pupil" />
          </span>
          <span className="avi-mascot__cheek avi-mascot__cheek--left" />
          <span className="avi-mascot__cheek avi-mascot__cheek--right" />
        </span>
        <span className="avi-mascot__mouth" />
        <span className="avi-mascot__panel">
          <span className="avi-mascot__panel-dot" />
          <span className="avi-mascot__panel-line" />
        </span>
        <span className="avi-mascot__arm avi-mascot__arm--left" />
        <span className="avi-mascot__arm avi-mascot__arm--right" />
        <span className="avi-mascot__foot avi-mascot__foot--left" />
        <span className="avi-mascot__foot avi-mascot__foot--right" />
      </span>
      <span className="avi-mascot__antenna">
        <span className="avi-mascot__antenna-dot" />
      </span>
      <span className="avi-mascot__spark avi-mascot__spark--1" />
      <span className="avi-mascot__spark avi-mascot__spark--2" />
      <span className="avi-mascot__spark avi-mascot__spark--3" />
      <span className="avi-mascot__spark avi-mascot__spark--4" />
    </button>
  );
}
