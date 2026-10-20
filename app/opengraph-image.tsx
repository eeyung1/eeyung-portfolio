import { ImageResponse } from "next/og";
export const alt = "Emmanuel Eyung — Software Engineer & Product Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f5f3ed",
        color: "#22251f",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 72,
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 32 }}>eyung.</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 74,
          letterSpacing: -3,
        }}
      >
        <span>Good ideas deserve to become</span>
        <span style={{ color: "#536549" }}>working products.</span>
      </div>
      <div style={{ display: "flex", fontSize: 24 }}>
        Emmanuel Eyung · Software Engineer & Product Builder
      </div>
    </div>,
    size,
  );
}
