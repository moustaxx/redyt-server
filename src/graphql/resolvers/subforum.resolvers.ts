import Subforum from '../../models/subforum';

export const Query = {
	showSubforums: async () => await Subforum.find(),
	getSubforum: async ({ }, { name }: any ) => await Subforum.findOne({ name }),
};

export const Mutation = {
	addSubforum: async ({ }, { name, description, admins, moderators, colors }: any) => {
		const newSubforum = new Subforum({
			name,
			description,
			admins,
			moderators,
			colors: {
				primary: colors[0],
				secondary: colors[1],
				tertiary: colors[2]
			}
		});
		return await newSubforum.save();
	},
	deleteSubforum: async ({ }, { id }: any) => {
		await Subforum.findByIdAndRemove({ _id: id });
		return { id };
	}
};
