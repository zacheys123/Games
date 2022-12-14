import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRoutes from './routes/user.js';
import userActions from './routes/user_actions.js';
import quickMatch from './routes/quickgame.js';
import standings from './routes/fetch_Standings.js';
import fixtures from './routes/fetchFixtures.js';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const source = process.env.MONGO_URI;
const app = express();
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, DELETE, PUT',
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(morgan('dev'));

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use('/users', userRoutes);

app.use('/', standings);
app.use('/', fixtures);
app.use('/game', quickMatch);
app.use('/user/v2', userActions);
// Serve Static if in prod

// const reactApp = path.join(__dirname, 'frontend', 'build');
// console.log(

// );
app.use((req, res, next) => {
	const err = new Error('Not found');
	err.status = 404;
	next(err);
});
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		error: { status: err.status || 500, message: err.message },
	});
});
const PORT = process.env.PORT || 8000;

mongoose.set('strictQuery', true);
mongoose
	.connect(source)
	.then(() =>
		app.listen(PORT, () => console.log(`Running on port ${PORT}`)),
	)
	.catch((error) => console.log(error.message));

const db = mongoose.connection;

db.on('error', (err) => console.log(err.message));
db.once('open', () => console.log('Mongoose is connected'));

// app.use(express.static(path.join(__dirname, '/public')));
const root = path.join(__dirname, 'client', 'build');
if (process.env.NODE_ENV !== 'production') {
	app.use(express.static(root));
	app.get('/*', (req, res) => {
		res.sendFile(
			path.join(__dirname, 'client', 'build', 'index.html'),
		);
	});
}
