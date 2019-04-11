import Comment, { IComment } from '../../models/comment';
import { IApolloContext } from '../..';
import { incrementComments } from '../../utils/commentCounter';

export const Query = {

};

export const Mutation = {
	createComment: async ({ }, { content, postID }: IComment, { sessionOwner }: IApolloContext) => {
		if (!sessionOwner) throw new Error('Auth error.');
		const newComment = new Comment({ content, postID, author: sessionOwner });
		incrementComments(postID);
		return await newComment.save();
	}
};
