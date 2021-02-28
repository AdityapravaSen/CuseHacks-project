//mongodb usename: adityapravasen
//password:PGaOD4plDMg9okAE
/*mongodb+srv://adityapravasen:PGaOD4plDMg9okAE@cluster0.rlye0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority*/

const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const { response, query } = require("express");
let PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoute');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const dbUrl = 'mongodb+srv://adityapravasen:PGaOD4plDMg9okAE@cluster0.rlye0.mongodb.net/ambulanceDB';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });



app.get("/", function (req, res) {
    res.render('index');

});
app.get('/dashboard', function (req, res) {
    res.render('dashboard');
});

app.get('/set-cookies', (req, res) => {
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { secure: true });
    res.send('you got cookies!');
});

app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.json(cookies);
});

app.use(authRoutes);

















app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});