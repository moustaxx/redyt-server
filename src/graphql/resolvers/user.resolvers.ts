import User from '../../models/user';
import bcrypt = require('bcrypt');

export const Query = {
	showUsers: async () => await User.find()
};

export const Mutation = {
	createUser: async ({ }, { name, password, email }: any) => {
		const encryptedPwd = bcrypt.hashSync(password, 10);
		const newUser = new User({
			name,
			password: encryptedPwd,
			email
		});
		return await newUser.save();
	},
	deleteUser: async ({ }, { id }: any) => {
		await User.findByIdAndRemove({ _id: id });
		return { id };
	}
};
