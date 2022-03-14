// jwt middle ware for verification
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = payload.id;
    next();
  } else {
    res.sendStatus(403);
  }
};