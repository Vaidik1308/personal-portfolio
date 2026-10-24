import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { profile, socials } from "@/lib/portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaidikportfolio.vercel.app";
const title = `${profile.name} | ${profile.role}`;
const description = `${profile.role} with ${profile.yearsExperience} years of experience across ${profile.companies} companies, building production web apps in Next.js, TypeScript, Node.js and MongoDB. Explore my experience, projects, skills and résumé.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Vaidik",
    "Software Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Bengaluru",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title,
    description,
    locale: "en_IN",
    firstName: "Vaidik",
    lastName: "Singh Nirwan",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@kriishnaa_13",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

// Structured data so search engines can show a rich profile result
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  image: `${siteUrl}/avatar.png`,
  email: `mailto:${socials.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Dayananda Sagar College of Engineering" },
  knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "NestJS", "FastAPI", "Stripe", "Model Context Protocol"],
  sameAs: [socials.github, socials.linkedin, socials.x],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#05060f" },
    { media: "(prefers-color-scheme: dark)", color: "#05060f" },
  ],
};

// Applies the saved theme before first paint to avoid a light/dark flash; dark unless the visitor chose light
const themeScript = `try{var t=localStorage.getItem("vite-ui-theme");if(t!=="light"&&!(t==="system"&&!matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="font-sf antialiased bg-background text-foreground w-full flex flex-col h-[100dvh] overflow-hidden">
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
