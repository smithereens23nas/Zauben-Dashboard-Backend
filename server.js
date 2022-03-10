// DEPENDENCIES
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 8080 } = process.env;
// import express
const express = require("express");
const bodyParser = require("body-parser");
// create application object
const app = express();
const cors = require("cors");

// db setup
const db = require("./models");
db.sequelize.sync().then(() => {
  // @TODO delete console.log before deployment
  console.log("DB connected");
});

let corsOptions = {
    origin: "http://localhost:8081"
  };
// console.log(sequelize)
app.use(cors(corsOptions));
app.use(express.json()); //req.body

// parse requests (json)
app.use(bodyParser.json());

// @TODO what is this?
// content-type --> application/x-www-form-urlencoded ????
app.use(bodyParser.urlencoded({ extended: true }));

// Requiring routes folder
require("./routes/user_routes")(app);
require("./routes/location_routes")(app);
require("./routes/plant_routes")(app);
require("./routes/performance_routes")(app);

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
