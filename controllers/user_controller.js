const db = require("../models");
const User = db.users;
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// const Location = db.locations;
// const Op = db.Sequelize.Op;
/* ==== Routes ==== */


const register = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser)
      return res.status(400).json({
        status: 400,
        message: "Email address has already been registered. Please try again",
      });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const createdUser = await User.create({ ...req.body, password: hash });

    return res
      .status(201)
      .json({ status: 201, message: "success", createdUser });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

const login = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!foundUser) {
      return res
        .status(400)
        .json({ status: 400, message: "Username or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
    // check if the passwords match
    if (isMatch) {
      //TODO create a json web token and send response
      // .sign(payload,secretkey,options)
      const signedJwt = await jwt.sign(
        { _id: foundUser._id },
        "supersecretwaffles",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        status: 200,
        message: "Success",
        token: signedJwt,
      });
    } else {
      // the password provided does not match the password on file.
      return res.status(400).json({
        status: 400,
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

const profile = async (req, res) => {
  try {
    const foundUser = await User.findById(req.currentUser);

    res.json({ headers: req.headers, user: foundUser });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

module.exports = {
  register,
  login,
  profile,
};

/* Get User */
// exports.findOne = (auth, async (req, res) => {

//   const user = await User.findById(req.user);

//   res.json(
//     {
//       username: user.username,
//       id: user._id,
//     }
//   );
// });

// //Update a User
// User.update = (req.body, {
//   where: { id: id }
// })
//   .then(num => {
//     if (num == 1) {
//       res.send({
//         message: "User was updated successfully."
//       });
//     } else {
//       res.send({
//         message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
//       });
//     }
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || `Error updating User with id = ${id}`
//     });
//   });


/* Delete User */
exports.delete = (auth, async (req, res) => {
  try {
    
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);

  } catch (err) {

    res.status(500).json(
      {
        error: err.message,
      }
    );
  }
});

module.exports = router;


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