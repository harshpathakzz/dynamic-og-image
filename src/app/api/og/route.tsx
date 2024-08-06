import { ImageResponse } from "next/og";
import Image from "next/image";
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const image = searchParams.get("image");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#f3f4f6",
          color: "#111827",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
               {" "}
        {image && (
          <Image
            src={image}
            alt="OG Image"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              opacity: 0.3,
            }}
          />
        )}
               {" "}
        <div
          style={{
            zIndex: 1,
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
                   {" "}
          {title && (
            <h1
              style={{
                margin: 0,
                fontSize: "48px",
                lineHeight: "1.2",
              }}
            >
                            {title}           {" "}
            </h1>
          )}
                 {" "}
        </div>
             {" "}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
