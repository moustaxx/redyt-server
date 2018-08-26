import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolvers';
import { startDB, models } from './db';

const morgan = require('morgan');

const db = startDB({
	user: 'admin',
	pwd: 'admin',
	url: 'cluster0-q5i8e.mongodb.net/test?retryWrites=true'
});

const context = {
	models,
	db,
};

const server = new GraphQLServer({
	typeDefs: './src/graphql/schema.graphql',
	resolvers,
	context
});

server.express.use(morgan('dev'));

server.start(() => console.log('Server is running on http://localhost:4000'));
