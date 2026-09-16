"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // Wrapping in a microtask avoids calling setState synchronously
    // in the effect body, which can cause cascading renders.
    const id = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50" style={{ contain: "layout style" }}>
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-colors duration-200 ${
            scrolled
              ? "border-slate-200/90 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950"
              : "border-slate-200/60 bg-white/95 dark:border-white/10 dark:bg-slate-950/95"
          }`}
        >
          {/* Logo Brand */}
          <Link
            href="/"
            className="group flex items-center focus:outline-none"
            aria-label="Devansh Variya - Home"
          >
            {/* Light Mode Logo */}
            <Image
              src="/devansh-logo-light.png"
              alt="Devansh Variya"
              width={220}
              height={26}
              priority
              className="h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] dark:hidden"
            />
            {/* Dark Mode Logo */}
            <Image
              src="/devansh-logo-dark.png"
              alt="Devansh Variya"
              width={220}
              height={26}
              priority
              className="hidden h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] dark:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1.5 md:flex">
            {navItems.map((it) => {
              const active = isLinkActive(it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`rounded-xl px-3.5 py-1.5 text-sm font-semibold transition-all duration-150 ${
                    active
                      ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  {it.label}
                </Link>
              );
            })}

            {/* Quick Action Button */}
            <Link
              href="/contact"
              className={`ml-2 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold shadow-2xs transition-all duration-150 active:scale-95 ${
                pathname.startsWith("/contact")
                  ? "bg-emerald-600 text-white shadow-emerald-600/20"
                  : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span>Let&apos;s Connect</span>
            </Link>

            {/* Theme Toggle Button */}
            <div className="ml-2 border-l border-slate-200/80 pl-2 dark:border-white/10">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileOpen((s) => !s)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-800 transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <span className="text-xl font-bold leading-none">×</span>
              ) : (
                <div className="space-y-1">
                  <span className="block h-0.5 w-4 bg-current" />
                  <span className="block h-0.5 w-4 bg-current" />
                  <span className="block h-0.5 w-4 bg-current" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`mt-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg dark:border-white/10 dark:bg-slate-950 md:hidden transition-opacity duration-150 ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none h-0"
          }`}
        >
          <nav className="space-y-1 p-3">
            {navItems.map((it) => {
              const active = isLinkActive(it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-all ${
                    active
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{it.label}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-slate-100 dark:border-white/10 mt-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-center text-xs font-semibold text-white shadow-xs dark:bg-white dark:text-slate-950"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Let&apos;s Connect</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
