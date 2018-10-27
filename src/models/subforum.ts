import mongoose = require('mongoose');

const SubforumSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		admins: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
			required: true,
		},
		moderators: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
		}
	},
	{
		collection: 'Subforum',
		timestamps: true,
	}
);

export interface ISubforum extends mongoose.Document {
	name: string;
	description: string;
	admins: [];
	moderators?: [];
	updatedOn: Date;
	createdOn: Date;
}

export default mongoose.model<ISubforum>('Subforum', SubforumSchema);
