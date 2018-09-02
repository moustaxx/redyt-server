import mongoose = require('mongoose');

const SubforumSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	admins: {
		type: String,
		required: true,
	},
	moderators: {
		type: String
	}
});

export interface ISubforum extends mongoose.Document {
	title: string;
	description: string;
	author: string;
	subforum: string;
	createdOn: Date;
}

export default mongoose.model<ISubforum>('Subforum', SubforumSchema);
