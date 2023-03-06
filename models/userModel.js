const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		pic: {
			type: String,
			required: true,
			default:
				"https://imgs.search.brave.com/zc8nWb5P3ZsxnvxZ7XBau6FrABz-9NNJQkVYawYuzEQ/rs:fit:980:980:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2lt/Z18yNDc4Ny5wbmc",
		},
	},
	{ timestamps: true }
);

const person = mongoose.model("user", userSchema);
module.exports = person;
