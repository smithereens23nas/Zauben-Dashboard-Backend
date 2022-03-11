const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwtGenerator = require("../config/webTokens");
const validInfo = require("../config/validInfo");
const authorization = require("../config/authorization");

// Registration
exports.create =
  (validInfo, async (req, res) => {
    try {
      // Take apart req.body (name, email, pass)
      const { username, email, password } = req.body;

      // Check if email already exists (if so, throw error)
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length > 0) {
        return res.json("An account is already linked to that email!");
      }

      // Bcrypt password

      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);

      const bcryptPassword = await bcrypt.hash(password, salt);

      // Insert details in db
      const newUser = await pool.query(
        "INSERT INTO USERS(username, email, password) VALUES($1, $2, $3) RETURNING *",
        [username, email, bcryptPassword]
      );

      // Generate JWT
      const token = jwtGenerator(newUser.rows[0].user_id);
      res.json({ username, token });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });

// Login
exports.create =
  (validInfo,
  async (req, res) => {
    try {
      // req.body
      const { email, password } = req.body;

      // error if no such user
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length === 0) {
        return res
          .status(401)
          .json("Password or Username is incorrect, please reenter.");
      }

      // password = db password?

      const passwordValid = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (!passwordValid) {
        return res.status(401).json("Password or Email is Incorrect.");
      }

      // provide token

      const token = jwtGenerator(user.rows[0].user_id);
      const name = user.rows[0].username;
      res.json({ name, token });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });

exports.create =
  (authorization,
  (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });

// //Create and Saver User
// exports.create = (req, res) => {
//   if (!req.body.username ||
//     !req.body.password ||
//     !req.body.email
//     ) {
//     res.status(400).send({
//       message: "Content cannot be empty.",
//     });
//     return;
//   }
//   const user = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password,
//   };

//   User.create(user)
//     .then((data) => {
//       console.log(data);
//       return res.send(data);
//     })
//     .catch((err) => {
//       return res.status(500).send({
//         message: err.message || "An error occured while creating User.",
//       });
//     });
// };

//Retrieve all users
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find individual User by ID
// Added "where" and "include" to search for locations attached to specific user through join table

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findAll({
    where: { id: id },
    include: "locations", //Is this right ???
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving User with id=${id}.`,
      });
    });
};

// Update single location
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating User with id = ${id}`,
      });
    });
};

// Delete single user
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User deleted successfully.",
        });
      } else {
        res.send({
          message: `Could not delete User with id: ${id}. User may not have been found.`,
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
//   const userId = req.params.id
//   const locationId = req.body.locationId

//   User.findByPk(userId).then(user => {
//     Location.findByPk(locationId).then(location => {
//       user.addLocation([location]); //TODO look into this, not sure??
//     }).then(() => {
//         res.send("user_location successfully updated");
//       }
//     )
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving users."
//       });
//     });
//   })
// }

// // Deletes user_location entry from user side
// exports.deleteUserLocation = (req, res) => {
//   const userId = req.params.id
//   const locationId = req.body.locationId

//   User.findByPk(userId).then(user => {
//     user.removeLocation([locationId]);
//   }).then(() => {
//     res.send("user_location successfully yeeted");
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while deleting reference."
//     });
//   });
// }
