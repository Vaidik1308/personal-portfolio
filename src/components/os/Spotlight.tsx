"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CornerDownLeft, Search } from "lucide-react";
import { experienceData } from "@/lib/data";
import { projectsData } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { AppIcon, linkApps, windowApps, type AppId } from "./registry";
import { showRole } from "./apps/Experience";
import { skillGroups } from "./apps/Skills";
import { Monogram } from "./apps/ui";

type Result = {
  key: string;
  section: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  run: () => void;
};

const MAX_RESULTS = 12;

export default function Spotlight({ onOpen, onClose }: { onOpen: (id: AppId) => void; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const all = useMemo<Result[]>(() => {
    const projectsApp = windowApps.find((a) => a.id === "projects")!;
    const apps: Result[] = windowApps.map((a) => ({
      key: `app-${a.id}`, section: "Apps", title: a.name, subtitle: "Application",
      icon: <AppIcon app={a} className="size-7" />, run: () => onOpen(a.id),
    }));
    const links: Result[] = linkApps.map((a) => ({
      key: `link-${a.id}`, section: "Links", title: a.name, subtitle: a.href.replace(/^https?:\/\/(www\.)?/, "").split("/")[0],
      icon: <AppIcon app={a} className="size-7" />, run: () => window.open(a.href, "_blank", "noopener,noreferrer"),
    }));
    const projects: Result[] = projectsData.map((p) => ({
      key: `project-${p.name}`, section: "Projects", title: p.name, subtitle: p.tags.slice(0, 3).join(" · "),
      icon: <AppIcon app={projectsApp} className="size-7" />, run: () => onOpen("projects"),
    }));
    const roles: Result[] = experienceData.map((e, i) => ({
      key: `role-${i}`, section: "Experience", title: e.companyName ?? e.roleName, subtitle: `${e.roleName} · ${e.duration?.start} – ${e.duration?.end}`,
      icon: <Monogram text={e.companyName ?? e.roleName} className="size-7 text-[10px]" />, run: () => { onOpen("experience"); showRole(i); },
    }));
    const skills: Result[] = skillGroups.flatMap((g) => g.skills.map(({ name, icon: Icon, color }) => ({
      key: `skill-${name}`, section: "Skills", title: name, subtitle: g.title,
      icon: <span className="grid size-7 place-items-center rounded-lg bg-white shadow-sm ring-1 ring-black/5 dark:bg-white/10"><Icon className={cn("size-4", color)} /></span>,
      run: () => onOpen("skills"),
    })));
    return [...apps, ...links, ...projects, ...roles, ...skills];
  }, [onOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all.filter((r) => r.section === "Apps" || r.section === "Links");
    // Title matches rank ahead of subtitle-only matches
    const scored = all
      .map((r) => {
        const t = r.title.toLowerCase();
        const score = t.startsWith(q) ? 0 : t.includes(q) ? 1 : r.subtitle?.toLowerCase().includes(q) ? 2 : -1;
        return { r, score };
      })
      .filter((x) => x.score >= 0)
      .sort((a, b) => a.score - b.score);
    return scored.slice(0, MAX_RESULTS).map((x) => x.r);
  }, [all, query]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (r?: Result) => {
    if (!r) return;
    onClose();
    r.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = results.length;
      if (n) setActive((a) => (a + (e.key === "ArrowDown" ? 1 : n - 1)) % n);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  let lastSection = "";
  return (
    // The desktop blurs in behind, while the panel grows out of its own centre and comes into focus
    <motion.div
      className="fixed inset-0 z-[9800]"
      onPointerDown={onClose}
      initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
      animate={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.18)" }}
      exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Spotlight search"
        initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.6, filter: "blur(12px)", transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
        transition={{ type: "spring", stiffness: 380, damping: 30, opacity: { duration: 0.2 }, filter: { duration: 0.25 } }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{ x: "-50%" }}
        className="absolute left-1/2 top-[16vh] w-[min(640px,calc(100vw-32px))] overflow-hidden rounded-[22px] bg-white/70 text-sys-label shadow-[0_30px_90px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/10 backdrop-blur-3xl backdrop-saturate-150 dark:bg-zinc-900/70 dark:ring-white/15"
      >
        <div className="flex items-center gap-3 px-5 py-3.5">
          <Search className="size-6 shrink-0 text-sys-secondary" strokeWidth={2.2} aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Spotlight Search"
            aria-label="Search apps, projects, experience and skills"
            role="combobox"
            aria-expanded
            aria-controls="spotlight-results"
            aria-activedescendant={results[active] ? `spotlight-${results[active].key}` : undefined}
            className="min-w-0 flex-1 bg-transparent text-[22px] font-light tracking-tight outline-none placeholder:text-sys-secondary/70"
          />
        </div>

        {results.length > 0 ? (
          <ul ref={listRef} id="spotlight-results" role="listbox" className="max-h-[min(400px,50vh)] overflow-y-auto border-t border-black/[0.08] p-2 dark:border-white/10">
            {results.map((r, i) => {
              const header = r.section !== lastSection ? r.section : null;
              lastSection = r.section;
              return (
                <React.Fragment key={r.key}>
                  {header && <li role="presentation" className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-sys-secondary">{header}</li>}
                  <li
                    id={`spotlight-${r.key}`}
                    role="option"
                    aria-selected={i === active}
                    data-index={i}
                    onPointerMove={() => setActive(i)}
                    onClick={() => choose(r)}
                    className={cn("flex cursor-default items-center gap-3 rounded-xl px-3 py-1.5", i === active && "bg-sys-blue text-white")}
                  >
                    {r.icon}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium">{r.title}</span>
                      {r.subtitle && <span className={cn("block truncate text-xs", i === active ? "text-white/75" : "text-sys-secondary")}>{r.subtitle}</span>}
                    </span>
                    {i === active && <CornerDownLeft className="size-4 shrink-0 opacity-80" aria-hidden />}
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        ) : (
          <p className="border-t border-black/[0.08] px-5 py-6 text-center text-sm text-sys-secondary dark:border-white/10">No results for “{query}”</p>
        )}

        <div className="flex items-center gap-4 border-t border-black/[0.08] px-5 py-2 text-[11px] max-md:hidden text-sys-secondary dark:border-white/10">
          <span><Kbd>↑</Kbd><Kbd>↓</Kbd> to navigate</span>
          <span><Kbd>↵</Kbd> to open</span>
          <span><Kbd>esc</Kbd> to close</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="mr-1 inline-grid min-w-[18px] place-items-center rounded-[5px] bg-black/[0.07] px-1 font-sf text-[10px] font-semibold dark:bg-white/15">{children}</kbd>;
}
