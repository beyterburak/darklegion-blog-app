// import { Link } from "react-router-dom";
// import {
//   Banner,
//   Card,
//   Pagination,
//   PopularPosts,
//   PopularWriters,
// } from "../components";
// import { CATEGORIES } from "../utils/dummyData";
// import { usePopularPosts, usePosts } from "../hooks/post-hook";

// const Home = () => {
//   const { posts, numOfPages, setPage } = usePosts({ writerId: "" });
//   const popular = usePopularPosts();
//   const latestPosts = posts.slice(0, 3);

//   const handlePageChange = (val) => setPage(val);

//   if (posts?.length < 1)
//     return (
//       <div className="w-full h-full flex items-center justify-center py-10">
//         <span className="text-lg text-gray-500">No Post Available</span>
//       </div>
//     );

//   return (
//     <div className="py-10 px-6 lg:px-20">
//       {/* Hero Banner */}
//       <Banner posts={latestPosts} />

//       {/* Kategoriler - Şık Grid Tasarımı */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Kategoriler</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//           {CATEGORIES.map((cat) => (
//             <Link
//               to={`/category?cat=${cat?.label}`}
//               className="relative group flex flex-col items-center justify-center gap-3 bg-gray-800 dark:bg-gray-900 text-white font-semibold text-lg py-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
//               key={cat.label}
//               style={{ backgroundColor: cat.color }}
//             >
//               <div className="text-3xl">{cat?.icon}</div>
//               <span className="text-lg">{cat.label}</span>
//               <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-xl"></div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Blog Postları */}
//       <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* Sol - Blog Yazıları */}
//         <div className="col-span-2 flex flex-col gap-8">
//           {posts.map((post, index) => (
//             <div
//               key={post?._id}
//               className="relative group bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-xl"
//             >
//               <Card post={post} index={index} />
//               <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-lg"></div>
//             </div>
//           ))}

//           <div className="flex justify-center mt-6">
//             <Pagination totalPages={parseInt(numOfPages)} onPageChange={handlePageChange} />
//           </div>
//         </div>

//         {/* Sağ - Popülerler Bölümü */}
//         <div className="col-span-1 flex flex-col gap-10">
//           {/* Popüler Yazılar */}
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
//             <PopularPosts posts={popular?.posts} />
//           </div>

//           {/* Popüler Yazarlar */}
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
//             <PopularWriters data={popular?.writers} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
