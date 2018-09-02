import Post from '../../models/post';

export const Query = {
	info: () => 'This is the API of mine bieatch.',
	showPosts: async () => await Post.find(),
	getPosts: async ({ }, { subforum }: any) => await Post.find({ subforum })
};

export const Mutation = {
	addPost: async ({ }, { title, description, author, subforum }: any) => {
		const newPost = new Post({
			title,
			description,
			author,
			subforum
		});
		return await newPost.save();
	},
	deletePost: async ({ }, { id }: any) => {
		await Post.findByIdAndRemove({ _id: id });
		return { id };
	}
};
