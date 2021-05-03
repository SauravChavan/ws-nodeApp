const router = require("express").Router();
const userService = require("../services/userServices");
const passport = require('passport');

router.post("/signup", async (req, res) => {
    const result = await userService.createUser(req.body);
    if (result && result.err) {
        return res.status(400).json({message: result.message});
    }
    return res.status(200).json({
        message: "OK",
        user: result.user,
    });
});

router.post("/login", async (req, res) => {
    const result = await userService.login(req.body);
    console.log('result', result)
    if (result && result.err) {
        return res.status(400).json({message: result.message});
    }
    return res.status(200).json({
        message: "OK",
        token: result.token,
        user: result.user,
    });
});

module.exports = router;
