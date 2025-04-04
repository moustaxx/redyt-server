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
		},
		votes: [{
			userID: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			voteType: String,
			createdAt: Date
		}],
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
	votes: {
		userID: string;
		voteType: string;
		createdAt: Date;
	};

	updatedAt: Date;
	createdAt: Date;
}

export default mongoose.model<IPost>('Post', PostSchema);
