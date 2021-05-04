const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Save the information about appointment bookings
const booking = new schema(
    {
        pickUp: {
            type: Object,
            required: true
        },
        dropHere: {
            type: Object,
            required: true
        },
        date: Date,
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