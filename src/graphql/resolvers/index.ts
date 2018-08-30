import { Query as PostQuery, Mutation as PostMutation } from './post.resolvers';
import { Query as UserQuery, Mutation as UserMutation } from './user.resolvers';

export default {
	Query: Object.assign({},
		PostQuery,
		UserQuery
	),
	Mutation: Object.assign({},
		PostMutation,
		UserMutation
	),
};
