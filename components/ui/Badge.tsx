import type { ReactNode } from "react";

export default function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 ${className}`}
    >
      {children}
    </span>
  );
}
