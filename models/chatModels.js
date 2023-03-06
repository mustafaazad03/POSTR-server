const mongoose = require("mongoose");

const ChatModel = mongoose.Schema(
	{
		chatName: { type: String, trim: true },
		isGroupChat: { type: Boolean, default: false },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		latestmessage: { type: mongoose.Schema.Types.ObjectId, ref: "message" },
		groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	},
	{ timestamps: true }
);

const chat = mongoose.model("chat", ChatModel);

module.exports = chat;
