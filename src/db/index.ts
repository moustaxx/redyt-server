const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

export const startDB = ({ user, pwd, url }: any) => {
	mongoose.connect('mongodb+srv://' + user + ':' + pwd + '@' + url, { useNewUrlParser: true });
}

mongoose.connection.on('error', console.error.bind(console, 'DB connection error:'));
mongoose.connection.once('open', () => console.log("Connected to DB"));

export const models = {
	//
}