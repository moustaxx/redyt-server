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
			subforum: {
				primary: {
					type: String,
					required: true,
				},
				secondary: {
					type: String,
					required: true,
				},
				tertiary: {
					type: String,
					required: true,
				},
			},
			button: {
				primary: {
					type: String,
					required: true,
				},
				secondary: {
					type: String,
					required: true,
				},
			}
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
		subforum: {
			primary: string;
			secondary: string;
			tertiary: string;
		};
		button: {
			primary: string;
			secondary: string;
		};
	};
	updatedAt: Date;
	createdAt: Date;
}

export default mongoose.model<ISubforum>('Subforum', SubforumSchema);
