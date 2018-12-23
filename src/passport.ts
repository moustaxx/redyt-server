import passport = require('passport');
import User from './models/user';
import { Application } from 'express';

export default (app: Application) => {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(User.createStrategy());

	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
};
