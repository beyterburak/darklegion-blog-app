import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useStore from "../store";
import Markdown from "markdown-to-jsx";
import PopularPosts from "../components/PopularPosts.jsx";
import PopularWriters from "../components/PopularWriters.jsx";
import PostComments from "../components/PostComments.jsx";
import { getSinglePost } from "../utils/apiCalls.js";
import { usePopularPosts } from "../hooks/post-hook.js";
import { CATEGORIES } from "../utils/dummyData.js";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("tr-TR", options);
};

const BlogDetails = () => {
  const { setIsLoading } = useStore();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const category = CATEGORIES.find((c) => c.label === post?.cat);
  const popular = usePopularPosts();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const data = await getSinglePost(id);
      setPost(data || {});
      setIsLoading(false);
    };
    if (id) {
      fetchPost();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [id]);

  if (!post) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="text-xl text-slate-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-16 py-12 2xl:px-24">
      <div className="w-full flex flex-col-reverse md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h1 className='text-4xl md:text-5xl font-bold text-slate-800 dark:text-white leading-tight hover:text-indigo-500 transition-all duration-300 ease-out'>
            {post?.title}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md">
              {post?.cat}
            </span>
            <span className="text-lg text-gray-700 dark:text-gray-400">
              {post?.views?.length || 0} Görüntüleme
            </span>
          </div>
          <Link to={`/writer/${post?.user?._id}`} className="flex items-center gap-3 mt-3 hover:scale-105 transition-transform duration-300 ease-out">
            <img
              src={post?.user?.image}
              alt={post?.user?.name}
              className="object-cover w-14 h-14 rounded-full border-2 border-gray-300 shadow-md hover:border-indigo-500"
            />
            <div>
              <p className="text-lg font-medium text-slate-800 dark:text-white">
                {post?.user?.name}
              </p>
              <span className="text-sm text-gray-500">
                {formatDate(post?.createdAt)}
              </span>
            </div>
          </Link>
        </div>
        <img
          src={post?.img}
          alt={post?.title}
          className="w-full md:w-1/2 h-80 md:h-[400px] object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out"
        />
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 mt-10'>
        <div className='w-full md:w-3/4 p-8 md:p-12 rounded-2xl shadow-lg bg-white dark:bg-gray-950 transition-transform duration-300 ease-out hover:scale-[1.0] hover:shadow-2xl'>
          {post?.desc && (
            <Markdown
              options={{
                wrapper: "article",
                overrides: {
                  p: { props: { className: "mb-4" } },
                  ul: { props: { className: "list-disc ml-6 mb-4" } },
                  ol: { props: { className: "list-decimal ml-6 mb-4" } },
                  h1: { props: { className: "text-2xl font-bold mt-6 mb-3" } },
                  h2: { props: { className: "text-xl font-semibold mt-5 mb-3" } },
                  h3: { props: { className: "text-lg font-medium mt-4 mb-2" } },
                },
              }}
              className="leading-loose text-[18px] md:text-lg text-gray-900 dark:text-gray-300"
            >
              {post?.desc}
            </Markdown>
          )}

          <div className='mt-12 border-t border-gray-300 dark:border-gray-600 pt-5'>
            <PostComments postId={id} />
          </div>
        </div>

        <div className='w-full md:w-1/3 flex flex-col gap-y-12'>
          <PopularPosts posts={popular?.posts} />
          <PopularWriters data={popular?.writers} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
