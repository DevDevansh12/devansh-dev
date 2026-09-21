import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/sections/Navbar";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/sections/Footer"));
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devanshvariya.com"),
  title: {
    default: "Devansh Variya | Full Stack Developer & Software Engineer",
    template: "%s",
  },
  description:
    "Devansh Variya is a Full Stack Developer skilled in React, Node.js, JavaScript and TypeScript. Explore his projects, experience and web development work.",
  authors: [{ name: "Devansh Variya", url: "https://devanshvariya.com" }],
  creator: "Devansh Variya",
  publisher: "Devansh Variya",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devanshvariya.com/",
    siteName: "Devansh Variya",
    title: "Devansh Variya | Full Stack Developer & Software Engineer",
    description:
      "Devansh Variya is a Full Stack Developer skilled in React, Node.js, JavaScript and TypeScript. Explore his projects, experience and web development work.",
    images: [
      {
        url: "https://devanshvariya.com/devansh-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Devansh Variya - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devansh Variya | Full Stack Developer & Software Engineer",
    description:
      "Devansh Variya is a Full Stack Developer skilled in React, Node.js, JavaScript and TypeScript. Explore his projects, experience and web development work.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"light";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`,
          }}
        />
      </head>
      <body
        className="relative min-h-full flex flex-col bg-background text-foreground transition-colors duration-300"
        suppressHydrationWarning
      >
        {/* Ambient background grid */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-60" />

        <Navbar />
        <div className="relative z-10 flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
