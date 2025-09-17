const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const userModel = require('./models/user')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/create', (req, res) => {
    let {username, name, password, age, email} = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,
                name,
                password: hash,
                age,
                email
            });

            let token = jwt.sign({email}, 'abcd1234');
            res.cookie('token', token);
            res.send(createdUser);
        });
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.redirect('/');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    let user = await userModel.findOne({username: req.body.username});
    if(!user) return res.send("Something went wrong");

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(result){
            let token = jwt.sign({username: user.username}, 'abcd1234');
            res.cookie('token', token);
            res.send("Yes you can login");
        }
        else return res.send("No you can't login");
    })
});

app.listen(3000);