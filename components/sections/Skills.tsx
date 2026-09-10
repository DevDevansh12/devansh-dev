"use client";

import { Icon } from "@iconify/react";
import { useAnimationControls, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const marqueeSkills = [
  { title: "React.js", icon: "logos:react" },
  { title: "Next.js", icon: "devicon:nextjs" },
  { title: "Node.js", icon: "logos:nodejs-icon" },
  { title: "OpenAI API", icon: "logos:openai-icon" },
  { title: "Gemini AI", icon: "logos:google-gemini" },
  { title: "TypeScript", icon: "logos:typescript-icon" },
  { title: "MongoDB", icon: "logos:mongodb-icon" },
  { title: "Supabase", icon: "logos:supabase-icon" },
  { title: "PostgreSQL", icon: "logos:postgresql" },
  { title: "Microsoft Azure", icon: "logos:azure-icon" },
  { title: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
  { title: "Redux", icon: "logos:redux" },
  { title: "Express.js", icon: "simple-icons:express" },
  { title: "Git & GitHub", icon: "logos:github-icon" },
];

const categories = [
  {
    title: "Frontend Engineering",
    description: "Building responsive, modern, accessible UIs with component-driven architecture and state management.",
    skills: [
      { name: "React.js", icon: "logos:react" },
      { name: "Next.js", icon: "devicon:nextjs" },
      { name: "Redux", icon: "logos:redux" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "HTML5 / CSS3", icon: "logos:html-5" },
      { name: "Figma", icon: "logos:figma" },
    ],
  },
  {
    title: "Backend & Cloud Systems",
    description: "Designing scalable RESTful APIs, auth pipelines, and cloud monitoring across production services.",
    skills: [
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Express.js", icon: "simple-icons:express" },
      { name: "RESTful APIs", icon: "carbon:api" },
      { name: "Microsoft Azure", icon: "logos:azure-icon" },
      { name: "Vercel", icon: "logos:vercel-icon" },
      { name: "Razorpay Gateway", icon: "simple-icons:razorpay" },
    ],
  },
  {
    title: "AI & Databases",
    description: "Integrating intelligent models (OpenAI, Gemini) and managing robust relational and NoSQL schemas.",
    skills: [
      { name: "OpenAI API", icon: "logos:openai-icon" },
      { name: "Gemini AI", icon: "logos:google-gemini" },
      { name: "MongoDB", icon: "logos:mongodb-icon" },
      { name: "Supabase", icon: "logos:supabase-icon" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "Git & GitHub", icon: "logos:github-icon" },
    ],
  },
];

const loopedSkills = [...marqueeSkills, ...marqueeSkills];

export default function Skills() {
  const controls = useAnimationControls();
  const sectionRef = useRef<HTMLElement>(null);

  const startSliding = useCallback(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: { duration: 25, repeat: Infinity, ease: "linear" },
    });
  }, [controls]);

  const pauseSliding = useCallback(() => controls.stop(), [controls]);
  const resumeSliding = useCallback(() => startSliding(), [startSliding]);

  useEffect(() => {
    startSliding();
  }, [startSliding]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startSliding();
        else controls.stop();
      },
      { threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [controls, startSliding]);

  return (
    <Section ref={sectionRef} id="skills" className="py-20 sm:py-28">
      <Container>
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 mb-3">
            Technical Stack
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
            Skills & Competencies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            A comprehensive toolset spanning modern frontend frameworks, backend microservices, AI integrations, and cloud platforms.
          </p>
        </div>

        {/* Infinite Icon Marquee */}
        <div className="relative mx-auto mb-16 w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white py-6 shadow-xs dark:border-white/10 dark:bg-slate-900/60">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-background to-transparent" />

          <motion.div
            className="flex w-max gap-8 sm:gap-12"
            animate={controls}
          >
            {loopedSkills.map((skill, index) => (
              <div
                key={`${skill.title}-${index}`}
                onMouseEnter={pauseSliding}
                onMouseLeave={resumeSliding}
                className="group flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
              >
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-2xs transition-all duration-200 group-hover:border-slate-300 group-hover:shadow-xs dark:border-white/10 dark:bg-slate-800">
                  <Icon icon={skill.icon} className="text-2xl sm:text-3xl" />
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {skill.title}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-white/20"
            >
              <div>
                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-800 dark:bg-white/10 dark:text-white">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  {cat.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-white/10">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    <Icon icon={s.icon} className="text-xs" />
                    <span>{s.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
