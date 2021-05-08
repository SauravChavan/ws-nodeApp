const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Save the information about appointment bookings
const booking = new schema(
    {
        date: Date,
        passenger: String,
        driver: {
            type: String,
            required: true
        },
        cabNumber: {
            type: String,
            required: true
        },
        locationA: {
            type: Object,
            required: true
        },
        locationB: {
            type: Object,
            required: true
        },
        distanceTravelled: {
            type: Number,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    });

const Booking = mongoose.model("Booking", booking);
module.exports = Booking;