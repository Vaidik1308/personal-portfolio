"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useDragControls, useMotionValue } from "framer-motion";
import { Maximize2, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type Geometry = { left: number; top: number; w: number; h: number };

type Props = {
  appId: string;
  vibrant?: boolean;
  // Open by flying out of the Dock icon (false for the window shown on first load)
  fromDock: boolean;
  title: string;
  geometry: Geometry;
  maxGeometry: Geometry;
  zIndex: number;
  focused: boolean;
  minimized: boolean;
  maximized: boolean;
  boundsRef: React.RefObject<HTMLDivElement>;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onResize: (w: number, h: number) => void;
  children: React.ReactNode;
};

const MIN_W = 380;
const MIN_H = 280;
const spring = { type: "spring", stiffness: 420, damping: 38 } as const;

const FULL_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

/**
 * macOS-style "genie" between a window and its Dock icon.
 * The bottom edge funnels toward the icon, then the window is sucked down into it
 * ("in"), or the same keyframes play in reverse ("out").
 */
function genie(body: HTMLElement, box: DOMRect, appId: string, dir: "in" | "out") {
  const icon = document.querySelector(`[data-dock-id="${appId}"]`)?.getBoundingClientRect();
  if (!icon || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return animate(body, { opacity: dir === "in" ? 0 : 1 }, { duration: 0.15 });
  }
  const iconCx = icon.left + icon.width / 2;
  // Where the funnel's neck sits across the window, kept inside it so it stays visible
  const p = Math.min(88, Math.max(12, ((iconCx - box.left) / box.width) * 100));
  const neck = 12;
  const sx = icon.width / ((neck * 2 * box.width) / 100);
  const sy = icon.height / box.height;
  const tx = iconCx - box.left - (p / 100) * box.width * sx;
  const ty = icon.top - box.top;

  const frames = {
    clipPath: [
      FULL_CLIP,
      `polygon(0% 0%, 100% 0%, ${p + 6}% 100%, ${p - 6}% 100%)`,
      `polygon(${p - neck}% 0%, ${p + neck}% 0%, ${p + 4}% 100%, ${p - 4}% 100%)`,
    ],
    x: [0, tx * 0.25, tx],
    y: [0, ty * 0.35, ty],
    scaleX: [1, 1, sx],
    scaleY: [1, 0.8, sy],
    opacity: [1, 1, 0],
  };
  const keyframes = Object.fromEntries(
    Object.entries(frames).map(([k, v]) => [k, dir === "in" ? v : [...v].reverse()])
  );
  body.style.transformOrigin = "0 0";
  const duration = dir === "in" ? 0.55 : 0.5;
  const controls = animate(body, keyframes, {
    duration,
    times: dir === "in" ? [0, 0.4, 1] : [0, 0.6, 1],
    ease: [0.4, 0, 0.2, 1],
    // Stay solid until it's nearly inside the icon so it reads as "sucked in", not faded
    opacity: { duration, times: dir === "in" ? [0, 0.85, 1] : [0, 0.15, 1], ease: "linear" },
  });
  // A clip-path would also cut off the window's shadow, so drop it once fully out
  if (dir === "out") controls.then(() => { body.style.clipPath = "none"; });
  return controls;
}

export default function Window({
  appId, vibrant, fromDock, title, geometry, maxGeometry, zIndex, focused, minimized, maximized, boundsRef,
  onFocus, onClose, onMinimize, onToggleMaximize, onResize, children,
}: Props) {
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const savedOffset = useRef<{ x: number; y: number } | null>(null);
  const [resizing, setResizing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useLayoutEffect(() => {
    const body = bodyRef.current!;
    const box = sectionRef.current!.getBoundingClientRect();
    if (!mounted.current) {
      mounted.current = true;
      if (fromDock) {
        body.style.opacity = "0";
        genie(body, box, appId, "out");
      } else {
        animate(body, { opacity: [0, 1], scale: [0.96, 1] }, { duration: 0.25 });
      }
      return;
    }
    const controls = genie(body, box, appId, minimized ? "in" : "out");
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minimized]);

  // Fold the drag offset away while maximized, and bring it back on restore
  useEffect(() => {
    if (maximized) {
      savedOffset.current = { x: x.get(), y: y.get() };
      animate(x, 0, spring);
      animate(y, 0, spring);
    } else if (savedOffset.current) {
      animate(x, savedOffset.current.x, spring);
      animate(y, savedOffset.current.y, spring);
      savedOffset.current = null;
    }
  }, [maximized, x, y]);

  const g = maximized ? maxGeometry : geometry;

  const startResize = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onFocus();
    const sx = e.clientX, sy = e.clientY, sw = geometry.w, sh = geometry.h;
    setResizing(true);
    const move = (ev: PointerEvent) => onResize(Math.max(MIN_W, sw + ev.clientX - sx), Math.max(MIN_H, sh + ev.clientY - sy));
    const up = () => {
      setResizing(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const light = (color: string, hoverColor: string, label: string, Icon: typeof X, onClick: () => void) => (
    <button
      aria-label={label}
      title={label}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={cn(
        "grid size-3 place-items-center rounded-full ring-1 ring-inset ring-black/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sys-blue",
        focused ? color : cn("bg-zinc-300 dark:bg-zinc-600", hoverColor)
      )}
    >
      <Icon className="size-2 text-black/60 opacity-0 group-hover/lights:opacity-100" strokeWidth={3} aria-hidden />
    </button>
  );

  return (
    <motion.section
      ref={sectionRef}
      data-window-id={appId}
      tabIndex={-1}
      role="dialog"
      aria-label={title}
      aria-hidden={minimized || undefined}
      drag={!maximized && !minimized}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={boundsRef}
      onPointerDown={onFocus}
      style={{ x, y, zIndex }}
      initial={{ left: g.left, top: g.top, width: g.w, height: g.h }}
      animate={{ left: g.left, top: g.top, width: g.w, height: g.h }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
      transition={resizing ? { duration: 0 } : spring}
      className={cn("absolute outline-none", minimized && "pointer-events-none")}
    >
      <div
        ref={bodyRef}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-xl bg-sys-card/35 backdrop-blur-3xl backdrop-saturate-150 will-change-transform",
          "ring-1 ring-black/10 dark:ring-white/15",
          focused ? "shadow-[0_24px_70px_-12px_rgba(0,0,0,0.45)]" : "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)]"
        )}
      >
        <header
          onPointerDown={(e) => { onFocus(); if (!maximized) controls.start(e); }}
          onDoubleClick={onToggleMaximize}
          className={cn(
            "relative flex h-11 shrink-0 cursor-default select-none items-center border-b border-black/[0.06] px-4 dark:border-white/10",
            vibrant ? "bg-sys-card/45" : "bg-sys-card/90"
          )}
        >
          <div className="group/lights flex items-center gap-2">
            {light("bg-[#ff5f57]", "group-hover/lights:bg-[#ff5f57]", `Close ${title}`, X, onClose)}
            {light("bg-[#febc2e]", "group-hover/lights:bg-[#febc2e]", `Minimize ${title}`, Minus, onMinimize)}
            {light("bg-[#28c840]", "group-hover/lights:bg-[#28c840]", maximized ? "Restore size" : "Full size", Maximize2, onToggleMaximize)}
          </div>
          <h2 className={cn("pointer-events-none absolute inset-x-24 truncate text-center text-[13px] font-semibold", focused ? "text-sys-label/85" : "text-sys-label/40")}>
            {title}
          </h2>
        </header>
        <div className={cn("min-h-0 flex-1 overflow-auto text-sys-label", !vibrant && "bg-sys-card/90")}>{children}</div>
      </div>
      {!maximized && (
        <div onPointerDown={startResize} className="absolute bottom-0 right-0 size-4 cursor-nwse-resize" aria-hidden />
      )}
    </motion.section>
  );
}
