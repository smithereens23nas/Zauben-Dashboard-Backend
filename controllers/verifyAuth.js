const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json(error);

    try {
        const verified = jwt.verifty(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json(error)
    }
};

module.exports = verifyAuth;