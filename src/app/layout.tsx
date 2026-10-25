import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { currentRole, profile, socials } from "@/lib/portfolio";
import { aboutData } from "@/lib/data";
import { siteUrl } from "@/lib/site";

const title = `${profile.name} | ${profile.role} (Next.js, TypeScript, Node.js)`;
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Set in Vercel after adding the site to Google Search Console (HTML tag method)
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  formatDetection: { telephone: false },
};

// Structured data so search engines can show a rich profile result
const personId = `${siteUrl}/#person`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${profile.name} Portfolio`,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: title,
      description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: profile.shortName,
      jobTitle: profile.role,
      description: profile.bio,
      url: siteUrl,
      image: `${siteUrl}/avatar.png`,
      email: `mailto:${socials.email}`,
      ...(currentRole && { worksFor: { "@type": "Organization", name: currentRole.companyName } }),
      address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
      alumniOf: { "@type": "CollegeOrUniversity", name: aboutData.education.college.name },
      knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "NestJS", "FastAPI", "Stripe", "Model Context Protocol"],
      sameAs: [socials.github, socials.linkedin, socials.x],
    },
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sf antialiased bg-background text-foreground w-full flex flex-col h-[100dvh] overflow-hidden">
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
