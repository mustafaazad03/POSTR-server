const mongoose = require("mongoose");

const MessageModel = mongoose.Schema(
	{
		sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		content: { type: String, trim: true },
		chating: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
	},
	{ timestamps: true }
);

const message = mongoose.model("message", MessageModel);
module.exports = message;
