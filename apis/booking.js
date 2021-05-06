const router = require("express").Router();
const bookingService = require("../services/bookingService");
const passport = require('passport');
 
router.get("/", passport.authenticate('jwt'), async (req, res) => {
    try {
        if (req.user) {
            let bookings = await bookingService.getAllBookings(req.user);
            if (req.user.isAdmin){
                res.status(200).json({ 
                    "All passengers' bookings": bookings 
                });
            } else {
            res.status(200).json({ 
                "Your past bookings": bookings 
            });}
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

router.get("/checkCabs", passport.authenticate('jwt'), async(req, res) => {
    try {
            if(req.user){
                let {locationA} = req.body
                const check = true
                let availableCabs = await bookingService.checkCabs(locationA, check)
                if(availableCabs.length === 0){
                    return (res.json({message: "Sorry for inconvenience, no cabs available within 5 km"}))
                }
                res.status(200).json({
                    "Cabs available near you (within 5km)": availableCabs
                })
        }else{
            throw {
                message: "Not logged in or user does not exist"
            }
        }
    } catch (ex) {
        console.log(ex);
        res.status(200).json({ ex: ex, success: false });
    }
})

router.post("/create", passport.authenticate('jwt'), async (req, res) => {
    try {
        if (req.user) {
            var {locationA, locationB} = req.body
            // var cab = req.cab
            let  booking = await bookingService.createBooking(req.user, locationA, locationB);
            if(booking && booking.err){
                return (
                    res.status(400).json({success: false, error: booking.message})
                )
            }
            res.status(200).json({ 
                success: true, 
                from: booking.booking.locationA,
                to: booking.booking.locationB,
                "Distance between Pick and Drop place (km)": booking.travelDist, 
                "Current location of cab": booking.cabLocation, 
                "Distance of cab from you (km)": booking.cabDistance,
                message: "Cab booked successfully!" });
        } else {
            throw {
                message: "Not logged In!"
            }
        }
    } catch (ex) {
        console.log(ex);
        res.status(200).json({ ex: ex, success: false });
    }
});

module.exports = router;