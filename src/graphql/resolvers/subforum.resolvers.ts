import Subforum, { ISubforum } from '../../models/subforum';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface ISubforumRes extends Omit<ISubforum, 'colors'> {
	colors: string[];
}

export const Query = {
	showSubforums: async () => await Subforum.find(),
	getSubforum: async ({ }, { name }: ISubforumRes) => await Subforum.findOne({ name }),
};

export const Mutation = {
	addSubforum: async ({ }, { name, description, admins, moderators,
		colors = ['#33a8ff', '#0079d3', '#0459e3'] }: ISubforumRes) => {
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
	deleteSubforum: async ({ }, { id }: ISubforumRes) => {
		await Subforum.findByIdAndRemove({ _id: id });
		return { id };
	}
};
