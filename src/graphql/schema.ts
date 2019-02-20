import { gql } from 'apollo-server-express';

export default gql`
	scalar Date

	type Query {
		info: String!
		showPosts: [Post!]!
		showUsers: [User!]!
		showSubforums: [Subforum!]!
		getPostsBySubforum(subforum: ID!): [Post!]!
		getPostByID(id: ID!): Post!
		getSubforum(name: String!): Subforum!
		getSessionOwner: User!
		getUserByID(id: ID!): User!
		getUserByName(name: String!): User!
		verifyLogin(name: String!, password: String!): User!
	}

	type Mutation {
		addPost(title: String!, content: String!, author: ID!, subforum: ID!): Post!
		deletePost(id: ID!): Post!
		editPost(id: ID!, title: String!, content: String!, author: ID!, subforum: ID! ): Post!
		createUser(name: String!, password: String!, email: String!): User!
		deleteUser(id: ID!): User!
		addSubforum(name: String!, description: String!, admins: [String]!, moderators: [String], colors: [String]): Subforum!
		deleteSubforum(id: String!): Subforum!
		# changeUserPwd(id: ID!, password: String!, newPassword: String!) TODO
	}

	type Post {
		id: ID!
		title: String!
		content: String!
		author: User!
		subforum: Subforum!
		createdAt: Date
		updatedAt: Date
	}

	type User {
		id: ID!
		name: String!
		password: String!
		email: String!
		createdAt: Date
	}

	type Subforum {
		id: ID!
		name: String!
		description: String!
		admins: [ID!]!
		moderators: [ID]
		colors: Colors
		createdAt: Date
	}

	type Colors {
		primary: String,
		secondary: String,
		tertiary: String
	}
`;
