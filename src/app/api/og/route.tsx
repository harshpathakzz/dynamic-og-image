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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Lorem, ipsum.</h1>
        {title && <h2>{title}</h2>}
        {image && <Image src={image} width={600} height={400} alt="img" />}
      </div>
    )
  );
}
