import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "glass";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "glass",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-7 py-3.5 text-base rounded-2xl",
  }[size];

  const variantClasses = {
    primary:
      "bg-linear-to-r from-emerald-400 via-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold hover:opacity-90 active:scale-[0.98]",
    outline:
      "border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-semibold hover:border-cyan-400 hover:bg-cyan-500/5 active:scale-[0.98]",
    glass:
      "border border-slate-200/80 bg-white/70 text-slate-800 shadow-sm backdrop-blur-xl hover:border-cyan-400/40 hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/10 active:scale-[0.98]",
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
