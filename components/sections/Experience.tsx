"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaDownload, FaArrowRight } from "react-icons/fa";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  logo?: string;
  tech: string[];
  points: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "MaMo TechnoLabs LLP",
    logo: "/companies/mamo-technolabs.png",
    period: "JAN 2026 — Present",
    type: "Work",
    tech: ["Next.js", "Node.js", "MongoDB", "Supabase", "OpenAI API", "Gemini AI"],
    points: [
      "Architected and shipped 3+ production-ready web applications using Next.js and Node.js in an agile environment.",
      "Integrated OpenAI and Gemini AI APIs to automate workflows, reducing manual client operational effort by 30%.",
      "Optimized Supabase and MongoDB database schemas, significantly improving query throughput and data retrieval speeds.",
      "Delivered 10+ scalable features across high-velocity sprint cycles with zero critical post-deployment issues.",
    ],
  },
  {
    role: "Associate Software Developer",
    company: "Getmeonline Internet Excellency",
    logo: "/companies/getmeonline.png",
    period: "MAR 2025 — DEC 2025",
    type: "Work",
    tech: ["React.js", "Node.js", "Microsoft Azure", "RESTful API", "MongoDB"],
    points: [
      "Engineered high-performance, responsive frontend interfaces with React.js, ensuring cross-browser reliability and smooth user experiences.",
      "Built resilient RESTful APIs with Node.js and MongoDB, strengthening data persistence and overall backend stability.",
      "Managed and monitored cloud infrastructure on Microsoft Azure, maintaining a 99%+ uptime record across production services.",
      "Partnered closely with UI/UX designers and engineering teams to deliver 5+ enterprise workflows ahead of deadlines.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Insanis Brain",
    period: "MAR 2024 — JUL 2024",
    type: "Work",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "Figma"],
    points: [
      "Developed full-stack features across the MERN stack (MongoDB, Express.js, React.js, Node.js), contributing to 2+ production releases.",
      "Investigated and resolved 10+ core software defects, dramatically improving application stability and reducing error rates.",
      "Translated Figma design specifications into pixel-perfect, accessible React components with Tailwind CSS.",
    ],
  },
];

const education = {
  degree: "B.Tech in Computer Science And Engineering",
  institution: "Parul University",
  logo: "/education/parul-university.png",
  period: "Graduated: 2020 – 2024",
  gpa: "GPA: 7.6 / 10",
  highlights:
    "Mastered core Computer Science & IT fundamentals: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Modern Web Architectures.",
};

export default function Experience({ isPage = false }: { isPage?: boolean }) {
  return (
    <Section id="experience" className="py-20 sm:py-28">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 mb-3">
            Career Journey
          </span>
          {isPage ? (
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              Experience
            </h1>
          ) : (
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              Experience & Education
            </h2>
          )}
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            A track record of engineering scalable full-stack applications and AI integrations across production environments.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Work Experience Timeline */}
          <div className="space-y-5">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-white/20"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    {exp.logo ? (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xs dark:border-white/15 dark:bg-white">
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={36}
                          height={36}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white">
                        <FaBriefcase className="text-sm" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <FaCalendarAlt className="text-slate-400 text-xs" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bullet Points */}
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {exp.points.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs dark:border-white/10 dark:bg-slate-900/80"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                {education.logo ? (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-2xs dark:border-white/15 dark:bg-white">
                    <Image
                      src={education.logo}
                      alt={`${education.institution} logo`}
                      width={36}
                      height={36}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white">
                    <FaGraduationCap className="text-base" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {education.degree}
                  </h3>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {education.institution}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 font-semibold">
                  {education.gpa}
                </span>
                <span>{education.period}</span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {education.highlights}
            </p>
          </motion.div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="https://drive.google.com/file/d/1sHYK7WMQ61893vPnUmwrlczXs5veeUMs/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-semibold text-white shadow-2xs transition-all duration-150 hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 cursor-pointer"
            >
              <FaDownload className="text-xs" />
              <span>Download Official Resume</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-800 shadow-2xs transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 cursor-pointer"
            >
              <span>Get In Touch</span>
              <FaArrowRight className="text-xs text-slate-400" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
