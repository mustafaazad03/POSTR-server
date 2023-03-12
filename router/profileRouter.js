const express = require("express");
const {
	createProfile,
	getProfile,
	updateProfile,
	experienceUpdate,
	educationUpdate,
	socialMediaUpdate,
	createExperience,
	createEducation,
} = require("../controllers/profileController");
const router = express.Router();

router.route("/api/createProfile/").post(createProfile);
router.route("/api/getprofilesingle/").post(getProfile);
router.route("/api/updateprofileone/").post(updateProfile);
router.route("/api/updateexperience/").post(experienceUpdate);
router.route("/api/createexperience/").post(createExperience);
router.route("/api/createeducation/").post(createEducation);
router.route("/api/updateeducation/").post(educationUpdate);
router.route("/api/socialmediaupdate/").post(socialMediaUpdate);

module.exports = router;
