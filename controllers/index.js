const location = require("./location_controller");
const user = require("./user_controller");
const plant = require("./plants_controller")

const controllers = {
  location: location,
  user: user,
  plant: plant
};

    module.exports = controllers;