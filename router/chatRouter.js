const express = require("express");
const {
	accessChat,
	fetchChat,
	accessGroup,
	renameGroups,
	addToGroup,
	removeToGroup,
	deleteMessage,
} = require("../controllers/chatControllers");
const router = express.Router();

router.route("/api/message/").post(accessChat);
router.route("/api/messagefetch/").post(fetchChat);
router.route("/api/deleteMessages/").post(deleteMessage);
router.route("/group").post(accessGroup);
router.route("/rename").put(renameGroups);
router.route("/wantadd").put(addToGroup);
router.route("/wantremove").put(removeToGroup);
// router.route('/group').get(fetchGroup);

module.exports = router;
