import passport = require('passport');
import passportJWT = require('passport-jwt');
import { JWT_SECRET } from './index';
import User from './models/user';

const { Strategy, ExtractJwt } = passportJWT;


export default () => {
	const config = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: JWT_SECRET
	};
	passport.use(User.createStrategy());
	passport.use(new Strategy(config, (payload, done) => {
		console.log('JWTStrategy');
		const x = User.findOne({ _id: payload.id })
			.then(user => done(null, user))
			.catch(err => done(err));
		return x;
	}));
};
