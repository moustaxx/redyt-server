import mongoose = require('mongoose');
import passportLocalMongoose = require('passport-local-mongoose');

const UserSchema: mongoose.PassportLocalSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
	},
	{
		collection: 'User',
		timestamps: true,
	}
);

export interface IUser extends mongoose.PassportLocalDocument {
	id: string;
	name: string;
	email: string;
	updatedAt: Date;
	createdAt: Date;
}
UserSchema.plugin(passportLocalMongoose, { usernameField: 'name' });
export default mongoose.model<IUser>('User', UserSchema) as mongoose.PassportLocalModel<IUser>;
