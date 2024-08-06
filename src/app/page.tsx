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
