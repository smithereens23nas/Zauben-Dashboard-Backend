const db = require("../models");
const User = db.users;
const Location = db.locations;
// const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (
    !req.body.StreetAddress ||
    !req.body.City ||
    !req.body.State ||
    !req.body.ZipCode
  ) {
    res.status(400).send({
      message: "Content cannot be empty.",
    });
    return;
  }
  const location = {
    StreetAddress: req.body.StreetAddress,
    City: req.body.City,
    State: req.body.State,
    ZipCode: req.body.ZipCode,
  };

  Location.create(location)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occured while creating this location.",
      });
    });
};

// Retrieve All Articles
exports.findAll = (req, res) => {
    Location.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving location(s)."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Location.findAll({
      where: { id: id},
      // include: "Locations"
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Location with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || `Error retrieving Location with id=${id}.`
        });
      });
  };
  
  // Update single location
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Location.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        console.log(num)
        if (num == 1) {
          res.send({
            message: "Location was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || `Error updating User with id = ${id}`
        });
      });
  };
  
  // Delete single user
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Location.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Location deleted successfully."
          });
        } else {
          res.send({
            message: `Could not delete Location with id: ${id}. Location may not have been found.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || `Could not delete Location with id: ${id}.`
        });
      });
  };
  
//   exports.setUserLocation = (req, res) => {
//     const userId = req.params.id
//     const locationId = req.body.locationId
  
//     User.findByPk(userId).then(user => {
//       Location.findByPk(locationId).then(location => {
//         user.addLocation([location]);
//       }).then(() => {
//           res.send("user_location successfully updated");
//         } 
//       )
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving users."
//         });
//       });
//     })
//   }
  
  // Deletes user_location entry from user side
//   exports.deleteUserLocation = (req, res) => {
//     const userId = req.params.id
//     const locationId = req.body.locationId
  
//     User.findByPk(userId).then(user => {
//       user.removeLocation([locationId]);
//     }).then(() => {
//       res.send("user_location successfully yeeted");
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while deleting reference."
//       });
//     });
//   }

// Search Articles by original_title
// exports.findAllBySearch = (req, res) => {
//     const original_address = req.query.StreetAddress;

//     let condition = original_address ? { original_address: { [Op.iLike]: `%${original_address}%` } } : null;
  
//     Location.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving locations."
//         });
//       });
//   };
