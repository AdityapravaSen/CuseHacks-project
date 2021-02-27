const User = require('../models/user');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        phone: '',
        password: ''
    };

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

module.exports.signup_get = (req, res) => {
    res.render('signup');

    fetch('http://api.ipify.org/?format=json')
        .then(e => e.json())
        .then(res => {
            getLocation(res.ip);
        })
        .catch(err => {
            if (err)
                console.log(err);
        });

    function getLocation(ip) {
        fetch(`http://ipwhois.app/json/${ip}`)
            .then(e => e.json())
            .then(data => {
                coords.latitude = data.latitude;
                coords.longitude = data.longitude;
            })
            .catch(err => {
                if (err)
                    console.log(err);
            });
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { name, phone, address, password, pincode, coordinates } = req.body;

    try {
        const user = await User.create({ name, phone, address, password, pincode, coordinates });

        res.status(201).json(user);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = (req, res) => { }