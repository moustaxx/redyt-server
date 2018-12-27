import express = require('express');
import mongoose = require('mongoose');
import session = require('express-session');
import connectMongo = require('connect-mongo');
import cookieParser = require('cookie-parser');
import { ApolloServer } from 'apollo-server-express';
import morgan = require('morgan');
require('dotenv').config();

import startDB from './db';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import passportStrategies from './passport';

const app = express();
const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		touchAfter: 12 * 3600 // 12h
	}),
	name: 'rid',
	secret: process.env.SESSION_SECRET!,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		secure: false, //TODO
		sameSite: true,
		maxAge: 1000 * 60 * 60 * 24 * 14 // 14 days
	}
}));
passportStrategies(app);
startDB();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	tracing: true,
	// tslint:disable-next-line:arrow-return-shorthand
	context: async ({ req, res }: any) => {
		return {
			req,
			res,
			sessionOwner: req.user ? req.user.toObject() : undefined,
		};
	},
	playground: {
		settings: { 'request.credentials': 'include', 'editor.cursorShape': 'line' } as any
	},
});

server.applyMiddleware({
	app, cors: {
		origin: process.env.CORS_ORIGIN,
		credentials: true
	} });

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
