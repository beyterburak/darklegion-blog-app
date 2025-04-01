import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect } from "react";

const Banner = ({ posts = [] }) => {
    useEffect(() => {
        const updatePaginationStyles = () => {
            const paginationBullets = document.querySelectorAll('.swiper-pagination-bullet');
            paginationBullets.forEach(bullet => {
                bullet.style.backgroundColor = "#3b0764";
                bullet.style.width = "12px";
                bullet.style.height = "12px";
                bullet.style.borderRadius = "50%";
            });

            // Aktif bullet'ı özelleştirme
            const activeBullet = document.querySelector('.swiper-pagination-bullet-active');
            if (activeBullet) {
                activeBullet.style.backgroundColor = "#3b0764";
            }
        };

        updatePaginationStyles();

        // MutationObserver ile pagination bullet değişikliklerini izle
        const observer = new MutationObserver(updatePaginationStyles);
        const paginationContainer = document.querySelector('.swiper-pagination');
        if (paginationContainer) {
            observer.observe(paginationContainer, { childList: true });
        }

        return () => observer.disconnect();
    }, [posts]); // `posts` değiştiğinde tekrar çalıştır

    return (
        <div className="relative w-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active'
                }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="w-full"
            >
                {posts.map((post) => (
                    <SwiperSlide key={post?._id} className="relative w-full">
                        <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
                            <img
                                src={post?.img || "default-image.jpg"}
                                alt="Banner"
                                className="w-full h-full object-cover object-center transition-transform transform hover:scale-105 blur-sm"
                            />
                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-10">
                            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-2xl max-w-3xl">
                                {post?.title?.length > 60 ? post?.title.slice(0, 60) + "..." : post?.title}
                            </h2>
                            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed drop-shadow-md">
                                <Markdown options={{ wrapper: "article" }}>
                                    {post?.desc?.length > 160 ? post?.desc.slice(0, 160) + "..." : post?.desc}
                                </Markdown>
                            </p>
                            <div className="mt-6">
                                <Link
                                    to={`/${post?.slug}/${post?._id}`}
                                    className="bg-gradient-to-r from-purple-700 to-purple-900 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
                                >
                                    Yazıya Git
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="swiper-button-next text-purple-950 p-4 rounded-full hover:text-purple-900 absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                <span className="swiper-button-next-icon"></span>
            </div>
            <div className="swiper-button-prev text-purple-950 p-4 rounded-full hover:text-purple-900 absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                <span className="swiper-button-prev-icon"></span>
            </div>

            <div className="swiper-pagination absolute bottom-4 left-0 right-0 flex justify-center" />
        </div>
    );
};

export default Banner;
