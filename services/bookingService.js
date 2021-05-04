const Booking = require("../models/booking");
const User = require("../models/user");
// const moment = require('moment');


const getAllBookings = async (id) => {
    try {
        let bookings;
        bookings = await Booking.find({createdBy: id})
        return bookings;
    } catch (ex) {
        console.log(ex);
        // res.status(400).json(ex);
    }
}
const createBooking = async (data) => {
    try {
        if (data.user) {
            existingUser = await User.findOne({
                email: data.user.email,
            });
            if (!existingUser) {
                return {
                    err: true,
                    message: "User does not exist.",
                };
            }
            let {
                pickUp, dropHere, locationA, locationB 
            } = data;
            if (!locationA || !locationB) {
                return {
                    err: true,
                    message: "Missing required fields",
                };
            }
            //TODO: use new Date.datetime.now 
            let booking = new Booking({
                date: new Date(),
                pickUp: pickUp,
                dropHere: dropHere,
                locationA: locationA,
                locationB: locationB,
                createdBy: user._id,
            });
            booking = await booking.save();
            return booking;

        }
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
};

module.exports = {
    createBooking, getAllBookings
}
