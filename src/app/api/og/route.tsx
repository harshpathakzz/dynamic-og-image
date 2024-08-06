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
          backgroundColor: "#f4f4f4",
          borderRadius: "10px",
          padding: "40px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
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
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#333",
                margin: "0",
                lineHeight: "1.2",
              }}
            >
              {title}
            </h2>
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
              }}
            />
          </div>
        )}
      </div>
    )
  );
}
