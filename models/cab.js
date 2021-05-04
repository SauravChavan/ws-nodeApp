const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Save the information about appointment bookings
const cab = new schema(
    {
        driver: {
            type: String,
            required: true
        },
        place: String,
        latitude: Number,
        longitude: Number,
        available: {
            type: Boolean
        }
    },
    {
        timestamps: true,
    });

const Cab = mongoose.model("Cab", cab);
module.exports = Cab;