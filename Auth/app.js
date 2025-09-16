const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('name', "Mann");
    res.send("Done");
});

app.get('/encrypt', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash('mann123', salt, (err, hash) => {
            console.log(hash);
        });
    });
});

app.get('/decrypt', (req, res) => {
    bcrypt.compare("mann123", "$2b$10$LBfMYRBbNTLZMxvOt.3/WOThp3BpM.Q6VqsXiQsSXrDBtf2n3VdO", (err, result) => {
        console.log(result);
    });
});

app.get('/jwt', (req, res) => {
    let token = jwt.sign({ email: "mann@js.com" }, "secret");
    res.cookie('token', token);
    console.log(token);
    res.send("Done");
});

app.get('/verify', (req, res) => {
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
    res.send("Done");
})

app.listen(3000);