const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config()
const {
    ExtractJwt,
    Strategy
} = require('passport-jwt');
const passport = require('passport');

// Import all models
const User = require("./models/user");

const config = require("./config");

const apis = require("./apis");

// MongoDB connection
mongoose.connect(config.db, {
    useNewUrlParser: true,
}).then(success => {
    console.log("MongoDB connected!!!", config.db);
}).catch(err => {
    console.log("MongoDB connection failed!!!", err)
});

const app = express();
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json({
    limit: "1000kb"
}));


app.use(passport.initialize({
    session: false
}))

const jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    passReqToCallback: true
}

passport.serializeUser(function (user, done) {
    done(null, user.mobile);
})

passport.deserializeUser(async function (username, done) {
    User.findOne({
        mobile: mobile
    })
        .then(async (user) => {
            if (!user.isSuperAdmin) {
                let company = await Company.findById(user.company);
                user.company = company;
            }
            return done(user)
        })
        .catch(done)
})

passport.use('jwt', new Strategy(jwtOptions, async (req, jwt_payload, done) => {
    try {
        if (jwt_payload.data.mobile != config.initNumber) {
            User.findOne({
                mobile: jwt_payload.data.mobile
            }).then(async user => {
                try {
                    if (user) {
                        req.mobile = jwt_payload.data.mobile;
                        req.user = user;
                        if (!user.isSuperAdmin) {
                            req.company = await Company.findById(user.company);
                        }
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                } catch (ex) {
                    return done(null, false);
                }
            });
        } else {
            req.mobile = config.initNumber;
            req.user = {
                mobile: config.initNumber,
                isSuperAdmin: true
            };
            return done(null, req.user)
        }
    } catch (ex) {
        return done(null, false);
    }
}));

apis(app);

var server = http.createServer(app);

app.server = server;

app.server.listen(process.env.PORT || config.port);

console.log(`Started on port ${app.server.address().port}`);
