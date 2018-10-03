import { gql } from 'apollo-server-express';

export default gql`
	type Query {
		info: String!
		showPosts: [Post!]!
		showUsers: [User!]!
		getPostsBySubforum(subforum: ID!): [Post!]!
		getPostByID(id: ID!): [Post!]!
		showSubforums: [Subforum!]!
		verifyLogin(name: String!, password: String!): Message
		verifyLoginMongoose(name: String!, password: String!): Message
	}

	type Mutation {
		addPost(title: String!, description: String!, author: String!, subforum: ID!): Post!
		deletePost(id: ID!): Post!
		editPost(id: ID!, title: String!, description: String!, author: ID!, subforum: ID! ): Post!
		createUser(name: String!, password: String!, email: String!): User!
		deleteUser(id: ID!): User!
		addSubforum(name: String!, description: String!, admins: [String]!, moderators: [String]): Subforum!
		deleteSubforum(id: String!): Subforum!
		# changeUserPwd(id: ID!, password: String!, newPassword: String!) TODO
	}

	type Message {
		message: String
	}

	type Post {
		id: ID!
		title: String!
		description: String!
		author: User!
		subforum: String!
		createdOn: String
	}

	type User {
		id: ID!
		name: String!
		password: String!
		email: String!
		createdOn: String
	}

	type Subforum {
		id: ID!
		name: String!
		description: String!
		admins: [String!]!
		moderators: [String]
	}
`;
