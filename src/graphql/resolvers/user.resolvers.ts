import User from '../../models/user';
import passport = require('passport');
import jwt = require('jsonwebtoken');

export const Query = {
	showUsers: async () => await User.find(),
	verifyLogin: async ({ }, { name, password }: any) =>
		new Promise((resolve, reject) => passport.authenticate('local', { session: false }, (err, user) => {
			if (err) reject(err);
			if (!user) reject('Invalid credentials.');

			const message = jwt.sign({ id: user._id }, '6KdNxKLNrmCQy739', { expiresIn: 1200 });
			resolve({ message });
		})({ body: { name, password } })),
	verifyLoginMongoose: async ({ }, { name, password }: any) => {
		const { user } = await (User.authenticate as any)()(name, password);
		console.log('xxx', user);
		
		if (!user) throw new Error('Invalid credentials.');

		const message = jwt.sign({ id: user._id }, '6KdNxKLNrmCQy739', { expiresIn: 1200 });
		return{ message };
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
	}
};
