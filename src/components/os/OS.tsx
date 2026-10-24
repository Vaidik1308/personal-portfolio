"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useMediaQuery } from "./context";
import BootScreen from "./BootScreen";
import IOSHome from "./ios/IOSHome";
import MacDesktop from "./mac/MacDesktop";

const BOOT_KEY = "os-booted";

// macOS desktop on tablets and up, iOS home screen on phones.
// Only one tree mounts, since both own the URL hash/history.
export default function OS() {
  const desktop = useMediaQuery("(min-width: 768px)");
  // Starts true so the boot screen is in the server HTML (no flash of the desktop)
  const [booting, setBooting] = useState(true);

  // Boot once per tab; reloads go straight to the desktop
  useEffect(() => {
    try {
      if (sessionStorage.getItem(BOOT_KEY)) setBooting(false);
    } catch {}
  }, []);

  const finishBoot = () => {
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {}
    setBooting(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      {/* The desktop mounts once boot ends, so its Dock/window entrance plays as the reveal */}
      {booting || desktop === null ? <div className="wallpaper fixed inset-0" /> : desktop ? <MacDesktop /> : <IOSHome />}
      <AnimatePresence>{booting && <BootScreen onDone={finishBoot} />}</AnimatePresence>
    </MotionConfig>
  );
}
