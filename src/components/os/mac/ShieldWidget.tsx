"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const QUOTE = "I can do this all day.";

// Hand-drawn round shield (concentric rings + star), not an official asset
function Shield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <radialGradient id="shield-shine" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="49" fill="#b91c1c" />
      <circle cx="50" cy="50" r="39" fill="#f1f5f9" />
      <circle cx="50" cy="50" r="29" fill="#b91c1c" />
      <circle cx="50" cy="50" r="19.5" fill="#1d4ed8" />
      <polygon
        fill="#f8fafc"
        points="50,31.5 54.4,44.2 67.8,44.3 57.1,52.4 61.1,65.3 50,57.6 38.9,65.3 42.9,52.4 32.2,44.3 45.6,44.2"
      />
      <circle cx="50" cy="50" r="49" fill="url(#shield-shine)" />
      <circle cx="50" cy="50" r="48.5" fill="none" stroke="#7f1d1d" strokeOpacity="0.6" strokeWidth="1" />
    </svg>
  );
}

export default function ShieldWidget() {
  const controls = useAnimationControls();

  // Spins in like it was just caught
  useEffect(() => {
    controls.start({ x: 0, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 70, damping: 14, delay: 0.6 } });
  }, [controls]);

  // Boomerang throw across the desktop and back
  const throwShield = () =>
    controls.start({
      x: [0, 560, 560, 0],
      y: [0, -90, -40, 0],
      rotate: [0, 900, 1080, 1800],
      scale: [1, 0.85, 0.85, 1],
      transition: { duration: 1.5, times: [0, 0.45, 0.55, 1], ease: "easeInOut" },
    });

  return (
    <div className="relative block w-full rounded-[22px] bg-white/45 p-4 text-left text-zinc-900 shadow-lg ring-1 ring-white/50 backdrop-blur-2xl dark:bg-zinc-900/45 dark:text-white dark:ring-white/10">
      <div className="flex items-center gap-4">
        <motion.button
          type="button"
          onClick={throwShield}
          aria-label="Throw the shield"
          title="Throw it!"
          className="relative z-10 size-16 shrink-0 rounded-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sys-blue"
          initial={{ x: -180, rotate: -720, opacity: 0 }}
          animate={controls}
          whileTap={{ scale: 0.92 }}
        >
          <Shield className="size-full" />
        </motion.button>

        <figure className="min-w-0">
          <blockquote className="text-[17px] font-bold italic leading-snug tracking-tight" aria-label={QUOTE}>
            {QUOTE.split("").map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.045, duration: 0.01 }}
              >
                {ch}
              </motion.span>
            ))}
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block w-[2px] bg-current align-middle"
              style={{ height: "1em" }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
          </blockquote>
          <figcaption className="mt-1 text-xs opacity-60">— Steve Rogers · click the shield</figcaption>
        </figure>
      </div>
    </div>
  );
}
