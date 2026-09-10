
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState("");

  // Current clock
  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();

    const clock = setInterval(updateClock, 1000);

    return () => clearInterval(clock);
  }, []);

  // Loading progress
  useEffect(() => {
    const duration = 2800;
    const intervalTime = 25;
    const totalSteps = duration / intervalTime;
    const increment = 100 / totalSteps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setLoading(false);
          }, 700);
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const percentage = Math.round(progress);

  const loadingText =
    percentage < 25
      ? "INITIALIZING"
      : percentage < 50
      ? "LOADING ASSETS"
      : percentage < 75
      ? "BUILDING EXPERIENCE"
      : percentage < 100
      ? "ALMOST READY"
      : "WELCOME";

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed inset-0 z-[99999]
            flex items-center justify-center
            overflow-hidden
            bg-[#020617]
            text-white
          "
        >
          {/* ================= BACKGROUND ================= */}

          <div className="absolute inset-0 overflow-hidden">

            {/* Main glow */}

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.08, 0.18, 0.08],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute left-1/2 top-1/2
                h-[500px] w-[500px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-cyan-500
                blur-[160px]
              "
            />

            {/* Cyan glow */}

            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -80, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute left-[5%] top-[15%]
                h-72 w-72
                rounded-full
                bg-cyan-500/10
                blur-[110px]
              "
            />

            {/* Purple glow */}

            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 80, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute bottom-[5%] right-[5%]
                h-80 w-80
                rounded-full
                bg-purple-500/10
                blur-[120px]
              "
            />

            {/* Grid */}

            <div
              className="
                absolute inset-0
                opacity-[0.035]
                [bg-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
                [bg-size:45px_45px]
              "
            />

            {/* Moving scan light */}

            <motion.div
              animate={{
                y: ["-120%", "220%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute left-0 top-0
                h-40 w-full
                bg-linear-to-b
                from-transparent
                via-cyan-400/[0.04]
                to-transparent
                blur-2xl
              "
            />
          </div>

          {/* ================= CONTENT ================= */}

          <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-6">

            {/* Developer Label */}

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                mb-8
                flex items-center gap-3
                font-mono
                text-[10px]
                uppercase
                tracking-[0.4em]
                text-white/40
              "
            >
              <span className="h-px w-8 bg-cyan-400/50" />

              PORTFOLIO

              <span className="h-px w-8 bg-purple-400/50" />
            </motion.div>

            {/* ================= CIRCULAR LOADER ================= */}

            <div className="relative flex h-48 w-48 items-center justify-center">

              {/* Outer rotating ring */}

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute inset-0
                  rounded-full
                  border
                  border-transparent
                  border-t-cyan-400
                  border-r-blue-500
                "
              />

              {/* Second rotating ring */}

              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute inset-4
                  rounded-full
                  border
                  border-transparent
                  border-b-purple-500
                  border-l-cyan-400
                "
              />

              {/* Progress circle */}

              <svg
                className="absolute inset-5 h-[calc(100%-40px)] w-[calc(100%-40px)] -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                />

                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="282.7"
                  animate={{
                    strokeDashoffset:
                      282.7 - (282.7 * progress) / 100,
                  }}
                  transition={{
                    duration: 0.15,
                    ease: "linear",
                  }}
                />

                <defs>
                  <linearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center */}

              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  flex h-28 w-28
                  flex-col
                  items-center
                  justify-center
                  rounded-full
                  border border-white/10
                  bg-white/[0.04]
                  backdrop-blur-xl
                  shadow-[0_0_60px_rgba(34,211,238,0.12)]
                "
              >
                <span
                  className="
                    bg-linear-to-r
                    from-cyan-400
                    via-blue-400
                    to-purple-500
                    bg-clip-text
                    font-mono
                    text-4xl
                    font-black
                    tabular-nums
                    text-transparent
                  "
                >
                  {percentage}
                </span>

                <span className="font-mono text-[9px] tracking-[0.3em] text-white/40">
                  PERCENT
                </span>
              </motion.div>
            </div>

            {/* ================= OFFICIAL LOGO ================= */}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.7,
              }}
              className="mt-8 flex justify-center"
            >
              <Image
                src="/devansh-logo-dark.png"
                alt="Devansh Variya"
                width={260}
                height={32}
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_25px_rgba(30,199,159,0.25)]"
                priority
              />
            </motion.div>

            {/* Developer */}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="
                mt-2
                font-mono
                text-[10px]
                font-medium
                uppercase
                tracking-[0.35em]
                text-white/35
              "
            >
              Full Stack Developer
            </motion.p>

            {/* ================= STATUS ================= */}

            <div className="mt-10 w-full">

              <div className="mb-3 flex items-center justify-between">

                <motion.span
                  key={loadingText}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="
                    font-mono
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-white/50
                  "
                >
                  {loadingText}
                </motion.span>

                <span className="font-mono text-[10px] text-white/30">
                  {percentage.toString().padStart(3, "0")}%
                </span>

              </div>

              {/* Progress bar */}

              <div
                className="
                  relative
                  h-1.5
                  w-full
                  overflow-hidden
                  rounded-full
                  bg-white/[0.06]
                "
              >
                <motion.div
                  className="
                    relative
                    h-full
                    rounded-full
                    bg-linear-to-r
                    from-cyan-400
                    via-blue-500
                    to-purple-500
                    shadow-[0_0_20px_rgba(34,211,238,0.5)]
                  "
                  style={{
                    width: `${progress}%`,
                  }}
                >

                  {/* Moving shine */}

                  <motion.div
                    animate={{
                      x: ["-100%", "500%"],
                    }}
                    transition={{
                      duration: 1.3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      absolute
                      inset-y-0
                      w-16
                      bg-white/60
                      blur-md
                    "
                  />

                </motion.div>
              </div>
            </div>

            {/* ================= FOOTER ================= */}

            <div className="mt-7 flex w-full items-center justify-between">

              {/* Status */}

              <div className="flex items-center gap-2">

                <motion.span
                  animate={{
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_10px_#34d399]
                  "
                />

                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                  System Online
                </span>

              </div>

              {/* Current Time */}

              <div className="font-mono text-[10px] tabular-nums text-white/30">
                {time}
              </div>
            </div>

            {/* Bottom Accent */}

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{
                delay: 0.6,
                duration: 0.8,
              }}
              className="
                mt-8
                h-px
                bg-linear-to-r
                from-transparent
                via-cyan-400
                to-transparent
              "
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
