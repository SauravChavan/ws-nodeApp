const router = require("express").Router();
const passport = require('passport');
const Cab = require("../models/Cab");
const cabServices = require("../services/cabServices")

router.get("/", passport.authenticate('jwt'), async (req, res) => {
    try {
        if (req.user.isAdmin) {
                let customers = await cabServices.getAllCabs();
                res.status(200).json({ customers: customers })
        } else {
            throw {
                message: "Not logged In!"
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

router.put('/', passport.authenticate('jwt'), async (req, res) => {
    try {
        if (req.user) {
            let data = req.body;
            let cab = await cabServices.updateCabLocation(data);
            res.status(200).json({ cab: cab, message: "Cab location updated successfully!" });
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
