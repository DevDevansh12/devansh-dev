"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { FaArrowRight } from "react-icons/fa";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isLinkActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const isContactActive = pathname.startsWith("/contact");

  return (
    <header className="fixed left-0 right-0 top-0 z-50" style={{ contain: "layout style" }}>
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        {/* ──── Main Navbar Bar ──── */}
        <div
          className={`navbar-glass relative flex items-center justify-between rounded-2xl border px-5 py-2.5 transition-all duration-300 ${
            scrolled
              ? "border-slate-200/80 bg-white/80 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-950/80 dark:shadow-black/20"
              : "border-slate-200/50 bg-white/70 backdrop-blur-lg dark:border-white/[0.06] dark:bg-slate-950/70"
          }`}
        >
          {/* Gradient accent line at bottom */}
          <div
            className={`pointer-events-none absolute inset-x-4 -bottom-px h-px transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent-1), var(--accent-2), transparent)",
            }}
          />

          {/* Logo Brand */}
          <Link
            href="/"
            className="group relative flex items-center focus:outline-none"
            aria-label="Devansh Variya - Home"
          >
            {/* Light Mode Logo */}
            <Image
              src="/devansh-logo-light.png"
              alt="Devansh Variya"
              width={220}
              height={26}
              priority
              className="h-6 sm:h-7 w-auto object-contain transition-all duration-200 group-hover:scale-[1.02] group-hover:brightness-110 dark:hidden"
            />
            {/* Dark Mode Logo */}
            <Image
              src="/devansh-logo-dark.png"
              alt="Devansh Variya"
              width={220}
              height={26}
              priority
              className="hidden h-6 sm:h-7 w-auto object-contain transition-all duration-200 group-hover:scale-[1.02] group-hover:brightness-110 dark:block"
            />
          </Link>

          {/* ──── Desktop Navigation ──── */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {/* Nav Links in a subtle pill container */}
            <div className="flex items-center gap-0.5 rounded-xl bg-slate-100/60 p-1 dark:bg-white/[0.04]">
              {navItems.map((it) => {
                const active = isLinkActive(it.href);
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={`relative rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200 ${
                      active
                        ? "bg-white text-slate-900 shadow-sm dark:bg-white/10 dark:text-white"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    {it.label}
                    {/* Active dot indicator */}
                    {active && (
                      <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-500" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button with gradient */}
            <Link
              href="/contact"
              className={`group/cta ml-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 active:scale-95 ${
                isContactActive
                  ? "nav-cta-gradient text-white shadow-md shadow-emerald-500/20"
                  : "nav-cta-gradient text-white shadow-md shadow-emerald-500/15 hover:shadow-lg hover:shadow-emerald-500/25"
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span>Let&apos;s Connect</span>
              <FaArrowRight className="text-[9px] transition-transform duration-200 group-hover/cta:translate-x-0.5" />
            </Link>

            {/* Theme Toggle — separator + toggle */}
            <div className="ml-2.5 border-l border-slate-200/70 pl-2.5 dark:border-white/10">
              <ThemeToggle />
            </div>
          </nav>

          {/* ──── Mobile Controls ──── */}
          <div className="flex items-center gap-2.5 md:hidden">
            <ThemeToggle />

            {/* Animated Hamburger / Close button */}
            <button
              type="button"
              onClick={() => setMobileOpen((s) => !s)}
              className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-white active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="flex h-4 w-4 flex-col items-center justify-center">
                <span
                  className={`block h-[2px] w-4 rounded-full bg-current transition-all duration-300 ${
                    mobileOpen
                      ? "translate-y-[3px] rotate-45"
                      : ""
                  }`}
                />
                <span
                  className={`mt-[4px] block h-[2px] w-4 rounded-full bg-current transition-all duration-300 ${
                    mobileOpen
                      ? "-translate-y-[3px] -rotate-45"
                      : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* ──── Mobile Dropdown ──── */}
        <div
          className={`mt-2 md:hidden transition-all duration-300 ease-out ${
            mobileOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-2 opacity-0 scale-[0.98] pointer-events-none"
          }`}
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/[0.06] backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-950/95 dark:shadow-black/30">
            <nav className="p-2.5">
              {/* Nav links */}
              <div className="space-y-0.5">
                {navItems.map((it, i) => {
                  const active = isLinkActive(it.href);
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                        active
                          ? "bg-gradient-to-r from-emerald-50 to-cyan-50/50 text-emerald-700 dark:from-emerald-500/10 dark:to-cyan-500/5 dark:text-emerald-400"
                          : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                      }`}
                      style={{
                        animationDelay: mobileOpen ? `${i * 50}ms` : "0ms",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Number indicator */}
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold ${
                            active
                              ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                              : "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span>{it.label}</span>
                      </div>
                      {active && (
                        <span className="flex h-2 w-2 items-center justify-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Divider with gradient */}
              <div className="my-2.5 mx-3">
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--accent-1), var(--accent-2), transparent)",
                    opacity: 0.3,
                  }}
                />
              </div>

              {/* CTA Button */}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl py-3 text-center text-sm font-bold text-white shadow-md nav-cta-gradient"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span>Let&apos;s Connect</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile backdrop overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm dark:bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
