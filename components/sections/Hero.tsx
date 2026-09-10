"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaDownload,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const roles = [
  "Full Stack Developer",
  "Next.js & React Engineer",
  "MERN Stack Specialist",
  "Modern UI/UX Designer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      id="hero"
      className="relative flex min-h-[85vh] items-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Bio & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              </span>
              <span>Available for freelance & full-time roles</span>
            </div>

            {/* Main Name & Title */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Hi, I&apos;m Devansh Variya.
            </h1>

            {/* Role cycler */}
            <div className="mt-3 flex items-center justify-center lg:justify-start h-9 sm:h-10 overflow-hidden">
              <span className="text-lg sm:text-2xl font-medium text-slate-500 dark:text-slate-400 mr-2">
                I&apos;m a
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="font-bold text-lg sm:text-2xl text-emerald-600 dark:text-emerald-400"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Description */}
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 mx-auto lg:mx-0">
              Full-Stack Developer specializing in high-performance web applications using React.js, Next.js, and Node.js. Proven track record of reducing manual operational workflows by 30% through practical OpenAI and Gemini AI integrations.
            </p>

            {/* Actions Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 cursor-pointer"
              >
                <span>Explore Work</span>
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-xs transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/30 cursor-pointer"
              >
                Contact Me
              </a>

              <a
                href="https://drive.google.com/file/d/1sHYK7WMQ61893vPnUmwrlczXs5veeUMs/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/30 cursor-pointer"
                title="View & Download Resume"
              >
                <FaDownload className="text-xs text-slate-400" />
                <span>Resume</span>
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-2 ml-1">
                {[
                  { icon: FaGithub, href: "https://github.com/devdevansh12", label: "GitHub" },
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/devansh-variya/", label: "LinkedIn" },
                ].map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-xs transition-all hover:border-slate-400 hover:text-slate-900 active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
                    >
                      <IconComponent className="text-base" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Crafted Profile Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-3xl border border-slate-200/90 bg-white p-3 shadow-xl shadow-slate-200/60 dark:border-white/10 dark:bg-slate-900/90 dark:shadow-2xl dark:shadow-black/70">
              <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                <Image
                  src="/devansh-profile.jpg"
                  alt="Devansh Variya"
                  fill
                  priority
                  sizes="(max-width: 640px) 340px, 370px"
                  className="object-cover object-[center_18%] transition-transform duration-500 hover:scale-102"
                />
              </div>

              {/* Integrated Profile Metadata */}
              <div className="mt-3.5 flex items-center justify-between px-2 pb-1">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Devansh Variya
                  </h2>
                  <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <FaMapMarkerAlt className="text-emerald-500 text-[10px]" />
                    <span>Vadodara, Gujarat</span>
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Verified Engineer</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
