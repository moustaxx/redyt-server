import mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const startDB = () => {
	mongoose.connect(process.env.DB_URL as string, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	});
};

mongoose.connection.on('error', console.error.bind(console, 'DB connection error'));
mongoose.connection.once('open', () => console.log('Connected to DB'));

export default startDB;
