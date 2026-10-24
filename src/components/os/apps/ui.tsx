"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-black/[0.05] px-2.5 py-1 text-xs font-medium text-sys-label/80 dark:bg-white/10",
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      {children}
    </span>
  );
}

type BtnProps = {
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
};

export function Button({ variant = "primary", href, onClick, children, className, external, disabled, type = "button" }: BtnProps) {
  const cls = cn(
    "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sys-blue/60",
    variant === "primary"
      ? "bg-sys-blue text-white shadow-sm hover:brightness-110"
      : "bg-black/[0.06] text-sys-label hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15",
    className
  );
  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={cls}>
        {children}
        {external && <ArrowUpRight className="size-3.5 opacity-80" aria-hidden />}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

// iOS "inset grouped" list container
export function Group({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={className}>
      {title && <h3 className="mb-1.5 px-4 text-[13px] font-medium uppercase tracking-wide text-sys-secondary">{title}</h3>}
      <div className="overflow-hidden rounded-xl bg-sys-card ring-1 ring-black/[0.04] dark:ring-white/[0.06] [&>*+*]:border-t [&>*+*]:border-black/[0.06] dark:[&>*+*]:border-white/10">
        {children}
      </div>
    </section>
  );
}

export function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 text-[15px]">
      {icon && <span className="mt-0.5 text-sys-secondary">{icon}</span>}
      <span className="w-28 shrink-0 text-sys-secondary">{label}</span>
      <span className="min-w-0 flex-1 text-sys-label">{value}</span>
    </div>
  );
}

export function Monogram({ text, className }: { text: string; className?: string }) {
  // Deterministic tint per name so each company/project has a stable colour
  const tints = [
    "from-orange-400 to-rose-500",
    "from-sky-400 to-indigo-500",
    "from-emerald-400 to-teal-600",
    "from-violet-400 to-fuchsia-600",
    "from-amber-300 to-orange-500",
    "from-cyan-400 to-blue-600",
    "from-pink-400 to-rose-600",
  ];
  const idx = text.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % tints.length;
  return (
    <div
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-[22%] bg-gradient-to-br font-bold text-white shadow-sm",
        tints[idx],
        className
      )}
    >
      {text.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase()}
    </div>
  );
}

/**
 * Frosted "Liquid Glass" selection pill. Rendered inside a `relative` parent;
 * sharing a layoutId makes it glide between items instead of jumping.
 */
export function GlassPill({ layoutId, tint, className }: { layoutId: string; tint?: boolean; className?: string }) {
  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden
      transition={{ type: "spring", stiffness: 500, damping: 38 }}
      className={cn("liquid-glass absolute inset-0 -z-10 rounded-lg", tint && "liquid-glass-tint", className)}
    />
  );
}
