const db = require("../models");
const User = db.users;
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
// const Location = db.locations;
// const Op = db.Sequelize.Op;
/* ==== Routes ==== */

/* Register */
exports.create = (async (req, res) => {
  try {

    let { username, email, password, passwordCheck } = req.body;

    if (!email || !password || !passwordCheck) {
      return res.status(400).json(
        { 
          message: 'Missing fields; all fields are required' 
        }
      );
    }

    if (password.length < 8) {
      return res.status(400).json(
        {
          message: 'Password must be at least 8 characters',
        }
      );
    }

    if (password !== passwordCheck) {
      return res.status(400).json(
        { 
          message: 'Passwords do not match', 
        }
      );
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json(
        { 
          message: 'Email is already associated with an account',
        }
      );
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({

      username,
      email, 
      password: passwordHash,

    });

    const savedUser = await newUser.save();

    res.json(savedUser);

  } catch (err) {
    res.status(500).json(
      {
        error: err.message, 
      }
    );
  }
});

/* Login */
exports.create = (async (req, res) => {
  try {
    
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json(
        {
          message: 'All fields are required',
        }
      );
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json(
        {
          message: 'Account does not exist; please register',
        }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json(
        {
          message: 'Invalid login credentials'
        }
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json(
      {
        token,
        user: {
          id: user._id
        },
        username: user.username,
      },
    );

  } catch (err) {
    res.status(500).json(
      {
        error: err.message,
      }
    );
  }
});

/* Verify JWT Validity */
exports.create = (async (req, res) => {
  try {

    const token = req.header('x-auth-token');
  
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);

    if (!user) {
      return res.json(false);
    }

    return res.json(true);

  } catch (err) {
    res.status(500).json(
      {
        error: err.message,
      }
    );
  }
});

/* Get User */
exports.findOne = (auth, async (req, res) => {

  const user = await User.findById(req.user);

  res.json(
    {
      username: user.username,
      id: user._id,
    }
  );
});

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