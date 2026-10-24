"use client";

import Image from "next/image";
import { BriefcaseBusiness, FileText, GraduationCap, MapPin, Send, Sparkles } from "lucide-react";
import { aboutData } from "@/lib/data";
import { currentRole, profile, socials } from "@/lib/portfolio";
import { useOS } from "../context";
import { Button, Group, Row, StatusPill } from "./ui";

const facts = [
  { label: "Currently", value: currentRole ? `${currentRole.roleName} @ ${currentRole.companyName}` : profile.role, icon: <BriefcaseBusiness className="size-4" /> },
  { label: "Experience", value: `${profile.yearsExperience} years across ${profile.companies} companies`, icon: <Sparkles className="size-4" /> },
  { label: "Education", value: `${aboutData.education.college.branch}, ${aboutData.education.college.name} (${aboutData.education.college.years}) · CGPA ${aboutData.education.college.cgpa}`, icon: <GraduationCap className="size-4" /> },
  { label: "Based in", value: `${aboutData.location}${aboutData.nativeTown ? ` · from ${aboutData.nativeTown}` : ""}`, icon: <MapPin className="size-4" /> },
];

export default function About() {
  const { compact, openApp } = useOS();

  const actions = (
    <div className={compact ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2"}>
      <Button href={socials.resume} external>
        <FileText className="size-4" aria-hidden /> View résumé
      </Button>
      <Button variant="secondary" onClick={() => openApp("contact")}>
        <Send className="size-4" aria-hidden /> Get in touch
      </Button>
    </div>
  );

  if (compact) {
    return (
      <div className="space-y-6 px-4 pb-10">
        <div className="flex flex-col items-center gap-3 pt-2 text-center">
          <Image src={profile.photo} alt={profile.name} width={112} height={112} className="size-28 rounded-full object-cover shadow-lg ring-4 ring-white dark:ring-zinc-800" priority />
          <div>
            <h2 className="text-2xl font-bold text-sys-label">{profile.name}</h2>
            <p className="text-sys-secondary">{profile.role} · {profile.focus.split(" · ")[0]}</p>
          </div>
          {profile.status && <StatusPill>{profile.status}</StatusPill>}
        </div>
        {actions}
        <Group title="At a glance">
          {facts.map((f) => <Row key={f.label} {...f} />)}
        </Group>
        <Group title="About me">
          <p className="px-4 py-3 text-[15px] leading-relaxed text-sys-label">{profile.bio}</p>
        </Group>
      </div>
    );
  }

  // "About This Mac" layout
  return (
    <div className="flex min-h-full flex-col gap-8 p-8">
      <div className="flex items-start gap-8">
        <Image src={profile.photo} alt={profile.name} width={160} height={160} className="size-36 shrink-0 rounded-full object-cover shadow-xl ring-4 ring-white dark:ring-zinc-700" priority />
        <div className="min-w-0 flex-1 space-y-4">
          <div className="space-y-1.5">
            {profile.status && <StatusPill>{profile.status}</StatusPill>}
            <h2 className="text-3xl font-bold tracking-tight text-sys-label">{profile.name}</h2>
            <p className="text-base text-sys-secondary">{profile.role} · {profile.focus}</p>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
            {facts.map((f) => (
              <div key={f.label} className="contents">
                <dt className="font-semibold text-sys-label">{f.label}</dt>
                <dd className="text-sys-secondary">{f.value}</dd>
              </div>
            ))}
          </dl>
          {actions}
        </div>
      </div>
      <div className="grid gap-6 border-t border-black/[0.06] pt-6 dark:border-white/10 lg:grid-cols-[1.4fr_1fr]">
        <p className="text-[15px] leading-relaxed text-sys-label/90">{profile.bio}</p>
        <ul className="space-y-2.5">
          {profile.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm text-sys-label/90">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sys-blue" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
