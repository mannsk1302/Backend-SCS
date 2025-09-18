const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/miniproject");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
    name: String
});

module.exports = mongoose.model('user', userSchema);