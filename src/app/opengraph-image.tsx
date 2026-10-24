import { ImageResponse } from "next/og";
import { profile } from "@/lib/portfolio";
import { publicImage } from "./_og/assets";

export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card, styled like the site's macOS window on the gradient wallpaper
export default async function OpengraphImage() {
  const avatar = await publicImage("avatar.png");
  const stack = ["Next.js", "TypeScript", "Node.js", "MongoDB"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0d1a",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, #3d1d5e 0%, transparent 50%), radial-gradient(circle at 88% 8%, #0e3a74 0%, transparent 50%), radial-gradient(circle at 72% 88%, #4b1850 0%, transparent 55%), radial-gradient(circle at 8% 92%, #0b4848 0%, transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 1040,
            height: 470,
            display: "flex",
            flexDirection: "column",
            borderRadius: 28,
            background: "rgba(28,28,30,0.92)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", height: 64, padding: "0 28px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c, marginRight: 12 }} />
            ))}
            <div style={{ display: "flex", flex: 1, justifyContent: "center", marginRight: 90, color: "rgba(255,255,255,0.6)", fontSize: 22, fontWeight: 600 }}>
              About
            </div>
          </div>

          <div style={{ display: "flex", flex: 1, alignItems: "center", padding: "0 64px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} width={220} height={220} alt="" style={{ borderRadius: 110, border: "6px solid rgba(255,255,255,0.9)" }} />
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 56 }}>
              {profile.status && (
                <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", padding: "8px 18px", borderRadius: 999, background: "rgba(16,185,129,0.18)", color: "#34d399", fontSize: 22, fontWeight: 600 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 6, background: "#10b981", marginRight: 10 }} />
                  {profile.status}
                </div>
              )}
              <div style={{ display: "flex", marginTop: 18, color: "#f5f5f7", fontSize: 64, fontWeight: 700, letterSpacing: -1.5 }}>{profile.name}</div>
              <div style={{ display: "flex", marginTop: 8, color: "rgba(245,245,247,0.65)", fontSize: 30 }}>
                {profile.role} · {profile.yearsExperience} years · {profile.companies} companies
              </div>
              <div style={{ display: "flex", marginTop: 28 }}>
                {stack.map((s) => (
                  <div key={s} style={{ display: "flex", padding: "8px 18px", marginRight: 12, borderRadius: 999, background: "rgba(255,255,255,0.1)", color: "rgba(245,245,247,0.85)", fontSize: 22 }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
