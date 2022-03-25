const express = requrie("express");
const router = express();
const {User} = require("../models");
// const verifyAuth = require("../controllers/verifyAuth")
const bcrypt = require('bcryptjs');
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

router.post("/login", async (req, res) => {
    try{
        const foundUser = await User.findOne({ email: req.body.email });
        if(!foundUser) return res.status(400).res.json(error);
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) return res.status(400).res.json(error)
        
        // assigning token to user
        const token = jwt.sign(
            {
                // id of found user
                id: foundUser.id,
            },
            // dotenv secret password
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
        );
        res.header("auth-token", token).json({token, foundUser});

    } catch (error) {
        res.status(400).json(error);
    }
});

