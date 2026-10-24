"use client";

import { ArrowUpRight, Lock } from "lucide-react";
import { projectsData, type Project } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useOS } from "../context";
import ProjectMockup from "./ProjectMockup";

const MAX_TAGS = 4;

const tagCls = "rounded-full border-transparent bg-black/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-sys-label/80 shadow-none hover:bg-black/[0.05] dark:bg-white/10 dark:hover:bg-white/10";

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className="shrink-0 rounded-full border-amber-500/30 bg-amber-500/10 px-2 py-0 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
      {status}
    </Badge>
  );
}

function ProjectLink({ p, className }: { p: Project; className?: string }) {
  if (!p.link) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-xs text-sys-secondary", className)}>
        <Lock className="size-3.5" aria-hidden /> Private repo
      </span>
    );
  }
  return (
    <Button asChild size="sm" className={cn("h-8 rounded-lg bg-sys-blue px-3 text-white shadow-sm hover:bg-sys-blue/90", className)}>
      <a href={p.link} target="_blank" rel="noreferrer">
        {p.linkLabel ?? "Visit site"} <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
    </Button>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const shown = p.tags.slice(0, MAX_TAGS);
  const hidden = p.tags.length - shown.length;

  return (
    <Dialog>
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-black/[0.06] bg-sys-card text-sys-label shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]">
        <DialogTrigger className="block border-b border-black/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sys-blue dark:border-white/10" aria-label={`${p.name} details`}>
          <ProjectMockup id={p.mockup} className="transition-transform duration-500 hover:scale-[1.03]" />
        </DialogTrigger>
        <CardHeader className="flex-row items-center gap-2 space-y-0 p-4 pb-2">
          <CardTitle className="truncate text-base">{p.name}</CardTitle>
          {p.status && <StatusBadge status={p.status} />}
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-3 p-4 pt-0">
          {/* Fixed 3-line block keeps every card the same height */}
          <p className="line-clamp-3 min-h-[4.125rem] text-sm leading-[1.375rem] text-sys-label/85">{p.summary}</p>
          <div className="flex flex-wrap content-start gap-1.5">
            {shown.map((t) => <Badge key={t} variant="secondary" className={tagCls}>{t}</Badge>)}
            {hidden > 0 && <Badge variant="secondary" className={tagCls}>+{hidden}</Badge>}
          </div>
        </CardContent>

        <CardFooter className="mt-auto justify-between gap-2 border-t border-black/[0.06] p-3 px-4 dark:border-white/10">
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 rounded-lg px-2 text-sys-blue hover:bg-sys-blue/10 hover:text-sys-blue">
              Read more
            </Button>
          </DialogTrigger>
          <ProjectLink p={p} />
        </CardFooter>
      </Card>

      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-2xl border-black/10 bg-sys-card text-sys-label dark:border-white/10 max-sm:w-[calc(100%-2rem)]">
        <DialogHeader className="flex-row items-center gap-2 space-y-0 text-left">
          <DialogTitle className="text-lg">{p.name}</DialogTitle>
          {p.status && <StatusBadge status={p.status} />}
        </DialogHeader>
        <ProjectMockup id={p.mockup} className="rounded-xl ring-1 ring-black/10 dark:ring-white/10" />
        <DialogDescription className="text-[15px] leading-relaxed text-sys-label/90">{p.summary}</DialogDescription>
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-sys-secondary">Tech stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => <Badge key={t} variant="secondary" className={tagCls}>{t}</Badge>)}
          </div>
        </div>
        <div className="flex justify-end">
          {p.link ? <ProjectLink p={p} /> : <span className="text-xs text-sys-secondary">Private repo · demo available on request</span>}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Projects() {
  const { compact } = useOS();
  return (
    <div className={cn("pb-10", compact ? "px-4" : "p-6")}>
      <p className="mb-4 px-1 text-sm text-sys-secondary">
        {projectsData.length} items · personal projects I&apos;ve built end to end
      </p>
      <ul className="grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {projectsData.map((p) => (
          <li key={p.name} className="min-w-0">
            <ProjectCard p={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
