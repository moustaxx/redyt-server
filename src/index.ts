import express = require('express');
import cookieParser = require('cookie-parser');
import { ApolloServer } from 'apollo-server-express';
import morgan = require('morgan');

import startDB from './db';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import passportStrategies from './passport';

passportStrategies();

startDB({
	user: 'admin',
	pwd: 'admin',
	url: 'cluster0-q5i8e.mongodb.net/redyt?retryWrites=true'
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	tracing: true,
	playground: {
		settings: { 'request.credentials': 'include', 'editor.cursorShape': 'line' } as any
	},
});

const app = express();
app.use(cookieParser());
app.use(morgan('dev'));
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
