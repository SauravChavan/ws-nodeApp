const user = require("./user");
const booking = require("./booking");
const cab = require("./cab");

module.exports = (app) => {
    app.use("/api/user", user);
    app.use("/api/booking", booking);
    app.use("/api/cab", cab);
}