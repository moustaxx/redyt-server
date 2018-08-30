import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolvers';
import { startDB } from './db';

import morgan = require('morgan');

startDB({
	user: 'admin',
	pwd: 'admin',
	url: 'cluster0-q5i8e.mongodb.net/redyt?retryWrites=true'
});

const server = new GraphQLServer({
	typeDefs: './src/graphql/schema.graphql',
	resolvers
});

server.express.use(morgan('dev'));

server.start(() => console.log('Server is running on http://localhost:4000'));
