const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            exp: parseInt(expiry.getTime() / 1000)
        },
        'MY_SECRET'
    ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

userSchema.methods.validPassword = function (pwd) {
    // EXAMPLE CODE!
    let newPass = crypto
        .pbkdf2Sync(pwd, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return (this.hash === newPass);
};

mongoose.model('User', userSchema);