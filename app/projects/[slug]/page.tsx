import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaExternalLinkAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaCogs,
  FaLayerGroup,
  FaChartLine,
  FaStar,
} from "react-icons/fa";
import { projects, getProjectBySlug } from "@/data/projects";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Devansh Variya",
    };
  }

  return {
    title: `${project.title} — Case Study | Devansh Variya`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Section className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <Container>
        {/* Breadcrumb & Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to All Projects</span>
          </Link>

          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            {project.category}
          </span>
        </div>

        {/* Project Header */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            {project.title}
          </h1>
          <p className="mt-3 text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {project.subtitle}
          </p>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {project.shortDescription}
          </p>

          {/* Metadata Row & Primary Action */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-slate-200/80 py-5 dark:border-white/10">
            <div>
              <span className="block text-[11px] font-bold uppercase text-slate-400">My Role</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{project.role}</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 mx-2 hidden sm:block" />
            <div>
              <span className="block text-[11px] font-bold uppercase text-slate-400">Timeline</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{project.timeline}</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 mx-2 hidden sm:block" />
            <div>
              <span className="block text-[11px] font-bold uppercase text-slate-400">Highlight</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{project.highlight}</span>
            </div>

            <div className="sm:ml-auto">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition-all duration-150 hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <span>Launch Live Site</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Browser Mockup Screenshot Frame */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100/80 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
          {/* Window Chrome Header */}
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="mx-auto rounded-lg border border-slate-200 bg-white/70 px-4 py-1 text-xs font-mono text-slate-500 dark:border-white/10 dark:bg-black/40 dark:text-slate-400 max-w-md w-full text-center truncate">
              {project.liveUrl}
            </div>
          </div>

          <div className="relative h-[340px] sm:h-[480px] lg:h-[580px] w-full bg-slate-950">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Impact Metrics (if available) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.metrics.map((m, mIdx) => (
              <div
                key={mIdx}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-white/10 dark:bg-slate-900/80"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <FaChartLine className="text-sm" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {m}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Deep Dive Grid */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Narrative Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                Project Overview
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {project.fullDescription}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 text-lg" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Key Features & Business Logic
                </h2>
              </div>
              <div className="space-y-3">
                {project.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-white/10 dark:bg-slate-900/60"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200 text-xs font-bold">
                      {fIdx + 1}
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Highlights */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaCogs className="text-slate-700 dark:text-slate-300 text-lg" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Architecture & Engineering Decisions
                </h2>
              </div>
              <div className="space-y-3">
                {project.technicalHighlights.map((th, thIdx) => (
                  <div
                    key={thIdx}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-white/10 dark:bg-slate-900/60"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {th}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Tech Stack Breakdown */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-slate-900/80">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-white/10 mb-5">
                <FaLayerGroup className="text-slate-700 dark:text-slate-300 text-base" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Technology Stack
                </h3>
              </div>

              {/* Frontend */}
              <div className="mb-4">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Frontend
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.frontend.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="mb-4">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Backend & APIs
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.backend.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database & Cloud */}
              <div className="mb-4">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Database & Cloud
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.databaseCloud.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Services if any */}
              {project.techStack.aiServices && project.techStack.aiServices.length > 0 && (
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                    AI & Intelligence
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.aiServices.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Project CTA Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-slate-900/80 text-center">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Interested in this solution?
              </h4>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                Let&apos;s discuss how similar AI workflows or full-stack architectures can be developed for your team.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-2xs"
              >
                Discuss a Project
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
