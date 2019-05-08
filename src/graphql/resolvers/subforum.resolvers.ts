import Subforum, { ISubforum } from '../../models/subforum';

export const Query = {
	showSubforums: async () => await Subforum.find(),
	getSubforum: async ({ }, { name }: ISubforum) => await Subforum.findOne({ name }),
};

export const Mutation = {
	addSubforum: async ({ }, payload: ISubforum) => {
		const colors = {
			subforum: {
				primary: '#42adf0',
				secondary: '#0d669e',
				tertiary: '#24a0ed',
			},
			button: {
				primary: '#1975d2',
				secondary: '#fffff00',
			}
		};
		
		const newSubforum = new Subforum({ colors, ...payload });
		return await newSubforum.save();
	},

	deleteSubforum: async ({ }, { id }: ISubforum) => {
		await Subforum.findByIdAndRemove({ _id: id });
		return { id };
	}
};
