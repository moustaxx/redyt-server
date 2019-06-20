import userHistory from "../models/userHistory";
import { IComment } from "../models/comment";
import { IPost } from "../models/post";

export const createUserHistory = async (userID: string) => {
	const newUserHistory = new userHistory({
		userID,
		posts: [],
		votes: [],
		comments: [],
	});
	await newUserHistory.save();
};

export const addPostToHistory = async (post: IPost) => {
	const newPost = {
		postID: post.id,
		createdAt: Date.now(),
	};
	return await userHistory.findOneAndUpdate({ userID: post.author.id }, { $push: { posts: newPost } });
};

export const addCommentToHistory = async (comment: IComment) => {
	const newComment = {
		postID: comment.postID,
		createdAt: Date.now(),
	};
	return await userHistory.findOneAndUpdate({ userID: comment.author.id }, { $push: { comments: newComment } });
};
