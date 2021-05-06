const Booking = require("../models/booking");
const User = require("../models/user");
const cabServices = require("../services/cabServices")
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  apiKey: 'Uj5VwAZ5fRMmW8C8UEIH3HCFJXg512GX',
  formatter: null
};
const geocoder = NodeGeocoder(options);

function distCalc(long1, lat1, long2, lat2){
    const R = 6371e3; // metres
    const dLat = (lat2-lat1) * Math.PI/180;
    const dLong = (long2-long1) * Math.PI/180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1) * Math.cos(lat2) *  Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = (R * c)/1000; // in metres
    return d
}

const getAllBookings = async (user) => {
    try {
        let bookings;
        if (user.isAdmin) {
            //admin
            bookings = await Booking.find()
            return bookings;
        } else {
            //Customers
            bookings = await Booking.find({ createdBy: user._id })
            return bookings;
        }
    } catch (ex) {
        console.log(ex);
        // res.status(400).json(ex);
    }
}

const checkCabs = async(locationA, check=false) => {
    try {
            const p = await geocoder.geocode({address: locationA, countryCode: "IN", limit: 1});
            availableCabs = []
            var nearestCab = {}
            let minD = 5
            let allCabs = await cabServices.getAllCabs();
            allCabs.map((c, i) => {
                let d = distCalc(p[0].longitude, p[0].latitude, c.longitude, c.latitude)
                if(d < 5 && c.available){
                    availableCabs.push({"Cab Location": c.cabLocation, "Your distance from the Cab (km)": d})
                }
                if(d <= minD && c.available && !check){
                    minD = d
                    nearestCab = {driver: c.driver, number: c.number, cabLocation: c.cabLocation, cabDistance: d}
                }
            })
            if(!check && availableCabs.length!==0){
                return (nearestCab)
            }
            return(availableCabs)
    } catch (ex) {
        console.log(ex);
    }
}

const createBooking = async(user, locationA, locationB) => {
    try {
            if(!locationA, !locationB){
                return ({
                    err: true,
                    message: "Location A or B missing"
                })
            }
            let bookedCab = await checkCabs(locationA)
            const p = await geocoder.geocode({address: locationA, countryCode: "IN", limit: 1});
            const d = await geocoder.geocode({address: locationB, countryCode: "IN", limit: 1});
            travelDist = distCalc(p[0].longitude, p[0].latitude, d[0].longitude, d[0].latitude)
            let booking = new Booking({
                date: Date.now(),
                driver: bookedCab.driver,
                cabNumber: bookedCab.number,
                locationA: locationA,
                locationB: locationB,
                distanceTravelled: travelDist,
                createdBy: user._id,
            });
            booking = await booking.save();
            return {booking: booking, travelDist: travelDist, cabDistance: bookedCab.cabDistance, cabLocation: bookedCab.cabLocation};
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
};

module.exports = {
    createBooking, checkCabs, getAllBookings
}
