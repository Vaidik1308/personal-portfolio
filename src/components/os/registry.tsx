import React from "react";
import {
  BriefcaseBusiness,
  FileText,
  FolderOpen,
  MessageCircle,
  CodeXml,
  UserRound,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { socials } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type IconType = React.ComponentType<{ className?: string }>;

export type AppId = "about" | "experience" | "projects" | "skills" | "contact";

export type WindowApp = {
  kind: "window";
  id: AppId;
  name: string;
  icon: IconType;
  tint: string;
  size: { w: number; h: number };
  // Translucent content that lets the frosted wallpaper show through (macOS "vibrancy")
  vibrant?: boolean;
};

export type LinkApp = {
  kind: "link";
  id: string;
  name: string;
  icon: IconType;
  tint: string;
  href: string;
};

export type AnyApp = WindowApp | LinkApp;

export const windowApps: WindowApp[] = [
  { kind: "window", id: "about", name: "About", icon: UserRound, tint: "from-indigo-400 to-indigo-600", size: { w: 760, h: 560 } },
  { kind: "window", id: "experience", name: "Experience", icon: BriefcaseBusiness, tint: "from-amber-300 to-orange-500", size: { w: 920, h: 600 }, vibrant: true },
  { kind: "window", id: "projects", name: "Projects", icon: FolderOpen, tint: "from-sky-300 to-blue-500", size: { w: 880, h: 600 } },
  { kind: "window", id: "skills", name: "Skills", icon: CodeXml, tint: "from-fuchsia-400 to-violet-600", size: { w: 700, h: 540 }, vibrant: true },
  { kind: "window", id: "contact", name: "Contact", icon: MessageCircle, tint: "from-emerald-400 to-green-600", size: { w: 640, h: 560 } },
];

export const linkApps: LinkApp[] = [
  { kind: "link", id: "resume", name: "Résumé", icon: FileText, tint: "from-rose-400 to-red-600", href: socials.resume },
  { kind: "link", id: "github", name: "GitHub", icon: FaGithub, tint: "from-zinc-600 to-zinc-900", href: socials.github },
  { kind: "link", id: "linkedin", name: "LinkedIn", icon: FaLinkedinIn, tint: "from-[#2d8cf0] to-[#0A66C2]", href: socials.linkedin },
  { kind: "link", id: "x", name: "X", icon: FaXTwitter, tint: "from-zinc-800 to-black", href: socials.x },
];

export const getApp = (id: AppId) => windowApps.find((a) => a.id === id)!;

export const isAppId = (v: string): v is AppId => windowApps.some((a) => a.id === v);

export function AppIcon({ app, className }: { app: AnyApp; className?: string }) {
  const Icon = app.icon;
  return (
    <div
      className={cn(
        "relative grid place-items-center rounded-[23%] bg-gradient-to-b shadow-[0_4px_12px_-2px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/20",
        app.tint,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/30 to-transparent to-50%" />
      <Icon className="relative h-[50%] w-[50%] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
    </div>
  );
}
