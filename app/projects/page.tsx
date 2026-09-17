import type { Metadata } from "next";
import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProjectsGallery from "@/components/sections/ProjectsGallery";

export const metadata: Metadata = {
  title: "Projects | Devansh Variya – Full Stack Developer",
  description:
    "Explore web development projects by Devansh Variya, including full stack applications, business solutions, websites and modern web development projects.",
  alternates: {
    canonical: "https://devanshvariya.com/projects",
  },
  openGraph: {
    type: "website",
    url: "https://devanshvariya.com/projects",
    title: "Projects | Devansh Variya – Full Stack Developer",
    description:
      "Explore web development projects by Devansh Variya, including full stack applications, business solutions, websites and modern web development projects.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
    siteName: "Devansh Variya",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Devansh Variya – Full Stack Developer",
    description:
      "Explore web development projects by Devansh Variya, including full stack applications, business solutions, websites and modern web development projects.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
  },
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://devanshvariya.com/projects#page",
  "url": "https://devanshvariya.com/projects",
  "name": "Projects | Devansh Variya",
  "description":
    "A collection of web development and full stack projects created by Devansh Variya.",
  "isPartOf": {
    "@id": "https://devanshvariya.com/#website",
  },
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 4,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "TheLocator",
        "url": "https://devanshvariya.com/projects/thelocator",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Vedoo Architect",
        "url": "https://devanshvariya.com/projects/vedoo-architect",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Billing & Invoice Management System",
        "url": "https://devanshvariya.com/projects/invoice-management-portal",
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Corporate Consulting Website",
        "url": "https://devanshvariya.com/projects/corporate-consulting-website",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://devanshvariya.com/",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Projects",
      "item": "https://devanshvariya.com/projects",
    },
  ],
};

export default function ProjectsPage() {
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
              Portfolio Showcase
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              My Projects
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400">
              A comprehensive showcase of production-grade web applications, automated AI tools, and scalable cloud solutions built with modern stacks.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>5 Production Systems Shipped</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500" />
                <span>OpenAI & Gemini AI Integrated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                <span>Live Deployments & Interactive Demos</span>
              </div>
            </div>
          </div>

          {/* Interactive Client Filter & Project Cards */}
          <ProjectsGallery initialProjects={projects} />
        </Container>
      </Section>
    </>
  );
}
