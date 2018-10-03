import passport = require('passport');
// import passportJWT = require('passport-jwt');
import User from './models/user';

// const { Strategy, ExtractJwt } = passportJWT;

// const config = {
// 	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 	secretOrKey: '6KdNxKLNrmCQy739'
// };

export default () => {
	passport.use(User.createStrategy());
	// passport.use(new Strategy(config, (payload, done) => {
	// 	console.log('JWTStrategy');
	// 	const x = User.findOne({ _id: payload.id })
	// 		.then(user => done(null, user))
	// 		.catch(err => done(err));
	// 	return x;
	// }));
};
