import mongoose = require('mongoose');
import passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
}) as mongoose.PassportLocalSchema;

export interface IUser extends mongoose.PassportLocalDocument {
	name: string;
	email: string;
	createdOn: Date;
}
UserSchema.plugin(passportLocalMongoose, {usernameField: 'name'});
export default mongoose.model<IUser>('User', UserSchema);
