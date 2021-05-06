const Seeder = require('mongoose-data-seed').Seeder;
const Cab = require('../models/cab');

const data = [
  {
    driver: "A",
    cabLocation: "Swargate", number: "MH12 A123",
    latitude: 18.5018, longitude: 73.8636,
    available: true
  },
  {
    driver: "B",
    cabLocation: "Hadapsar", number: "MH12 B234",
    latitude: 18.5089, longitude: 73.9259,
    available: true
  },
  {
    driver: "C",
    cabLocation: "Katraj", number: "MH12 C345",
    latitude: 18.4529, longitude: 73.8652,
    available: true
  },
  {
    driver: "D",
    cabLocation: "Kothrud", number: "MH12 D456",
    latitude: 18.5074, longitude: 73.8077,
    available: true
  },
  {
    driver: "E",
    cabLocation: "Manapa", number: "MH12 E567",
    latitude: 18.5232, longitude: 73.8538,
    available: true
  },
  {
    driver: "F",
    cabLocation: "Shivajinagar", number: "MH12 F678",
    latitude: 18.5314, longitude: 73.8446,
    available: true
  },
  {
    driver: "G",
    cabLocation: "Pimpri", number: "MH12 G789",
    latitude: 18.6298, longitude: 73.7997,
    available: true
  },
  {
    driver: "H",
    cabLocation: "Bhosari", number: "MH12 H890",
    latitude: 18.6321, longitude: 73.8468,
    available: true
  },
  {
    driver: "I",
    cabLocation: "Viman-nagar", number: "MH12 I901",
    latitude: 18.5679, longitude: 73.9143,
    available: true
  },
  {
    driver: "J",
    cabLocation: "Khadki", number: "MH12 J012",
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
