module.exports = {
    port: process.env.PORT || 3001,
    db: "mongodb://localhost:27017/ws",
    jwtSecret: process.env.JWT_SECRET,
    secret: process.env.SECRET || "Intern@WS",
    corsHeaders: ["Link"],
};