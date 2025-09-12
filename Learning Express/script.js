const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("This is a middleware");
    next();
});

app.get('/', (req, res) => {
    res.send("Hello from Express");
});

app.get('/profile', (req, res, next ) => {
    res.send("My name is Mann Gwal. I'm 20 years old.");
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


app.listen(3000);