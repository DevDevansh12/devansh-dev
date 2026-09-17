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
  FaHeart,
  FaChevronRight,
} from "react-icons/fa";

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
    } catch {
      // ignore
    }
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
      // ignore
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
    <footer className="relative border-t border-slate-200/80 bg-slate-50/50 dark:border-white/10 dark:bg-slate-950 transition-colors duration-300">
      {/* Subtle top gradient accent glow line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), rgba(6, 182, 212, 0.4), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-16 sm:pb-12">
        {/* Main 4-Column Directory Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-slate-200/80 dark:border-white/10">
          {/* Col 1: Identity & Location (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              className="group inline-flex items-center focus:outline-none"
              aria-label="Devansh Variya - Home"
            >
              {/* Light Mode Logo */}
              <Image
                src="/devansh-logo-light.png"
                alt="Devansh Variya"
                width={220}
                height={26}
                className="h-7 w-auto object-contain transition-all duration-200 group-hover:scale-[1.02] dark:hidden"
              />
              {/* Dark Mode Logo */}
              <Image
                src="/devansh-logo-dark.png"
                alt="Devansh Variya"
                width={220}
                height={26}
                className="hidden h-7 w-auto object-contain transition-all duration-200 group-hover:scale-[1.02] dark:block"
              />
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-sm">
              Full Stack Developer specializing in React, Next.js, Node.js, and TypeScript. Engineering scalable web applications, modern APIs, and clean digital experiences.
            </p>

            {/* Live Location & Local Time Widget */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-2xs dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
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

              {/* High-Five Interactive Button */}
              <button
                type="button"
                onClick={handleHighFive}
                className={`relative inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-150 cursor-pointer ${hasHighFived
                  ? "border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : "border-slate-200/90 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 shadow-2xs"
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

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </p>
            <ul className="space-y-2 text-xs">
              {[
                { label: "Home", href: "/" },
                { label: "About Me", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Experience", href: "/experience" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    <FaChevronRight className="text-[8px] text-slate-400/70" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Featured Projects (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Featured Projects
            </p>
            <ul className="space-y-2 text-xs">
              {[
                {
                  label: "Billing & Invoice Portal",
                  href: "/projects/invoice-management-portal",
                },
                {
                  label: "TheLocator Experience Platform",
                  href: "/projects/thelocator",
                },
                {
                  label: "Vedoo Architect",
                  href: "/projects/vedoo-architect",
                },
                {
                  label: "Corporate Consulting Website",
                  href: "/projects/corporate-consulting-website",
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    <FaChevronRight className="text-[8px] text-slate-400/70" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect & Contact (2 cols) */}
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
              <li>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  title="Click to copy email"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-xs text-emerald-500" />
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="text-xs text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </li>
              <li className="pt-1.5">
                <a
                  href="https://drive.google.com/file/d/1sHYK7WMQ61893vPnUmwrlczXs5veeUMs/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-2xs hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 transition-all"
                >
                  <FaDownload className="text-[10px] text-slate-400" />
                  <span>Download CV</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, System Status & Back-to-Top */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center sm:text-left">
            <span>© {year} Devansh Variya. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
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
