import mongoose = require('mongoose');

const validColor = {
	type: String,
	required: true,
	validate: {
		validator: (value: string) => /(^#[0-9A-F]{3}$)|(^#[0-9A-F]{6}$)|(^#[0-9A-F]{8}$)/.test(value),
		message: 'Invalid HEX color'
	},
};

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
				primary: validColor,
				secondary: validColor,
				tertiary: validColor,
			},
			button: {
				primary: validColor,
				secondary: validColor,
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
