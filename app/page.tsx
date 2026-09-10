import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Devansh Variya | Full Stack Developer & Software Engineer",
  description:
    "Devansh Variya is a Full Stack Developer skilled in React, Node.js, JavaScript and TypeScript. Explore his projects, experience and web development work.",
  alternates: {
    canonical: "https://devanshvariya.com/",
  },
  openGraph: {
    type: "website",
    url: "https://devanshvariya.com/",
    title: "Devansh Variya | Full Stack Developer & Software Engineer",
    description:
      "Devansh Variya is a Full Stack Developer skilled in React, Node.js, JavaScript and TypeScript. Explore his projects, experience and web development work.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
    siteName: "Devansh Variya",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devansh Variya | Full Stack Developer & Software Engineer",
    description:
      "Devansh Variya is a Full Stack Developer skilled in React, Node.js, JavaScript and TypeScript. Explore his projects, experience and web development work.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://devanshvariya.com/#person",
      "name": "Devansh Variya",
      "url": "https://devanshvariya.com/",
      "jobTitle": "Full Stack Developer",
      "description":
        "Full Stack Developer specializing in React, Node.js, JavaScript, TypeScript and modern web development.",
      "image": "https://devanshvariya.com/devansh-profile.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/devansh-variya/",
        "https://github.com/devdevansh12",
      ],
      "knowsAbout": [
        "Full Stack Development",
        "Web Development",
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://devanshvariya.com/#website",
      "url": "https://devanshvariya.com/",
      "name": "Devansh Variya",
      "description":
        "Official portfolio website of Devansh Variya, Full Stack Developer.",
      "publisher": {
        "@id": "https://devanshvariya.com/#person",
      },
      "inLanguage": "en",
    },
  ],
};

// Below-fold sections: loaded dynamically for optimal performance
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Skills     = dynamic(() => import("@/components/sections/Skills"));
const Projects   = dynamic(() => import("@/components/sections/Projects"));
const Contact    = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
