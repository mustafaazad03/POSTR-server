const asynchandler = require("express-async-handler");
const profiles = require("../models/profilePage");

const createProfile = asynchandler(async (req, res) => {
	const { id, company, website, location, status, skills, bio } =
		await req.body;
	const profile = await profiles.findOne({ user: id });
	if (profile) {
		res.status(404);
		throw new Error("Profile already exists");
	} else {
		const newProfile = await profiles.create({
			user: id,
			company,
			website,
			location,
			status,
			skills,
			bio,
		});
		if (newProfile) {
			res.status(201).json({
				_id: newProfile._id,
				user: newProfile.user,
				company: newProfile.company,
				website: newProfile.website,
				location: newProfile.location,
				status: newProfile.status,
				skills: newProfile.skills,
				bio: newProfile.bio,
			});
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	}
});

const getProfile = asynchandler(async (req, res) => {
	const profile = await profiles
		.findOne({ user: req.body.id })
		.populate("user")
		.populate("experience")
		.populate("education")
		.populate("social");
	if (profile) {
		res.json(profile);
	} else {
		res.status(404);
		throw new Error("Profile not found");
	}
});

const updateProfile = asynchandler(async (req, res) => {
	const { id, company, website, location, status, skills, bio } =
		await req.body;
	const profile = await profiles.findOne({ user: id });
	if (profile) {
		profile.company = company;
		profile.website = website;
		profile.location = location;
		profile.status = status;
		profile.skills = skills;
		profile.bio = bio;
		const updatedProfile = await profile.save();
		res.json(updatedProfile);
	} else {
		res.status(404);
		throw new Error("Profile not found");
	}
});

const createExperience = asynchandler(async (req, res) => {
	const { id, title, company, from, to, current, description } = await req.body;
	const profile = await profiles.findOne({ user: id });
	if (profile) {
		const newExperience = {
			title,
			company,
			from,
			to,
			current,
			description,
		};
		profile.experience.push(newExperience);
		const updatedProfile = await profile.save();
		res.json(updatedProfile);
	} else {
		res.status(404);
		throw new Error("Profile not found");
	}
});

const experienceUpdate = asynchandler(async (req, res) => {
	const { id, title, company, from, to, current, description } = await req.body;
	const profile = await profiles.findOne({ user: id });
	if (profile) {
		profile.experience.push({ title, company, from, to, current, description });
		const updatedProfile = await profile.save();
		res.json(updatedProfile);
	} else {
		res.status(404);
		throw new Error("Profile not found");
	}
});

const createEducation = asynchandler(async (req, res) => {
	const { id, school, degree, fieldofstudy, from, to, current, description } =
		await req.body;
	const profile = await profiles.findOne({ user: id });
	if (profile) {
		const newEducation = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};
		profile.education.push(newEducation);
		const updatedProfile = await profile.save();
		res.json(updatedProfile);
	} else {
		res.status(404);
		throw new Error("Profile not found");
	}
});

const educationUpdate = asynchandler(async (req, res) => {
	const { id, school, degree, fieldofstudy, from, to, current, description } =
		await req.body;
	const profile = await profiles.findOne({ user: id });
	if (profile) {
		profile.education.push({
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		});
		const updatedProfile = await profile.save();
		res.json(updatedProfile);
	} else {
		res.status(404);
		throw new Error("Profile not found");
	}
});

const socialMediaUpdate = asynchandler(async (req, res) => {
	const { id, youtube, twitter, facebook, linkedin, instagram, github } =
		await req.body;
	const profile = await profiles.findOne({ user: id });
	if (profile) {
		profile.social.youtube.link = youtube;
		profile.social.twitter.link = twitter;
		profile.social.facebook.link = facebook;
		profile.social.linkedin.link = linkedin;
		profile.social.instagram.link = instagram;
		profile.social.github.link = github;
		const updatedProfile = await profile.save();
		res.json(updatedProfile);
	}
});

module.exports = {
	updateProfile,
	experienceUpdate,
	educationUpdate,
	socialMediaUpdate,
	createProfile,
	getProfile,
	createExperience,
	createEducation,
};
