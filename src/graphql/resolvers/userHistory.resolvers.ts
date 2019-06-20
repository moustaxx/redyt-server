import UserHistory, { IUserHistory } from '../../models/userHistory';

export const Query = {
	getUserHistory: async ({ }, { userID }: IUserHistory) => {
		return await UserHistory.findOne({ userID });
	}
};

export const Mutation = {

};
