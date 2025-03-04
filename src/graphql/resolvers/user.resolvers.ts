import User, { IUser } from '../../models/user';
import { IApolloContext } from '../..';
import { setIsAuthCookie } from '../../utils/auth';
import { createUserHistory } from '../../utils/userHistoryUtils';

interface IUserRes extends IUser {
	password: string;
	newPassword?: string;
}

export const Query = {
	showUsers: async () => await User.find(),
	verifyLogin: async ({ }, { name, password }: IUserRes, { req, res }: IApolloContext) => {
		const { user } = await User.authenticate()(name, password);
		if (!user) throw new Error('Invalid credentials. Log in failed!');
		setIsAuthCookie(res, true);
		req!.logIn(user, (err: any) => {
			if (err) throw new Error('Passport error! Log in failed!');
		});
		return user;
	},
	getSessionOwner: async ({ }, { }, { sessionOwner }: IApolloContext) => {
		if (!sessionOwner) throw new Error('Session not found error!');
		console.log('sessionOwner:', sessionOwner.id);
		return sessionOwner;
	},
	getUserByID: async ({ }, { id }: IUser) => {
		const user = await User.findOne({_id: id});
		if (!user) throw new Error('User not found!');
		return user;
	},
	getUserByName: async ({ }, { name }: IUser) => {
		const user = await User.findOne({name});
		if (!user) throw new Error('User not found!');
		return user;
	}
};

export const Mutation = {
	createUser: async ({ }, { name, password, email }: IUserRes) => {
		const newUser = new User({ name, email });
		const data = await User.register(newUser, password) as IUser;
		await createUserHistory(data.id);
		return data;
	},
	deleteUser: async ({ }, { id }: IUserRes) => {
		await User.findByIdAndRemove({ _id: id });
		return { id };
	},
	logOut: async ({ }, { }, { req, res, sessionOwner }: IApolloContext) => {
		if (!sessionOwner) throw new Error('You are not logged in');
		const user = sessionOwner;
		setIsAuthCookie(res, false);
		req.logOut();
		return user;
	},
	// changeUserPwd: async ({ }, { id, password, newPassword }: IUserRes) => {
	// 	await User.findByIdAndUpdate({ _id: id }, { });
	// 	 //  TODO findByIdAndUpdate
	// }
};
