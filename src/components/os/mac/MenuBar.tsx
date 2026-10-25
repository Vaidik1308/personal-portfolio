"use client";

import { useEffect, useRef, useState } from "react";
import { BatteryCharging, FileText, Moon, Search, SlidersHorizontal, Sun, Wifi } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { profile, socials } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { useIsDark, useKeyLabels, useNow } from "../context";
import { getApp, windowApps, type AppId } from "../registry";
import { GlassPill } from "../apps/ui";

export type Command = "spotlight" | "cycle" | "minimize" | "close";

type Props = {
  focused: AppId | null;
  hasWindows: boolean;
  onOpen: (id: AppId) => void;
  onCommand: (cmd: Command) => void;
  onCloseAll: () => void;
};

export default function MenuBar({ focused, hasWindows, onOpen, onCommand, onCloseAll }: Props) {
  const now = useNow();
  const keys = useKeyLabels();
  const dark = useIsDark();
  const { setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  const menuItem = "flex w-full items-center justify-between gap-4 rounded-[5px] px-2.5 py-1 text-left hover:bg-sys-blue hover:text-white disabled:pointer-events-none disabled:opacity-40 [&:hover>span]:opacity-80";

  // macOS menu items: plain text, a rounded pill on hover/active
  const item = "rounded-full px-3 py-[3px] transition-colors hover:bg-black/10 dark:hover:bg-white/[0.14] focus-visible:outline-none focus-visible:bg-black/10 dark:focus-visible:bg-white/15";

  return (
    <header className="relative z-[9500] flex h-8 shrink-0 select-none items-center justify-between bg-white/45 px-2.5 text-[13.5px] text-zinc-900 backdrop-blur-2xl backdrop-saturate-150 dark:bg-black/85 dark:text-white/95">
      <nav aria-label="Main" className="flex min-w-0 items-center gap-0.5">
        <div ref={menuRef} className="relative">
          <button onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} aria-haspopup="menu" aria-label={`${profile.shortName} menu`} className={cn(item, "flex items-center px-2.5", menuOpen && "bg-black/10 dark:bg-white/15")}>
            <span className="grid size-[17px] place-items-center rounded-full bg-zinc-900 text-[10px] font-black text-white dark:bg-white dark:text-black">V</span>
          </button>
          {menuOpen && (
            <div role="menu" className="absolute left-0 top-7 w-64 rounded-lg bg-white/85 p-1 shadow-2xl ring-1 ring-black/10 backdrop-blur-2xl dark:bg-zinc-800/90 dark:ring-white/10">
              {[
                { label: "About Vaidik", run: () => onOpen("about") },
                { label: "Contact…", run: () => onOpen("contact") },
              ].map((m) => (
                <button key={m.label} role="menuitem" onClick={() => { m.run(); setMenuOpen(false); }} className="block w-full rounded-[5px] px-2.5 py-1 text-left hover:bg-sys-blue hover:text-white">
                  {m.label}
                </button>
              ))}
              <a role="menuitem" href={socials.resume} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="block rounded-[5px] px-2.5 py-1 hover:bg-sys-blue hover:text-white">
                Download Résumé ↗
              </a>
              <div className="my-1 h-px bg-black/10 dark:bg-white/10" />
              {([
                { cmd: "spotlight", label: "Spotlight Search…", keys: `${keys.mod}K` },
                { cmd: "cycle", label: "Cycle Through Windows", keys: `${keys.alt}\``, needsWindow: true },
                { cmd: "minimize", label: "Minimize Window", keys: `${keys.alt}M`, needsWindow: true },
                { cmd: "close", label: "Close Window", keys: `${keys.alt}W`, needsWindow: true },
              ] as const).map((m) => (
                <button key={m.cmd} role="menuitem" disabled={"needsWindow" in m && !focused} onClick={() => { onCommand(m.cmd); setMenuOpen(false); }} className={menuItem}>
                  {m.label}
                  <span className="opacity-50">{m.keys}</span>
                </button>
              ))}
              <div className="my-1 h-px bg-black/10 dark:bg-white/10" />
              <button role="menuitem" disabled={!hasWindows} onClick={() => { onCloseAll(); setMenuOpen(false); }} className={menuItem}>
                Close All Windows
              </button>
            </div>
          )}
        </div>
        <span className="px-2.5 font-bold" aria-live="polite">{focused ? getApp(focused).name : profile.shortName}</span>
        {windowApps.map((a) => (
          <button key={a.id} onClick={() => onOpen(a.id)} aria-current={focused === a.id ? "page" : undefined} className={cn(item, "relative isolate", focused === a.id && "hover:bg-transparent dark:hover:bg-transparent")}>
            {focused === a.id && <GlassPill layoutId="menubar-selection" className="rounded-full !shadow-[inset_0_1px_1px_rgb(255_255_255/0.35),0_1px_3px_rgb(0_0_0/0.15)]" />}
            {a.name}
          </button>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-0.5">
        <a href={socials.resume} target="_blank" rel="noreferrer" className="mr-2 inline-flex items-center gap-1 rounded-full bg-sys-blue px-3 py-[3px] text-xs font-semibold text-white shadow-sm transition hover:brightness-110">
          <FileText className="size-3.5" aria-hidden /> Résumé
        </a>
        {/* Wi-Fi, battery and Control Centre are decorative, like the real menu bar extras */}
        <span className="flex items-center gap-4 px-2 max-lg:hidden" aria-hidden>
          <Wifi className="size-[17px]" strokeWidth={2.2} />
          <BatteryCharging className="size-[22px]" strokeWidth={1.8} />
        </span>
        <button onClick={() => onCommand("spotlight")} aria-label="Spotlight search" title={`Spotlight (${keys.mod}K)`} className={cn(item, "px-2 py-1")}>
          <Search className="size-[15px]" strokeWidth={2.4} />
        </button>
        <span className="flex items-center px-2 max-lg:hidden" aria-hidden>
          <SlidersHorizontal className="size-[15px]" strokeWidth={2.4} />
        </span>
        <button onClick={() => setTheme(dark ? "light" : "dark")} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"} className={cn(item, "px-2 py-1")}>
          {dark ? <Sun className="size-[15px]" strokeWidth={2.4} /> : <Moon className="size-[15px]" strokeWidth={2.4} />}
        </button>
        {/* Date drops on narrower windows so the clock never wraps */}
        <time className="whitespace-nowrap px-2 tabular-nums" suppressHydrationWarning>
          {now && (
            <>
              <span className="max-lg:hidden">{now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }).replace(",", "")}{"\u00a0\u00a0"}</span>
              {now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </>
          )}
        </time>
      </div>
    </header>
  );
}
