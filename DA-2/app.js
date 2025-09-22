const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const postModel = require('./models/post'); // abhi use nahi ho raha

const app = express();

// Middleware setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ================= HOME =================
app.get('/', (req, res) => {
    res.render('index');
});

// ================= REGISTER =================
app.post('/register', async (req, res) => {
    try {
        const { username, email, password, age, name } = req.body;

        const user = await userModel.findOne({ email });
        if (user) return res.status(400).send("User already exists");

        const hash = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hash,
            age,
            name
        });

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            "ansh" // 🔑 JWT secret hardcoded
        );

        res.cookie('token', token, { httpOnly: true });
        res.status(201).send("User created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error registering user");
    }
});

// ================= LOGIN =================
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).send("User does not exist");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send("Invalid credentials");

        const token = jwt.sign(
            { email: user.email, id: user._id },
            "ansh" // 🔑 JWT secret
        );

        res.cookie('token', token, { httpOnly: true });
        res.status(200).redirect("/profile");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

// ================= PROFILE =================
app.get('/profile', isLoggedIn, async (req, res) => {
    await userModel.findOne({email: req.user.email});
    res.render('profile', { user });
});

// ================= LOGOUT =================
app.get('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true });
    res.redirect('/login');
});

// ================= Middleware =================
function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    try {
        const data = jwt.verify(token, "ansh"); // 🔑 JWT secret
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).send("Invalid or expired token");
    }
}

// ================= SERVER START =================
app.listen(3000, () => {
    console.log('✅ Server is running on http://localhost:3000');
});