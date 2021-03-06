/* Import modules */
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

/* Set up database */
const db = knex({
	client : 'pg',
	connection : {
		host : '127.0.0.1',
		user : 'postgres',
		password : '',
		database : 'interngrate',
	}
});

/* Set up server with express middleware */
const app = express();

/* Set up cors for cross origin */
app.use(cors());

/* Body parser to parse json */
app.use(bodyParser.json());


/* API routes */
app.get('/', (req,res) => { res.send(db.users); });

app.post('/signin', (req,res) => { signin.handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req,res) => {image.handleImage(req, res, db)});

app.post('/imageURL', (req, res) => {image.handleAPICall(req, res)});

/* Start server */
app.listen(process.env.PORT || 3000, () => {
	console.log("Server started");
});