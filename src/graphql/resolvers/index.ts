import { Query as PostQuery, Mutation as PostMutation } from './post.resolvers';
import { Query as UserQuery, Mutation as UserMutation } from './user.resolvers';
import { Query as SubforumQuery, Mutation as SubforumMutation } from './subforum.resolvers';

export default {
	Query: Object.assign({},
		PostQuery,
		UserQuery,
		SubforumQuery
	),
	Mutation: Object.assign({},
		PostMutation,
		UserMutation,
		SubforumMutation
	),
};
