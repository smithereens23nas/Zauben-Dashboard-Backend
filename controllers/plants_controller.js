const db = require("../models");
const Plant = db.plants;
const Location = db.locations;
// const Op = db.Sequelize.Op;

//Create and Save User
exports.create = (req, res) => {
    console.log(req.body)
  if (!req.body.Locations) {
    res.status(400).send({
      message: "Content cannot be empty.",
    });
    return;
  }
  const plant = {
    Locations: req.body.Locations,

  };

  Plant.create(plant)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occured while creating plant.",
      });
    });
};

//Retrieve all plants
exports.findAll = (req, res) => {
  Plant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Plants.",
      });
    });
};

// Find individual User by ID
// Added "where" and "include" to search for Locations attached to specific user through join table

exports.findOne = (req, res) => {
  const id = req.params.id;

  Plant.findAll({
    where: { id: id },
    // include: "plants", //TODO Do I need this????
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Plant with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Plant with id=${id}.`,
      });
    });
};

// Update single plant
exports.update = (req, res) => {
  const id = req.params.id;

  Plant.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Plant was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Plant with id=${id}. Maybe Plant was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Plant with id = ${id}`,
      });
    });
};

// Delete single user
exports.delete = (req, res) => {
  const id = req.params.id;

  Plant.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Plant deleted successfully.",
        });
      } else {
        res.send({
          message: `Could not delete Plant with id: ${id}. Plant may not have been found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Tutorial with id: ${id}.`,
      });
    });
};

// exports.setUserLocation = (req, res) => {
//   const userId = req.params.id;
//   const locationId = req.body.locationId;

//   Plant.findByPk(userId).then((user) => {
//     Location.findByPk(locationId) //TODO not sure???
//       .then((location) => {
//         user.addLocation([location]); //look into this, not sure??
//       })
//       .then(() => {
//         res.send("user_location successfully updated");
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: err.message || "Some error occurred while retrieving users.",
//         });
//       });
//   });
// };

// // Deletes user_location entry from user side
// exports.deleteUserLocation = (req, res) => {
//   const userId = req.params.id;
//   const locationId = req.body.locationId;

//   User.findByPk(userId)
//     .then((user) => {
//       user.removeLocation([locationId]); //what is this???
//     })
//     .then(() => {
//       res.send("user_location successfully yeeted");
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while deleting reference.",
//       });
//     });
// };
