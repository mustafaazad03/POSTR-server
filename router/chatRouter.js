const express = require("express");
const {
	accessChat,
	fetchChat,
	accessGroup,
	renameGroups,
	addToGroup,
	removeToGroup,
} = require("../controllers/chatControllers");
const router = express.Router();

router.route("/api/message/").post(accessChat);
router.route("/api/messagefetch").get(fetchChat);
router.route("/group").post(accessGroup);
router.route("/rename").put(renameGroups);
router.route("/wantadd").put(addToGroup);
router.route("/wantremove").put(removeToGroup);
// router.route('/group').get(fetchGroup);

module.exports = router;
