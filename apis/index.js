const user = require("./user");
const booking = require("./booking");

module.exports = (app) => {
    app.use("/api/user", user);
    app.use("/api/booking", booking);
}