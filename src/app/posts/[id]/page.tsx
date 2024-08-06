import { postData } from "@/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { id: number };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = postData.find((p) => p.id == params.id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    metadataBase: new URL("http://localhost:3000"),
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}${
            post.image ? `&image=${encodeURIComponent(post.image)}` : ""
          }`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function Post({ params }: Props) {
  const post = postData.find((p) => {
    return p.id == params.id;
  });

  console.log("Found Post:", post);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
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
  );
}
