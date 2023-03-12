const mongoose = require("mongoose");

const ProfileModel = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		company: {
			type: String,
			default: "Enter Your Company Or College Name",
		},
		website: {
			type: String,
			max: 40,
			default: "mustafaazad.me",
		},
		location: {
			type: String,
			max: 40,
			default: "Enter Your Location",
		},
		status: {
			type: String,
			default: "",
		},
		skills: {
			type: String,
			default: "Enter Your Skills",
		},
		bio: {
			type: String,
			default: "Enter Your Bio",
		},
		experience: [
			{
				title: {
					type: String,
					default: "",
				},
				company: {
					type: String,
					default: "",
				},
				from: {
					type: String,
					default: "",
				},
				to: {
					type: String,
					default: "",
				},
				current: {
					type: Boolean,
					default: false,
				},
				description: {
					type: String,
					default: "",
				},
			},
		],
		education: [
			{
				school: {
					type: String,
					default: "",
				},
				degree: {
					type: String,
					default: "",
				},
				fieldofstudy: {
					type: String,
					default: "",
				},
				from: {
					type: String,
					default: "",
				},
				to: {
					type: String,
					default: "",
				},
				current: {
					type: Boolean,
					default: false,
				},
				description: {
					type: String,
					default: "",
				},
			},
		],
		social: {
			youtube: {
				name: { type: String, default: "Youtube" },
				icon: {
					type: String,
					default:
						"https://raw.githubusercontent.com/atisawd/boxicons/9ffa9136e8681886bb7bd2145cd4098717ce1c11/svg/logos/bxl-youtube.svg",
				},
				link: {
					type: String,
					default: "https://www.youtube.com/",
				},
			},
			twitter: {
				name: { type: String, default: "Twitter" },
				icon: {
					type: String,
					default:
						"https://raw.githubusercontent.com/atisawd/boxicons/9ffa9136e8681886bb7bd2145cd4098717ce1c11/svg/logos/bxl-twitter.svg",
				},
				link: {
					type: String,
					default: "https://twitter.com/",
				},
			},
			facebook: {
				name: { type: String, default: "Facebook" },
				icon: {
					type: String,
					default:
						"https://raw.githubusercontent.com/atisawd/boxicons/9ffa9136e8681886bb7bd2145cd4098717ce1c11/svg/logos/bxl-facebook.svg",
				},
				link: {
					type: String,
					default: "https://www.facebook.com/",
				},
			},
			linkedin: {
				name: { type: String, default: "Linkedin" },
				icon: {
					type: String,
					default:
						"https://raw.githubusercontent.com/atisawd/boxicons/9ffa9136e8681886bb7bd2145cd4098717ce1c11/svg/logos/bxl-linkedin.svg",
				},
				link: {
					type: String,
					default: "https://www.linkedin.com/",
				},
			},
			instagram: {
				name: { type: String, default: "Instagram" },
				icon: {
					type: String,
					default:
						"https://raw.githubusercontent.com/atisawd/boxicons/9ffa9136e8681886bb7bd2145cd4098717ce1c11/svg/logos/bxl-instagram.svg",
				},
				link: {
					type: String,
					default: "https://www.instagram.com/",
				},
			},
			github: {
				name: { type: String, default: "Github" },
				icon: {
					type: String,
					default:
						"https://raw.githubusercontent.com/atisawd/boxicons/9ffa9136e8681886bb7bd2145cd4098717ce1c11/svg/logos/bxl-github.svg",
				},
				link: {
					type: String,
					default: "https://github.com/",
				},
			},
		},
	},
	{
		timestamps: true,
	}
);

const ProfileData = mongoose.model("profile", ProfileModel);

module.exports = ProfileData;
