const db = require("../models");
const User = db.users;
// const Location = db.locations;
// const Op = db.Sequelize.Op;

//Create and Saver User
exports.create = (req, res) => {
  if (!req.body.username || 
    !req.body.password || 
    !req.body.email
    ) {
    res.status(400).send({
      message: "Content cannot be empty.",
    });
    return;
  }
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  User.create(user)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occured while creating User.",
      });
    });
};

//Retrieve all users
exports.findAll = (req, res) => {
  User.findAll()
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  });
};

// Find individual User by ID
// Added "where" and "include" to search for locations attached to specific user through join table

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findAll({
    where: { id: id},
    include: "locations"
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Error retrieving User with id=${id}.`
      });
    });
};

// Update single location
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
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

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User deleted successfully."
        });
      } else {
        res.send({
          message: `Could not delete User with id: ${id}. User may not have been found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Could not delete Tutorial with id: ${id}.`
      });
    });
};

exports.setUserLocation = (req, res) => {
  const userId = req.params.id
  const locationId = req.body.locationId

  User.findByPk(userId).then(user => {
    Location.findByPk(locationId).then(location => {
      user.addLocation([location]); //look into this, not sure??
    }).then(() => {
        res.send("user_location successfully updated");
      } 
    )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
  })
}

// Deletes user_location entry from user side
exports.deleteUserLocation = (req, res) => {
  const userId = req.params.id
  const locationId = req.body.locationId

  User.findByPk(userId).then(user => {
    user.removeLocation([locationId]);
  }).then(() => {
    res.send("user_location successfully yeeted");
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting reference."
    });
  });
}