const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = {
	users : [
		{
			id : '123',
			name : 'John',
			email : 'john@gmail.com',
			password : 'cookies',
			entries : 45,
			joined : new Date()
		},
		{
			id : '124',
			name : 'Sally',
			email : 'sally@gmail.com',
			password : 'bananas',
			entries : 0,
			joined : new Date()
		}
	]
}
app.get('/', (req,res) => {

	res.send(db.users);
})


app.post('/signin', (req,res) => {


	if (req.body.email === db.users[0].email && 
		req.body.password === db.users[0].password ) {
		res.json(db.users[0]);
		console.log('logged in');
	}
	else {
		res.status(400).json('fail');
	}
})


app.post('/register', (req,res) => {

	const { email, name, password } = req.body;


	console.log('called');

	db.users.push({
		id : parseInt(db.users[db.users.length -1].id) + 1,
		name : name,
		email : email,
		password : password,
		entries : 0,
		joined : new Date() 
	})
	res.json(db.users[db.users.length -1 ]);
})


app.get('/profile/:id', (req,res) => {

	const { id } = req.params;
	var found = false;
	db.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if (!found) {
		res.status(404).json('no such user');
	}

})

app.post('/image', (req,res) => {

	const { id } = req.body;
	var found = false;
	db.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(404).json('no such user');
	}
})

app.listen(3000, () => {
	console.log("Server started");
});


/*
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT = user

*/