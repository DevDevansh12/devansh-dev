"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowUp,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaCopy,
  FaCheck,
  FaMapMarkerAlt,
  FaDownload,
  FaClock,
  FaTerminal,
  FaHeart,
} from "react-icons/fa";

const MARQUEE_ITEMS = [
  "Full-Stack Web Engineering",
  "Next.js 16 & React 19",
  "TypeScript Architecture",
  "Node.js & Express APIs",
  "PostgreSQL & MongoDB",
  "Tailwind CSS v4",
  "Real-Time WebSockets",
  "OpenAI & Gemini Integrations",
  "Clean Code & Performance",
  "Vadodara, Gujarat, India",
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string>("");
  const [highFives, setHighFives] = useState<number>(42);
  const [hasHighFived, setHasHighFived] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  // Sync highFives from localStorage after hydration — avoids SSR mismatch
  useEffect(() => {
    try {
      const saved = localStorage.getItem("devansh_high_fives");
      if (saved) setHighFives(parseInt(saved, 10));
    } catch { /* ignore */ }
  }, []);

  // Live Vadodara Clock (Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);



  const handleHighFive = () => {
    const newCount = highFives + 1;
    setHighFives(newCount);
    setHasHighFived(true);
    setSparkle(true);
    setTimeout(() => setSparkle(false), 2000);

    try {
      localStorage.setItem("devansh_high_fives", newCount.toString());
    } catch {
      // Ignore storage errors
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("74devanshvariya@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-white dark:border-white/10 dark:bg-slate-950 transition-colors duration-300">
      {/* 1. Creative Infinite Marquee Ticker */}
      <div className="relative w-full border-b border-slate-200/70 bg-slate-100/60 py-2.5 overflow-hidden dark:border-white/5 dark:bg-white/[0.02]">
        {/* Left & Right gradient fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" />

        <div className="animate-footer-marquee select-none">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 px-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-600 dark:text-slate-400 whitespace-nowrap">
                {item}
              </span>
              <span className="text-[10px] text-emerald-500 font-bold">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-16 sm:pb-12">
        {/* 2. Creative Technical Blueprint CTA Card */}
        <div className="relative mb-16 rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50/90 via-white to-emerald-50/40 p-7 sm:p-10 shadow-sm dark:border-white/10 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-emerald-950/20">
          {/* Engineering Crosshair Accents */}
          <span className="absolute -top-2.5 -left-2.5 flex h-5 w-5 items-center justify-center font-mono text-xs text-slate-400 dark:text-slate-600 select-none">
            +
          </span>
          <span className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center font-mono text-xs text-slate-400 dark:text-slate-600 select-none">
            +
          </span>
          <span className="absolute -bottom-2.5 -left-2.5 flex h-5 w-5 items-center justify-center font-mono text-xs text-slate-400 dark:text-slate-600 select-none">
            +
          </span>
          <span className="absolute -bottom-2.5 -right-2.5 flex h-5 w-5 items-center justify-center font-mono text-xs text-slate-400 dark:text-slate-600 select-none">
            +
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Heading, Status & Direct CTAs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Available for Full-Time Roles & High-Impact Projects</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  remarkable together.
                </span>
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                Have a breakthrough idea, need a dedicated Full Stack Engineer to scale your web platform, or want to discuss modern architectures? Let&apos;s chat.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  <FaEnvelope className="text-xs" />
                  <span>Let&apos;s Connect</span>
                </Link>

                <a
                  href="https://wa.me/916355662753"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-50/50 px-4 py-3 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-100/70 active:scale-95 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800 shadow-xs transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/30 cursor-pointer"
                  title="Click to copy email"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-xs text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="text-xs text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
                      <span>74devanshvariya@gmail.com</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Creative Interactive Terminal Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-slate-300/80 bg-slate-900 p-4 sm:p-5 font-mono text-xs text-slate-300 shadow-xl dark:border-white/15 dark:bg-slate-950">
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] text-slate-400 flex items-center gap-1">
                      <FaTerminal className="text-[9px] text-slate-500" />
                      devansh@portfolio ~
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    Active
                  </span>
                </div>

                {/* Terminal Code Body */}
                <div className="space-y-1 text-[11px] sm:text-xs leading-relaxed">
                  <p className="text-slate-500">{"// Quick Developer Dossier"}</p>
                  <p>
                    <span className="text-pink-400">const</span>{" "}
                    <span className="text-emerald-400">engineer</span> = &#123;
                  </p>
                  <p className="pl-4">
                    <span className="text-cyan-300">name:</span>{" "}
                    <span className="text-amber-200">&quot;Devansh Variya&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-cyan-300">stack:</span>{" "}
                    <span className="text-amber-200">&quot;Next.js • React • Node • TS&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-cyan-300">location:</span>{" "}
                    <span className="text-amber-200">&quot;Vadodara, Gujarat&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-cyan-300">status:</span>{" "}
                    <span className="text-emerald-400 font-bold">&quot;Ready to ship 🚀&quot;</span>,
                  </p>
                  <p>&#125;;</p>
                </div>

                {/* Terminal Footer Quick Copy Action */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="text-emerald-400">$</span> npx devansh
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 rounded-md bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[10px] font-semibold text-slate-200 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <FaCheck className="text-emerald-400 text-[9px]" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FaCopy className="text-slate-400 text-[9px]" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 4-Column Directory Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-slate-200/70 dark:border-white/10">
          {/* Col 1: Identity & Live Vadodara Clock (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              className="group inline-flex items-center focus:outline-none"
              aria-label="Devansh Variya - Home"
            >
              {/* Single image, themed via CSS invert so both modes are covered */}
              <Image
                src="/devansh-logo-light.png"
                alt="Devansh Variya"
                width={220}
                height={26}
                className="h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] dark:invert"
              />
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-sm">
              Full Stack Developer building ultra-fast web apps, robust backend APIs, and intuitive AI-powered digital experiences.
            </p>

            {/* Live Location & Local Time Widget */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-2 text-xs font-medium text-slate-700 shadow-2xs dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <FaMapMarkerAlt className="text-[11px]" />
                  <span className="font-semibold">Vadodara, IN</span>
                </div>
                <span className="text-slate-300 dark:text-white/20">•</span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <FaClock className="text-[10px]" />
                  <span>{time || "IST (UTC+5:30)"}</span>
                </div>
              </div>

              {/* Creative Easter Egg: High-Five Button */}
              <button
                type="button"
                onClick={handleHighFive}
                className={`relative inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  hasHighFived
                    ? "border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "border-slate-200/90 bg-white/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20"
                }`}
                title="Leave a high-five for Devansh!"
              >
                <span className="text-sm">✋</span>
                <span>{sparkle ? "Thanks! 🎉" : "High-Five"}</span>
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                  {highFives}
                </span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Routes (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </p>
            <ul className="space-y-2 text-xs">
              {[
                { label: "Home", href: "/" },
                { label: "About Me", href: "/about" },
                { label: "Projects Showcase", href: "/projects" },
                { label: "Career Journey", href: "/experience" },
                { label: "Tech Blog", href: "/blog" },
                { label: "Let's Connect", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Featured Projects (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Featured Work
            </p>
            <ul className="space-y-2 text-xs">
              {[
                { label: "Internship Portal", href: "/projects/internship-portal" },
                { label: "TheLocator", href: "/projects/thelocator" },
                { label: "Vedoo Architect", href: "/projects/vedoo-architect" },
                { label: "Smart Billing Desk", href: "/projects/smart-billing-desk" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect & Resume (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Connect
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://github.com/devdevansh12"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <FaGithub className="text-sm" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/devansh-variya/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-[#0a66c2] dark:text-slate-400 dark:hover:text-[#0a66c2] transition-colors"
                >
                  <FaLinkedin className="text-sm text-[#0a66c2]" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/916355662753"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                >
                  <FaWhatsapp className="text-sm text-emerald-500" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="https://drive.google.com/file/d/1sHYK7WMQ61893vPnUmwrlczXs5veeUMs/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-2xs hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 transition-all"
                >
                  <FaDownload className="text-[10px] text-slate-400" />
                  <span>Download CV</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Giant Stylized Architectural Watermark */}
        <div className="relative my-6 select-none overflow-hidden text-center pointer-events-none">
          <p className="text-5xl sm:text-7xl md:text-[9.5rem] font-black tracking-tighter text-slate-900/[0.04] dark:text-white/[0.04] leading-none uppercase">
            Devansh Variya
          </p>
        </div>

        {/* 5. Bottom Bar: Copyright, System Status & Back-to-Top */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center sm:text-left">
            <span>© {year} Devansh Variya.</span>
            <span className="hidden sm:inline text-slate-300 dark:text-white/15">•</span>
            <span className="inline-flex items-center gap-1">
              Built with <FaHeart className="text-rose-500 text-[10px] inline" /> using Next.js & Tailwind CSS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </span>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-slate-300 hover:text-slate-950 hover:bg-slate-50 active:scale-90 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-white cursor-pointer shadow-2xs"
              title="Back to top"
            >
              <FaArrowUp className="text-[11px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
