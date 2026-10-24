"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, FileText, Folder, MousePointerClick, X } from "lucide-react";
import { currentRole, profile, socials } from "@/lib/portfolio";
import { OSContext, useNow } from "../context";
import { getApp, isAppId, type AppId } from "../registry";
import { appContent } from "../apps";
import { StatusPill } from "../apps/ui";
import Dock from "./Dock";
import ShieldWidget from "./ShieldWidget";
import MenuBar from "./MenuBar";
import Window, { type Geometry } from "./Window";

type Win = { id: AppId; geometry: Geometry; minimized: boolean; maximized: boolean; fromDock: boolean };

const DOCK_SPACE = 92;
const WIDGETS_EDGE = 340;
const HINT_KEY = "os-hint-dismissed";

export default function MacDesktop() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [area, setArea] = useState({ w: 0, h: 0 });
  // Array order is z-order: last item is on top
  const [wins, setWins] = useState<Win[]>([]);
  const [hint, setHint] = useState(false);

  useLayoutEffect(() => {
    const el = areaRef.current!;
    const ro = new ResizeObserver(() => setArea({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setArea({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const maxGeometry: Geometry = useMemo(() => ({ left: 8, top: 8, w: area.w - 16, h: area.h - DOCK_SPACE - 8 }), [area]);

  const openApp = useCallback(
    (id: AppId, fromDock = true) => {
      setWins((ws) => {
        const existing = ws.find((w) => w.id === id);
        if (existing) return [...ws.filter((w) => w.id !== id), { ...existing, minimized: false }];
        const { size } = getApp(id);
        const w = Math.min(size.w, area.w - 48);
        const h = Math.min(size.h, area.h - DOCK_SPACE - 32);
        const offset = (ws.length % 5) * 28;
        let left = Math.max(16, Math.round((area.w - w) / 2) + offset);
        // Keep clear of the xl widget column when there's room
        if (area.w >= 1280 && area.w - WIDGETS_EDGE - w >= 120) left = Math.max(left, WIDGETS_EDGE + offset);
        const top = Math.max(12, Math.round((area.h - DOCK_SPACE - h) / 2) + offset - 20);
        return [...ws, { id, geometry: { left, top, w, h }, minimized: false, maximized: false, fromDock }];
      });
    },
    [area]
  );

  const update = (id: AppId, fn: (w: Win) => Win) => setWins((ws) => ws.map((w) => (w.id === id ? fn(w) : w)));
  const focus = (id: AppId) =>
    setWins((ws) => (ws[ws.length - 1]?.id === id ? ws : [...ws.filter((w) => w.id !== id), ws.find((w) => w.id === id)!]));

  const visible = wins.filter((w) => !w.minimized);
  const focused = visible.length ? visible[visible.length - 1].id : null;

  // Open the deep-linked app (or About) once the desktop has a size
  const booted = useRef(false);
  useEffect(() => {
    if (booted.current || !area.w) return;
    booted.current = true;
    const hash = window.location.hash.slice(1);
    // The Dock is still sliding in on first load, so the first window just fades in
    openApp(isAppId(hash) ? hash : "about", false);
    try {
      setHint(!localStorage.getItem(HINT_KEY));
    } catch {}
  }, [area.w, openApp]);

  useEffect(() => {
    if (!booted.current) return;
    history.replaceState(null, "", focused ? `#${focused}` : window.location.pathname);
  }, [focused]);

  const dismissHint = () => {
    setHint(false);
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {}
  };

  const running = useMemo(() => new Set(wins.map((w) => w.id)), [wins]);
  const ctx = useMemo(() => ({ compact: false, openApp: (id: AppId) => openApp(id), setNav: () => {} }), [openApp]);

  return (
    <OSContext.Provider value={ctx}>
      <div className="wallpaper fixed inset-0 flex flex-col overflow-hidden font-sf">
        <MenuBar focused={focused} hasWindows={wins.length > 0} onOpen={openApp} onCloseAll={() => setWins([])} />

        <div ref={areaRef} className="relative flex-1">
          <DesktopWidgets onOpen={openApp} />
          <DesktopIcons onOpen={openApp} />

          <AnimatePresence>
            {wins.map((w, i) => {
              const Content = appContent[w.id];
              return (
                <Window
                  key={w.id}
                  appId={w.id}
                  vibrant={getApp(w.id).vibrant}
                  fromDock={w.fromDock}
                  title={getApp(w.id).name}
                  geometry={w.geometry}
                  maxGeometry={maxGeometry}
                  zIndex={100 + i}
                  focused={focused === w.id}
                  minimized={w.minimized}
                  maximized={w.maximized}
                  boundsRef={areaRef}
                  onFocus={() => focus(w.id)}
                  onClose={() => setWins((ws) => ws.filter((x) => x.id !== w.id))}
                  onMinimize={() => update(w.id, (x) => ({ ...x, minimized: true }))}
                  onToggleMaximize={() => update(w.id, (x) => ({ ...x, maximized: !x.maximized }))}
                  onResize={(width, height) => update(w.id, (x) => ({ ...x, geometry: { ...x.geometry, w: width, h: height } }))}
                >
                  <Content />
                </Window>
              );
            })}
          </AnimatePresence>

          <AnimatePresence>
            {hint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-[96px] left-1/2 z-[8999] flex items-center gap-3 whitespace-nowrap rounded-full bg-zinc-900/80 py-2 pl-4 pr-2 text-sm text-white shadow-xl backdrop-blur-xl"
                style={{ x: "-50%" }}
              >
                <MousePointerClick className="size-4 text-sky-300" aria-hidden />
                <span>
                  Open sections from the <b>Dock</b> or the <b>menu bar</b>. Drag windows by their title bar.
                </span>
                <button onClick={dismissHint} aria-label="Dismiss tip" className="rounded-full p-1 hover:bg-white/15">
                  <X className="size-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <Dock running={running} onOpen={openApp} />
        </div>
      </div>
    </OSContext.Provider>
  );
}

function DesktopWidgets({ onOpen }: { onOpen: (id: AppId) => void }) {
  const now = useNow();
  const card = "block w-full rounded-[22px] bg-white/45 p-4 text-left text-zinc-900 shadow-lg ring-1 ring-white/50 backdrop-blur-2xl transition hover:bg-white/55 dark:bg-zinc-900/45 dark:text-white dark:ring-white/10 dark:hover:bg-zinc-900/55";
  return (
    <aside aria-label="Widgets" className="absolute left-5 top-5 hidden w-[300px] flex-col gap-3 xl:flex">
      <button onClick={() => onOpen("about")} className={card}>
        <div className="flex items-center gap-3">
          <Image src={profile.photo} alt="" width={56} height={56} className="size-14 rounded-full object-cover ring-2 ring-white/70" />
          <div className="min-w-0">
            <p className="truncate text-base font-bold">{profile.name}</p>
            <p className="truncate text-sm opacity-70">{profile.role}</p>
          </div>
        </div>
        {profile.status && <div className="mt-3"><StatusPill>{profile.status}</StatusPill></div>}
      </button>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onOpen("experience")} className={card}>
          <BriefcaseBusiness className="size-5 text-orange-500" aria-hidden />
          <p className="mt-2 text-3xl font-bold tabular-nums">{profile.yearsExperience} yrs</p>
          <p className="text-xs opacity-70">{profile.companies} companies</p>
        </button>
        <div className={card + " pointer-events-none"}>
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-500" suppressHydrationWarning>
            {now?.toLocaleDateString("en-US", { weekday: "long" })}
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums" suppressHydrationWarning>{now?.getDate()}</p>
          <p className="text-xs opacity-70" suppressHydrationWarning>{now?.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
        </div>
      </div>
      {currentRole && (
        <button onClick={() => onOpen("experience")} className={card}>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Now</p>
          <p className="mt-1 font-semibold">{currentRole.roleName}</p>
          <p className="text-sm opacity-70">{currentRole.companyName} · {currentRole.jobType}</p>
        </button>
      )}
      <ShieldWidget />
    </aside>
  );
}

function DesktopIcons({ onOpen }: { onOpen: (id: AppId) => void }) {
  const cls = "group flex w-24 flex-col items-center gap-1 rounded-lg p-2 text-center focus-visible:outline-none";
  const label = "rounded px-1.5 py-0.5 text-xs font-medium text-zinc-900 [text-shadow:0_1px_2px_rgba(255,255,255,0.6)] group-hover:bg-sys-blue group-hover:text-white group-hover:[text-shadow:none] group-focus-visible:bg-sys-blue group-focus-visible:text-white dark:text-white dark:[text-shadow:0_1px_2px_rgba(0,0,0,0.6)]";
  return (
    <div className="absolute right-4 top-4 flex flex-col items-center gap-2">
      <a href={socials.resume} target="_blank" rel="noreferrer" className={cls}>
        <div className="relative grid h-16 place-items-center rounded-md bg-white shadow-md ring-1 ring-black/10 transition group-hover:scale-105" style={{ width: 52 }}>
          <FileText className="size-7 text-rose-500" aria-hidden />
          <span className="absolute bottom-1.5 rounded-sm bg-rose-500 px-1 text-[8px] font-bold text-white">PDF</span>
        </div>
        <span className={label}>Résumé.pdf</span>
      </a>
      <button onClick={() => onOpen("projects")} className={cls}>
        <Folder className="size-16 fill-sky-400 text-sky-500 drop-shadow-md transition group-hover:scale-105" strokeWidth={1} aria-hidden />
        <span className={label}>Projects</span>
      </button>
    </div>
  );
}
