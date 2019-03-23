import Post from '../models/post';

export const incrementComments = async (id: string) => {
	await Post.findOneAndUpdate({ _id: id }, { $inc: { commentCounter: 1, } });
};

export const decrementComments = async (id: string) => {
	await Post.findOneAndUpdate({ _id: id }, { $inc: { commentCounter: -1, } });
};
