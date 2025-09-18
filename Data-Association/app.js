const express = require('express');
const userModel = require('./models/user');
const postModel = require('./models/post');

const app = express();

app.get('/', (req, res) => {
    res.send("Hellow From Express");
});

app.get('/create', async (req, res) => {
    let user = await userModel.create({
        username: "mann",
        age: 20,
        email: "mann@gmail.com",
        posts: []
    });
    res.send(user);
});

app.get("/post/create", async (req, res) => {
    let post = await postModel.create({
        postModel: "Hello World",
        user: "68cbf9cc8e0ce1cef8a58556"
    });

    let user = await userModel.findOne({ _id: "68cbf9cc8e0ce1cef8a58556"});
    user.posts.push(post._id);

    await user.save();
    res.send({
        post,
        user
    });
});

app.listen(3000);