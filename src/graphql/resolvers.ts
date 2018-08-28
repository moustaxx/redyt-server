import Post from '../models/post';

export default {
	Query: {
		info: () => 'This is the API of mine bieatch.',
		showPosts: async () => await Post.find()
	},

	Mutation: {
		addPost: async ({ }, { title, description, author }: any) => {
			const x = new Post({
				title,
				description,
				author });
			await x.save((err, x) => {
				if (err) return console.error(err);
			});
			return x;
		}
	},

};
