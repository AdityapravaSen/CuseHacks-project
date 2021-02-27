const { Router } = require('express');

const router = Router();
let coords = {};

router.get('/signup', () => {

});

router.post('/signup', () => {

});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', function (req, res) {

});

module.exports = router;