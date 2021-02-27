const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phone: {
        type: Number,
        required: [true, 'Please enter a phone number'],
        unique: true,
        minlength: [7, 'Please enter a valid phone number'],
        maxlength: [15, 'Please enter a valid phone number']
    },
    address: String,
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'minimum length is 6 charecters']
    },
    pincode: Number,
    coordinates: {
        latitude: Number,
        longitude: Number
    }
});

userSchema.post('save', function (doc, next) {
    console.log('new user created and saved', doc);
    next();
});

userSchema.pre('save', function () { })

const User = mongoose.model('user', userSchema);

module.exports = User;