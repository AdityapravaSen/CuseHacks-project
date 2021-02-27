//mongodb usename: adityapravasen
//password:PGaOD4plDMg9okAE
/*mongodb+srv://adityapravasen:PGaOD4plDMg9okAE@cluster0.rlye0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority*/

const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const { response, query } = require("express");
const fetch = require('node-fetch');
let PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const dbUrl = 'mongodb+srv://adityapravasen:PGaOD4plDMg9okAE@cluster0.rlye0.mongodb.net/ambulanceDB';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });



app.get("/", function (req, res) {
    res.render('index');

});

















app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});