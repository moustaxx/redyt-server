import { gql } from 'apollo-server-express';

export default gql`
	scalar Date
	enum Order {
		latest
		oldest
	}

	type Query {
		info: String!
		getPostsBySubforum(subforum: ID!, postsOrder: Order = latest): [Post!]!
		getPostByID(id: ID!, commentsOrder: Order = latest): Post!
		getSubforum(name: String!): Subforum!
		getSessionOwner: User!
		getUserByID(id: ID!): User!
		getUserByName(name: String!): User!
		getUserHistory(userID: ID!): UserHistory
		showPosts: [Post!]!
		showUsers: [User!]!
		showSubforums: [Subforum!]!
		verifyLogin(name: String!, password: String!): User!
	}

	type Mutation {
		createPost(title: String!, content: String!, subforum: ID!): Post!
		createSubforum(name: String!, description: String!, admins: [String]!,
			moderators: [String], colors: ColorsInput): Subforum!
		createUser(name: String!, password: String!, email: String!): User!
		createComment(content: String!, postID: ID!): Comment!
		deletePost(id: ID!): Post!
		deleteSubforum(id: String!): Subforum!
		deleteUser(id: ID!): User!
		editPost(id: ID!, title: String!, content: String!, author: ID!, subforum: ID! ): Post!
		logOut: User!
	}

	type Post {
		id: ID!
		title: String!
		content: String!
		author: User!
		subforum: Subforum!
		commentCounter: Int!
		comments: [Comment]
		createdAt: Date
		updatedAt: Date
	}

	type User {
		id: ID!
		name: String!
		email: String!
		createdAt: Date
	}

	type UserHistory {
		userID: String!
		votes: [UserVotes]
		comments: [UserComments]
		posts: [UserPosts]
	}

	type UserVotes {
		voteType: String!
		postID: String!
		createdAt: Date!
	}

	type UserComments {
		postID: String!
		createdAt: Date!
	}

	type UserPosts {
		postID: String!
		createdAt: Date!
	}

	type Comment {
		id: ID!
		author: User!
		content: String!
		postID: ID!
		createdAt: Date
	}

	type Subforum {
		id: ID!
		name: String!
		description: String!
		admins: [ID!]!
		moderators: [ID]
		colors: Colors!
		createdAt: Date
	}

	type Colors {
		subforum: SubforumColors!
		button: ButtonColors!
	}
	type SubforumColors {
		primary: String!
		secondary: String!
		tertiary: String!
	}
	type ButtonColors {
		primary: String!
		secondary: String!
	}
	
	input ColorsInput {
		subforum: SubforumColorsInput!
		button: ButtonColorsInput!
	}
	input SubforumColorsInput {
		primary: String!
		secondary: String!
		tertiary: String!
	}
	input ButtonColorsInput {
		primary: String!
		secondary: String!
	}

	type Votes {
		summary: String
		likes: [String]
		dislikes: [String]
	}
`;
