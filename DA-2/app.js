const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const cookkieParser = require('cookie-parser');
const userModel = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookkieParser());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', async (req, res) => {
    let {username, email, password, age, name} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.send(500).send("User already exists");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});