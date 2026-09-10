export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  liveUrl: string;
  github?: string;
  image: string;
  highlight: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  timeline: string;
  tags: string[];
  features: string[];
  technicalHighlights: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    databaseCloud: string[];
    aiServices?: string[];
  };
  metrics?: string[];
}

export const projects: Project[] = [
  {
    slug: "smart-billing-desk",
    title: "Smart Billing Desk",
    subtitle: "Professional Business Invoice Generator",
    category: "Full Stack / AI Web Application",
    liveUrl: "https://smartbillingdesk.com/",
    image: "/projects/smart-billing-desk.png",
    highlight: "OpenAI Integrated",
    tags: ["React.js", "OpenAI API", "Redux", "Razorpay", "Supabase", "Node.js"],
    shortDescription:
      "AI-powered invoicing platform engineered with automated billing calculation, client management, dynamic PDF invoice generation, seamless Razorpay payment gateway, and OpenAI API assistance.",
    fullDescription:
      "Smart Billing Desk is an enterprise-grade invoicing and billing management suite built to streamline commercial invoice workflows for modern businesses. It features an automated GST-compliant tax calculator, client cataloging, real-time balance calculations, dynamic PDF invoice generation, and integrated Razorpay checkout for fast, secure receivables.",
    role: "Lead Full Stack Developer",
    timeline: "2026",
    features: [
      "AI-Assisted Invoice Drafting: Leverages the OpenAI API to automatically parse line items, suggest categorizations, and draft invoice summaries.",
      "GST-Ready Invoicing Studio: Automatic calculation of CGST, SGST, IGST rates with one-click export to printable PDF format.",
      "Client & Vendor Database: Centralized client directory with saved payment terms, addresses, and transaction history.",
      "Razorpay Checkout Integration: Direct payment links generated per invoice allowing clients to settle balances immediately via Cards, UPI, or Net Banking.",
      "Financial Status Dashboard: Real-time graphs showing paid, pending, and overdue invoices with dynamic status badges.",
    ],
    technicalHighlights: [
      "Engineered automated server-side PDF generation pipeline delivering sub-second invoice rendering.",
      "Implemented Redux Toolkit state architecture for seamless, instantaneous item additions and tax calculations without UI lag.",
      "Optimized Supabase PostgreSQL queries with custom indexing for sub-50ms query latency on client records.",
      "Designed secure payment webhook handlers with cryptographic signature verification for Razorpay events.",
    ],
    techStack: {
      frontend: ["React.js", "Redux Toolkit", "Tailwind CSS", "TypeScript"],
      backend: ["Node.js", "Express.js", "RESTful APIs"],
      databaseCloud: ["Supabase", "PostgreSQL", "Vercel"],
      aiServices: ["OpenAI API (GPT-4)"],
    },
    metrics: [
      "Automated over 85% of manual invoice compilation steps",
      "Instant PDF generation in under 400ms",
      "100% GST compliance and accuracy on item calculations",
    ],
  },
  {
    slug: "internship-portal",
    title: "Internship Portal",
    subtitle: "Intern Management & Admin Dashboard",
    category: "Enterprise Administration Platform",
    liveUrl: "https://portal.mamotechnolabs.com/",
    image: "/projects/internship-portal.png",
    highlight: "1,000+ Interns Tracked",
    tags: ["React.js", "TypeScript", "Supabase", "Node.js", "Razorpay"],
    shortDescription:
      "Full-stack intern administration platform featuring real-time dashboards tracking 1,000+ interns and payments, with role-based authentication, activity monitoring, and automated report exports.",
    fullDescription:
      "Internship Portal is an internal workforce orchestration platform developed for MaMo TechnoLabs. It enables educational institutions and corporate HR departments to oversee hundreds of concurrent interns, assign milestones, verify task completions, and track stipend disbursements and enrollment payments seamlessly.",
    role: "Full Stack Engineer",
    timeline: "2025 — 2026",
    features: [
      "Intern-Wise Task Breakdown: Visual dashboard mapping task progress (Pending, In Progress, Completed, Overdue) across dozens of cohorts.",
      "Real-Time Analytics Dashboard: Comprehensive high-level metrics tracking active interns, completion percentages, and milestone achievement.",
      "Role-Based Access Control: Granular permissions tailored for Admins, Project Mentors, and Interns.",
      "Integrated Payment & Stipend Management: Razorpay integration enabling verification of tuition fees and issuance of stipend receipts.",
      "Automated Certificate & Report Generation: Generate verified training certificates and evaluation reports with secure hash verification.",
    ],
    technicalHighlights: [
      "Scaled architecture to seamlessly support real-time querying across 1,000+ concurrent intern profiles.",
      "Utilized TypeScript and Supabase Row Level Security (RLS) policies to prevent cross-cohort unauthorized access.",
      "Architected real-time status updates with Supabase WebSockets, avoiding costly polling cycles.",
      "Constructed custom filtering and multi-column sorting tables supporting bulk state transitions.",
    ],
    techStack: {
      frontend: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Express.js", "RESTful APIs"],
      databaseCloud: ["Supabase", "PostgreSQL", "Vercel"],
      aiServices: ["Automated Data Analysis"],
    },
    metrics: [
      "1,000+ active interns tracked and coordinated simultaneously",
      "40% reduction in admin management overhead across cohorts",
      "Zero security breaches or data leakage through strict RLS enforcement",
    ],
  },
  {
    slug: "vedoo-architect",
    title: "Vedoo Architect",
    subtitle: "Architect Platform with Payment Gateway",
    category: "Commercial Architecture & AI Platform",
    liveUrl: "https://vedoo.co/",
    image: "/projects/vedoo-architect.png",
    highlight: "Gemini AI Chatbot",
    tags: ["React.js", "Gemini AI", "Custom Chatbot", "Supabase", "Razorpay"],
    shortDescription:
      "Architecture services platform featuring a custom Google Gemini AI-powered chatbot for real-time project inquiries, role-based content management, and Razorpay payment integration.",
    fullDescription:
      "Vedoo Architect is a modern architecture and interior design consultation platform. It enables prospective clients to browse architectural portfolios, configure room styles, calculate project estimates, and consult an intelligent custom Google Gemini AI assistant trained specifically on architecture blueprints, space planning, and materials.",
    role: "Full Stack Web Developer",
    timeline: "2025",
    features: [
      "Custom Gemini AI Architectural Chatbot: Interactive virtual consultant capable of answering inquiries regarding spatial planning, materials, and cost ranges.",
      "'Built From Your Choices' Visual Configurator: Interactive room and design customizer helping clients formulate their design brief.",
      "Integrated Consultation Booking: Razorpay payment gateway integration for reserving architectural site visits and design appointments.",
      "Dynamic Architectural Portfolio: High-resolution media galleries showcasing residential, commercial, and landscape projects with smooth transitions.",
      "Admin CMS: Content management portal enabling architects to publish case studies and client feedback without touching code.",
    ],
    technicalHighlights: [
      "Engineered streaming responses from Google Gemini AI for instantaneous chat interactions with zero perceiveable lag.",
      "Implemented responsive image delivery with Next.js Image optimization, reducing page weight on high-res renders by over 60%.",
      "Integrated Razorpay order creation and server-side webhook validation for secure booking confirmations.",
      "Structured Supabase backend schemas with relational mapping between projects, services, and appointment schedules.",
    ],
    techStack: {
      frontend: ["React.js", "Tailwind CSS", "JavaScript", "Framer Motion"],
      backend: ["Node.js", "Express.js", "RESTful APIs"],
      databaseCloud: ["Supabase", "PostgreSQL", "Vercel"],
      aiServices: ["Google Gemini AI API", "Custom NLP Chat Engine"],
    },
    metrics: [
      "Over 3x higher visitor engagement through conversational Gemini AI interface",
      "Sub-2s page load speed even with rich 4K interior renderings",
      "Streamlined client onboarding directly to consultation booking",
    ],
  },
  {
    slug: "thelocator",
    title: "TheLocator",
    subtitle: "Workshop Management System",
    category: "Cloud Event & Workshop Platform",
    liveUrl: "https://thelocatr.com/",
    image: "/projects/thelocator.png",
    highlight: "Azure Deployed",
    tags: ["React.js", "Redux", "OpenAI API", "Microsoft Azure", "Node.js", "Express.js"],
    shortDescription:
      "MERN-stack workshop coordination system with role-based auth, participant scheduling, OpenAI API-enhanced coordination, and responsive admin dashboards deployed with high availability on Azure.",
    fullDescription:
      "TheLocator is a community exploration and localized experiential workshop booking platform. It connects neighborhood creators, event hosts, and attendees across activities ranging from wellness and pottery to culinary masterclasses. Featuring participant scheduling, locality filtering, and an AI recommendation engine.",
    role: "Full Stack Cloud Engineer",
    timeline: "2025",
    features: [
      "Locality-Based Experience Discovery: Real-time location search and neighborhood filtering across cities and creative hubs.",
      "Interactive Participant Scheduling: Calendar reservation engine preventing double-booking and managing waitlists dynamically.",
      "OpenAI-Powered Experience Matching: Intelligent suggestion engine that analyzes participant interests to recommend workshops.",
      "Host Portal: Dedicated dashboard for workshop creators to configure ticketing, check attendee rosters, and view revenue analytics.",
      "Multi-Tier Authentication: Secure JWT authentication separating host management, customer reservations, and platform super-admins.",
    ],
    technicalHighlights: [
      "Deployed and monitored microservices on Microsoft Azure, achieving a 99%+ uptime track record under concurrent traffic.",
      "Built MongoDB aggregated queries with geospatial indexing ($geoNear) for ultra-fast locality-based queries.",
      "Designed Redux state management for seamless filtering across dozens of categories without network re-fetches.",
      "Configured Azure App Services with continuous deployment (CI/CD) directly from GitHub repositories.",
    ],
    techStack: {
      frontend: ["React.js", "Redux", "Tailwind CSS", "JavaScript"],
      backend: ["Node.js", "Express.js", "RESTful APIs"],
      databaseCloud: ["MongoDB", "Microsoft Azure", "Azure App Services"],
      aiServices: ["OpenAI API (Recommendation Engine)"],
    },
    metrics: [
      "99%+ uptime across production environments on Microsoft Azure",
      "Seamless real-time geospatial discovery across multiple urban districts",
      "Automated participant coordination reducing host administration by 50%",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
