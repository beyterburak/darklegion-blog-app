import mongoose from "mongoose";
import Followers from "../models/followersModel.js";
import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";
import Views from "../models/viewsModel.js";
import Comments from "../models/commentModel.js";

export const stats = async (req, res, next) => {
    try {
        const { query } = req.query;
        const { userId } = req.body.user;

        const numOfDays = Number(query) || 28;

        const currentDate = new Date();
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - numOfDays);

        const totalPosts = await Posts.find({
            user: userId,
            createdAt: { $gte: startDate, $lte: currentDate }
        }).countDocuments();

        const totalViews = await Views.find({
            user: userId,
            createdAt: { $gte: startDate, $lte: currentDate }
        }).countDocuments();

        const totalWriters = await Users.find({
            accountType: "Writer",
        }).countDocuments();

        const totalFollowers = await Users.findById(userId);

        const viewStats = await Views.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    createdAt: { $gte: startDate, $lte: currentDate },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    Total: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const followersStats = await Followers.aggregate([
            {
                $match: {
                    writerId: new mongoose.Types.ObjectId(userId),
                    createdAt: { $gte: startDate, $lte: currentDate },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    Total: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const last5Followers = await Users.findById(userId).populate({
            path: "followers",
            options: { sort: { _id: -1 } },
            perDocumentLimit: 5,
            populate: {
                path: "followerId",
                select: "name email image accountType followers",
            },
        });

        const last5Posts = await Posts.find({ user: userId })
            .limit(5)
            .sort({ _id: -1 });

        res.status(200).json({
            success: true,
            message: "Data loaded successfully",
            totalPosts,
            totalViews,
            totalWriters,
            followers: totalFollowers?.followers?.length,
            viewStats,
            followersStats,
            last5Followers: last5Followers?.followers,
            last5Posts,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getFollowers = async (req, res, next) => {
    try {
        const { userId } = req.body.user;

        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const skip = (page - 1) * limit;

        const result = await Users.findById(userId).populate({
            path: "followers",
            options: { sort: { _id: -1 }, limit: limit, skip: skip },
            populate: {
                path: "followerId",
                select: "name email image accountType followers ",
            },
        });

        const totalFollowers = await Users.findById(userId);

        const numOfPages = Math.ceil(totalFollowers?.followers?.length / limit);

        res.status(200).json({
            data: result?.followers,
            total: totalFollowers?.followers?.length,
            numOfPages,
            page,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getPostContent = async (req, res, next) => {
    try {
        const { userId } = req.body.user;

        let queryResult = Posts.find({ user: userId }).sort({ _id: -1 });

        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const skip = (page - 1) * limit;

        // records count
        const totalPost = await Posts.countDocuments({ user: userId });
        const numOfPages = Math.ceil(totalPost / limit);

        queryResult = queryResult.skip(skip).limit(limit);

        const posts = await queryResult;

        res.status(200).json({
            success: true,
            message: "Content loaded successfully",
            totalPost,
            data: posts,
            page,
            numOfPages,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res, next) => {
    try {
        const { userId } = req.body.user;
        const { desc, img, title, slug, cat } = req.body;

        if (!desc || !img || !title || !slug || !cat) {
            return next("Please fill all fields");
        }

        const post = await Posts.create({
            user: userId,
            desc,
            img,
            title,
            slug,
            cat,
        });

        res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const commentPost = async (req, res, next) => {
    try {
        const { desc } = req.body;
        const { userId } = req.body.user;
        const { id } = req.params;

        console.log("Gelen yorum verisi:", req.body); // <-- Burada kontrol edelim
        console.log("Desc içeriği:", desc); // <-- Burada kontrol edelim

        if (!desc || desc.trim() === "") {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const newComment = new Comments({ desc, user: userId, post: id });

        await newComment.save();
        console.log("Kaydedilen yorum:", newComment); // <-- Burada kontrol edelim

        // updating the post with the comments id
        const post = await Posts.findById(id);

        post.comments.push(newComment._id);

        await Posts.findByIdAndUpdate(id, post, {
            new: true
        });

        console.log(newComment);

        res.status(201).json({
            success: true,
            message: "Comment published successfully",
            newComment,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const post = await Posts.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post,
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getPosts = async (req, res, next) => {
    try {
        const { cat, writerId } = req.query;

        let query = { status: true };

        if (cat) {
            query.cat = cat;
        } else if (writerId) {
            query.user = writerId;
        }

        let queryResult = Posts.find(query)
            .populate({
                path: "user",
                select: "name image",
            })
            .sort({ _id: -1 });

        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        // records count
        const totalPost = await Posts.countDocuments(query);

        const numOfPages = Math.ceil(totalPost / limit);

        queryResult = queryResult.skip(skip).limit(limit);

        const posts = await queryResult;

        res.status(200).json({
            success: true,
            totalPost,
            data: posts,
            page,
            numOfPages,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getPopularContents = async (req, res, next) => {
    try {
        const posts = await Posts.aggregate([
            {
                $match: {
                    status: true,
                },
            },
            {
                $project: {
                    title: 1,
                    slug: 1,
                    img: 1,
                    cat: 1,
                    views: { $size: { $ifNull: ["$views", []] } },
                    createdAt: 1,
                },
            },
            {
                $sort: { views: -1 },
            },
            {
                $limit: 5,
            },
        ]);

        const writers = await Users.aggregate([
            {
                $match: {
                    accountType: { $ne: "User" },
                },
            },
            {
                $project: {
                    name: 1,
                    image: 1,
                    followers: { $size: { $ifNull: ["$followers", []] } },
                },
            },
            {
                $sort: { followers: -1 },
            },
            {
                $limit: 5,
            },
        ]);

        res.status(200).json({
            success: true,
            message: "Successful",
            data: { posts, writers },
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await Posts.findById(postId).populate({
            path: "user",
            select: "name image",
        });

        const newView = await Views.create({
            user: post?.user,
            post: postId,
        });

        post.views.push(newView?._id);

        await Posts.findByIdAndUpdate(postId, post);

        res.status(200).json({
            success: true,
            message: "Successful",
            data: post,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getComments = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const postComments = await Comments.find({ post: postId })
            .populate({
                path: "user",
                select: "name image",
            })
            .sort({ _id: -1 });

        res.status(200).json({
            sucess: true,
            message: "successfully",
            data: postComments,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const { userId } = req.body.user;
        const { id } = req.params;

        await Posts.findOneAndDelete({ _id: id, user: userId });

        res.status(200).json({
            success: true,
            message: "Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const { id, postId } = req.params;

        await Comments.findByIdAndDelete(id);

        //removing commetn id from post
        const result = await Posts.updateOne(
            { _id: postId },
            { $pull: { comments: id } }
        );

        if (result.modifiedCount > 0) {
            res
                .status(200)
                .json({ success: true, message: "Comment removed successfully" });
        } else {
            res.status(404).json({ message: "Post or comment not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
