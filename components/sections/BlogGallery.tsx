"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
  FaSearch,
  FaTag,
  FaStar,
} from "react-icons/fa";
import { BlogPost } from "@/data/blogs";

interface BlogGalleryProps {
  initialBlogs: BlogPost[];
}

export default function BlogGallery({ initialBlogs }: BlogGalleryProps) {
  const router = useRouter();
  const categories = useMemo(() => {
    const cats = Array.from(new Set(initialBlogs.map((b) => b.category)));
    return ["All Articles", ...cats];
  }, [initialBlogs]);

  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All Articles" || blog.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialBlogs, selectedCategory, searchQuery]);

  const featuredBlog = useMemo(() => {
    return initialBlogs.find((b) => b.featured) || initialBlogs[0];
  }, [initialBlogs]);

  const isFeaturedBannerVisible =
    selectedCategory === "All Articles" && !searchQuery && Boolean(featuredBlog);

  const gridBlogs = useMemo(() => {
    if (isFeaturedBannerVisible && featuredBlog) {
      return filteredBlogs.filter((b) => b.slug !== featuredBlog.slug);
    }
    return filteredBlogs;
  }, [filteredBlogs, isFeaturedBannerVisible, featuredBlog]);

  const handleCardClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="space-y-12">
      {/* ──── Search and Category Filters ──── */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${active
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 dark:bg-emerald-500 dark:text-slate-950 dark:shadow-emerald-500/20"
                    : "border border-slate-200/80 bg-white/80 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-slate-200"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search topics, tags, stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200/80 bg-white/80 py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-emerald-400"
          />
        </div>
      </div>

      {/* ──── Featured Blog Banner (Shown when no search/filter active) ──── */}
      {selectedCategory === "All Articles" && !searchQuery && featuredBlog && (
        <div
          onClick={() => handleCardClick(featuredBlog.slug)}
          className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.04] via-slate-50/80 to-cyan-500/[0.04] p-1 shadow-lg shadow-emerald-500/[0.03] transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/[0.08] dark:from-emerald-500/[0.08] dark:via-slate-900/60 dark:to-cyan-500/[0.08] dark:border-white/[0.12] dark:hover:border-emerald-500/30 cursor-pointer"
        >
          <div className="grid grid-cols-1 items-center gap-8 rounded-[22px] bg-white/70 p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-12 dark:bg-slate-950/70">
            {/* Image Preview */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl lg:col-span-6">
              <Image
                src={featuredBlog.coverImage}
                alt={featuredBlog.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-950 backdrop-blur-md shadow-sm">
                  <FaStar className="text-[10px]" /> Featured Article
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="flex flex-col justify-between space-y-4 lg:col-span-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    {featuredBlog.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-[11px]" />
                    {featuredBlog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaClock className="text-[11px]" />
                    {featuredBlog.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-black tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-emerald-600 sm:text-2xl lg:text-3xl dark:text-white dark:group-hover:text-emerald-400">
                  {featuredBlog.title}
                </h2>

                <p className="text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
                  {featuredBlog.excerpt}
                </p>
              </div>

              {/* Tags & Action */}
              <div className="pt-2">
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {featuredBlog.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200/80 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      <FaTag className="text-[8px] text-emerald-500" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-emerald-500/30">
                      <Image
                        src={featuredBlog.author.avatar}
                        alt={featuredBlog.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {featuredBlog.author.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {featuredBlog.author.role}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 transition-all duration-200 group-hover:translate-x-1 dark:text-emerald-400">
                    Read Article <FaArrowRight className="text-[11px]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──── Main Grid of Blogs ──── */}
      {gridBlogs.length === 0 ? (
        !isFeaturedBannerVisible && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-white/10">
            <FaSearch className="mb-3 text-2xl text-slate-400 dark:text-slate-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No articles found
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your search terms or filter selection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Articles");
                setSearchQuery("");
              }}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-slate-900 cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {gridBlogs.map((blog) => (
            <article
              key={blog.slug}
              onClick={() => handleCardClick(blog.slug)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/[0.06] dark:border-white/[0.08] dark:bg-slate-900/70 dark:hover:border-emerald-500/30 dark:hover:shadow-emerald-500/[0.08] cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Floating Category Badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  {/* Meta Bar */}
                  <div className="mb-3 flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[10px]" />
                      {blog.date}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-[10px]" />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-emerald-600 line-clamp-2 dark:text-white dark:group-hover:text-emerald-400">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Tags and Author Footer */}
                <div className="mt-6 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200/70 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 self-center">
                        +{blog.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 dark:border-white/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-6 w-6 overflow-hidden rounded-full border border-emerald-500/30">
                        <Image
                          src={blog.author.avatar}
                          alt={blog.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {blog.author.name}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 transition-transform duration-200 group-hover:translate-x-1 dark:text-emerald-400">
                      Read <FaArrowRight className="text-[10px]" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ──── Connect / Newsletter Card ──── */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 p-8 text-center sm:p-10 dark:border-white/10 dark:bg-slate-900/90">
        <div className="mx-auto max-w-xl space-y-4">
          <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Have Feedback or Ideas?
          </span>
          <h3 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            Discuss Architectures & Engineering Topics
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            I frequently write about engineering challenges, Next.js optimizations, and production systems. Feel free to connect or propose topics.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-slate-800 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 shadow-md"
            >
              Get in Touch <FaArrowRight className="text-[10px]" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Explore My Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
