const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    latitude: Number,
    longitude: Number
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (phone, password) {
    const user = await this.findOne({ phone });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect phone number');
}

const User = mongoose.model('user', userSchema);

module.exports = User;