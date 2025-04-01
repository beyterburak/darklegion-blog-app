import Markdown from "markdown-to-jsx";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils/dummyData";

const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("tr-TR", options);
};

const Card = ({ post, index }) => {
    const category = CATEGORIES.find((c) => c.label === post?.cat);
    return (
        <div
            key={post?._id}
            className={`w-full flex flex-col gap-6 items-center rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-950 transition-transform duration-300 ease-out transform hover:scale-105 hover:shadow-2xl md:flex-row`}
        >
            <Link
                to={`/${post?.slug}/${post._id}`}
                className='w-full h-auto md:h-64 md:w-2/4'
            >
                <img
                    src={post?.img}
                    alt={post?.title}
                    className='object-cover w-full h-full rounded-2xl transition-transform duration-300 ease-out hover:scale-110 hover:opacity-90 shadow-md'
                />
            </Link>

            <div className='w-full md:w-2/4 flex flex-col gap-4 p-4'>
                <div className='flex gap-3 items-center'>
                    <span className='text-xs font-medium text-gray-600 dark:text-gray-400'>
                        {formatDate(post?.createdAt)}
                    </span>
                    <span className={`text-xs font-semibold px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md`}>
                        {post?.cat}
                    </span>
                </div>

                <h6 className='text-lg 2xl:text-2xl font-bold text-black dark:text-white/90 leading-snug hover:text-indigo-500 transition-all duration-300 ease-out px-1'>
                    {post?.title}
                </h6>

                <div className='flex-1 text-gray-700 dark:text-gray-300 text-sm text-justify line-clamp-3'>
                    <Markdown options={{ wrapper: "article" }}>
                        {post?.desc?.slice(0, 250) + "..."}
                    </Markdown>
                </div>

                <Link
                    to={`/${post?.slug}/${post._id}`}
                    className='flex items-center gap-2 text-purple-700 dark:text-purple-800 font-medium hover:underline transition-all duration-300 ease-out hover:text-indigo-500'
                >
                    <span>Okumaya devam et</span> <AiOutlineArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default Card;