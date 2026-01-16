import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "AS Muret Cycliste";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 64,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#171717",
          border: "24px solid #3b82f6", // Bleu vif
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              marginBottom: 20,
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AS Muret
          </div>
          <div style={{ fontSize: 48, fontWeight: "bold", color: "#374151" }}>
            Cycliste & VTT
          </div>
          <div style={{ fontSize: 32, marginTop: 20, color: "#6b7280" }}>
            Depuis 1962
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image size config
      ...size,
    }
  );
}
