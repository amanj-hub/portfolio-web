import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", background: "#080b0e", color: "#f4f7f8", padding: "74px", fontFamily: "Arial, sans-serif", backgroundImage: "radial-gradient(circle at 88% 5%, rgba(165,248,209,.18), transparent 32%)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, letterSpacing: 4, color: "#a5f8d1" }}><div style={{ display: "flex", width: 44, height: 44, justifyContent: "center", alignItems: "center", border: "1px solid #a5f8d1", borderRadius: 9, fontSize: 15, color: "#f4f7f8" }}>{siteConfig.initials}</div> PORTFOLIO / 2026</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}><div style={{ display: "flex", fontSize: 74, letterSpacing: -4, lineHeight: 0.98, maxWidth: 880, fontWeight: 700 }}>{siteConfig.hero.headline}</div><div style={{ display: "flex", fontSize: 26, color: "#9aa8b2" }}>{siteConfig.name} · Full-Stack Developer · AI Enthusiast</div></div>
        <div style={{ display: "flex", width: 1052, height: 1, background: "rgba(220,235,240,.25)" }} />
      </div>
    ),
    size,
  );
}
