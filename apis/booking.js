const router = require("express").Router();
const bookingService = require("../services/bookingService");
const cabServices = require("../services/cabServices")
const passport = require('passport');

const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'mapquest',
  apiKey: 'Uj5VwAZ5fRMmW8C8UEIH3HCFJXg512GX',
  formatter: null
};
const geocoder = NodeGeocoder(options);

//TODO: addCab, updateCab, createBooking, getAllBooking for admin and user

function distCalc(long1, lat1, long2, lat2){
    const R = 6371e3; // metres
    const dLat = (lat2-lat1) * Math.PI/180;
    const dLong = (long2-long1) * Math.PI/180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1) * Math.cos(lat2) *  Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = (R * c)/1000; // in metres
    return d
}
 
router.get("/", passport.authenticate('jwt'), async (req, res) => {
    try {
        if (req.user) {
            let bookings = await bookingService.getAllBookings(req.user);
            res.status(200).json({ bookings: bookings });
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

router.post("/checkCabs", passport.authenticate('jwt'), async (req, res) => {
    try {
        if (req.user) {
            let {locationA, locationB} = req.body
            const p = await geocoder.geocode({address: locationA, countryCode: "IN", limit: 1});
            const d = await geocoder.geocode({address: locationB, countryCode: "IN", limit: 1});
            var travelDist = distCalc(p[0].longitude, p[0].latitude, d[0].longitude, d[0].latitude)
            availableCabs = []
            let allCabs = await cabServices.getAllCabs();
            allCabs.map((c, i) => {
                var uLong = p[0].longitude
                var uLat = p[0].latitude
                var cLong = c.longitude
                var cLat = c.latitude
                let d = distCalc(uLong, uLat, cLong, cLat)
                console.log(i+1, "Cab Location:", c.place, "Your distance from the Cab", d)
                if(d < 5 && c.available){
                    availableCabs.push({"Cab Location": c.place, "Your distance from the Cab (km)": d})
                }
            })
            res.status(200).json({"Distance between Pick and Drop place (km)": travelDist, "Cabs available near you": availableCabs})
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

router.post("/create/", passport.authenticate('jwt'), async (req, res) => {
    try {
        if (req.user) {
            var {driver, locationA, locationB} = req.body
            let booking = await bookingService.createBooking(driver);
            if(booking && booking.err){
                return (
                    res.status(400).json({success: false, error: booking.message})
                )
            }
            res.status(200).json({ success: true, booking: booking, message: "Cab booked successfully!" });
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