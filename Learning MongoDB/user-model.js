const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/LearningMongoDB');

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    username: String
});

module.exports = mongoose.model("user", userSchema);