import React from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import { formatNumber } from "../utils";

const PopularWriters = ({ data }) => {
    return (
        <div className='w-full flex flex-col gap-6'>
            <h3 className='text-xl font-bold dark:text-white border-b pb-2 text-gray-900'>
                🚀 Popüler Yazarlar
            </h3>
            {data?.map((el, id) => (
                <Link
                    to={`/writer/${el?._id}`}
                    key={el?._id + id}
                    className='flex items-center gap-4 p-4 bg-white dark:bg-gray-950 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:scale-[1.05]'
                >
                    <img
                        src={el?.image || Profile}
                        alt={el?.name}
                        className='w-16 h-16 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow-md hover:scale-110 hover:opacity-90 transition-transform duration-300 ease-out'
                    />
                    <div className='flex flex-col gap-0.5'>
                        <span className='text-lg font-semibold text-gray-900 dark:text-white/90 px-0 hover:text-indigo-500 transition-all duration-300 ease-out'>
                            {el?.name}
                        </span>
                        <span className='text-sm font-medium text-purple-700 dark:text-purple-400'>
                            {formatNumber(el?.followers)} <span className='text-gray-600 dark:text-gray-400'>Followers</span>
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default PopularWriters;