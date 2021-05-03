const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const createUser = async (data) => {
    try {
        let {
            firstName, lastName, email, password
        } = data;
        if (!firstName || !lastName || !email || !password) {
            return {
                err: true,
                message: "Missing required fields",
            };
        }
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return {
                err: true,
                message: "User already exists.",
            };
        }
        let user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });
        user = await user.save();
        return user;
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

const login = async (data) => {
    try {
        let {
            email,
            password,
        } = data;
        if (!email || !password) {
            return {
                message: "Missing required fields",
            };
        }
        const user = await User.findOne({ email: email })
        if (!user)
            return {
                err: true,
                message: "No user found!",
            };

        if (user.inviteToken !== null) {
            user.inviteToken = null;
            user.save();
        }
        const result = await bcrypt.compareSync(password, user.password);
        if (result) {
            const token = jwt.sign(
                {
                    id: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                config.jwtSecret
            );
            return {
                message: "ok",
                token: token,
                user: user
            };
        } else {
            return {
                err: true,
                message: "Bad password",
            };
        }
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

module.exports = {
    createUser, login,
}