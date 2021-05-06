const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Save the information about appointment bookings
const booking = new schema(
    {
        customerName: {
            type: String,
            require: true
        },
        LocationA: {
            type: Object,
            required: true
        },
        locationB: {
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