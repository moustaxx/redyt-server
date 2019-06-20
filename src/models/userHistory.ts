import mongoose = require('mongoose');

const postIDAndCreatedAt = {
	postID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
	},
	createdAt: Date
}

const UserHistorySchema = new mongoose.Schema(
	{
		userID: String,
		votes: [{
			voteType: String,
			...postIDAndCreatedAt
		}],
		comments: [ postIDAndCreatedAt ],
		posts: [ postIDAndCreatedAt ],
	},
	{
		collection: 'UserHistory'
	}
);

export interface IUserHistory extends mongoose.Document {
	userID: string;
	votes: [{
		voteType: string;
		postID: string;
		createdAt: Date;
	}];
	comments: [{
		postID: string;
		createdAt: Date;
	}];
	posts: [{
		postID: string;
		createdAt: Date;
	}];
}
export default mongoose.model<IUserHistory>('UserHistory', UserHistorySchema);
