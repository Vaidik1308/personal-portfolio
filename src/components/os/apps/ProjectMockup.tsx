"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { BarChart3, BedDouble, Bot, Briefcase, Calendar, CheckSquare, FileText, Heart, MapPin, MessageCircle, Pill, Search, ShoppingCart, Star, Tag, Users } from "lucide-react";
import type { MockupId } from "@/lib/portfolio";
import { cn } from "@/lib/utils";


// Scenes are drawn at a fixed size and scaled to fit, so text and spacing keep their proportions
const W = 480;
const H = 270;

/** Illustrative UI preview for a project that has no live deployment. */
export default function ProjectMockup({ id, className }: { id: MockupId; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current!;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { url, Scene } = scenes[id];
  return (
    <div ref={ref} aria-hidden className={cn("relative aspect-[16/9] w-full overflow-hidden", className)}>
      <div className="absolute left-0 top-0 flex origin-top-left flex-col overflow-hidden bg-white font-sf text-zinc-900" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-black/[0.06] bg-zinc-100 px-2.5">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="mx-auto w-44 truncate rounded bg-white px-2 py-px text-center text-[8px] text-zinc-500 ring-1 ring-black/5">{url}</span>
        </div>
        <div className="relative min-h-0 flex-1"><Scene /></div>
      </div>
    </div>
  );
}

const scenes: Record<MockupId, { url: string; Scene: () => React.JSX.Element }> = {
  autoreply: { url: "localhost:3000/automations", Scene: AutoReply },
  dawamandi: { url: "localhost:3000/products", Scene: DawaMandi },
  naukri: { url: "localhost:3000/jobs", Scene: Naukri },
  hotel: { url: "localhost:3000/rooms", Scene: Hotel },
  notes: { url: "localhost:3000/notes", Scene: Notes },
};

const Bar = ({ className }: { className?: string }) => <div className={cn("h-1.5 rounded-full bg-current opacity-15", className)} />;

function AutoReply() {
  const bars = [38, 52, 44, 70, 62, 84, 76];
  return (
    <div className="flex h-full bg-[#0f0b1e] text-white">
      <aside className="flex w-24 flex-col gap-1 border-r border-white/10 p-2 text-[8px]">
        <p className="mb-1 flex items-center gap-1 text-[10px] font-bold"><Bot className="size-3 text-violet-400" />AutoReply</p>
        {["Automations", "Inbox", "Leads", "Analytics"].map((l, i) => (
          <p key={l} className={cn("rounded px-1.5 py-1", i === 0 ? "bg-violet-500/25 text-violet-200" : "text-white/55")}>{l}</p>
        ))}
      </aside>
      <div className="flex flex-1 gap-2 p-2.5">
        <div className="flex w-[52%] flex-col gap-1.5 rounded-lg bg-white/[0.04] p-2 ring-1 ring-white/10">
          <div className="flex items-center gap-1.5 text-[8px]">
            <span className="size-4 rounded-full bg-gradient-to-br from-amber-400 via-pink-500 to-violet-600" />
            <span className="font-semibold">@priya.designs</span>
            <span className="ml-auto rounded-full bg-emerald-500/20 px-1.5 text-[7px] text-emerald-300">Lead</span>
          </div>
          <p className="max-w-[80%] rounded-xl rounded-bl-sm bg-white/10 px-2 py-1 text-[8px]">What&apos;s the price for the starter kit?</p>
          <p className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-violet-600 px-2 py-1 text-[8px]">Hey Priya! The starter kit is ₹1,499. I&apos;ve sent the link to your DMs ✨</p>
          <p className="ml-auto flex items-center gap-1 text-[7px] text-violet-300"><Bot className="size-2.5" />Replied by AI in 1.2s</p>
          <div className="mt-auto rounded-md bg-white/5 px-2 py-1 text-[7px] text-white/60">
            Rule: comment contains <b className="text-white">&quot;price&quot;</b> → send DM
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-2 gap-1.5">
            {[["Replies", "1,284"], ["Leads", "312"]].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-white/[0.04] p-1.5 ring-1 ring-white/10">
                <p className="text-[7px] text-white/50">{k}</p>
                <p className="text-sm font-bold">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col rounded-lg bg-white/[0.04] p-1.5 ring-1 ring-white/10">
            <p className="flex items-center gap-1 text-[7px] text-white/50"><BarChart3 className="size-2.5" />DMs this week</p>
            <div className="mt-1 flex flex-1 items-end gap-1">
              {bars.map((b, i) => <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-violet-600 to-fuchsia-400" style={{ height: `${b}%` }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DawaMandi() {
  const items = [
    ["Paracetamol 500mg", "₹18 / strip", "from-sky-200 to-sky-300"],
    ["Amoxicillin 250mg", "₹64 / strip", "from-rose-200 to-rose-300"],
    ["Cetirizine 10mg", "₹22 / strip", "from-amber-200 to-amber-300"],
    ["Pantoprazole 40mg", "₹95 / strip", "from-violet-200 to-violet-300"],
  ];
  return (
    <div className="flex h-full flex-col bg-emerald-50/60">
      <div className="flex items-center gap-2 bg-emerald-600 px-3 py-2 text-white">
        <p className="flex items-center gap-1 text-[11px] font-bold"><Pill className="size-3.5" />DawaMandi</p>
        <div className="flex flex-1 items-center gap-1 rounded-md bg-white px-2 py-1 text-[8px] text-zinc-400"><Search className="size-2.5" />Search 2,400+ medicines…</div>
        <span className="relative"><ShoppingCart className="size-3.5" /><span className="absolute -right-1.5 -top-1 grid size-2.5 place-items-center rounded-full bg-amber-400 text-[6px] font-bold text-zinc-900">3</span></span>
      </div>
      <div className="flex gap-1 px-3 pt-2">
        {["All", "Tablets", "Syrups", "Injections", "Surgical"].map((c, i) => (
          <span key={c} className={cn("rounded-full px-2 py-0.5 text-[7px] font-medium", i === 0 ? "bg-emerald-600 text-white" : "bg-white text-zinc-600 ring-1 ring-black/5")}>{c}</span>
        ))}
        <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[7px] font-semibold text-amber-700">Bulk pricing for retailers</span>
      </div>
      <div className="grid flex-1 grid-cols-4 gap-2 p-3">
        {items.map(([name, price, tint]) => (
          <div key={name} className="flex flex-col rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/5">
            <div className={cn("grid flex-1 place-items-center rounded-md bg-gradient-to-br", tint)}>
              <div className="h-4 w-9 rounded-full bg-white/80 shadow-sm ring-1 ring-black/5" />
            </div>
            <p className="mt-1 truncate text-[8px] font-semibold">{name}</p>
            <p className="text-[7px] text-zinc-500">{price}</p>
            <span className="mt-1 rounded bg-emerald-600 py-0.5 text-center text-[7px] font-semibold text-white">Add</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Naukri() {
  const jobs = [
    ["Frontend Developer", "Lumen Labs", "Bengaluru · Hybrid", "₹12–18 LPA", "bg-indigo-500"],
    ["React Engineer", "Kite Studio", "Remote", "₹10–15 LPA", "bg-orange-500"],
    ["Full Stack Developer", "Northwind", "Gurugram · On-site", "₹14–20 LPA", "bg-teal-500"],
  ];
  return (
    <div className="flex h-full flex-col bg-slate-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-3 pb-3 pt-2 text-white">
        <p className="flex items-center gap-1 text-[11px] font-bold"><Briefcase className="size-3.5" />Naukri</p>
        <p className="mt-1 text-[12px] font-bold">Find your next role</p>
        <div className="mt-1.5 flex gap-1 rounded-md bg-white p-1 text-[8px] text-zinc-700">
          <span className="flex flex-1 items-center gap-1 px-1"><Search className="size-2.5 text-zinc-400" />Frontend Developer</span>
          <span className="flex w-24 items-center gap-1 border-l border-black/10 px-1.5"><MapPin className="size-2.5 text-zinc-400" />Bengaluru</span>
          <span className="rounded bg-blue-600 px-2 py-0.5 font-semibold text-white">Search</span>
        </div>
      </div>
      <div className="flex flex-1 gap-2 p-2.5">
        <aside className="w-20 space-y-1.5 text-[7px] text-zinc-600">
          <p className="font-semibold text-zinc-900">Filters</p>
          {["Remote", "Full-time", "0–2 yrs", "Startups"].map((f, i) => (
            <p key={f} className="flex items-center gap-1"><span className={cn("size-2 rounded-sm ring-1 ring-black/20", i < 2 && "bg-blue-600 ring-blue-600")} />{f}</p>
          ))}
        </aside>
        <div className="flex flex-1 flex-col gap-1.5">
          {jobs.map(([title, org, where, pay, tint]) => (
            <div key={title} className="flex items-center gap-2 rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/5">
              <span className={cn("grid size-6 place-items-center rounded-md text-[8px] font-bold text-white", tint)}>{org[0]}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-semibold">{title}</p>
                <p className="text-[7px] text-zinc-500">{org} · {where}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-1.5 text-[7px] font-medium text-emerald-700">{pay}</span>
              <span className="rounded bg-blue-600 px-2 py-0.5 text-[7px] font-semibold text-white">Apply</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hotel() {
  const rooms = [
    ["Deluxe Suite", "₹4,999", "4.8", "from-amber-300 via-orange-400 to-rose-400"],
    ["Ocean View", "₹6,499", "4.9", "from-sky-300 via-cyan-400 to-teal-500"],
    ["Garden Room", "₹3,299", "4.6", "from-lime-300 via-emerald-400 to-teal-500"],
  ];
  return (
    <div className="flex h-full flex-col bg-stone-50">
      <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 px-3 pb-4 pt-2 text-white">
        <p className="flex items-center gap-1 text-[11px] font-bold"><BedDouble className="size-3.5" />Hotel Booking</p>
        <p className="mt-2 text-[13px] font-bold">Stay somewhere wonderful</p>
        <div className="relative mt-1.5 grid grid-cols-[1fr_1fr_1fr_auto] gap-1 rounded-md bg-white p-1 text-[7px] text-zinc-700">
          {[["Check-in", "12 Nov"], ["Check-out", "15 Nov"], ["Guests", "2 adults"]].map(([k, v]) => (
            <span key={k} className="flex items-center gap-1 px-1"><Calendar className="size-2.5 text-amber-600" /><span><span className="block text-zinc-400">{k}</span>{v}</span></span>
          ))}
          <span className="grid place-items-center rounded bg-amber-600 px-2 font-semibold text-white">Book</span>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2 p-2.5">
        {rooms.map(([name, price, rating, tint]) => (
          <div key={name} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
            <div className={cn("relative flex-1 bg-gradient-to-br", tint)}>
              <Heart className="absolute right-1 top-1 size-2.5 text-white" />
            </div>
            <div className="p-1.5">
              <p className="flex items-center justify-between text-[8px] font-semibold">{name}<span className="flex items-center gap-0.5 text-[7px] text-amber-600"><Star className="size-2 fill-current" />{rating}</span></p>
              <p className="text-[7px] text-zinc-500"><b className="text-zinc-900">{price}</b> / night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Notes() {
  return (
    <div className="flex h-full bg-white">
      <aside className="flex w-28 flex-col gap-0.5 border-r border-black/[0.06] bg-zinc-50 p-2 text-[8px] text-zinc-600">
        <p className="mb-1 text-[10px] font-bold text-zinc-900">Notes & Blogs</p>
        {[[FileText, "Notes", true], [CheckSquare, "Tasks", false], [MessageCircle, "Blogs", false], [Users, "Shared", false]].map(([Icon, l, on]) => {
          const I = Icon as typeof FileText;
          return <p key={l as string} className={cn("flex items-center gap-1 rounded px-1.5 py-1", on && "bg-indigo-100 font-medium text-indigo-700")}><I className="size-2.5" />{l as string}</p>;
        })}
        <p className="mt-2 text-[7px] font-semibold uppercase text-zinc-400">Tags</p>
        {[["work", "bg-sky-400"], ["ideas", "bg-amber-400"], ["learning", "bg-emerald-400"]].map(([t, c]) => (
          <p key={t} className="flex items-center gap-1 px-1.5 text-[7px]"><span className={cn("size-1.5 rounded-full", c)} />{t}</p>
        ))}
      </aside>
      <div className="flex flex-1 flex-col p-3 text-zinc-800">
        <div className="flex items-center gap-1 text-[7px] text-zinc-500">
          {["B", "I", "U", "H1", "• List", "Link"].map((t) => <span key={t} className="rounded bg-zinc-100 px-1.5 py-0.5 font-semibold">{t}</span>)}
          <span className="ml-auto flex items-center gap-1 rounded bg-indigo-600 px-2 py-0.5 font-semibold text-white">Publish</span>
        </div>
        <p className="mt-2 text-[13px] font-bold">Weekly plan</p>
        <p className="flex items-center gap-1 text-[7px] text-zinc-400"><Tag className="size-2" />work · edited 2m ago</p>
        <div className="mt-2 space-y-1.5 text-zinc-900">
          <Bar className="w-[92%]" /><Bar className="w-[78%]" /><Bar className="w-[85%]" />
        </div>
        <div className="mt-2.5 space-y-1 text-[8px]">
          {[["Ship auth with NextAuth", true], ["Write Zod schemas for notes API", true], ["Draft blog: Prisma + MongoDB", false]].map(([t, done]) => (
            <p key={t as string} className={cn("flex items-center gap-1.5", done && "text-zinc-400 line-through")}>
              <span className={cn("grid size-2.5 place-items-center rounded-sm ring-1 ring-zinc-300", done && "bg-indigo-600 ring-indigo-600")} />{t as string}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
