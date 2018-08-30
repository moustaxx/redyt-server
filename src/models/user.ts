import mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
});

export interface IUser extends mongoose.Document {
	name: string;
	password: string;
	email: string;
	createdOn: Date;
}

export default mongoose.model<IUser>('User', UserSchema);
