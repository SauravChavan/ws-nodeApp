const Cab = require("../models/cab");

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
        let {driver, number, place, latitude, longitude, available} = data
        if (!driver) {
            return {
                err: true,
                message: "Driver name AND cab number necessary"
            }
        }
        let cab = new Cab({
            driver: driver,
            number: number,
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

module.exports = {
    getAllCabs, addCab,
}

