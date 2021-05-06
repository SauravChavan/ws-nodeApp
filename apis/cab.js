const router = require("express").Router();
const passport = require('passport');
const cabServices = require("../services/cabServices")

router.get("/", passport.authenticate('jwt'), async (req, res) => {
    try {
        if (req.user.isAdmin) {
                let cabs = await cabServices.getAllCabs();
                res.status(200).json({ "All registered cabs": cabs })
        } else {
            throw {
                message: "UNAUTHORIZED"
            }
        }
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
});

router.post('/', passport.authenticate('jwt'), async (req, res) => {
    try {
        if (req.user) {
            if (req.user.isAdmin) {    
                let data = req.body;
                let cab = await cabServices.addCab(data);
                res.status(200).json({ cab: cab, message: "New Cab added successfully!" });
            } else {
                throw {
                    message: "UNAUTHORISED"
                }
            }
        } else {
            throw {
                message: "Not logged In!"
            }
        }
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
})

module.exports = router;
