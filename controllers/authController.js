const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        phone: '',
        password: ''
    };

    if (err.message === 'incorrect phone number') {
        errors.phone = 'this phone is not registered';
    }
    if (err.message === 'incorrect password') {
        errors.password = 'this password is incorrect';
    }

    if (err.code === 11000) {
        errors.phone = 'this phone is already registered';
        return errors;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = function (id) {
    return jwt.sign({ id }, 'ambulance go secret', {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { name, phone, address, password, pincode, latitude, longitude } = req.body;

    try {
        const user = await User.create({ name, phone, address, password, pincode, latitude, longitude });

        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { phone, password } = req.body;

    try {
        const user = await User.login(phone, password);

        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}