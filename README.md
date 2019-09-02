# Redyt Server

Redyt Server is a backend application for a Reddit-like platform, built using modern web technologies. It provides a GraphQL API for managing users, posts, comments, subforums, and user history. This project demonstrates the use of TypeScript, MongoDB, and Apollo Server to create a scalable and maintainable backend system.

## Features

### User Management
- **User Registration**: Create new users with unique usernames and emails.
- **Authentication**: Secure login using `passport-local-mongoose` with session-based authentication.
- **Session Management**: Maintain user sessions with cookies and session storage.
- **User History**: Track user activity, including posts, comments, and votes.

### Post and Comment System
- **Posts**: Create, edit, and delete posts within subforums.
- **Comments**: Add comments to posts and track comment counts.
- **Voting**: Users can vote on posts with "like" or "dislike" options.

### Subforums
- **Subforum Creation**: Admins can create subforums with custom colors and descriptions.
- **Moderation**: Assign admins and moderators to manage subforums.

### GraphQL API
- **Queries**:
  - Fetch posts, comments, users, subforums, and user history.
  - Retrieve posts by subforum or ID with sorting options.
- **Mutations**:
  - Create, update, and delete posts, comments, users, and subforums.
  - Vote on posts and manage user sessions.

### Technologies Used
- **TypeScript**: Strongly typed codebase for better maintainability and fewer runtime errors.
- **GraphQL**: Flexible and efficient API for querying and mutating data.
- **MongoDB**: NoSQL database for scalable and schema-flexible data storage.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Apollo Server**: GraphQL server with built-in support for schema definition and resolvers.

## Getting Started

### Prerequisites
- Node.js (v12)
- MongoDB (local or cloud instance)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/moustaxx/redyt-server.git
   cd redyt-server
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables: Create a .env file in the root directory based on .env.example.

4. Start the development server:
   ```bash
   yarn start
   ```

5. Access the GraphQL Playground: Open your browser and navigate to http://localhost:4000/graphql.