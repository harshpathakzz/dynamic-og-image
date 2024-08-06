import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const image = searchParams.get("image");
  console.log("image", image);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "1200px",
          height: "630px",
          backgroundColor: "black",
          borderRadius: "10px",
          padding: "40px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          color: "#e0e0e0",
        }}
      >
        {title && (
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "900",
                color: "#e0e0e0",
                margin: "0",
                lineHeight: "1.9",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              {title}
            </h1>
          </div>
        )}
        {image && (
          <div
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={image}
              alt="OG Image"
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                borderRadius: "10px",
                objectFit: "cover",
                border: "4px solid #e0e0e0",
              }}
            />
          </div>
        )}
      </div>
    )
  );
}
