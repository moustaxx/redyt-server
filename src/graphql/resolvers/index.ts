import { Query as CommentQuery, Mutation as CommentMutation } from './comment.resolvers';
import { Query as PostQuery, Mutation as PostMutation } from './post.resolvers';
import { Query as UserQuery, Mutation as UserMutation } from './user.resolvers';
import { Query as UserHistoryQuery, Mutation as UserHistoryMutation } from './userHistory.resolvers';
import { Query as SubforumQuery, Mutation as SubforumMutation } from './subforum.resolvers';

import { GraphQLDateTime } from 'graphql-iso-date';
import { IResolvers } from 'graphql-tools';

const id = ({ id, _id }: any) => id || String(_id);

export default {
	Date: GraphQLDateTime,

	Comment: { id },
	Post: { id },
	User: { id },
	Subforum: { id },
	
	Query: Object.assign({},
		CommentQuery,
		PostQuery,
		UserQuery,
		UserHistoryQuery,
		SubforumQuery
	),
	Mutation: Object.assign({},
		CommentMutation,
		PostMutation,
		UserMutation,
		UserHistoryMutation,
		SubforumMutation
	),
} as IResolvers;
