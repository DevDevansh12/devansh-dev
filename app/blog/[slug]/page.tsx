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
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { blogs, getBlogBySlug, getRelatedBlogs } from "@/data/blogs";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import {
  BlogCodeBlock,
  BlogShareButtons,
  BlogTableOfContents,
  MobileTableOfContents,
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
  const canonicalUrl = blog.canonicalUrl || `https://www.devanshvariya.com/blog/${blog.slug}`;
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
  const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const [, label, url] = match;
        const isExternal = url.startsWith("http://") || url.startsWith("https://");
        if (isExternal) {
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-600 underline decoration-emerald-500/40 underline-offset-2 transition-colors hover:text-emerald-500 hover:decoration-emerald-500 dark:text-emerald-400 dark:decoration-emerald-400/40 dark:hover:text-emerald-300"
            >
              <span>{label}</span>
              <FaExternalLinkAlt className="text-[9px] opacity-70" />
            </a>
          );
        }
        return (
          <Link
            key={i}
            href={url}
            className="font-semibold text-emerald-600 underline decoration-emerald-500/40 underline-offset-2 transition-colors hover:text-emerald-500 hover:decoration-emerald-500 dark:text-emerald-400 dark:decoration-emerald-400/40 dark:hover:text-emerald-300"
          >
            {label}
          </Link>
        );
      }
    }
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
    articleSection: blog.category,
    keywords: blog.tags,
    inLanguage: "en",
  };

  const faqJsonLd = blog.faq && blog.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://devanshvariya.com/blog/${blog.slug}#faq`,
    mainEntity: blog.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <Container className="max-w-5xl">
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
          <header className="space-y-5">
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

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white leading-[1.15]">
              {blog.title}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
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
          <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xl dark:border-white/10 dark:shadow-black/40">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          {/* ──── Main Content & Side Table of Contents ──── */}
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-12 items-start">
            {/* Mobile Collapsible TOC */}
            {blog.tableOfContents.length > 0 && (
              <div className="lg:hidden col-span-1">
                <MobileTableOfContents items={blog.tableOfContents} />
              </div>
            )}

            {/* Left Column: Article Body Content */}
            <div className="lg:col-span-8 min-w-0">
              {/* ──── Executive Summary Callout ──── */}
              <div className="mb-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 backdrop-blur-sm sm:p-7 dark:bg-emerald-500/[0.06]">
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
                            const trimmed = block.text.trim().replace(/^["“]|["”]$/g, "").trim();
                            return (
                              <blockquote
                                key={bIdx}
                                className="my-3.5 rounded-xl border-l-4 border-emerald-500 bg-emerald-500/[0.05] p-4 text-sm font-medium italic text-slate-700 sm:text-base dark:bg-emerald-500/[0.08] dark:text-slate-200"
                              >
                                &ldquo;{renderFormattedText(trimmed)}&rdquo;
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
                                    {renderFormattedText(block.text)}
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

              {/* ──── Frequently Asked Questions ──── */}
              {blog.faq && blog.faq.length > 0 && (
                <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-white/10 space-y-6">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {blog.faq.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs transition-all duration-200 hover:border-emerald-500/30 dark:border-white/10 dark:bg-slate-900/60"
                      >
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">
                          {item.question}
                        </h3>
                        <div className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {renderFormattedText(item.answer)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                    <div className="space-y-2 flex-1">
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
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                        <span className="font-semibold text-slate-500 dark:text-slate-400">Connect:</span>
                        <a
                          href="https://github.com/devdevansh12"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors"
                        >
                          <FaGithub className="text-sm" />
                          <span>GitHub</span>
                        </a>
                        <a
                          href="https://www.linkedin.com/in/devansh-variya/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-[#0a66c2] dark:text-slate-300 dark:hover:text-[#0a66c2] transition-colors"
                        >
                          <FaLinkedin className="text-sm text-[#0a66c2]" />
                          <span>LinkedIn</span>
                        </a>
                        <a
                          href="https://www.instagram.com/devdevansh12"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-[#e4405f] dark:text-slate-300 dark:hover:text-[#e4405f] transition-colors"
                        >
                          <FaInstagram className="text-sm text-[#e4405f]" />
                          <span>Instagram</span>
                        </a>
                      </div>
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
            </div>

            {/* Right Column: Desktop Sticky Table of Contents */}
            {blog.tableOfContents.length > 0 && (
              <aside className="hidden lg:block lg:col-span-4 sticky top-28">
                <BlogTableOfContents items={blog.tableOfContents} />
              </aside>
            )}
          </div>

          {/* ──── Related Articles ──── */}
          {relatedBlogs.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-200/80 dark:border-white/10">
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
        </Container>
      </article>
    </>
  );
}
