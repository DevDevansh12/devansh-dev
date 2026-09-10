import type { Metadata } from "next";
import Experience from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Experience | Devansh Variya – Full Stack Developer",
  description:
    "Explore Devansh Variya's software development experience, technical skills, professional work and experience building modern web applications.",
  alternates: {
    canonical: "https://devanshvariya.com/experience",
  },
  openGraph: {
    type: "website",
    url: "https://devanshvariya.com/experience",
    title: "Experience | Devansh Variya – Full Stack Developer",
    description:
      "Explore Devansh Variya's software development experience, technical skills, professional work and experience building modern web applications.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
    siteName: "Devansh Variya",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Devansh Variya – Full Stack Developer",
    description:
      "Explore Devansh Variya's software development experience, technical skills, professional work and experience building modern web applications.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
  },
};

const experienceJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://devanshvariya.com/experience#page",
  "url": "https://devanshvariya.com/experience",
  "name": "Experience | Devansh Variya",
  "description":
    "Professional software development experience and technical skills of Devansh Variya.",
  "about": {
    "@type": "Person",
    "@id": "https://devanshvariya.com/#person",
    "name": "Devansh Variya",
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
      "name": "Experience",
      "item": "https://devanshvariya.com/experience",
    },
  ],
};

export default function ExperiencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="pt-20 sm:pt-24">
        <Experience isPage={true} />
      </div>
    </>
  );
}
