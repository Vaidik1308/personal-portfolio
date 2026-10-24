"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { experienceData, type Experience as Exp } from "@/lib/data";
import { isCurrentRole } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { useOS } from "../context";
import { Chip, GlassPill, Group, Monogram } from "./ui";

const dates = (e: Exp) => `${e.duration?.start ?? ""} – ${e.duration?.end ?? (isCurrentRole(e) ? "Present" : "")}`;

function CurrentBadge() {
  return <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Current</span>;
}

function Detail({ e }: { e: Exp }) {
  return (
    <article className="space-y-6">
      <header className="flex items-start gap-4">
        <Monogram text={e.companyName ?? e.roleName} className="size-14 text-lg" />
        <div className="min-w-0 space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-sys-label">{e.roleName}</h2>
          <p className="flex flex-wrap items-center gap-2 text-sys-secondary">
            {e.companyLink ? (
              <a href={e.companyLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-sys-blue hover:underline">
                {e.companyName} <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ) : (
              <span>{e.companyName}</span>
            )}
            {isCurrentRole(e) && <CurrentBadge />}
          </p>
        </div>
      </header>
      <div className="flex flex-wrap gap-2">
        <Chip>{dates(e)}</Chip>
        <Chip>{e.jobType}</Chip>
        <Chip className="capitalize">{e.type}</Chip>
      </div>
      <section className="space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-sys-secondary">What I did</h3>
        <ul className="space-y-2.5">
          {e.desc.map((d) => (
            <li key={d} className="flex gap-2.5 text-[15px] leading-relaxed text-sys-label/90">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sys-blue" aria-hidden />
              {d}
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-sys-secondary">Stack</h3>
        <div className="flex flex-wrap gap-1.5">
          {e.skills.map((s) => <Chip key={s}>{s}</Chip>)}
        </div>
      </section>
    </article>
  );
}

export default function Experience() {
  const { compact, setNav } = useOS();
  const [selected, setSelected] = useState<number | null>(compact ? null : 0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!compact) return;
    setNav(selected === null ? null : { label: "Experience", onBack: () => setSelected(null) });
    rootRef.current?.closest("[data-scroll]")?.scrollTo({ top: 0 });
  }, [compact, selected, setNav]);
  useEffect(() => () => setNav(null), [setNav]);

  if (compact) {
    return (
      <div ref={rootRef} className="relative px-4 pb-10">
        <AnimatePresence mode="popLayout" initial={false}>
          {selected === null ? (
            <motion.div key="list" initial={{ x: "-30%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-30%", opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 40 }}>
              <p className="mb-3 px-1 text-sm text-sys-secondary">{experienceData.length} roles. Tap one to see details.</p>
              <Group>
                {experienceData.map((e, i) => (
                  <button key={i} onClick={() => setSelected(i)} className="flex w-full items-center gap-3 px-4 py-3 text-left active:bg-black/5 dark:active:bg-white/5">
                    <Monogram text={e.companyName ?? e.roleName} className="size-10 text-sm" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold text-sys-label">{e.companyName}</span>
                        {isCurrentRole(e) && <CurrentBadge />}
                      </div>
                      <p className="truncate text-sm text-sys-label/80">{e.roleName}</p>
                      <p className="text-xs text-sys-secondary">{dates(e)}</p>
                    </div>
                    <ChevronRight className="size-5 shrink-0 text-sys-secondary/60" aria-hidden />
                  </button>
                ))}
              </Group>
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 400, damping: 40 }} className="rounded-2xl bg-sys-card p-5">
              <Detail e={experienceData[selected]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Mail-style split view
  return (
    <div className="flex h-full">
      <nav aria-label="Roles" className="w-64 shrink-0 space-y-1 overflow-y-auto border-r border-black/[0.06] bg-sys-card/25 p-2 dark:border-white/10 dark:bg-sys-card/20">
        {experienceData.map((e, i) => {
          const active = selected === i;
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              aria-current={active}
              className={cn(
                "relative isolate flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors",
                !active && "hover:bg-white/30 dark:hover:bg-white/5"
              )}
            >
              {active && <GlassPill layoutId="experience-selection" tint className="rounded-xl" />}
              <Monogram text={e.companyName ?? e.roleName} className="mt-0.5 size-8 text-[11px]" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-semibold text-sys-label">{e.companyName}</span>
                  {isCurrentRole(e) && <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" title="Current role" />}
                </div>
                <p className="truncate text-xs text-sys-label/75">{e.roleName}</p>
                <p className="text-[11px] text-sys-secondary">{dates(e)}</p>
              </div>
            </button>
          );
        })}
      </nav>
      <div className="min-w-0 flex-1 overflow-y-auto bg-sys-card/90 p-8">
        {selected !== null && <Detail e={experienceData[selected]} />}
      </div>
    </div>
  );
}
