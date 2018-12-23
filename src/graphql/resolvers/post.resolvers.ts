import Post from '../../models/post';

export const Query = {
	info: () => 'This is the API of mine bieatch.',
	showPosts: async () => await Post.find().populate('author'),
	getPostsBySubforum: async ({ }, { subforum }: any) =>
		await Post.find({ subforum }).populate('author'),
	getPostByID: async ({ }, { id }: any) => await Post.findOne({ _id: id }).populate('author')
};

export const Mutation = {
	addPost: async ({ }, { title, content, author, subforum }: any, { sessionOwner }: any) => {
		if (!sessionOwner) throw new Error('Auth error.');
		console.log('SESSION OWNER:', sessionOwner);
		const newPost = new Post({
			title,
			content,
			author,
			subforum
		});
		return await newPost.save();
	},
	deletePost: async ({ }, { id }: any) => {
		await Post.findByIdAndRemove({ _id: id });
		return { id };
	},
	editPost: async ({ }, { id, title, content, author, subforum }: any) => {
		const newPost = new Post({
			id,
			title,
			content,
			author,
			subforum
		});
		await Post.findByIdAndRemove({ _id: id }); //  TODO findByIdAndUpdate
		return await newPost.save();
	}
};
