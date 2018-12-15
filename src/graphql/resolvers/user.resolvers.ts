import User from '../../models/user';
import jwt = require('jsonwebtoken');

export const Query = {
	showUsers: async () => await User.find(),
	verifyLogin: async ({ }, { name, password }: any) => {
		const { user } = await (User.authenticate as any)()(name, password);
		if (!user) throw new Error('Invalid credentials. Log in failed!');

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: 7200 });
		return{ token };
	}
};

export const Mutation = {
	createUser: async ({ }, { name, password, email }: any) => {
		const newUser = new User({
			name,
			email
		});
		return await (User as any).register(newUser, password);
	},
	deleteUser: async ({ }, { id }: any) => {
		await User.findByIdAndRemove({ _id: id });
		return { id };
	},
	// changeUserPwd: async ({ }, { id, password, newPassword }: any) => {
	// 	await User.findByIdAndUpdate({ _id: id }, { });
	// 	 //  TODO findByIdAndUpdate
	// }
};
