const express = require("express");
const router = express.Router();
const { User } = require("../models");
const verifyAuth = require("../controllers/verifyAuth");
const bcrypt = require("bycrptjs");

router.get()