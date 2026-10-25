import { experienceData, type Experience } from "./data";

export const socials = {
  email: "vaidiksinghnirwan13@gmail.com",
  github: "https://github.com/Vaidik1308",
  linkedin: "https://www.linkedin.com/in/vaidik-singh-nirwan-b837351b2/",
  x: "https://x.com/kriishnaa_13",
  resume:
    "https://drive.google.com/file/d/17OO4GOEfpJt9KZQaWFEH_8Nqh2OcxMBh/view?usp=sharing",
};

// Counted from the Experience list so the number never drifts from it
const companies = new Set(experienceData.map((e) => e.companyName)).size;

export const profile = {
  name: "Vaidik Singh Nirwan",
  shortName: "Vaidik",
  role: "Software Developer",
  focus: "Next.js · TypeScript · Node.js · MongoDB",
  // Shown as a green status pill; set to null to hide it.
  status: "Open to opportunities" as string | null,
  photo: "/portrait.png",
  yearsExperience: "2+",
  companies,
  bio: `Software Developer with 2+ years of experience across ${companies} companies building production web applications in Next.js, TypeScript, Node.js and MongoDB. I've shipped payments, document editors, form builders and AI-integration features end-to-end at an early-stage startup, with a strong focus on UI quality, performance and scalable architecture.`,
  highlights: [
    "Built an MCP server that lets AI assistants like Claude use our CRM, with OAuth consent, CSRF protection and stateless sessions",
    "Wired smart-document invoicing to Stripe across card, ACH and BNPL",
    "Launched a lead-form builder, a referral program and custom client domains",
    "Led frontend on M0's Meta Create, with a reusable component system adopted product-wide",
  ],
};

export const isCurrentRole = (e: Experience) =>
  !!e.current && (!e.duration?.end || e.duration.end === "Present");

export const currentRole = experienceData.find(isCurrentRole);

export type MockupId = "autoreply" | "dawamandi" | "naukri" | "hotel" | "notes";

export type Project = {
  name: string;
  summary: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
  status?: string;
  // Illustrative UI preview, since these projects have no live deployment
  mockup: MockupId;
};

// Personal projects only; company work lives in the experience section.
export const projectsData: Project[] = [
  {
    name: "AutoReply.ai",
    mockup: "autoreply",
    status: "In progress",
    summary:
      "AI-powered Instagram DM automation platform: keyword-triggered comment replies, automated DMs, lead capture and an analytics dashboard. Contextual replies come from a pluggable AI layer (Claude, OpenAI or a local Ollama model), with webhooks processed through a Redis-backed BullMQ queue.",
    tags: ["Fastify", "TypeScript", "PostgreSQL", "Drizzle", "BullMQ", "Redis", "Next.js", "Docker"],
  },
  {
    name: "DawaMandi",
    mockup: "dawamandi",
    summary:
      "B2B platform for selling medicine, with user registration, product listings, advanced search, order management, Stripe payments and inventory management.",
    tags: ["Next.js", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Stripe"],
    link: "https://github.com/Vaidik1308/medical_frontend",
    linkLabel: "View code",
  },
  {
    name: "Naukri",
    mockup: "naukri",
    summary:
      "Job-finding platform with user registration, job listings and advanced search, built full-stack in Next.js.",
    tags: ["Next.js", "Tailwind CSS", "Shadcn UI"],
    link: "https://github.com/Vaidik1308/job_website",
    linkLabel: "View code",
  },
  {
    name: "Hotel Booking Website",
    mockup: "hotel",
    summary:
      "Hotel booking site with room listings, date-based bookings, Stripe checkout, guest reviews and auth, with rooms and bookings managed in an embedded Sanity Studio CMS.",
    tags: ["Next.js", "TypeScript", "Sanity", "Stripe", "NextAuth", "SWR"],
    link: "https://github.com/Vaidik1308/hotel_website",
    linkLabel: "View code",
  },
  {
    name: "Notes & Blogs App",
    mockup: "notes",
    summary:
      "Productivity dashboard to write rich-text notes, manage tasks and publish blogs, with tags, authentication and a REST API over MongoDB.",
    tags: ["Next.js", "Prisma", "MongoDB", "NextAuth", "Zod", "Shadcn UI"],
    link: "https://github.com/Vaidik1308/next-notes_app",
    linkLabel: "View code",
  },
];
