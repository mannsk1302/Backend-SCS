const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const postModel = require('./models/post');
const upload = require('./utils/multerConfig');

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

app.get('/profile/upload', (req, res) => {
    res.render('profileupload');
});

app.post('/upload', isLoggedIn, upload.single("image"), async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.profilePicture = req.file.filename;
    await user.save();
    res.redirect('/profile');
});

// ================= REGISTER =================
app.post('/register', async (req, res) => {
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
        "ansh"
    );

    res.cookie('token', token, { httpOnly: true });
    res.status(201).send("User created successfully");
});

// ================= LOGIN =================
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("User does not exist");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Invalid credentials");

    const token = jwt.sign(
        { email: user.email, id: user._id },
        "ansh"
    );

    res.cookie('token', token, { httpOnly: true });
    res.status(200).redirect("/profile");
});

// ================= PROFILE =================
app.get('/profile', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate('posts');
    res.render('profile', { user });
});

// ================= LIKE / UNLIKE =================
app.get('/like/:id', isLoggedIn, async (req, res) => {
    const post = await postModel.findById(req.params.id).populate('user');
    if (!post.likes) post.likes = [];

    const index = post.likes.indexOf(req.user.id);
    if (index === -1) {
        post.likes.push(req.user.id);
    } else {
        post.likes.splice(index, 1);
    }

    await post.save();
    res.redirect('/profile');
});

// ================= CREATE POST =================
app.post('/post', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });
    let { content } = req.body;
    let post = await postModel.create({
        user: user._id,
        content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

// ================= EDIT POST PAGE =================
app.get('/edit/:id', isLoggedIn, async (req, res) => {
    const post = await postModel.findById(req.params.id).populate('user');
    res.render('edit', { post });
});

// ================= UPDATE POST =================
app.post('/update/:id', isLoggedIn, async (req, res) => {
    await postModel.findByIdAndUpdate(req.params.id, {
        content: req.body.content
    });
    res.redirect('/profile');
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

    const data = jwt.verify(token, "ansh");
    req.user = data;
    next();
}

// ================= SERVER START =================
app.listen(3000, () => {
    console.log('✅ Server is running on http://localhost:3000');
});
