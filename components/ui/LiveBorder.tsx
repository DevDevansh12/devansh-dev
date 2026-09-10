"use client";

import { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

interface LiveBorderProps {
  children: React.ReactNode;
}

/**
 * GPU-composited animated border.
 *
 * Instead of animating `backgroundPosition` (which triggers style
 * recalculation every frame), we translate a gradient pseudo-layer with
 * `transform: translateX`, which is handled entirely by the compositor and
 * never causes layout or paint work.
 */
export default function LiveBorder({ children }: LiveBorderProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  // Drives the translateX animation via rAF — stays on compositor thread.
  useAnimationFrame((_, delta) => {
    progressRef.current = (progressRef.current + delta * 0.02) % 100;
    if (glowRef.current) {
      // Map 0–100 → translateX(-66.6% → 0%) so the 300%-wide gradient sweeps
      const tx = -66.6 + (progressRef.current / 100) * 66.6;
      glowRef.current.style.transform = `translateX(${tx}%)`;
    }
  });

  return (
    <div className="relative rounded-[32px]">
      {/* Static border */}
      <div
        className="
          absolute inset-0
          rounded-[32px]
          border
          border-slate-200
          dark:border-white/10
        "
      />

      {/* Moving glow — translateX only, no backgroundPosition change */}
      <div
        className="pointer-events-none absolute -inset-[1px] overflow-hidden rounded-[32px]"
        style={{
          mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      >
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "300%",
            background:
              "linear-gradient(90deg, transparent, #22d3ee, #3b82f6, #a855f7, transparent)",
            willChange: "transform",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative overflow-hidden rounded-[31px]">
        {children}
      </div>
    </div>
  );
}
