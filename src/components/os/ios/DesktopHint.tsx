"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link2, Monitor } from "lucide-react";
import { profile } from "@/lib/portfolio";

const KEY = "desktop-hint-dismissed";

// iOS-style notification banner nudging phone visitors toward the full macOS desktop
export default function DesktopHint() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {}
    const t = setTimeout(() => setShow(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(dismiss, 1200);
    } catch {
      dismiss();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: -140, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -140, opacity: 0, transition: { duration: 0.25 } }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.6, bottom: 0.15 }}
          onDragEnd={(_, info) => info.offset.y < -30 && dismiss()}
          className="fixed inset-x-2.5 top-[max(env(safe-area-inset-top),10px)] z-[60] touch-none overflow-hidden rounded-[24px] bg-white/75 text-zinc-900 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/50 backdrop-blur-2xl backdrop-saturate-150 dark:bg-zinc-800/75 dark:text-white dark:ring-white/10"
        >
          <div className="flex gap-3 p-3.5 pb-3">
            <div className="relative shrink-0">
              <Image src="/avatar.png" alt="" width={40} height={40} className="size-10 rounded-[10px] bg-white object-cover" />
              <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full bg-sys-blue text-white ring-2 ring-white dark:ring-zinc-800">
                <Monitor className="size-3" strokeWidth={2.5} aria-hidden />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-[15px] font-semibold">Best on a bigger screen</p>
                <span className="shrink-0 text-[13px] text-zinc-500 dark:text-zinc-400">now</span>
              </div>
              <p className="mt-0.5 text-[15px] leading-snug text-zinc-700 dark:text-zinc-300">
                Open {profile.shortName}&apos;s portfolio on a desktop to explore it as a full macOS experience, with windows and a Dock.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-black/[0.08] text-[15px] dark:border-white/10">
            <button onClick={copyLink} className="flex items-center justify-center gap-1.5 py-2.5 font-medium text-sys-blue active:bg-black/5 dark:active:bg-white/5">
              {copied ? <><Check className="size-4" aria-hidden /> Link copied</> : <><Link2 className="size-4" aria-hidden /> Copy link</>}
            </button>
            <button onClick={dismiss} className="border-l border-black/[0.08] py-2.5 font-semibold text-sys-blue active:bg-black/5 dark:border-white/10 dark:active:bg-white/5">
              Got it
            </button>
          </div>
          <div className="mx-auto mb-1.5 h-1 w-9 rounded-full bg-black/20 dark:bg-white/25" aria-hidden />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
