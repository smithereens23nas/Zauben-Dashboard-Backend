// DEPENDENCIES
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3002 } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
const cors = require("cors");
const dbConfig = require("./config/db_config");
const { Sequelize } = require('sequelize');
let corsOptions = {
    origin: "http://localhost:8081"
  };
// console.log(sequelize)
app.use(cors(corsOptions));
app.use(express.json()); //req.body

// ROUTES
// create a test route
app.get("/", async(req, res) => {
    try {
        res.send("Hello world")

    } catch (err) {
        console.log(err.message);
    }
});
  
  // PEOPLE INDEX ROUTE
  app.get("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE CREATE ROUTE
  app.post("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE UPDATE ROUTE
  app.put("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // PEOPLE DELETE ROUTE
  app.delete("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(await People.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });




// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
