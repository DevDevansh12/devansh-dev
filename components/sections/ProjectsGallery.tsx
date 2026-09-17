"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaExternalLinkAlt, FaArrowRight, FaStar, FaCheckCircle } from "react-icons/fa";
import { Project } from "@/data/projects";

const categories = ["All Projects", "Full Stack", "AI & Automation", "Real-Time"];

interface ProjectsGalleryProps {
  initialProjects: Project[];
}

export default function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Projects");

  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a[data-external='true']")) {
      return;
    }
    router.push(`/projects/${slug}`);
  };

  const filteredProjects = initialProjects.filter((p) => {
    if (selectedCategory === "All Projects") return true;
    if (selectedCategory === "Full Stack") {
      // Match "Full Stack" in category string (handles "Full Stack / AI Web Application",
      // "Enterprise Administration Platform", etc.) or AI services present
      return (
        p.category.toLowerCase().includes("full stack") ||
        p.category.toLowerCase().includes("enterprise") ||
        p.category.toLowerCase().includes("commercial")
      );
    }
    if (selectedCategory === "AI & Automation") return p.category.includes("AI") || Boolean(p.techStack.aiServices && p.techStack.aiServices.length > 0);
    if (selectedCategory === "Real-Time") return p.tags.some((t) => t.includes("Real-Time") || t.includes("Leaflet") || t.includes("WebSockets"));
    return true;
  });

  return (
    <>
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-150 cursor-pointer ${
              selectedCategory === cat
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xs"
                : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {filteredProjects.map((p, idx) => (
          <div
            key={p.slug}
            onClick={(e) => handleCardClick(p.slug, e)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-white/20 cursor-pointer"
          >
            {/* Image Preview with click to case study */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 block">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-70" />

              {/* Highlight Badge */}
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-2xs dark:border-white/15 dark:bg-slate-900 dark:text-slate-200">
                <FaStar className="text-[10px] text-amber-500" />
                <span>{p.highlight}</span>
              </div>

              <div className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[11px] font-medium tracking-wider text-white">
                0{idx + 1}
              </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {p.category}
                  </span>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    {p.timeline}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="hover:underline focus:outline-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {p.title}
                  </Link>
                </h2>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                  {p.subtitle}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {p.shortDescription}
                </p>

                {/* Key Features Preview */}
                <div className="mt-4 space-y-1.5">
                  {p.features.slice(0, 2).map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <FaCheckCircle className="mt-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="line-clamp-1">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5 pt-4 border-t border-slate-100 dark:border-white/10">
                <Link
                  href={`/projects/${p.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition-all duration-150 group-hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:group-hover:bg-slate-100"
                >
                  <span>Read Case Study</span>
                  <FaArrowRight className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>

                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-external="true"
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-20 inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 active:scale-[0.98] dark:border-white/15 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:border-white/30 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <span>Live Site</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
