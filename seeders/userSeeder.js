const Seeder = require('mongoose-data-seed').Seeder;
const User = require('../models/user');

const data = [{
    firstName: "Saurav",
    lastName: "Chavan",
    email: "admin@gmail.com",
    password: "Saurav@12345",
    isAdmin: true
}];

class UsersSeeder extends Seeder {

  async shouldRun() {
    return User.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

module.exports = UsersSeeder;

