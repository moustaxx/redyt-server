import mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		subforum: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subforum',
			required: true,
		},
		commentCounter: {
			type: Number,
			required: true,
		}
	},
	{
		collection: 'Post',
		timestamps: true,
	}
);

export interface IPost extends mongoose.Document {
	title: string;
	content: string;
	author: {
		id: string;
		name: string;
	};
	subforum: string;
	commentCounter: number;
	updatedAt: Date;
	createdAt: Date;
	commentsOrder?: number;
}

export default mongoose.model<IPost>('Post', PostSchema);
