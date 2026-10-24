import { ImageResponse } from "next/og";
import { publicImage } from "./_og/assets";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const avatar = await publicImage("avatar.png");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", borderRadius: 16, overflow: "hidden", background: "#e9e4f5" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar} width={64} height={64} alt="" />
      </div>
    ),
    size
  );
}
