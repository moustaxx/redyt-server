import User from '../../models/user';
import bcrypt = require('bcrypt');

export const Query = {
	showUsers: async () => await User.find(),
	verifyLogin: async ({ }, { name, password }: any) => {
		const userFromDB = await User.findOne({ name, password });
		if (!userFromDB) throw new Error('User not found!');
		const validPassword = await bcrypt.compare(password, userFromDB.password);
		console.log(validPassword);
		if (!validPassword) throw new Error('Wrong password!');
		return {
			message: 'Success!',
			user: {
				name,
				password
			},
			userFromDB
		};
	}
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
