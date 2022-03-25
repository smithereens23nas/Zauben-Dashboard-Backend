const express = requrie("express");
const router = express();
const {User} = require("../models");
// const verifyAuth = require("../controllers/verifyAuth")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config()

router.post("/register", async (req, res) => {
    const user = req.body;
    try {
        const foundUser = await User.exists({email: req.body.email});
        if (foundUser) {
            return res.status(400).json(error)
        }
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt. hash(req.body.password, salt);
        req.body.password = hash;
        res.json(await User.create(user));

    } catch (error){
        res.status(400).json(error);
    }
});

