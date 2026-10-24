"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/portfolio";

// Apple-style startup: black screen, profile photo instead of a logo, and a progress bar
// that fills in uneven bursts like a real boot.
export default function BootScreen({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const duration = reduced ? 0.6 : 3.8; // ~4.5s total with the delay and fade-out

  return (
    <motion.div
      role="progressbar"
      aria-label={`Loading ${profile.name}'s portfolio`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Plain img so it's in the server HTML and paints immediately */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar.png"
          alt=""
          width={96}
          height={96}
          className="size-24 rounded-full bg-white object-cover shadow-[0_0_60px_rgba(255,255,255,0.12)] ring-1 ring-white/20"
        />
        <div className="mt-16 h-[5px] w-48 overflow-hidden rounded-full bg-[#3a3a3c]">
          <motion.div
            className="h-full origin-left rounded-full bg-white"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: reduced ? 1 : [0, 0.18, 0.22, 0.55, 0.62, 0.9, 1] }}
            transition={{ duration, delay: 0.3, ease: "easeInOut", times: reduced ? undefined : [0, 0.15, 0.3, 0.5, 0.65, 0.85, 1] }}
            onAnimationComplete={onDone}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
