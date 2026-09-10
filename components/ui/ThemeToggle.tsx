"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    // Default to light theme only
    const next: "light" | "dark" = stored === "dark" ? "dark" : "light";

    setTheme(next);
    document.documentElement.dataset.theme = next;
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.dataset.theme = next;
  }

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 opacity-50" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      suppressHydrationWarning
      className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:scale-105 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400/50"
      aria-label="Toggle theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <FaSun className="text-amber-400 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110 text-sm" />
      ) : (
        <FaMoon className="text-indigo-600 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 text-sm" />
      )}
    </button>
  );
}
