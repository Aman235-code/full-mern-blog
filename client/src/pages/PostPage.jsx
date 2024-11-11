import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";

export default function PostPage() {
  const params = useParams();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [post, setpost] = useState(null);

  useEffect(() => {
    const fetchpost = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/post/getposts?slug=${params.postslug}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          seterror(true);
          setloading(false);
          return;
        }
        if (res.ok) {
          setpost(data.posts[0]);
          setloading(false);
          seterror(null);
        }
      } catch (error) {
        seterror(true);
        setloading(false);
        console.log(error);
      }
    };
    fetchpost();
  }, [params.postslug]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center max-h-screen">
          <Spinner size="xl" />
        </div>
      ) : (
        <main className="p-3 flex flex-col max-w-6xl mx-auto max-h-screen">
          <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {post && post.title}
          </h1>
          <Link
            to={`/search?category=${post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="xs">
              {post && post.category}
            </Button>
          </Link>
          <img
            src={post && post.image}
            alt={post && post.title}
            className="mt-10 p-3 max-h-[600px] w-full object-cover"
          />
          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
          <div className="max-w-4xl mx-auto w-full">
            <CallToAction />
          </div>
        </main>
      )}
    </div>
  );
}
