import Comment, { IComment } from '../../models/comment';
import { IApolloContext } from '../..';

export const Query = {
	getCommentsByPost: async ({ }, { postID }: IComment) => {
		return await Comment.find({ postID }).populate('author');
	}
};

export const Mutation = {
	createComment: async ({ }, { content, postID }: IComment, { sessionOwner }: IApolloContext) => {
		if (!sessionOwner) throw new Error('Auth error.');
		const newComment = new Comment({ content, postID, author: sessionOwner });
		return await newComment.save();
	}
};
