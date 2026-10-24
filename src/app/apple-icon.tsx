import { ImageResponse } from "next/og";
import { publicImage } from "./_og/assets";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so this stays square
export default async function AppleIcon() {
  const avatar = await publicImage("avatar.png");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar} width={180} height={180} alt="" />
      </div>
    ),
    size
  );
}
