import type { Metadata } from "next";
import { blogs } from "@/data/blogs";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import BlogGallery from "@/components/sections/BlogGallery";

export const metadata: Metadata = {
  title: "Blog & Technical Insights | Devansh Variya – Full Stack Developer",
  description:
    "Explore technical articles and architecture guides on Next.js, React, AI agents, real-time state, and cloud security by Devansh Variya.",
  alternates: {
    canonical: "https://devanshvariya.com/blog",
  },
  openGraph: {
    type: "website",
    url: "https://devanshvariya.com/blog",
    title: "Blog & Technical Insights | Devansh Variya – Full Stack Developer",
    description:
      "Explore technical articles and architecture guides on Next.js, React, AI agents, real-time state, and cloud security by Devansh Variya.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
    siteName: "Devansh Variya",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Technical Insights | Devansh Variya – Full Stack Developer",
    description:
      "Explore technical articles and architecture guides on Next.js, React, AI agents, real-time state, and cloud security by Devansh Variya.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
  },
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://devanshvariya.com/blog#page",
  url: "https://devanshvariya.com/blog",
  name: "Engineering Blog | Devansh Variya",
  description:
    "A collection of engineering articles, architectural patterns, and full-stack development tutorials by Devansh Variya.",
  isPartOf: {
    "@id": "https://devanshvariya.com/#website",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: blogs.length,
    itemListElement: blogs.map((blog, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: blog.title,
      url: `https://devanshvariya.com/blog/${blog.slug}`,
    })),
  },
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
  ],
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Section className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <Container>
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
              Engineering & Insights
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              Technical Blog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Deep dives into Next.js performance, autonomous AI systems, scalable state architecture, and battle-tested production security patterns.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>Production Architecture Case Studies</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500" />
                <span>React 19 & Next.js Stacks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                <span>OpenAI & Supabase Engineering</span>
              </div>
            </div>
          </div>

          {/* Interactive Search, Category Filters, and Article Cards */}
          <BlogGallery initialBlogs={blogs} />
        </Container>
      </Section>
    </>
  );
}
