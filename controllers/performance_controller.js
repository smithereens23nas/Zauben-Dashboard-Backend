const db = require("../models");
const Plant = db.plants;
const Performance = db.performance;
// const Op = db.Sequelize.Op;

//Create and Save User
exports.create = (req, res) => {
  console.log(req.body);
  if (
    !req.body.Time ||
    !req.body.Relative_inHg ||
    !req.body.Absolute_inHg ||
    !req.body.Soilmoisture_CH1 ||
    !req.body.Soilmoisture_CH2 ||
    !req.body.Soilmoisture_CH3 ||
    !req.body.Soilmoisture_CH4 ||
    !req.body.Soilmoisture_CH5 ||
    !req.body.Soilmoisture_CH6 ||
    !req.body.Soilmoisture_CH7 ||
    !req.body.Soilmoisture_CH8
  ) {
    res.status(400).send({
      message: "Content cannot be empty.",
    });
    return;
  }
  const performance = {
    Time: req.body.Time,
    Relative_inHg: req.body.Relative_inHg,
    Absolute_inHg: req.body.Absolute_inHg,
    Soilmoisture_CH1: req.body.Soilmoisture_CH1,
    Soilmoisture_CH2: req.body.Soilmoisture_CH2,
    Soilmoisture_CH3: req.body.Soilmoisture_CH3,
    Soilmoisture_CH4: req.body.Soilmoisture_CH4,
    Soilmoisture_CH5: req.body.Soilmoisture_CH5,
    Soilmoisture_CH6: req.body.Soilmoisture_CH6,
    Soilmoisture_CH7: req.body.Soilmoisture_CH7,
    Soilmoisture_CH8: req.body.Soilmoisture_CH8,
  };

  Performance.create(performance)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occured while getting Performance data.",
      });
    });
};

//Retrieve all plants
exports.findAll = (req, res) => {
  Performance.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Performance data.",
      });
    });
};

// Find individual User by ID
// Added "where" and "include" to search for Locations attached to specific user through join table

exports.findOne = (req, res) => {
  const id = req.params.id;

  Performance.findAll({
    where: { id: id },
    // include: "plants", //TODO Do I need this???
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Performance data with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Performance data with id=${id}.`,
      });
    });
};

// Delete single user
exports.delete = (req, res) => {
  const id = req.params.id;

  Peformance.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Peformance deleted successfully.",
        });
      } else {
        res.send({
          message: `Could not delete Peformance with id: ${id}. Peformance may not have been found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Tutorial with id: ${id}.`,
      });
    });
};