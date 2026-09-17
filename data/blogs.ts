export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; filename?: string; code: string }
  | { type: "callout"; title?: string; text: string }
  | { type: "keyTakeaways"; items: string[] };

export interface BlogSection {
  id: string;
  title: string;
  content?: string[];
  blocks?: BlogBlock[];
  codeSnippet?: {
    language: string;
    filename?: string;
    code: string;
  };
  tip?: string;
  keyTakeaways?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  headline?: string;
  metaTitle?: string;
  metaDescription?: string;
  subtitle: string;
  excerpt: string;
  date: string;
  publishedTime: string; // ISO format for SEO
  dateModified?: string;
  readTime: string;
  category: "Full Stack" | "Next.js & React" | "AI & Cloud" | "FinTech & Security";
  coverImage: string;
  tags: string[];
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  tableOfContents: { id: string; title: string }[];
  sections: BlogSection[];
}

export const blogs: BlogPost[] = [
  {
    slug: "building-production-ready-full-stack-application-nextjs",
    title: "How I Built a Full-Stack SaaS Application with Next.js, Node.js and AI",
    headline: "Building a Production-Ready Full-Stack Application with Next.js, TypeScript and Node.js",
    metaTitle: "Building a Production-Ready Full-Stack App with Next.js | Devansh Variya",
    metaDescription: "Learn how I build production-ready full-stack apps with Next.js, TypeScript, and Node.js, covering APIs, AI, payments, performance, and scalability.",
    subtitle: "Modern web applications require more than just a beautiful interface. Here is an end-to-end engineering breakdown of building a scalable, production-ready SaaS application from architecture to deployment.",
    excerpt: "Learn how I build production-ready full-stack apps with Next.js, TypeScript, and Node.js, covering APIs, AI, payments, performance, and scalability.",
    date: "September 17, 2026",
    publishedTime: "2026-09-17",
    dateModified: "2026-09-17",
    readTime: "9 min read",
    category: "Full Stack",
    coverImage: "/images/blog/devansh-portfolio-blogbanner.png",
    featured: true,
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Full Stack Development",
      "AI",
      "SaaS",
      "Web Development",
    ],
    author: {
      name: "Devansh Variya",
      role: "Full Stack Developer",
      avatar: "/devansh-profile.png",
    },
    summary: "The difference between a basic tutorial project and a production-ready application comes down to the engineering decisions made behind the scenes. In this article, I walk through my end-to-end approach to building a full-stack SaaS application—from problem definition and stack selection to decoupled architecture, type-safe APIs, authentication, payments, AI workflows, scalability, and deployment.",
    tableOfContents: [
      { id: "start-with-the-problem", title: "1. Start With the Problem, Not the Technology" },
      { id: "choosing-technology-stack", title: "2. Choosing the Technology Stack" },
      { id: "designing-application-architecture", title: "3. Designing the Application Architecture" },
      { id: "frontend-with-nextjs", title: "4. Building the Frontend With Next.js" },
      { id: "typescript-for-safer-development", title: "5. Using TypeScript for Safer Development" },
      { id: "designing-the-backend", title: "6. Designing the Backend" },
      { id: "authentication-and-authorization", title: "7. Authentication and Authorization" },
      { id: "designing-the-database", title: "8. Designing the Database" },
      { id: "integrating-ai-into-web-applications", title: "9. Integrating AI Into Web Applications" },
      { id: "handling-payments", title: "10. Handling Payments" },
      { id: "error-handling", title: "11. Error Handling" },
      { id: "performance-optimization", title: "12. Performance Optimization" },
      { id: "building-for-scalability", title: "13. Building for Scalability" },
      { id: "deployment", title: "14. Deployment" },
      { id: "production-ready-criteria", title: "15. What Makes a Project Production-Ready?" },
      { id: "lessons-from-real-world-applications", title: "Lessons From Building Real-World Applications" },
      { id: "final-thoughts", title: "Final Thoughts" },
    ],
    sections: [
      {
        id: "start-with-the-problem",
        title: "1. Start With the Problem, Not the Technology",
        blocks: [
          {
            type: "paragraph",
            text: "One of the mistakes developers can make when starting a project is choosing technologies before clearly defining the problem.",
          },
          {
            type: "paragraph",
            text: "Instead of starting with:",
          },
          {
            type: "quote",
            text: "I want to build something with Next.js.",
          },
          {
            type: "paragraph",
            text: "I start with:",
          },
          {
            type: "quote",
            text: "What problem am I solving, who is going to use the application, and what should the application do?",
          },
          {
            type: "paragraph",
            text: "For example, when building a SaaS application, I first identify the core functionality:",
          },
          {
            type: "list",
            items: [
              "User registration and login",
              "Dashboard",
              "User-specific data",
              "CRUD operations",
              "Payments or subscriptions",
              "Notifications",
              "File uploads",
              "Reporting and analytics",
              "AI-powered features",
            ],
          },
          {
            type: "paragraph",
            text: "Once the requirements are clear, the technology stack becomes much easier to determine.",
          },
        ],
      },
      {
        id: "choosing-technology-stack",
        title: "2. Choosing the Technology Stack",
        blocks: [
          {
            type: "paragraph",
            text: "For modern full-stack applications, my preferred stack depends on the requirements of the project.",
          },
          {
            type: "paragraph",
            text: "A typical application can use:",
          },
          {
            type: "subheading",
            text: "Frontend",
          },
          {
            type: "list",
            items: [
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Redux Toolkit when global state management is required",
            ],
          },
          {
            type: "subheading",
            text: "Backend",
          },
          {
            type: "list",
            items: [
              "Node.js",
              "Express.js",
              "REST APIs",
            ],
          },
          {
            type: "subheading",
            text: "Database",
          },
          {
            type: "list",
            items: [
              "PostgreSQL",
              "MongoDB",
              "Supabase",
            ],
          },
          {
            type: "subheading",
            text: "Third-Party Services",
          },
          {
            type: "list",
            items: [
              "Razorpay for payments",
              "Cloudinary for media",
              "OpenAI or Gemini for AI features",
            ],
          },
          {
            type: "subheading",
            text: "Deployment",
          },
          {
            type: "list",
            items: [
              "Vercel",
              "Cloud infrastructure such as Azure when required",
            ],
          },
          {
            type: "callout",
            title: "Guiding Principle",
            text: "The goal isn't to use every technology. The goal is to choose the simplest architecture that can reliably solve the problem.",
          },
        ],
      },
      {
        id: "designing-application-architecture",
        title: "3. Designing the Application Architecture",
        blocks: [
          {
            type: "paragraph",
            text: "Before writing components and API routes, I think about how information will move through the application.",
          },
          {
            type: "paragraph",
            text: "A simplified architecture looks like this:",
          },
          {
            type: "code",
            language: "text",
            filename: "Application Layering",
            code: `User
  ↓
Next.js / React Frontend
  ↓
API Layer
  ↓
Business Logic
  ↓
Database
  ↓
External Services`,
          },
          {
            type: "paragraph",
            text: "For an application with AI functionality:",
          },
          {
            type: "code",
            language: "text",
            filename: "AI Flow Architecture",
            code: `User
  ↓
Next.js Interface
  ↓
Backend API
  ↓
AI Service
  ↓
OpenAI / Gemini
  ↓
Processed Response
  ↓
Frontend`,
          },
          {
            type: "paragraph",
            text: "This separation is important because it prevents the frontend from becoming responsible for everything.",
          },
          {
            type: "paragraph",
            text: "For example, an API key for an AI service should not be exposed in browser-side JavaScript. Requests requiring sensitive credentials should be handled on the server.",
          },
        ],
      },
      {
        id: "frontend-with-nextjs",
        title: "4. Building the Frontend With Next.js",
        blocks: [
          {
            type: "paragraph",
            text: "The frontend is where users interact with the product, but good frontend development is more than making the interface look attractive.",
          },
          {
            type: "paragraph",
            text: "I prefer breaking large interfaces into smaller reusable components.",
          },
          {
            type: "paragraph",
            text: "For example:",
          },
          {
            type: "code",
            language: "text",
            filename: "Component Directory Hierarchy",
            code: `components/
├── Navbar
├── Sidebar
├── Button
├── Modal
├── Form
├── DataTable
├── DashboardCard
└── Notification`,
          },
          {
            type: "paragraph",
            text: "Instead of creating the same button or modal repeatedly, reusable components provide consistency throughout the application.",
          },
          {
            type: "paragraph",
            text: "Next.js also provides several rendering and routing capabilities that can be useful for production applications.",
          },
          {
            type: "paragraph",
            text: "Depending on the page, I can decide whether content should be:",
          },
          {
            type: "list",
            items: [
              "Server-rendered",
              "Generated statically",
              "Rendered on the client",
              "Loaded dynamically",
            ],
          },
          {
            type: "paragraph",
            text: "The correct choice depends on the type of data and how frequently it changes.",
          },
        ],
      },
      {
        id: "typescript-for-safer-development",
        title: "5. Using TypeScript for Safer Development",
        blocks: [
          {
            type: "paragraph",
            text: "As applications become larger, JavaScript's flexibility can sometimes make it harder to identify problems before runtime.",
          },
          {
            type: "paragraph",
            text: "TypeScript helps by introducing static typing.",
          },
          {
            type: "paragraph",
            text: "For example:",
          },
          {
            type: "code",
            language: "typescript",
            filename: "types/user.ts",
            code: `interface User {
  id: string;
  name: string;
  email: string;
}`,
          },
          {
            type: "paragraph",
            text: "Now functions working with users can clearly define what data they expect.",
          },
          {
            type: "paragraph",
            text: "This becomes especially useful when working with:",
          },
          {
            type: "list",
            items: [
              "API responses",
              "Database models",
              "Forms",
              "Authentication",
              "Component props",
              "Third-party services",
            ],
          },
          {
            type: "paragraph",
            text: "TypeScript doesn't eliminate bugs, but it can catch many incorrect assumptions during development.",
          },
        ],
      },
      {
        id: "designing-the-backend",
        title: "6. Designing the Backend",
        blocks: [
          {
            type: "paragraph",
            text: "The backend is responsible for business logic and communication between the application and external services.",
          },
          {
            type: "paragraph",
            text: "A Node.js and Express application can be organized around resources:",
          },
          {
            type: "code",
            language: "text",
            filename: "Resource Route Map",
            code: `/api
   /auth
   /users
   /products
   /orders
   /payments
   /notifications
   /ai`,
          },
          {
            type: "paragraph",
            text: "For example:",
          },
          {
            type: "code",
            language: "text",
            filename: "RESTful Endpoints",
            code: `POST   /api/auth/login
POST   /api/auth/register

GET    /api/users/profile

GET    /api/products
POST   /api/products

POST   /api/payments/create
POST   /api/payments/verify

POST   /api/ai/generate`,
          },
          {
            type: "paragraph",
            text: "A well-structured API makes it easier for the frontend and backend to communicate consistently.",
          },
          {
            type: "paragraph",
            text: "I also try to keep business logic separate from route definitions rather than putting everything inside controllers.",
          },
        ],
      },
      {
        id: "authentication-and-authorization",
        title: "7. Authentication and Authorization",
        blocks: [
          {
            type: "paragraph",
            text: "Authentication answers: **Who is the user?**",
          },
          {
            type: "paragraph",
            text: "Authorization answers: **What is the user allowed to do?**",
          },
          {
            type: "paragraph",
            text: "These are different problems.",
          },
          {
            type: "paragraph",
            text: "A production application may have roles such as:",
          },
          {
            type: "code",
            language: "text",
            filename: "Role Hierarchy",
            code: `Admin
  ↓
Manage users
Manage products
View analytics

User
  ↓
Manage own account
Create records
View personal data`,
          },
          {
            type: "paragraph",
            text: "Authentication can be implemented using sessions, secure cookies, JWT-based systems, or other approaches depending on the architecture.",
          },
          {
            type: "paragraph",
            text: "Security should also be considered when handling:",
          },
          {
            type: "list",
            items: [
              "Passwords",
              "Tokens",
              "Cookies",
              "API keys",
              "User permissions",
              "Database access",
            ],
          },
          {
            type: "callout",
            title: "Security Imperative",
            text: "Sensitive credentials should never be hard-coded into the application or committed to a public repository.",
          },
        ],
      },
      {
        id: "designing-the-database",
        title: "8. Designing the Database",
        blocks: [
          {
            type: "paragraph",
            text: "Database design becomes increasingly important as the number of users and records grows.",
          },
          {
            type: "paragraph",
            text: "For example, an invoicing application could have relationships like:",
          },
          {
            type: "code",
            language: "text",
            filename: "Relational Data Flow",
            code: `User
 ↓
Business
 ↓
Customer
 ↓
Invoice
 ↓
Invoice Items
 ↓
Payment`,
          },
          {
            type: "paragraph",
            text: "Before creating tables or collections, I consider:",
          },
          {
            type: "list",
            items: [
              "What information needs to be stored?",
              "Which records are related?",
              "Which fields need indexes?",
              "Which values must be unique?",
              "Which queries will run frequently?",
            ],
          },
          {
            type: "paragraph",
            text: "Good database design can significantly reduce unnecessary queries and make future features easier to implement.",
          },
          {
            type: "paragraph",
            text: "Depending on the project, I have worked with both relational and NoSQL databases such as PostgreSQL and MongoDB.",
          },
        ],
      },
      {
        id: "integrating-ai-into-web-applications",
        title: "9. Integrating AI Into Web Applications",
        blocks: [
          {
            type: "paragraph",
            text: "AI is becoming another layer of modern application development.",
          },
          {
            type: "paragraph",
            text: "However, adding an AI API doesn't automatically make an application useful.",
          },
          {
            type: "paragraph",
            text: "The important question is: **What problem does AI actually solve?**",
          },
          {
            type: "paragraph",
            text: "For example, AI can be used for:",
          },
          {
            type: "list",
            items: [
              "Document processing",
              "Data extraction",
              "Content generation",
              "Intelligent search",
              "Customer support",
              "Recommendations",
              "Summarization",
              "Automated workflows",
            ],
          },
          {
            type: "paragraph",
            text: "A typical AI integration looks like:",
          },
          {
            type: "code",
            language: "text",
            filename: "Prompt-to-Response Pipeline",
            code: `User Input
    ↓
Frontend
    ↓
Backend API
    ↓
Prompt / Structured Request
    ↓
AI Model
    ↓
Validation
    ↓
Application Logic
    ↓
Frontend`,
          },
          {
            type: "paragraph",
            text: "One important lesson is to avoid trusting AI output blindly.",
          },
          {
            type: "paragraph",
            text: "Depending on the use case, responses may need validation, formatting, error handling, and sometimes human verification.",
          },
        ],
      },
      {
        id: "handling-payments",
        title: "10. Handling Payments",
        blocks: [
          {
            type: "paragraph",
            text: "For applications that require payments or subscriptions, payment processing needs careful handling.",
          },
          {
            type: "paragraph",
            text: "For example, a Razorpay integration might follow this flow:",
          },
          {
            type: "code",
            language: "text",
            filename: "Razorpay Lifecycle",
            code: `User
 ↓
Create Order
 ↓
Razorpay Checkout
 ↓
Payment
 ↓
Payment Response
 ↓
Backend Verification
 ↓
Database Update`,
          },
          {
            type: "paragraph",
            text: "The backend should verify the payment instead of simply trusting a value sent by the browser.",
          },
          {
            type: "paragraph",
            text: "This principle applies to many security-sensitive operations:",
          },
          {
            type: "quote",
            text: "Never treat client-side data as inherently trustworthy.",
          },
        ],
      },
      {
        id: "error-handling",
        title: "11. Error Handling",
        blocks: [
          {
            type: "paragraph",
            text: "Applications will eventually encounter errors.",
          },
          {
            type: "list",
            items: [
              "An API might fail.",
              "A database might be temporarily unavailable.",
              "A third-party service might return an unexpected response.",
              "An AI request might time out.",
            ],
          },
          {
            type: "paragraph",
            text: "A production application needs to handle these situations gracefully.",
          },
          {
            type: "paragraph",
            text: "Instead of returning confusing errors to users, I prefer creating consistent API responses.",
          },
          {
            type: "paragraph",
            text: "For example:",
          },
          {
            type: "code",
            language: "json",
            filename: "Structured Error Schema",
            code: `{
  "success": false,
  "message": "Unable to process your request.",
  "errorCode": "PAYMENT_FAILED"
}`,
          },
          {
            type: "paragraph",
            text: "The user gets a meaningful message while internal debugging information can remain in server logs.",
          },
        ],
      },
      {
        id: "performance-optimization",
        title: "12. Performance Optimization",
        blocks: [
          {
            type: "paragraph",
            text: "A feature that works isn't necessarily a feature that performs well.",
          },
          {
            type: "paragraph",
            text: "When optimizing an application, I look at several areas.",
          },
          {
            type: "subheading",
            text: "Frontend",
          },
          {
            type: "list",
            items: [
              "Reduce unnecessary renders",
              "Lazy-load expensive components",
              "Optimize images",
              "Minimize unnecessary JavaScript",
              "Avoid unnecessary API requests",
            ],
          },
          {
            type: "subheading",
            text: "Backend",
          },
          {
            type: "list",
            items: [
              "Optimize database queries",
              "Add appropriate indexes",
              "Cache frequently requested data",
              "Avoid unnecessary processing",
              "Use pagination for large datasets",
            ],
          },
          {
            type: "subheading",
            text: "Network",
          },
          {
            type: "list",
            items: [
              "Compress responses",
              "Reduce payload sizes",
              "Avoid duplicate requests",
              "Use caching where appropriate",
            ],
          },
          {
            type: "callout",
            title: "Performance Maxim",
            text: "Performance optimization should be based on actual bottlenecks rather than randomly optimizing everything.",
          },
        ],
      },
      {
        id: "building-for-scalability",
        title: "13. Building for Scalability",
        blocks: [
          {
            type: "paragraph",
            text: "A common mistake is trying to design a system for millions of users before the first user even exists.",
          },
          {
            type: "paragraph",
            text: "Instead, I prefer building a clean architecture that can evolve.",
          },
          {
            type: "paragraph",
            text: "A growing application might eventually move toward:",
          },
          {
            type: "code",
            language: "text",
            filename: "Scale-Out System Topology",
            code: `                    Load Balancer
                         ↓
              ┌──────────┴──────────┐
              ↓                     ↓
          App Server            App Server
              ↓                     ↓
              └──────────┬──────────┘
                         ↓
                    Database
                         ↓
                    Cache Layer
                         ↓
               External Services`,
          },
          {
            type: "paragraph",
            text: "As traffic grows, different parts of the system can be optimized independently.",
          },
          {
            type: "paragraph",
            text: "Scalability isn't only about adding more servers. It also involves database design, caching, queues, API architecture, monitoring and efficient application code.",
          },
        ],
      },
      {
        id: "deployment",
        title: "14. Deployment",
        blocks: [
          {
            type: "paragraph",
            text: "Once development is complete, the application needs to be deployed reliably.",
          },
          {
            type: "paragraph",
            text: "My typical workflow is:",
          },
          {
            type: "code",
            language: "text",
            filename: "Deployment Pipeline",
            code: `Development
     ↓
Git
     ↓
GitHub
     ↓
Testing
     ↓
Production Build
     ↓
Deployment
     ↓
Monitoring`,
          },
          {
            type: "paragraph",
            text: "For Next.js projects, Vercel provides a convenient deployment workflow.",
          },
          {
            type: "paragraph",
            text: "Environment variables should be configured separately for different environments.",
          },
          {
            type: "paragraph",
            text: "For example:",
          },
          {
            type: "code",
            language: "text",
            filename: ".env.production",
            code: `DATABASE_URL
OPENAI_API_KEY
RAZORPAY_KEY_SECRET
JWT_SECRET
CLOUDINARY_API_SECRET`,
          },
          {
            type: "callout",
            title: "Zero Secret Leakage",
            text: "These values should never be committed directly into the source code.",
          },
        ],
      },
      {
        id: "production-ready-criteria",
        title: "15. What Makes a Project Production-Ready?",
        blocks: [
          {
            type: "paragraph",
            text: "For me, a production-ready application isn't simply one that works on a developer's laptop.",
          },
          {
            type: "paragraph",
            text: "I consider questions such as:",
          },
          {
            type: "subheading",
            text: "Security",
          },
          {
            type: "paragraph",
            text: "Is user data protected?",
          },
          {
            type: "subheading",
            text: "Performance",
          },
          {
            type: "paragraph",
            text: "Does the application remain responsive?",
          },
          {
            type: "subheading",
            text: "Reliability",
          },
          {
            type: "paragraph",
            text: "What happens when an external service fails?",
          },
          {
            type: "subheading",
            text: "Scalability",
          },
          {
            type: "paragraph",
            text: "Can the architecture evolve as usage increases?",
          },
          {
            type: "subheading",
            text: "Maintainability",
          },
          {
            type: "paragraph",
            text: "Can another developer understand the code?",
          },
          {
            type: "subheading",
            text: "Monitoring",
          },
          {
            type: "paragraph",
            text: "How will we know when something breaks?",
          },
          {
            type: "subheading",
            text: "User Experience",
          },
          {
            type: "paragraph",
            text: "Can users complete their tasks without unnecessary complexity?",
          },
          {
            type: "paragraph",
            text: "These questions become increasingly important as an application moves from a personal project to a product used by real customers.",
          },
        ],
      },
      {
        id: "lessons-from-real-world-applications",
        title: "Lessons From Building Real-World Applications",
        blocks: [
          {
            type: "paragraph",
            text: "Working on real applications has taught me that knowing a framework is only one part of being a Full Stack Developer.",
          },
          {
            type: "paragraph",
            text: "You need to understand how different layers communicate with each other.",
          },
          {
            type: "paragraph",
            text: "A frontend developer might focus on the interface. A backend developer might focus on APIs. A database engineer might focus on data. But a Full Stack Developer needs to understand how these pieces work together.",
          },
          {
            type: "paragraph",
            text: "The most valuable learning often happens when something doesn't work:",
          },
          {
            type: "list",
            items: [
              "An API suddenly becomes slow.",
              "A database query returns unexpected results.",
              "Authentication fails in production.",
              "A third-party API changes its response.",
              "A payment webhook doesn't behave as expected.",
              "A deployment works locally but fails in production.",
            ],
          },
          {
            type: "callout",
            title: "Hands-on Mastery",
            text: "Solving these real problems teaches more than simply following a tutorial.",
          },
        ],
      },
      {
        id: "final-thoughts",
        title: "Final Thoughts",
        blocks: [
          {
            type: "paragraph",
            text: "Building a production-ready full-stack application is a continuous process.",
          },
          {
            type: "paragraph",
            text: "The stack will change. Frameworks will evolve. AI capabilities will improve. Infrastructure will become more automated.",
          },
          {
            type: "paragraph",
            text: "But the fundamentals remain important:",
          },
          {
            type: "quote",
            text: "Understand the problem → design the architecture → build the feature → secure it → test it → optimize it → deploy it → monitor it.",
          },
          {
            type: "paragraph",
            text: "My current focus is on building modern web applications using **React, Next.js, TypeScript, Node.js and AI technologies**, with an emphasis on practical architecture and real-world development.",
          },
          {
            type: "paragraph",
            text: "I believe the best way to become a better developer isn't simply to learn more technologies.",
          },
          {
            type: "quote",
            text: "It's to build, break, debug, improve and ship real products.",
          },
        ],
      },
    ],
  },
];

export function getAllBlogs(): BlogPost[] {
  return blogs;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getFeaturedBlog(): BlogPost {
  return blogs.find((b) => b.featured) || blogs[0];
}

export function getRelatedBlogs(currentSlug: string, limit = 2): BlogPost[] {
  return blogs.filter((b) => b.slug !== currentSlug).slice(0, limit);
}
