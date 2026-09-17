"use client";

import { useState, useEffect } from "react";
import {
  FaCopy,
  FaCheck,
  FaTwitter,
  FaLinkedin,
  FaShareAlt,
  FaListUl,
  FaArrowUp,
  FaChevronDown,
} from "react-icons/fa";

export function BlogCodeBlock({
  language,
  filename,
  code,
}: {
  language: string;
  filename?: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 shadow-xl shadow-black/20">
      {/* Code Window Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
        <div className="flex items-center gap-2">
          {/* Mac-style window dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {filename && (
            <span className="ml-2 font-mono text-[11px] text-slate-400 font-medium">
              {filename}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
            className="flex items-center gap-1.5 rounded-md border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-700 hover:text-white cursor-pointer"
          >
            {copied ? (
              <>
                <FaCheck className="text-[10px] text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <FaCopy className="text-[10px]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto p-4 sm:p-5 font-mono text-xs leading-relaxed text-slate-200">
        <pre className="selection:bg-emerald-500/30 selection:text-emerald-200">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function BlogShareButtons({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://devanshvariya.com/blog/${slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `Check out "${title}" by @devanshvariya\n\n${shareUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
        <FaShareAlt className="text-[10px]" /> Share:
      </span>

      <button
        type="button"
        onClick={shareOnTwitter}
        aria-label="Share on X / Twitter"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-white cursor-pointer"
      >
        <FaTwitter className="text-xs" />
      </button>

      <button
        type="button"
        onClick={shareOnLinkedIn}
        aria-label="Share on LinkedIn"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-white cursor-pointer"
      >
        <FaLinkedin className="text-xs" />
      </button>

      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="Copy link to clipboard"
        className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
          copied
            ? "border-emerald-500/40 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            : "border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-white"
        }`}
      >
        {copied ? (
          <>
            <FaCheck className="text-[10px]" />
            <span>Link Copied!</span>
          </>
        ) : (
          <>
            <FaCopy className="text-[10px]" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}

export function BlogTableOfContents({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10 mb-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
            <FaListUl className="text-xs" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Table of Contents
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
          {items.length} items
        </span>
      </div>

      {/* Navigation List */}
      <nav className="max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 space-y-1 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`group flex items-start gap-2 py-1.5 px-2.5 rounded-lg text-xs leading-relaxed transition-all duration-150 ${
                isActive
                  ? "bg-emerald-500/10 font-bold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 border-l-2 border-emerald-500"
                  : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200 font-medium"
              }`}
            >
              <span className="truncate">{item.title}</span>
            </a>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <FaArrowUp className="text-[9px]" />
          <span>Back to Top</span>
        </button>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          Quick Nav
        </span>
      </div>
    </div>
  );
}

export function MobileTableOfContents({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
            <FaListUl className="text-xs" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Table of Contents
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            ({items.length} sections)
          </span>
        </div>
        <FaChevronDown
          className={`text-xs text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-emerald-500" : ""
          }`}
        />
      </button>

      {isOpen && (
        <nav className="mt-3 pt-3 border-t border-slate-100 dark:border-white/10 max-h-72 overflow-y-auto pr-1 space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="block py-1.5 px-2.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100/70 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-emerald-400 transition-colors"
            >
              {item.title}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
