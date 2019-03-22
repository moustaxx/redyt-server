import { Query as CommentQuery, Mutation as CommentMutation } from './comment.resolvers';
import { Query as PostQuery, Mutation as PostMutation } from './post.resolvers';
import { Query as UserQuery, Mutation as UserMutation } from './user.resolvers';
import { Query as SubforumQuery, Mutation as SubforumMutation } from './subforum.resolvers';

import { GraphQLDateTime } from 'graphql-iso-date';
import { IResolvers } from 'graphql-tools';

export default {
	Date: GraphQLDateTime,
	Query: Object.assign({},
		CommentQuery,
		PostQuery,
		UserQuery,
		SubforumQuery
	),
	Mutation: Object.assign({},
		CommentMutation,
		PostMutation,
		UserMutation,
		SubforumMutation
	),
} as IResolvers;
