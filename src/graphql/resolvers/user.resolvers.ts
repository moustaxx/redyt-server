import User, { IUser } from '../../models/user';
import { IApolloContext } from '../..';

interface IUserRes extends IUser {
	password: string;
	newPassword?: string;
}

export const Query = {
	showUsers: async () => await User.find(),
	verifyLogin: async ({ }, { name, password }: IUserRes, { req }: IApolloContext) => {
		const { user } = await User.authenticate()(name, password);
		if (!user) throw new Error('Invalid credentials. Log in failed!');
		req!.logIn(user, (err: any) => {
			if (err) throw new Error('Passport error! Log in failed!');
		});
		return user;
	}
};

export const Mutation = {
	createUser: async ({ }, { name, password, email }: IUserRes) => {
		const newUser = new User({ name, email });
		return await User.register(newUser, password);
	},
	deleteUser: async ({ }, { id }: IUserRes) => {
		await User.findByIdAndRemove({ _id: id });
		return { id };
	},
	// changeUserPwd: async ({ }, { id, password, newPassword }: IUserRes) => {
	// 	await User.findByIdAndUpdate({ _id: id }, { });
	// 	 //  TODO findByIdAndUpdate
	// }
};
