import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils/dummyData";

const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("tr-TR", options);
};

const PopularPosts = ({ posts }) => {
    const Card = ({ post }) => {
        return (
            <div className='flex gap-3 items-center p-4 bg-white dark:bg-gray-950 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:scale-[1.05]'>
                <Link to={`/${post?.slug}/${post?._id}`} className='w-16 h-16 flex-shrink-0'>
                    <img
                        src={post?.img}
                        alt={post?.user?.name}
                        className='w-full h-full rounded-2xl object-cover transition-transform duration-300 ease-out hover:scale-110 hover:opacity-90 shadow-md'
                    />
                </Link>

                <div className='w-full flex flex-col gap-2'>
                    <span className="max-w-fit px-3 py-1 text-xs font-semibold uppercase bg-gradient-to-r rounded-2xl from-purple-500 to-indigo-500 text-white shadow-lg">
                        {post?.cat}
                    </span>
                    <Link
                        to={`/${post?.slug}/${post?._id}`}
                        className='text-black dark:text-white/90 font-semibold text-lg hover:text-indigo-500 transition-all duration-300 ease-out px-1
                        line-clamp-2 break-words overflow-hidden'
                    >
                        {post?.title}
                    </Link>
                    <div className='flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300'>
                        <span className='font-medium text-purple-700 dark:text-purple-400'>
                            {post?.user?.name}
                        </span>
                        <span className='text-xs font-medium px--1 text-gray-500 dark:text-gray-400'>
                            {formatDate(post?.createdAt)}
                        </span>
                    </div>
                </div>
            </div>
        );
    };



    return (
        <div className='w-full flex flex-col gap-6'>
            <h3 className='text-xl font-bold border-b pb-2 text-gray-900 dark:text-white'>
                🚀 Popüler Yazılar
            </h3>
            {posts?.map((post) => (
                <Card post={post} key={post?._id} />
            ))}
        </div>
    );
};

export default PopularPosts;