const  express = require('express');
const  app = express();

const userModel = require('./user-model');

app.get('/', (req, res) =>
    res.send('Hello World!')
);

app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        name: 'Manya',
        age: 21,
        email: 'mannyabhatt@gmail.com',
        username: 'manyabhatt'
    });
    res.send(createdUser);
});

app.get('/update', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate({username: 'manngwal'}, {name: 'Mann Gwal'}, {new: true});
    res.send(updatedUser);
});

app.get('/read', async (req, res) => {
    let users = await userModel.find({username: 'manngwal'});
    res.send(users);
});

app.get('/delete', async (req, res) => {
    let deleteUser = await userModel.findOneAndDelete({username: 'manyabhatt'});
    res.send(deleteUser)
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));