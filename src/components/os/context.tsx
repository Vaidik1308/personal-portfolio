"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import type { AppId } from "./registry";

export type NavOverride = { label: string; onBack: () => void } | null;

type OSContextValue = {
  compact: boolean;
  openApp: (id: AppId) => void;
  // iOS only: lets an app replace the "‹ Home" back button while showing a sub-page.
  setNav: (nav: NavOverride) => void;
};

export const OSContext = createContext<OSContextValue>({
  compact: false,
  openApp: () => {},
  setNav: () => {},
});

export const useOS = () => useContext(OSContext);

export function useMediaQuery(query: string): boolean | null {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => null
  );
}

// Null until mounted so server and client markup match.
export function useNow(intervalMs = 15_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

// Shortcut labels for the visitor's keyboard: ⌘/⌥ on Apple devices, Ctrl/Alt elsewhere
export function useKeyLabels() {
  const [apple, setApple] = useState(true);
  useEffect(() => setApple(/Mac|iPhone|iPad/.test(navigator.userAgent)), []);
  return apple ? { mod: "⌘", alt: "⌥" } : { mod: "Ctrl+", alt: "Alt+" };
}
