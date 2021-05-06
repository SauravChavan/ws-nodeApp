const Seeder = require('mongoose-data-seed').Seeder;
const User = require('../models/user');

const data = [{
    firstName: "Saurav",
    lastName: "Chavan",
    email: "admin@gmail.com",
    password: "Saurav@12345",
    isAdmin: true
},{
  firstName: "user1",
  lastName: "user1",
  email: "user1@gmail.com",
  password: "user1@12345",
  isAdmin: false
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

