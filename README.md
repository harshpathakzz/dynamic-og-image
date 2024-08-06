Certainly! Here's the updated README file reflecting the new structure where the `posts` folder has an `[id]` subfolder containing `page.tsx`, and the `api` folder has a `og` subfolder with `route.tsx`.

---

# Dynamic OG Image Generator

This project demonstrates how to create dynamic Open Graph (OG) images for a blog or content site using Next.js 14 and Tailwind CSS. The project includes a sample `data` folder with posts, a `Post` page to display individual posts, a `Home` page to list all posts, and an API route (`/api/og/route.tsx`) to generate OG images.

### `data/index.ts`

This file exports an array of post objects. Each post includes an `id`, `title`, `description`, and optionally an `image`.

```typescript
export const postData = [
  { id: 1, title: 'Post One', description: 'Description of Post One', image: '/path/to/image1.jpg' },
  { id: 2, title: 'Post Two', description: 'Description of Post Two' },
  // Add more posts here
];
```

### `app/posts/[id]/page.tsx`

This page displays an individual post based on the `id` parameter from the URL. It also generates metadata for the page, including the OG image URL.

```typescript
import { postData } from "@/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { id: number };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = postData.find((p) => p.id === params.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dynamic-og-image-eight.vercel.app";

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const metadata = {
    metadataBase: new URL(siteUrl),
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}${post.image ? `&image=${encodeURIComponent(post.image)}` : ""}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };

  return metadata;
}

export default function Post({ params }: Props) {
  const post = postData.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.image && (
          <div className="mb-4">
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        )}
        <p className="text-gray-700">{post.description}</p>
      </div>
    </div>
  );
}
```

### `app/page.tsx`

This page lists all the posts in a grid layout, linking to individual post pages.

```typescript
import { postData } from "@/data";
import Image from "next/image";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {postData.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className="border p-4 rounded-lg shadow-lg">
              {post.image && (
                <div className="mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="rounded-md"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
```

### `app/api/og/route.tsx`

This API route generates dynamic OG images based on the `title` and optionally an `image`. It uses the `ImageResponse` class from Next.js to create the image.

```typescript
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
```

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/harshpathakzz/dynamic-og-image/
   cd dynamic-og-image

   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Navigate to `http://localhost:3000` in your browser to see the home page. Click on any post to view its details and the dynamic OG image.

## Environment Variables

Ensure that the `NEXT_PUBLIC_SITE_URL` environment variable is set in your `.env.local` file if you're running the app locally. This URL is used to generate the correct OG image URL.

```env
NEXT_PUBLIC_SITE_URL=<YOUR BASE URL>
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify any section as needed!
