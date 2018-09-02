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
		type: Array,
		required: true,
	},
	moderators: {
		type: Array

	}
});

export interface ISubforum extends mongoose.Document {
	name: string;
	description: string;
	admins: [];
	moderators: [];
	createdOn: Date;
}

export default mongoose.model<ISubforum>('Subforum', SubforumSchema);
