const mongoose = require('mongoose');
const config = require('./config');
const userSeeder = require('./seeders/userSeeder');
const cabSeeder = require('./seeders/cabSeeder');

const mongoURL = process.env.DB || 'mongodb://localhost:27017/ws';
console.log("Connected to:", mongoURL)

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
module.exports = {
    seedersList: {
        userSeeder,
        cabSeeder
    },
    connect: async () =>
        await mongoose.connect(mongoURL, { useNewUrlParser: true }),
    dropdb: async () => mongoose.connection.db.dropDatabase()
}
