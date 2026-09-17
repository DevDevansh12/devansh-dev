"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaDownload,
  FaMapMarkerAlt,
  FaCode,
  FaRocket,
  FaBolt,
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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out, swap text, fade in — no Framer Motion needed
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 200);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      id="hero"
      className="relative flex min-h-[92vh] items-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
    >
      {/* Ambient floating glow orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="glow-orb-1 absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full opacity-[0.07] blur-[80px]"
          style={{ background: "radial-gradient(circle, #00bc87 0%, transparent 70%)" }}
        />
        <div
          className="glow-orb-2 absolute -bottom-32 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: "radial-gradient(circle, #00babc 0%, transparent 70%)" }}
        />
        <div
          className="glow-orb-1 absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03] blur-[60px]"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN — LCP content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Status Pill */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              </span>
              <span>Available for freelance &amp; full-time roles</span>
            </div>

            {/* Main Name & Title — LCP element, always visible */}
            <h1 className="animate-fade-in-up delay-100 mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Hi, I&apos;m{" "}
              <span className="text-shimmer">Devansh Variya.</span>
            </h1>

            {/* Role cycler — CSS opacity transition, no Framer Motion */}
            <div className="animate-fade-in-up delay-200 mt-3 flex items-center justify-center lg:justify-start h-9 sm:h-10 overflow-hidden">
              <span className="text-lg sm:text-2xl font-medium text-slate-500 dark:text-slate-400 mr-2">
                I&apos;m a
              </span>
              <span
                className="font-bold text-lg sm:text-2xl text-emerald-600 dark:text-emerald-400 transition-opacity duration-200"
                style={{ opacity: visible ? 1 : 0 }}
              >
                {roles[roleIndex]}
              </span>
            </div>

            {/* Description */}
            <p className="animate-fade-in-up delay-300 mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 mx-auto lg:mx-0">
              Full-Stack Developer specializing in high-performance web applications
              using React.js, Next.js, and Node.js. Proven track record of reducing
              manual operational workflows by 30% through practical OpenAI and Gemini
              AI integrations.
            </p>

            {/* Quick Stats Row */}
            <div className="animate-fade-in-up delay-400 mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {[
                { icon: FaCode, label: "3+ Apps Shipped", color: "text-violet-500" },
                { icon: FaRocket, label: "30% Workflow Boost", color: "text-cyan-500" },
                { icon: FaBolt, label: "99%+ Uptime", color: "text-amber-500" },
              ].map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="hero-stat-badge inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    <StatIcon className={`text-sm ${stat.color}`} />
                    <span>{stat.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Actions Bar */}
            <div className="animate-fade-in-up delay-500 mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:hover:shadow-white/10 cursor-pointer"
              >
                <span>Explore Work</span>
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/30 cursor-pointer"
              >
                Contact Me
              </a>

              <a
                href="https://drive.google.com/file/d/1sHYK7WMQ61893vPnUmwrlczXs5veeUMs/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/30 cursor-pointer"
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
                ].map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-all duration-200 hover:border-slate-400 hover:text-slate-900 hover:shadow-md active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
                    >
                      <IconComponent className="text-base" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — profile card */}
          <div className="lg:col-span-5 flex justify-center animate-slide-in-right delay-300">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              {/* Glow behind the card */}
              <div
                className="glow-orb-2 pointer-events-none absolute -inset-4 z-0 rounded-3xl opacity-[0.12] blur-2xl"
                style={{ background: "linear-gradient(135deg, #00bc87, #00babc, #6366f1)" }}
              />

              {/* Card */}
              <div className="gradient-border-spin relative z-10 rounded-3xl border border-slate-200/90 bg-white p-3 shadow-xl shadow-slate-200/60 dark:border-white/10 dark:bg-slate-900/90 dark:shadow-2xl dark:shadow-black/70">
                <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="/devansh-profile.png"
                    alt="Devansh Variya"
                    fill
                    priority
                    sizes="(max-width: 640px) 316px, (max-width: 1024px) 344px, 370px"
                    className="object-cover object-[center_18%]"
                  />
                  {/* Subtle gradient overlay at bottom of image */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent dark:from-slate-900/40" />
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
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
