import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useStore from "../store";
import { useEffect, useState } from "react";
import { updateURL } from "../utils";
import axios from "axios";
import { API_URL } from "../utils/apiCalls";
import { toast } from "sonner";

export const usePosts = ({writerId}) => {
    const { setIsLoading } = useStore();


    const location = useLocation();
    const navigate = useNavigate();

    const [ searchParams] = useSearchParams();

    const [ page, setPage ] = useState(searchParams.get("page") || 1);
    const [ category, setCategory ] = useState(searchParams.get("cat") || "");

    const [ posts, setPosts ] = useState([]);
    const [ numOfPages, setNumOfPages ] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            updateURL({ page, navigate, location, cat: category });

            setIsLoading(true);

            try {
                const { data } = await axios.get(
                    `${API_URL}/posts?cat=${category}&page=${page}&writerId=${writerId || ""}`
                );

                setPosts(data?.data || []);
                setNumOfPages(data?.numOfPages);
            } catch (error) {
                toast.error("Something went wrong. Please try again later.");

                const err = error?.response?.data || error?.response;
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

        fetchPosts();
    } , [page, writerId]);

    return { 
        page, 
        posts, 
        numOfPages, 
        setPage,
    };
};

export const usePopularPosts = () => {
    const [ popular, setPopular ] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/posts/popular`);

                setPopular(data?.data);
            } catch (error) {
                toast.error("Something went wrong. Please try again later.");

                const err = error?.response?.data || error?.response;
                console.log(error);
            }
        };

        fetchPosts();
    }, []);

    return popular;
};