import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
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

        {/* Ambient background glow orbs */}
        <div className="pointer-events-none fixed -left-48 top-0 z-0 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[130px] dark:bg-emerald-500/15" />
        <div className="pointer-events-none fixed -right-48 top-1/4 z-0 h-[650px] w-[650px] rounded-full bg-cyan-500/10 blur-[140px] dark:bg-cyan-500/15" />
        <div className="pointer-events-none fixed left-1/3 bottom-10 z-0 h-[700px] w-[700px] rounded-full bg-blue-600/10 blur-[160px] dark:bg-blue-600/10" />

        <Navbar />
        <div className="relative z-10 flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
