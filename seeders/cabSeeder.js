const Seeder = require('mongoose-data-seed').Seeder;
const Cab = require('../models/cab');

const data = [
  {
    driver: "A",
    place: "Swargate",
    latitude: 18.5018, longitude: 73.8636,
    available: true
  },
  {
    driver: "B",
    place: "Hadapsar",
    latitude: 18.5089, longitude: 73.9259,
    available: true
  },
  {
    driver: "C",
    place: "Katraj",
    latitude: 18.4529, longitude: 73.8652,
    available: true
  },
  {
    driver: "D",
    place: "Kothrud",
    latitude: 18.5074, longitude: 73.8077,
    available: true
  },
  {
    driver: "E",
    place: "Manapa",
    latitude: 18.5232, longitude: 73.8538,
    available: true
  },
  {
    driver: "F",
    place: "Shivajinagar",
    latitude: 18.5314, longitude: 73.8446,
    available: true
  },
  {
    driver: "G",
    place: "Pimpri",
    latitude: 18.6298, longitude: 73.7997,
    available: true
  },
  {
    driver: "H",
    place: "Bhosari",
    latitude: 18.6321, longitude: 73.8468,
    available: true
  },
  {
    driver: "I",
    place: "Wagholi",
    latitude: 18.5808, longitude: 73.9787,
    available: true
  },
  {
    driver: "J",
    place: "Khadki",
    latitude: 18.5626, longitude: 73.8524,
    available: true
  },
  
];

class CabsSeeder extends Seeder {

  async shouldRun() {
    return Cab.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Cab.create(data);
  }
}

module.exports = CabsSeeder;
;
