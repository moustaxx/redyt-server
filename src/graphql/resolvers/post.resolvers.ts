import Post, { IPost } from '../../models/post';
import { IApolloContext } from '../..';

import { ApolloError } from 'apollo-server-core';
import mongoose = require('mongoose');
import { addPostToHistory } from '../../utils/userHistoryUtils';

export const Query = {
	info: () => 'This is the API of mine bieatch.',
	showPosts: async () => await Post.find().populate('author'),
	getPostsBySubforum: async ({ }, { subforum, postsOrder }: IPost & { postsOrder: 'latest' | 'oldest' }) => {
		const order = postsOrder === 'oldest' ? 1 : -1;
		return await Post.find({ subforum }).populate('author').sort({ createdAt: order });
	},
	getPostByID: async ({ }, { id, commentsOrder }: IPost & { commentsOrder: 'latest' | 'oldest' }) => {
		const order = commentsOrder === 'oldest' ? 1 : -1;
		const [result] = await Post.aggregate([
			{ $match: { _id: mongoose.Types.ObjectId(id) } },
			{
				$lookup: {
					from: 'Comment',
					pipeline: [
						{ $match: { postID: mongoose.Types.ObjectId(id) } },
						{ $sort: { createdAt: order } },
						{ $lookup: { from: 'User', localField: 'author', foreignField: '_id', as: 'author' } },
						{ $unwind: '$author' },
					],
					as: 'comments'
				},
			},
			{ $lookup: { from: 'User', localField: 'author', foreignField: '_id', as: 'author' } },
			{ $unwind: '$author' },
			{ $lookup: { from: 'Subforum', localField: 'subforum', foreignField: '_id', as: 'subforum' } },
			{ $unwind: '$subforum' },
		]);
		if (!result) throw new ApolloError('Something went wrong!');
		return result;
	}
};

export const Mutation = {
	createPost: async ({ }, { title, content, subforum }: IPost, { sessionOwner }: IApolloContext) => {
		if (!sessionOwner) throw new Error('You must be logged in to add a post!');
		const newPost = new Post({
			title,
			content,
			author: sessionOwner,
			subforum,
			commentCounter: 0
		});
		await addPostToHistory(newPost);
		return await newPost.save();
	},
	deletePost: async ({ }, { id }: IPost) => {
		await Post.findByIdAndRemove({ _id: id });
		return { id };
	},
	editPost: async ({ }, { id, title, content, author, subforum }: IPost) => {
		const newPost = new Post({
			id,
			title,
			content,
			author,
			subforum
		});
		await Post.findByIdAndRemove({ _id: id }); //  TODO findByIdAndUpdate
		return await newPost.save();
	}
};
