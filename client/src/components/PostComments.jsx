import React, { useEffect, useState } from "react";
import useStore from "../store";
import { COMMENTS } from "../utils/dummyData";
import Button from "./Button";
import { Link } from "react-router-dom";
import Profile from "../assets/profile.png";
import { toast, Toaster } from "sonner";
import { deletePostComments, getPostComments, postComments } from "../utils/apiCalls";

const PostComments = ({ postId }) => {
    const { user } = useStore();
    const [comments, setComments] = useState(COMMENTS);
    const [desc, setDesc] = useState("");

    const fetchComments = async () => {
        const res = await getPostComments(postId);
        setComments(res || []);
    };

    const handleDeleteComment = async (id) => {
        const res = await deletePostComments(id, user?.token, postId);
        if (res?.success) {
            fetchComments();
            toast.success("Yorum başarıyla silindi.");
        } else {
            toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    const handlePostComment = async (e) => {
        e.preventDefault();
        const cleanDesc = desc.replace(/<\/?[^>]+(>|$)/g, ""); // XSS önleme  
        const res = await postComments(postId, user?.token, { desc: cleanDesc });
        if (res?.success) {
            setDesc('');
            fetchComments();
            toast.success("Yorum başarıyla eklendi.");
        } else {
            toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className="w-full relative py-10 px-4 md:px-8 lg:px-16">
            <p className="text-xl font-semibold text-slate-700 dark:text-slate-500 mb-6">
                Yorumlar
            </p>
            {user?.token ? (
                <form className="bg-gray-100 dark:bg-gray-950 p-4 rounded-lg shadow-md" onSubmit={handlePostComment}>
                    <textarea
                        name="desc"
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                        required
                        placeholder="Bir yorum bırak..."
                        className="bg-transparent w-full p-3 border focus:text-black border-gray-300 focus:outline-none focus:border-purple-950 focus:ring-2 focus:ring-purple-900 rounded-lg dark:focus:text-white"
                    />
                    <div className="w-full flex justify-end mt-3">
                        <Button
                            type="submit"
                            label="Gönder"
                            styles="bg-purple-950 hover:bg-purple-900 text-white py-2 px-6 rounded-lg shadow-md"
                        />
                    </div>
                </form>
            ) : (
                <div className="flex flex-col items-center py-10">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Yorum yapmak için giriş yapın.</p>
                    <Link to="/sign-in">
                        <Button
                            label="Giriş Yap"
                            styles="flex items-center justify-center bg-white dark:bg-transparent text-black dark:text-gray-500 px-6 py-2 rounded-full border shadow-md"
                        />
                    </Link>
                </div>
            )}
            <div className="w-full flex flex-col gap-6 mt-8">
                {comments?.length === 0 ? (
                    <span className="text-base text-slate-600 text-center">
                        Henüz yorum yok. İlk yorumu sen yap!
                    </span>
                ) : (
                    comments?.map((el) => (
                        <div key={el?._id} className="w-full flex gap-4 items-start bg-white dark:bg-gray-950 p-1 rounded-lg shadow-md transition-all hover:scale-[1.02]">
                            <img
                                src={el?.user?.image || Profile}
                                alt={el?.user?.name}
                                className="object-cover w-12 h-12 rounded-full border border-gray-300"
                            />
                            <div className="w-full">
                                <div className="w-full flex items-center gap-2">
                                    <p className="text-slate-700 dark:text-gray-400 font-medium">
                                        {el?.user?.name}
                                    </p>
                                    <span className="text-slate-500 text-xs italic">
                                        {new Date(el?.createdAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                    {el?.desc}
                                </p>
                                {user?.user?._id === el?.user?._id && (
                                    <button
                                        className="text-red-600 hover:text-red-700 text-sm font-medium mt-2"
                                        onClick={() => handleDeleteComment(el?._id)}
                                    >
                                        Sil
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PostComments;