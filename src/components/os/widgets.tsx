"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudMoon, CloudRain, CloudSnow, CloudSun, Moon, Sun } from "lucide-react";
import { experienceData } from "@/lib/data";
import { currentRole, profile } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import type { AppId } from "./registry";
import { Monogram, monogramTint } from "./apps/ui";
import { useNow } from "./context";

// Where Vaidik is based
const HOME = { city: "Bengaluru", label: "BLR", tz: "Asia/Kolkata", lat: 12.97, lon: 77.59 };

const square = "relative aspect-square overflow-hidden rounded-[22px] shadow-lg ring-1";

// ---------- Profile widgets (shared by the macOS desktop and the iOS home screen) ----------

type CardProps = { className: string; onOpen: (id: AppId) => void };

const companies = Array.from(new Set(experienceData.map((e) => e.companyName ?? e.roleName)));
const careerStart = experienceData[experienceData.length - 1]?.duration?.start?.split(" ").pop();

export function NowWidget({ className, onOpen }: CardProps) {
  if (!currentRole) return null;
  return (
    <button onClick={() => onOpen("experience")} className={className}>
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide">
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Now
        </span>
        <span className="normal-case tracking-normal opacity-60">Since {currentRole.duration?.start?.replace(",", "")}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Monogram text={currentRole.companyName ?? currentRole.roleName} className="size-11 text-sm" />
        <div className="min-w-0">
          <p className="truncate font-semibold">{currentRole.roleName}</p>
          <p className="truncate text-sm opacity-70">{currentRole.companyName} · {currentRole.jobType}</p>
        </div>
      </div>
    </button>
  );
}

export function ExperienceWidget({ className, onOpen }: CardProps) {
  return (
    <button onClick={() => onOpen("experience")} className={cn(className, "flex flex-col")}>
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-orange-500">
        <BriefcaseBusiness className="size-3.5" aria-hidden /> Experience
      </p>
      <p className="mt-1.5 text-[34px] font-bold leading-none tracking-tight tabular-nums">
        {profile.yearsExperience}<span className="ml-1 text-base font-semibold opacity-60">yrs</span>
      </p>
      <div className="mt-auto pt-3">
        {/* One segment per company, oldest on the left */}
        <div className="flex gap-[3px]" aria-hidden>
          {[...companies].reverse().map((c) => <span key={c} className={cn("h-1.5 flex-1 rounded-full bg-gradient-to-r", monogramTint(c))} />)}
        </div>
        <p className="mt-2 text-xs font-medium opacity-80">{profile.companies} companies</p>
        <p className="text-[11px] opacity-50">since {careerStart}</p>
      </div>
    </button>
  );
}

// macOS-style small calendar widget: month grid with today circled
export function CalendarWidget({ className }: { className: string }) {
  const now = useNow();
  if (!now) return <div className={className} />;
  const year = now.getFullYear();
  const month = now.getMonth();
  const lead = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div className={cn(className, "pointer-events-none flex flex-col px-3 py-3")}>
      <p className="flex items-baseline justify-between px-[3px] text-[11px] font-semibold uppercase tracking-wide">
        <span className="text-rose-500">{now.toLocaleDateString("en-US", { month: "short" })}</span>
        <span className="opacity-40">{year}</span>
      </p>
      <div className="mt-2 grid flex-1 grid-cols-7 content-between text-center text-[9px] font-medium leading-none tabular-nums">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="pb-1 text-[8px] font-semibold opacity-40">{d}</span>
        ))}
        {cells.map((d, i) => {
          const today = d === now.getDate();
          const weekend = i % 7 === 0 || i % 7 === 6;
          return (
            <span key={i} className="grid h-[15px] place-items-center">
              <span className={cn("grid size-[15px] place-items-center rounded-full", today ? "bg-rose-500 font-bold text-white" : weekend && "opacity-50")}>{d}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Weather ----------

type Weather = { temp: number; code: number; day: boolean; hi: number; lo: number };

// WMO weather codes, grouped the way Apple's Weather app names them
function describe(code: number, day: boolean) {
  if (code === 0) return { label: "Clear", Icon: day ? Sun : Moon };
  if (code <= 2) return { label: "Partly Cloudy", Icon: day ? CloudSun : CloudMoon };
  if (code === 3) return { label: "Cloudy", Icon: Cloud };
  if (code <= 48) return { label: "Fog", Icon: CloudFog };
  if (code <= 57) return { label: "Drizzle", Icon: CloudDrizzle };
  if (code <= 67 || (code >= 80 && code <= 82)) return { label: "Rain", Icon: CloudRain };
  if (code <= 77 || code === 85 || code === 86) return { label: "Snow", Icon: CloudSnow };
  return { label: "Thunderstorm", Icon: CloudLightning };
}

export function WeatherWidget() {
  const [w, setW] = useState<Weather | null>(null);

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${HOME.lat}&longitude=${HOME.lon}` +
      `&current=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(HOME.tz)}&forecast_days=1`;
    let alive = true;
    const load = () =>
      fetch(url)
        .then((r) => r.json())
        .then((d) => {
          if (!alive) return;
          setW({ temp: d.current.temperature_2m, code: d.current.weather_code, day: d.current.is_day === 1, hi: d.daily.temperature_2m_max[0], lo: d.daily.temperature_2m_min[0] });
        })
        .catch(() => {});
    load();
    const t = setInterval(load, 15 * 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  const { label, Icon } = describe(w?.code ?? 0, w?.day ?? true);
  return (
    <div
      className={cn(
        square,
        "flex flex-col p-4 text-white ring-white/10",
        w?.day ?? true ? "bg-gradient-to-b from-sky-500 to-blue-700" : "bg-gradient-to-b from-[#2b3557] to-[#141a2e]"
      )}
      aria-label={w ? `Weather in ${HOME.city}: ${Math.round(w.temp)} degrees, ${label}` : `Weather in ${HOME.city}`}
    >
      <p className="shrink-0 truncate text-[13px] font-semibold leading-tight">{HOME.city}</p>
      <p className="mt-0.5 shrink-0 text-[40px] font-light leading-none tracking-tight">{w ? `${Math.round(w.temp)}°` : "--"}</p>
      <div className="mt-auto space-y-px">
        <p className="flex items-center gap-1 truncate text-xs font-semibold leading-tight">
          <Icon className="size-3.5 shrink-0" aria-hidden />
          {w ? label : "Loading"}
        </p>
        <p className="truncate text-xs font-semibold leading-tight opacity-90">{w ? `H:${Math.round(w.hi)}° L:${Math.round(w.lo)}°` : " "}</p>
      </div>
    </div>
  );
}

// ---------- Digital clock ----------

// 60 ticks hugging the rounded square, lit up to the current second like the macOS clock widget
function Ticks({ seconds, className }: { seconds: number; className: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className="absolute inset-0 size-full" aria-hidden>
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const cos = Math.cos(a), sin = Math.sin(a);
        // Project onto a square so ticks follow the widget's edge, not a circle
        const k = 1 / Math.max(Math.abs(cos), Math.abs(sin));
        const outer = 44 * k, inner = outer - (i % 5 === 0 ? 5 : 3.5);
        return (
          <line
            key={i}
            x1={cos * inner} y1={sin * inner} x2={cos * outer} y2={sin * outer}
            strokeWidth={i % 5 === 0 ? 1.4 : 0.9}
            strokeLinecap="round"
            className={cn(className, "transition-opacity duration-300", i <= seconds ? "opacity-100" : "opacity-30")}
          />
        );
      })}
    </svg>
  );
}

export function HomeClock() {
  const { tz, label } = HOME;
  const now = useNow(1000);
  const parts = now && new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true }).formatToParts(now);
  const get = (t: string) => parts?.find((p) => p.type === t)?.value ?? "";
  return (
    <div
      className={cn(square, "grid place-items-center bg-black text-white ring-white/15")}
      aria-label={now ? `${label} time ${get("hour")}:${get("minute")} ${get("dayPeriod")}` : `${label} time`}
    >
      <Ticks seconds={now ? +get("second") : -1} className="stroke-white" />
      <p className="absolute top-[19%] text-[11px] font-semibold tracking-wide opacity-50">{label}</p>
      {/* Stretched vertically to get the tall, condensed digits of the macOS clock face */}
      <p className="origin-center scale-y-[1.35] text-[38px] font-extrabold tabular-nums tracking-[-0.06em]" suppressHydrationWarning>
        {now ? `${get("hour")}:${get("minute")}` : "--:--"}
      </p>
    </div>
  );
}

