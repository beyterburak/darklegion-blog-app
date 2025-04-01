import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";


const Pagination = ({ totalPages, onPageChange }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(searchParams.get("page")) || 1;

    const range = (start, end) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const showEllipses = totalPages > 8;

    // Klavye ile sayfa değiştirme (Sol → Önceki, Sağ → Sonraki)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft" && currentPage > 1) {
                onPageChange(currentPage - 1);
            }
            if (e.key === "ArrowRight" && currentPage < totalPages) {
                onPageChange(currentPage + 1);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentPage, totalPages]);

    return (
        <nav role="navigation" aria-label="Pagination Navigation">
            <div className='flex items-center justify-center gap-2 mt-8'>
                {/* Önceki Sayfa Butonu */}
                <button
                    className='px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous Page"
                >
                    <IoIosArrowDropleftCircle />
                </button>

                {/* Sayfa Numaraları */}
                {showEllipses && currentPage > 4 && (
                    <>
                        <button className='px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition'
                            onClick={() => onPageChange(1)}>
                            1
                        </button>
                        <span className='text-gray-500 dark:text-gray-400'>...</span>
                    </>
                )}

                {range(
                    Math.max(1, currentPage - 3),
                    Math.min(totalPages, currentPage + 4)
                ).map((page) => (
                    <motion.button
                        key={page}
                        className={`px-4 py-2 rounded-lg shadow-md transition group ${page === currentPage
                                ? "bg-purple-950 text-white scale-110"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                        onClick={() => onPageChange(page)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Go to Page ${page}`}
                    >
                        {page}
                    </motion.button>
                ))}

                {showEllipses && currentPage < totalPages - 3 && (
                    <>
                        <span className='text-gray-500 dark:text-gray-400'>...</span>
                        <button
                            className='px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition'
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Sonraki Sayfa Butonu */}
                <button
                    className='px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    aria-label="Next Page"
                >
                    <IoIosArrowDroprightCircle />
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
