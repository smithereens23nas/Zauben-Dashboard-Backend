const db = require("../models");
const User = db.users;
const Locations = db.locations;
const Op = db.Sequelize.Op;

//Create and Saver User
exports.create = (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
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
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occured while creating User.",
      });
    });
};
