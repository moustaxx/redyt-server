import mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
});

export interface IPost extends mongoose.Document {
	title: string;
	description: string;
	author: string;
	createdOn: Date;
}

export default mongoose.model<IPost>('Post', PostSchema);
