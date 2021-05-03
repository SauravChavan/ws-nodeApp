module.exports = {
    port: process.env.PORT || 3001,
    db: "mongodb://localhost:27017/ws",
    secret: process.env.SECRET || "Intern@Wednesday",
    corsHeaders: ["Link"],
    initNumber: "9284591256",
    initPassword: "9284591256",
    uploadPrefix: process.env.NODE_ENV == "production" ? "[PROD]" : "[DEV]"
};