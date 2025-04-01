import { Link } from "react-router-dom";
import {
  Banner,
  Card,
  Pagination,
  PopularPosts,
  PopularWriters,
} from "../components";

import { CATEGORIES } from "../utils/dummyData";
import { usePopularPosts, usePosts } from "../hooks/post-hook";
import { useEffect, useState } from "react";

const Home = () => {
  const { posts, numOfPages, setPage } = usePosts({ writerId: "" });
  const popular = usePopularPosts();

  const [initialPosts, setInitialPosts] = useState([]);

  useEffect(() => {
    // Sadece ilk render'da ilk 3 postu kaydediyoruz
    if (posts.length > 0 && initialPosts.length === 0) {
      setInitialPosts(posts.slice(0, 3));
    }
  }, [posts, initialPosts]); // `initialPosts` doluysa tekrar çalışmasın

  const handlePageChange = (val) => {
    setPage(val);
    console.log(val);
  };

  if (posts?.length < 1)
    return (
      <div className="w-full h-full py-8 flex items-center justify-center">
        <span className="text-lg text-slate-500">No Post Available</span>
      </div>
    );

  return (
    <div className="py-10 px-6 lg:px-20">
      <Banner posts={initialPosts} /> {/* Her zaman ilk sayfanın ilk 3 postunu alır */}

      <div className="mt-10">
        {/* Kategoriler */}
        <div className="mt-6 md:mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                to={`/category?cat=${cat?.label}`}
                className="relative group flex flex-col items-center justify-center gap-3 bg-gray-800 dark:bg-gray-900 text-white font-semibold text-sm sm:text-base py-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                key={cat.label}
                style={{ backgroundColor: cat.color }}
              >
                <div className="text-3xl">{cat?.icon}</div>
                <span className="max-w-[80%] truncate whitespace-nowrap sm:whitespace-normal text-center">
                  {cat.label}
                </span>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-xl"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Blog Post */}
        <div className="w-full flex flex-col mt-14 md:flex-row gap-10 2xl:gap-20">
          {/* LEFT */}
          <div className="w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14">
            {posts?.map((post, index) => (
              <Card key={post?._id} post={post} index={index} />
            ))}

            <div className="w-full flex items-center justify-center">
              <Pagination
                totalPages={parseInt(numOfPages)}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-1 flex flex-col gap-10">
            {/* POPULAR POSTS */}
            <PopularPosts posts={popular?.posts} />

            {/* POPULAR WRITERS */}
            <PopularWriters data={popular?.writers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
