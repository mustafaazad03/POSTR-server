const express = require("express");
const {
	sendMessage,
	getMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.route("/api/chatmessages/").post(sendMessage);
router.route("/api/recievemsg/").post(getMessages);

module.exports = router;
