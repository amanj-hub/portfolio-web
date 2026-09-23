import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b0b0c", color: "#f4f1ea", padding: "72px", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 20, letterSpacing: 6, color: "#e6a862" }}>
          <div style={{ display: "flex", width: 46, height: 46, justifyContent: "center", alignItems: "center", border: "1px solid rgba(244,241,234,.24)", borderRadius: 4, fontSize: 15, letterSpacing: 2, color: "#f4f1ea" }}>{siteConfig.initials}</div>
          PORTFOLIO / 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 66, letterSpacing: -3, lineHeight: 1.02, maxWidth: 900, fontWeight: 700 }}>
            Building digital products that solve real problems.
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#928c83" }}>
            {siteConfig.name} · Software Developer · B.Tech CSE
          </div>
        </div>
        <div style={{ display: "flex", width: 1056, height: 1, background: "rgba(244,241,234,.22)" }} />
      </div>
    ),
    size,
  );
}
