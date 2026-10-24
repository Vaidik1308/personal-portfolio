"use client";

import { useState } from "react";
import { Check, Copy, FileText, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { socials } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { useOS } from "../context";
import { Button } from "./ui";

const elsewhere = [
  { label: "LinkedIn", href: socials.linkedin, icon: FaLinkedinIn },
  { label: "GitHub", href: socials.github, icon: FaGithub },
  { label: "X", href: socials.x, icon: FaXTwitter },
  { label: "Résumé", href: socials.resume, icon: FileText },
];

export default function Contact() {
  const { compact } = useOS();
  const [subject, setSubject] = useState("Hello from your portfolio");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${socials.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  const field = "flex items-center gap-3 border-b border-black/[0.06] px-4 py-2.5 text-[15px] dark:border-white/10";

  return (
    <div className={cn("space-y-6 pb-10", compact ? "px-4" : "p-6")}>
      <form onSubmit={send} className="overflow-hidden rounded-xl bg-sys-card ring-1 ring-black/[0.06] dark:ring-white/10">
        <div className={field}>
          <span className="w-16 shrink-0 text-sys-secondary">To:</span>
          <span className="min-w-0 flex-1 truncate">
            <span className="rounded-md bg-sys-blue/10 px-2 py-0.5 font-medium text-sys-blue">{socials.email}</span>
          </span>
          <button type="button" onClick={copy} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-sys-secondary hover:bg-black/5 dark:hover:bg-white/10" aria-live="polite">
            {copied ? <><Check className="size-3.5 text-emerald-500" /> Copied</> : <><Copy className="size-3.5" /> Copy</>}
          </button>
        </div>
        <label className={field}>
          <span className="w-16 shrink-0 text-sys-secondary">Subject:</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sys-label outline-none" />
        </label>
        <label className="block">
          <span className="sr-only">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={compact ? 6 : 7}
            placeholder="Hi Vaidik, I'd love to talk about a role at…"
            className="block w-full resize-none bg-transparent px-4 py-3 text-[15px] leading-relaxed text-sys-label outline-none placeholder:text-sys-secondary/70"
          />
        </label>
        <div className="flex items-center justify-between gap-3 border-t border-black/[0.06] px-4 py-3 dark:border-white/10">
          <span className="text-xs text-sys-secondary">Opens in your email app</span>
          <Button type="submit" disabled={!message.trim()}>
            <Send className="size-4" aria-hidden /> Send
          </Button>
        </div>
      </form>

      <section>
        <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-sys-secondary">Or find me on</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {elsewhere.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-sys-card px-3 py-2.5 text-sm font-medium text-sys-label ring-1 ring-black/[0.06] transition hover:bg-black/[0.03] dark:ring-white/10 dark:hover:bg-white/[0.06]">
              <Icon className="size-4" /> {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
