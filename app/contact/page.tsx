import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact Devansh Variya | Full Stack Developer",
  description:
    "Get in touch with Devansh Variya, a Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, AI, and modern web development.",
  alternates: {
    canonical: "https://devanshvariya.com/contact",
  },
  openGraph: {
    type: "website",
    url: "https://devanshvariya.com/contact",
    title: "Contact Devansh Variya | Full Stack Developer",
    description:
      "Get in touch with Devansh Variya, a Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, AI, and modern web development.",
    images: ["https://devanshvariya.com/devansh-profile.png"],
    siteName: "Devansh Variya",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Devansh Variya | Full Stack Developer",
    description:
      "Get in touch with Devansh Variya, a Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, AI, and modern web development.",
    images: ["https://devanshvariya.com/devansh-profile.png"],
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://devanshvariya.com/contact#contactpage",
  url: "https://devanshvariya.com/contact",
  name: "Contact Devansh Variya",
  description:
    "Get in touch with Devansh Variya, a Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, AI, and modern web development.",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://devanshvariya.com/#website",
    url: "https://devanshvariya.com/",
    name: "Devansh Variya",
  },
  about: {
    "@type": "Person",
    "@id": "https://devanshvariya.com/#person",
    name: "Devansh Variya",
    url: "https://devanshvariya.com/",
  },
  inLanguage: "en",
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <div className="pt-20 sm:pt-24">
        <Contact />
      </div>
    </>
  );
}
