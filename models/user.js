const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const user = new schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    })

user.pre('save', function (next) {
    let model = this
    let saltRounds = 5

    if (!model.isModified('password')) return next()

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(model.password, salt, null, function (err, hash) {
            if (err) return next(err)
            model.password = hash;
            next()
        });
    });
})

const User = mongoose.model("User", user);
module.exports = User;