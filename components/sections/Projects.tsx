"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaExternalLinkAlt, FaArrowRight, FaStar } from "react-icons/fa";
import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function Projects() {
  const router = useRouter();

  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't intercept if clicking an external link
    if (target.closest("a[data-external='true']")) {
      return;
    }
    router.push(`/projects/${slug}`);
  };

  return (
    <Section id="projects" className="py-20 sm:py-28">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 mb-3">
            Featured Work
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
            Selected Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Real-world applications engineered with modern frontend architectures, robust backend systems, and AI workflows.
          </p>
        </div>

        {/* Projects 2x2 Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              onClick={(e) => handleCardClick(p.slug, e)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-white/20 cursor-pointer"
            >
              {/* Image Banner */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 block">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-70" />

                {/* Highlight Tag */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-2xs dark:border-white/15 dark:bg-slate-900 dark:text-slate-200">
                  <FaStar className="text-[10px] text-amber-500" />
                  <span>{p.highlight}</span>
                </div>

                <div className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[11px] font-medium tracking-wider text-white">
                  0{i + 1}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="hover:underline focus:outline-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    {p.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {p.shortDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.techStack.frontend.concat(p.techStack.backend.slice(0, 2)).map((tag) => (
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
                <div className="mt-6 flex items-center gap-2.5 pt-4 border-t border-slate-100 dark:border-white/10">
                  <Link
                    href={`/projects/${p.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition-all duration-150 group-hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:group-hover:bg-slate-100"
                  >
                    <span>Details & Case Study</span>
                    <FaArrowRight className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>

                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-external="true"
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-20 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all duration-150 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-950 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 dark:hover:text-white"
                  >
                    <span>Live Site</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Link */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-800 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20"
          >
            <span>View All Projects in Dedicated Gallery</span>
            <FaArrowRight className="text-[11px] text-slate-400" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
