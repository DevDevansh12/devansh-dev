import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaLightbulb,
  FaCheckCircle,
  FaArrowRight,
  FaBookOpen,
} from "react-icons/fa";
import { blogs, getBlogBySlug, getRelatedBlogs } from "@/data/blogs";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import {
  BlogCodeBlock,
  BlogShareButtons,
} from "@/components/sections/BlogDetailInteractive";

export async function generateStaticParams() {
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Devansh Variya",
      description: "The requested article does not exist.",
    };
  }

  const title = blog.metaTitle || `${blog.title} | Devansh Variya`;
  const description = blog.metaDescription || blog.excerpt;
  const canonicalUrl = `https://devanshvariya.com/blog/${blog.slug}`;
  const imageUrl = blog.coverImage.startsWith("/")
    ? `https://devanshvariya.com${blog.coverImage}`
    : blog.coverImage;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      publishedTime: blog.publishedTime,
      authors: ["Devansh Variya"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.headline || blog.title,
        },
      ],
      siteName: "Devansh Variya",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-emerald-600 dark:bg-white/10 dark:text-emerald-400"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog.slug, 2);

  // Find prev/next
  const currentIndex = blogs.findIndex((b) => b.slug === blog.slug);
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://devanshvariya.com/blog/${blog.slug}#blogpost`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://devanshvariya.com/blog/${blog.slug}`,
    },
    headline:
      blog.headline ||
      "Building a Production-Ready Full-Stack Application with Next.js, TypeScript and Node.js",
    description: blog.metaDescription || blog.excerpt,
    image: [
      blog.coverImage.startsWith("/")
        ? `https://devanshvariya.com${blog.coverImage}`
        : blog.coverImage,
    ],
    author: {
      "@type": "Person",
      name: "Devansh Variya",
      url: "https://devanshvariya.com/",
    },
    publisher: {
      "@type": "Person",
      name: "Devansh Variya",
      url: "https://devanshvariya.com/",
    },
    datePublished: blog.publishedTime,
    dateModified: blog.dateModified || blog.publishedTime,
    articleSection: "Full Stack Development",
    keywords: blog.tags,
    inLanguage: "en",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://devanshvariya.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://devanshvariya.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `https://devanshvariya.com/blog/${blog.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* ──── Back to Blog Link ──── */}
            <div className="mb-8">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:bg-slate-50 hover:text-emerald-600 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-emerald-500/30 dark:hover:text-emerald-400"
              >
                <FaArrowLeft className="text-[10px] transition-transform duration-200 group-hover:-translate-x-1" />
                <span>Back to all articles</span>
              </Link>
            </div>

            {/* ──── Header Meta & Title ──── */}
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-emerald-600 dark:text-emerald-400">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <FaCalendarAlt className="text-[11px]" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <FaClock className="text-[11px]" />
                  {blog.readTime}
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
                {blog.title}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {blog.subtitle}
              </p>

              {/* ──── Author Bar & Share ──── */}
              <div className="flex flex-col gap-4 border-y border-slate-200/80 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-emerald-500/40">
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {blog.author.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {blog.author.role} • Cloud & AI Systems
                    </p>
                  </div>
                </div>

                <BlogShareButtons title={blog.title} slug={blog.slug} />
              </div>
            </header>

            {/* ──── Hero Cover Image ──── */}
            <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200/80 shadow-2xl dark:border-white/10 dark:shadow-black/40">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>

            {/* ──── Executive Summary Callout ──── */}
            <div className="my-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 backdrop-blur-sm sm:p-7 dark:bg-emerald-500/[0.06]">
              <div className="flex items-start gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <FaBookOpen className="text-xs" />
                </span>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Executive Overview
                  </h2>
                  <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
                    {blog.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* ──── Table of Contents ──── */}
            {blog.tableOfContents.length > 0 && (
              <div className="my-8 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-6 dark:border-white/10 dark:bg-slate-900/50">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Table of Contents
                </p>
                <ul className="mt-3 space-y-2">
                  {blog.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-xs sm:text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors dark:text-slate-400 dark:hover:text-emerald-400"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ──── Article Body Content ──── */}
            <div className="space-y-12">
              {blog.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 space-y-4"
                >
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {section.title}
                  </h2>

                  {section.blocks ? (
                    <div className="space-y-4">
                      {section.blocks.map((block, bIdx) => {
                        if (block.type === "paragraph") {
                          return (
                            <p
                              key={bIdx}
                              className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300"
                            >
                              {renderFormattedText(block.text)}
                            </p>
                          );
                        }

                        if (block.type === "subheading") {
                          return (
                            <h3
                              key={bIdx}
                              className="pt-3 text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-white flex items-center gap-2"
                            >
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              {block.text}
                            </h3>
                          );
                        }

                        if (block.type === "quote") {
                          return (
                            <blockquote
                              key={bIdx}
                              className="my-3 rounded-xl border-l-4 border-emerald-500 bg-emerald-500/[0.05] p-4 text-sm font-medium italic text-slate-700 sm:text-base dark:bg-emerald-500/[0.08] dark:text-slate-200"
                            >
                              &ldquo;{block.text}&rdquo;
                            </blockquote>
                          );
                        }

                        if (block.type === "list") {
                          return (
                            <ul key={bIdx} className="my-2 space-y-2">
                              {block.items.map((item, iIdx) => (
                                <li
                                  key={iIdx}
                                  className="flex items-start gap-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                  <span>{renderFormattedText(item)}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }

                        if (block.type === "code") {
                          return (
                            <BlogCodeBlock
                              key={bIdx}
                              language={block.language}
                              filename={block.filename}
                              code={block.code}
                            />
                          );
                        }

                        if (block.type === "callout") {
                          return (
                            <div
                              key={bIdx}
                              className="my-5 rounded-xl border border-cyan-500/30 bg-cyan-500/[0.04] p-4 sm:p-5 dark:bg-cyan-500/[0.06]"
                            >
                              <div className="flex items-start gap-3">
                                <FaLightbulb className="mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                                <div className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                  {block.title && (
                                    <strong className="font-semibold text-cyan-700 dark:text-cyan-300">
                                      {block.title}:{" "}
                                    </strong>
                                  )}
                                  {block.text}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        if (block.type === "keyTakeaways") {
                          return (
                            <div
                              key={bIdx}
                              className="my-5 space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 dark:border-white/10 dark:bg-slate-900/40"
                            >
                              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                                Key Takeaways
                              </p>
                              {block.items.map((takeaway, tIdx) => (
                                <div
                                  key={tIdx}
                                  className="flex items-start gap-2.5"
                                >
                                  <FaCheckCircle className="mt-1 shrink-0 text-[11px] text-emerald-500" />
                                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                    {renderFormattedText(takeaway)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>
                  ) : (
                    <>
                      {section.content?.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300"
                        >
                          {renderFormattedText(paragraph)}
                        </p>
                      ))}

                      {section.codeSnippet && (
                        <BlogCodeBlock
                          language={section.codeSnippet.language}
                          filename={section.codeSnippet.filename}
                          code={section.codeSnippet.code}
                        />
                      )}

                      {section.tip && (
                        <div className="my-5 rounded-xl border border-cyan-500/30 bg-cyan-500/[0.04] p-4 sm:p-5 dark:bg-cyan-500/[0.06]">
                          <div className="flex items-start gap-3">
                            <FaLightbulb className="mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                            <div className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                              <strong className="font-semibold text-cyan-700 dark:text-cyan-300">
                                Engineering Note:{" "}
                              </strong>
                              {section.tip}
                            </div>
                          </div>
                        </div>
                      )}

                      {section.keyTakeaways && (
                        <div className="my-5 space-y-2 rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 dark:border-white/10 dark:bg-slate-900/40">
                          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                            Key Architecture Takeaways
                          </p>
                          {section.keyTakeaways.map((takeaway, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-2.5">
                              <FaCheckCircle className="mt-1 shrink-0 text-[11px] text-emerald-500" />
                              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                {takeaway}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </section>
              ))}
            </div>

            {/* ──── Tags & Share Footer ──── */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-white/10 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2">
                  Tagged with:
                </span>
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100/70 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    <FaTag className="text-[9px] text-emerald-500" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7 dark:border-white/10 dark:bg-slate-900/70">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-500/40 shadow-md">
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Written by {blog.author.name}
                      </h3>
                      <Link
                        href="/about"
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        View Full Bio & Skills &rarr;
                      </Link>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      Devansh is a Full Stack Developer focused on building modern web applications using React, Next.js, TypeScript, Node.js and AI technologies. He enjoys working on SaaS products, AI-powered applications, dashboards, APIs and scalable web experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* ──── Previous / Next Post Navigation ──── */}
              {(prevBlog || nextBlog) && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                  {prevBlog ? (
                    <Link
                      href={`/blog/${prevBlog.slug}`}
                      className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 transition-all hover:border-emerald-500/40 hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-emerald-500/30"
                    >
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-emerald-400">
                        <FaArrowLeft className="text-[9px]" /> Previous Article
                      </span>
                      <span className="mt-2 text-xs font-bold text-slate-800 line-clamp-2 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        {prevBlog.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {nextBlog && (
                    <Link
                      href={`/blog/${nextBlog.slug}`}
                      className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 text-right transition-all hover:border-emerald-500/40 hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-emerald-500/30"
                    >
                      <span className="inline-flex items-center justify-end gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-emerald-400">
                        Next Article <FaArrowRight className="text-[9px]" />
                      </span>
                      <span className="mt-2 text-xs font-bold text-slate-800 line-clamp-2 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        {nextBlog.title}
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* ──── Related Articles ──── */}
            {relatedBlogs.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-200/80 dark:border-white/10">
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                  Related Technical Reads
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedBlogs.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-emerald-500/30"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={rel.coverImage}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5 flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                            <span>{rel.category}</span>
                            <span>•</span>
                            <span>{rel.readTime}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-emerald-600 line-clamp-2 dark:text-white dark:group-hover:text-emerald-400">
                            {rel.title}
                          </h4>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          Read Now <FaArrowRight className="text-[10px]" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </article>
    </>
  );
}
