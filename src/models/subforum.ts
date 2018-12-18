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
		},
		colors: {
			primary: {
				type: String
			},
			secondary: {
				type: String
			},
			tertiary: {
				type: String
			},
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
	colors: {
		primary: { type: string, default: '#42adf0' },
		secondary: { type: string, default: '#0d669e' },
		tertiary: { type: string, default: '#24a0ed' },
	};
	updatedAt: Date;
	createdAt: Date;
}

export default mongoose.model<ISubforum>('Subforum', SubforumSchema);
