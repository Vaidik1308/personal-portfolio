"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { AppIcon, linkApps, windowApps, type AnyApp, type AppId } from "../registry";

type Props = {
  running: Set<AppId>;
  onOpen: (id: AppId) => void;
};

function DockItem({ app, mouseX, running, onOpen }: { app: AnyApp; mouseX: MotionValue<number>; running: boolean; onOpen: (id: AppId) => void }) {
  const ref = useRef<HTMLElement>(null);
  const distance = useTransform(mouseX, (v) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? v - b.x - b.width / 2 : Infinity;
  });
  const size = useSpring(useTransform(distance, [-150, 0, 150], [48, 72, 48]), { mass: 0.1, stiffness: 180, damping: 13 });

  const label = app.kind === "link" ? `${app.name} (opens in new tab)` : app.name;
  const inner = (
    <>
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/80 px-2.5 py-1 text-xs font-medium text-zinc-900 opacity-0 shadow-lg ring-1 ring-black/10 backdrop-blur-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-zinc-800/90 dark:text-white dark:ring-white/10">
        {app.name}
        {app.kind === "link" && " ↗"}
      </span>
      <AppIcon app={app} className="size-full" />
      {running && <span className="absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-zinc-800 dark:bg-white/90" aria-hidden />}
    </>
  );

  const cls = "group relative block aspect-square focus-visible:outline-none";
  const dockId = { "data-dock-id": app.id };
  return app.kind === "link" ? (
    <motion.a {...dockId} ref={ref as React.RefObject<HTMLAnchorElement>} href={app.href} target="_blank" rel="noreferrer" aria-label={label} style={{ width: size }} whileTap={{ scale: 0.9 }} className={cls}>
      {inner}
    </motion.a>
  ) : (
    <motion.button {...dockId} ref={ref as React.RefObject<HTMLButtonElement>} onClick={() => onOpen(app.id)} aria-label={running ? `${label} (open)` : `Open ${label}`} style={{ width: size }} whileTap={{ scale: 0.9 }} className={cls}>
      {inner}
    </motion.button>
  );
}

export default function Dock({ running, onOpen }: Props) {
  const mouseX = useMotionValue(Infinity);
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-[9000] flex justify-center">
    <motion.nav
      aria-label="Dock"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.15 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="pointer-events-auto flex h-[68px] items-end gap-2.5 rounded-[22px] bg-white/30 px-2.5 pb-2.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-white/40 backdrop-blur-2xl backdrop-saturate-150 dark:bg-zinc-900/40 dark:ring-white/10"
    >
      {windowApps.map((a) => <DockItem key={a.id} app={a} mouseX={mouseX} running={running.has(a.id)} onOpen={onOpen} />)}
      <span className="mx-0.5 mb-1 h-12 w-px self-end bg-black/15 dark:bg-white/20" aria-hidden />
      {linkApps.map((a) => <DockItem key={a.id} app={a} mouseX={mouseX} running={false} onOpen={onOpen} />)}
    </motion.nav>
    </div>
  );
}
