"use client";

import React from "react";
import { FaReact } from "react-icons/fa";
import { Bot, KeyRound, Network, Webhook } from "lucide-react";
import {
  SiCloudflare, SiCplusplus, SiCss3, SiDart, SiDocker, SiExpress, SiFastapi, SiFigma, SiFramer, SiGit, SiGithub,
  SiGreensock, SiHtml5, SiJavascript, SiMongodb, SiMui, SiNestjs, SiNextdotjs, SiNodedotjs, SiPostgresql,
  SiPython, SiReact, SiRedux, SiShadcnui, SiStripe, SiTailwindcss, SiTypescript, SiVercel, SiZod,
} from "react-icons/si";
import { cn } from "@/lib/utils";
import { useOS } from "../context";

type Skill = { name: string; icon: React.ComponentType<{ className?: string }>; color: string };

export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "Python", icon: SiPython, color: "text-blue-500" },
      { name: "C++", icon: SiCplusplus, color: "text-blue-600" },
      { name: "Dart", icon: SiDart, color: "text-sky-500" },
      { name: "HTML", icon: SiHtml5, color: "text-orange-600" },
      { name: "CSS", icon: SiCss3, color: "text-blue-500" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
      { name: "React", icon: FaReact, color: "text-sky-500" },
      { name: "React Native", icon: SiReact, color: "text-sky-500" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-teal-500" },
      { name: "shadcn/ui", icon: SiShadcnui, color: "text-black dark:text-white" },
      { name: "Material UI", icon: SiMui, color: "text-blue-500" },
      { name: "Framer Motion", icon: SiFramer, color: "text-pink-500" },
      { name: "GSAP", icon: SiGreensock, color: "text-lime-600" },
      { name: "Redux", icon: SiRedux, color: "text-violet-500" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
      { name: "Express", icon: SiExpress, color: "text-zinc-500" },
      { name: "NestJS", icon: SiNestjs, color: "text-rose-600" },
      { name: "FastAPI", icon: SiFastapi, color: "text-teal-600" },
      { name: "Zod", icon: SiZod, color: "text-blue-700 dark:text-blue-400" },
      { name: "Microservices", icon: Network, color: "text-indigo-500" },
      { name: "OAuth", icon: KeyRound, color: "text-amber-500" },
      { name: "Webhooks", icon: Webhook, color: "text-fuchsia-500" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-700 dark:text-sky-400" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: SiGit, color: "text-orange-500" },
      { name: "GitHub", icon: SiGithub, color: "text-black dark:text-white" },
      { name: "Stripe", icon: SiStripe, color: "text-indigo-500" },
      { name: "Vercel", icon: SiVercel, color: "text-black dark:text-white" },
      { name: "Cloudflare", icon: SiCloudflare, color: "text-orange-500" },
      { name: "Docker", icon: SiDocker, color: "text-sky-500" },
      { name: "MCP", icon: Bot, color: "text-violet-500" },
      { name: "Figma", icon: SiFigma, color: "text-fuchsia-500" },
    ],
  },
];

export default function Skills() {
  const { compact } = useOS();
  return (
    <div className={cn("space-y-7 pb-10", compact ? "px-4" : "p-7")}>
      {skillGroups.map((g) => (
        <section key={g.title}>
          <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-sys-secondary">{g.title}</h3>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(76px,1fr))] gap-x-2 gap-y-4">
            {g.skills.map(({ name, icon: Icon, color }) => (
              <li key={name} className="flex flex-col items-center gap-1.5">
                <div className="liquid-glass grid size-14 place-items-center rounded-[22%] transition hover:-translate-y-0.5 hover:scale-105">
                  <Icon className={cn("size-7", color)} />
                </div>
                <span className="text-center text-xs font-medium text-sys-label/90">{name}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
