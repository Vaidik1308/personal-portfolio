"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, ChevronLeft, FileText, Moon, Sun } from "lucide-react";
import { currentRole, profile, socials } from "@/lib/portfolio";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { OSContext, useIsDark, useNow, type NavOverride } from "../context";
import { AppIcon, getApp, isAppId, linkApps, windowApps, type AnyApp, type AppId } from "../registry";
import { appContent } from "../apps";
import { StatusPill } from "../apps/ui";
import DesktopHint from "./DesktopHint";

const dockIds: AppId[] = ["about", "experience", "projects", "contact"];
const gridApps: AnyApp[] = [...windowApps.filter((a) => !dockIds.includes(a.id)), ...linkApps];

function HomeIcon({ app, onOpen, showLabel = true }: { app: AnyApp; onOpen: (id: AppId) => void; showLabel?: boolean }) {
  const body = (
    <>
      <AppIcon app={app} className="size-[60px]" />
      {showLabel && <span className="max-w-[72px] truncate text-[12px] font-medium text-zinc-900 dark:text-white">{app.name}</span>}
    </>
  );
  const cls = "flex flex-col items-center gap-1.5 transition-transform active:scale-90";
  return app.kind === "link" ? (
    <a href={app.href} target="_blank" rel="noreferrer" aria-label={`${app.name} (opens in new tab)`} className={cls}>{body}</a>
  ) : (
    <button onClick={() => onOpen(app.id)} aria-label={`Open ${app.name}`} className={cls}>{body}</button>
  );
}

export default function IOSHome() {
  const [open, setOpen] = useState<AppId | null>(null);
  const [nav, setNav] = useState<NavOverride>(null);
  const now = useNow();
  const dark = useIsDark();
  const { setTheme } = useTheme();

  // Each opened app gets a history entry so the phone's back gesture returns home
  const openApp = useCallback((id: AppId) => {
    setOpen(id);
    history.pushState({ app: id }, "", `#${id}`);
  }, []);

  const goHome = useCallback(() => {
    if (history.state?.app) history.back();
    else setOpen(null);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (isAppId(hash)) {
      history.replaceState(null, "", window.location.pathname);
      openApp(hash);
    }
    const onPop = () => {
      const app = history.state?.app;
      setOpen(app && isAppId(app) ? app : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [openApp]);

  useEffect(() => {
    if (!open) setNav(null);
  }, [open]);

  const ctx = useMemo(() => ({ compact: true, openApp, setNav }), [openApp]);
  const widget = "rounded-[24px] bg-white/55 p-4 text-left text-zinc-900 shadow-lg ring-1 ring-white/50 backdrop-blur-2xl transition active:scale-[0.97] dark:bg-zinc-900/50 dark:text-white dark:ring-white/10";

  return (
    <OSContext.Provider value={ctx}>
      <div className="wallpaper fixed inset-0 overflow-hidden font-sf">
        <main className="h-full overflow-y-auto px-5 pb-36 pt-[max(env(safe-area-inset-top),20px)]">
          <header className="flex items-start justify-between pb-5 pt-3">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wide text-zinc-900/60 dark:text-white/60" suppressHydrationWarning>
                {now?.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" }) ?? " "}
              </p>
              <h1 className="text-[34px] font-bold leading-tight tracking-tight text-zinc-900 dark:text-white">Hi, I&apos;m {profile.shortName}</h1>
            </div>
            <button onClick={() => setTheme(dark ? "light" : "dark")} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="mt-2 grid size-10 place-items-center rounded-full bg-white/50 text-zinc-900 backdrop-blur-xl dark:bg-zinc-900/50 dark:text-white">
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          </header>

          <div className="space-y-3">
            <button onClick={() => openApp("about")} className={cn(widget, "w-full")}>
              <div className="flex items-center gap-3.5">
                <Image src={profile.photo} alt="" width={64} height={64} className="size-16 rounded-full object-cover ring-2 ring-white/70" priority />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-bold">{profile.name}</p>
                  <p className="truncate text-sm opacity-70">{profile.role}</p>
                  {profile.status && <div className="mt-1.5"><StatusPill>{profile.status}</StatusPill></div>}
                </div>
              </div>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => openApp("experience")} className={widget}>
                <BriefcaseBusiness className="size-5 text-orange-500" aria-hidden />
                <p className="mt-2 text-3xl font-bold tabular-nums">{profile.yearsExperience} yrs</p>
                <p className="text-xs opacity-70">{profile.companies} companies</p>
                {currentRole && <p className="mt-2 truncate text-xs font-semibold">Now @ {currentRole.companyName}</p>}
              </button>
              <a href={socials.resume} target="_blank" rel="noreferrer" className={cn(widget, "flex flex-col")}>
                <FileText className="size-5 text-rose-500" aria-hidden />
                <p className="mt-2 text-lg font-bold leading-tight">Résumé</p>
                <p className="text-xs opacity-70">PDF · opens in new tab</p>
                <span className="mt-auto pt-2 text-xs font-semibold text-sys-blue">View ↗</span>
              </a>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-4 gap-x-3 gap-y-5">
            {gridApps.map((a) => <HomeIcon key={a.id} app={a} onOpen={openApp} />)}
          </div>
          <p className="mt-8 text-center text-xs text-zinc-900/50 dark:text-white/50">Tap an app to explore</p>
        </main>

        <nav aria-label="Dock" className="absolute inset-x-3 bottom-[max(env(safe-area-inset-bottom),12px)] grid grid-cols-4 rounded-[30px] bg-white/35 px-3 py-3 shadow-xl ring-1 ring-white/40 backdrop-blur-2xl backdrop-saturate-150 dark:bg-zinc-900/45 dark:ring-white/10">
          {dockIds.map((id) => <HomeIcon key={id} app={getApp(id)} onOpen={openApp} />)}
        </nav>

        <DesktopHint />

        <AnimatePresence>
          {open && <AppSheet key={open} id={open} nav={nav} onHome={goHome} />}
        </AnimatePresence>
      </div>
    </OSContext.Provider>
  );
}

function AppSheet({ id, nav, onHome }: { id: AppId; nav: NavOverride; onHome: () => void }) {
  const app = getApp(id);
  const Content = appContent[id];
  const [scrolled, setScrolled] = useState(false);

  return (
    <motion.div
      role="dialog"
      aria-label={app.name}
      initial={{ opacity: 0, scale: 0.88, borderRadius: 48 }}
      animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
      exit={{ opacity: 0, scale: 0.9, borderRadius: 48, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
      className={cn("fixed inset-0 z-50 flex flex-col overflow-hidden text-sys-label", app.vibrant ? "wallpaper" : "bg-sys-grouped")}
    >
      {app.vibrant && <div className="pointer-events-none absolute inset-0 bg-sys-grouped/45 backdrop-blur-2xl" aria-hidden />}
      <header className={cn("relative z-10 shrink-0 pt-[env(safe-area-inset-top)] transition-colors", scrolled ? "bg-sys-grouped/80 shadow-[0_0.5px_0_rgba(0,0,0,0.15)] backdrop-blur-xl" : "")}>
        <div className="relative flex h-11 items-center px-2">
          <button onClick={nav ? nav.onBack : onHome} className="flex items-center text-[17px] text-sys-blue active:opacity-50">
            <ChevronLeft className="size-7" strokeWidth={2.4} aria-hidden />
            {nav ? nav.label : "Home"}
          </button>
          <span className={cn("pointer-events-none absolute inset-x-24 truncate text-center text-[17px] font-semibold transition-opacity", scrolled ? "opacity-100" : "opacity-0")} aria-hidden>
            {app.name}
          </span>
        </div>
      </header>

      <div data-scroll className="relative flex-1 overflow-y-auto overscroll-contain" onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 36)}>
        <h1 className="px-4 pb-3 pt-1 text-[34px] font-bold tracking-tight">{app.name}</h1>
        <Content />
        <div className="h-10" />
      </div>

      <motion.button
        aria-label="Go to Home Screen"
        onClick={onHome}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={(_, info) => info.offset.y < -40 && onHome()}
        className="absolute inset-x-0 bottom-0 grid h-7 place-items-center pb-[env(safe-area-inset-bottom)]"
      >
        <span className="h-[5px] w-32 rounded-full bg-zinc-900/80 dark:bg-white/80" />
      </motion.button>
    </motion.div>
  );
}
