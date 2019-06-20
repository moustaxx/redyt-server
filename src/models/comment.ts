import mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		postID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
	},
	{
		collection: 'Comment',
		timestamps: true,
	}
);

export interface IComment extends mongoose.Document {
	content: string;
	author: {
		id: string;
		name: string;
	};
	postID: string;
	createdAt: string;
}

export default mongoose.model<IComment>('Comment', CommentSchema);
