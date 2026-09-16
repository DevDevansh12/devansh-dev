interface LiveBorderProps {
  children: React.ReactNode;
}

/**
 * Animated border using a pure CSS keyframe — zero JS, zero rAF loop,
 * fully compositor-threaded.
 */
export default function LiveBorder({ children }: LiveBorderProps) {
  return (
    <div className="relative rounded-[32px]">
      {/* Static border */}
      <div className="absolute inset-0 rounded-[32px] border border-slate-200 dark:border-white/10" />

      {/* Moving glow — CSS animation only, no JS */}
      <div
        className="pointer-events-none absolute -inset-[1px] overflow-hidden rounded-[32px]"
        style={{
          mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      >
        <div
          className="live-border-glow"
          style={{
            position: "absolute",
            inset: 0,
            width: "300%",
            background: "linear-gradient(90deg, transparent, #22d3ee, #3b82f6, #a855f7, transparent)",
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
