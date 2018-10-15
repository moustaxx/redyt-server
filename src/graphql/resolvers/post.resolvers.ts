import Post from '../../models/post';

export const Query = {
	info: () => 'This is the API of mine bieatch.',
	showPosts: async () => await Post.find().populate('author'),
	getPostsBySubforum: async ({ }, { subforum }: any, { tokenOwner }: any) => {
		if (!tokenOwner) throw new Error('Auth error.');
		console.log('TOKEN OWNER:', tokenOwner);
		return await Post.find({ subforum }).populate('author');
	},
	getPostByID: async ({ }, { id }: any) => await Post.find({ _id: id }).populate('author')
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
	},
	editPost: async ({ }, { id, title, description, author, subforum }: any) => {
		const newPost = new Post({
			id,
			title,
			description,
			author,
			subforum
		});
		await Post.findByIdAndRemove({ _id: id });
		return await newPost.save();
	}
};
