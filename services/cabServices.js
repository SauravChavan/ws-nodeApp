const Cab = require("../models/cab");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const getAllCabs = async () => {
    try {
        let cabs;
        cabs = await Cab.find()
        return cabs;
    } catch (ex) {
        console.log(ex);
        res.status(400).json(ex);
    }
}

const addCab = async (data) => {
    try {
        let {driver, place, latitude, longitude, available} = data
        if (!driver) {
            return {
                err: true,
                message: "Driver name necessary"
            }
        }
        let cab = new Cab({
            driver: driver,
            place: place,
            latitude: latitude,
            longitude: longitude,
            available: available
        })
        cab = await cab.save();
        return cab;
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

const updateCabLocation = async (data) => {
    try {
        let {cabId, place, longitude, latitude, available} = data
        let cab = await Cab.findByIdAndUpdate(cabId, {place: place, longitude: longitude, latitude: latitude, available: available});
        return cab;
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}


module.exports = {
    getAllCabs, addCab, updateCabLocation
}

