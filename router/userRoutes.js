const express = require("express");
const dotenv = require("dotenv");
const { allUsers } = require("../controllers/userControll");
const router = express.Router();

router.route("/chat/user").get(allUsers);

module.exports = router;
