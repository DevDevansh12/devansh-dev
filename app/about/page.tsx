import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaRobot,
  FaRocket,
  FaHeart,
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaDownload,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About Devansh Variya | Full Stack Developer",
  description:
    "Learn more about Devansh Variya, a Full Stack Developer focused on building modern web applications with React, Node.js, JavaScript, TypeScript and related technologies.",
  alternates: {
    canonical: "https://devanshvariya.com/about",
  },
  openGraph: {
    type: "profile",
    url: "https://devanshvariya.com/about",
    title: "About Devansh Variya | Full Stack Developer",
    description:
      "Learn more about Devansh Variya, a Full Stack Developer focused on building modern web applications with React, Node.js, JavaScript, TypeScript and related technologies.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
    siteName: "Devansh Variya",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Devansh Variya | Full Stack Developer",
    description:
      "Learn more about Devansh Variya, a Full Stack Developer focused on building modern web applications with React, Node.js, JavaScript, TypeScript and related technologies.",
    images: ["https://devanshvariya.com/devansh-profile.jpg"],
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://devanshvariya.com/about#profile",
  "url": "https://devanshvariya.com/about",
  "name": "About Devansh Variya",
  "description":
    "About Devansh Variya, Full Stack Developer and Software Engineer.",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://devanshvariya.com/#person",
    "name": "Devansh Variya",
    "url": "https://devanshvariya.com/",
    "jobTitle": "Full Stack Developer",
    "sameAs": [
      "https://www.linkedin.com/in/devansh-variya/",
      "https://github.com/devdevansh12",
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
      "name": "About",
      "item": "https://devanshvariya.com/about",
    },
  ],
};

const stats = [
  { value: "4+", label: "Production Apps", sublabel: "Shipped & Live" },
  { value: "30%", label: "Workload Reduced", sublabel: "Via OpenAI & Gemini AI" },
  { value: "7.6", label: "GPA B.Tech IT", sublabel: "Parul University" },
  { value: "100%", label: "Code Integrity", sublabel: "Type-safe & Responsive" },
];

const principles = [
  {
    icon: FaRocket,
    title: "Performance First",
    description:
      "I prioritize sub-second load times, optimized server-side rendering, and responsive UI layouts that work effortlessly across any viewport.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: FaRobot,
    title: "Practical AI Integration",
    description:
      "Leveraging OpenAI and Gemini AI to automate manual tasks and elevate user workflows rather than building superficial AI wrappers.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: FaCode,
    title: "Clean & Maintainable Architecture",
    description:
      "Disciplined code organization with TypeScript, reusable modular components, and predictable state management that scales gracefully.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: FaHeart,
    title: "User-Centered Craftsmanship",
    description:
      "Every animation, button state, contrast ratio, and typography choice is tuned to provide a delightful and frictionless user experience.",
    gradient: "from-purple-500 to-pink-500",
  },
];

const technicalExpertise = [
  {
    category: "Frontend Core",
    items: ["React.js", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Redux Toolkit", "HTML5 & CSS3"],
  },
  {
    category: "Backend & Cloud",
    items: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "Supabase", "Microsoft Azure"],
  },
  {
    category: "AI & Modern Tooling",
    items: ["OpenAI API", "Google Gemini AI", "Postman", "Git & GitHub", "Vercel", "Figma UI/UX"],
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Section className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <Container>
          {/* Page Header */}
          <div className="text-center mb-16">
            <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 mb-3">
              About Me
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              About Devansh Variya
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Engineering Thoughtful Web & AI Solutions — passionate Full Stack Developer driven by performance, clean architecture, and practical AI integrations.
            </p>
          </div>

          {/* Bio & Profile Card Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center mb-20">
            {/* Profile Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-slate-900/80">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950">
                  <Image
                    src="/devansh-profile.jpg"
                    alt="Devansh Variya"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-[center_18%]"
                    priority
                  />
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Devansh Variya
                  </h3>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Full Stack Developer & AI Integrator
                  </p>
                  <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <FaMapMarkerAlt className="text-emerald-600 dark:text-emerald-400" />
                    <span>Vadodara, Gujarat, India</span>
                  </p>

                  {/* Social Connect */}
                  <div className="mt-5 flex items-center justify-center gap-2.5">
                    <a
                      href="https://github.com/devdevansh12"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20"
                    >
                      <FaGithub className="text-sm" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/devansh-variya/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20"
                    >
                      <FaLinkedin className="text-sm text-[#0a66c2]" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Story */}
            <div className="lg:col-span-7 space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Who I Am & What Drives My Work
              </h2>
              <p className="text-base sm:text-lg">
                I am a results-oriented Full Stack Developer with a strong academic foundation from Parul University and hands-on production experience in enterprise web development and AI-enhanced applications.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                My engineering journey spans developing scalable web applications using React.js, Next.js, and Node.js, managing complex application states with Redux Toolkit, and crafting modern APIs. Notably, I have integrated OpenAI and Google Gemini AI APIs into client systems, reducing repetitive manual workflows by up to 30%.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Whether architecting full-stack management portals, responsive booking systems, or real-time location analytics, I treat every project as an opportunity to build robust, delightful software that delivers tangible business value.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-semibold text-white shadow-2xs transition-all duration-150 hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  <span>View My Projects</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
                <a
                  href="https://drive.google.com/file/d/1sHYK7WMQ61893vPnUmwrlczXs5veeUMs/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-800 shadow-2xs transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 active:scale-[0.98]"
                >
                  <FaDownload className="text-xs text-slate-400" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Stats Strip */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-20">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs dark:border-white/10 dark:bg-slate-900/80"
              >
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {item.value}
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {item.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.sublabel}
                </div>
              </div>
            ))}
          </div>

          {/* Engineering Philosophy & Principles */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 mb-3">
                How I Build
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
                Core Engineering Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-white/20"
                  >
                    <div>
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white mb-4">
                        <IconComp className="text-base" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education & Career Foundation */}
          <div className="mb-20 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs dark:border-white/10 dark:bg-slate-900/80">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6">
                <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 mb-2">
                  Academic Foundation
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Education & Degree
                </h2>
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-2xs dark:border-white/15 dark:bg-white">
                    <Image
                      src="/education/parul-university.png"
                      alt="Parul University logo"
                      width={38}
                      height={38}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Parul University
                    </h3>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      Bachelor of Technology in Computer Science And Engineering (B.Tech CSE)
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Vadodara, Gujarat, India • 2020 – 2024
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <span>GPA: 7.6 / 10</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Work History Summary
                </span>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white p-0.5 shadow-2xs dark:border-white/15 dark:bg-white">
                      <Image
                        src="/companies/mamo-technolabs.png"
                        alt="MaMo TechnoLabs logo"
                        width={22}
                        height={22}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">MaMo TechnoLabs</span>
                      <span className="text-slate-500 dark:text-slate-400"> — Full-Stack Developer</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white p-0.5 shadow-2xs dark:border-white/15 dark:bg-white">
                      <Image
                        src="/companies/getmeonline.png"
                        alt="Getmeonline logo"
                        width={22}
                        height={22}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">Getmeonline</span>
                      <span className="text-slate-500 dark:text-slate-400"> — Web Developer</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                    <FaBriefcase className="text-sm text-slate-600 dark:text-slate-400" />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">Insanis Brain</span>
                      <span className="text-slate-500 dark:text-slate-400"> — Web Developer Intern</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/experience"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                  >
                    <span>Explore full experience timeline</span>
                    <FaArrowRight className="text-[10px] text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Stack Overview */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 mb-3">
                Toolkit
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
                Technical Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {technicalExpertise.map((cat, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-slate-900/80"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      >
                        <FaCheckCircle className="text-[10px] text-emerald-600 dark:text-emerald-400" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-xs dark:border-white/10 dark:bg-slate-900/80">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Let&apos;s Create Something Remarkable
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Open for freelance projects, AI integration consulting, and full-time software engineering roles.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-semibold text-white shadow-2xs transition-all duration-150 hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <span>Get In Touch</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-800 shadow-2xs transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
              >
                <span>Browse Projects</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
