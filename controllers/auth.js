const express = requrie("express");
const router = express();
const {User} = require("../models");
const verifyAuth = require("../controllers/verifyAuth")