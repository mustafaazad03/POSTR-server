const asynchandler = require("express-async-handler");
const Messages = require("../models/messageModel");
const person = require("../models/userModel");
const chat = require("../models/chatModels");

const sendMessage = asynchandler(async (req, res) => {
	const { message, chatId, senderId } = await req.body;

	if (!message || !chatId) {
		res.status(400);
		throw new Error("Message or chatId is missing");
	}

	const newMessage = new Messages({
		sender: senderId,
		content: message,
		chating: chatId,
	});

	try {
		var savedMessage = await Messages.create(newMessage);
		savedMessage = await savedMessage.populate("sender", "name image");
		savedMessage = await savedMessage.populate("chating");
		savedMessage = await person.populate(savedMessage, {
			path: "chating.users",
			select: "name image email",
		});
		await chat.findByIdAndUpdate(chatId, {
			latestmessage: savedMessage,
		});
		res.status(200).json(savedMessage);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

const getMessages = asynchandler(async (req, res) => {
	try {
		const message = await Messages.find({ chating: req.body.chatId })
			.populate("sender", "name image email")
			.populate("chating");
		res.status(200).json(message);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

module.exports = { sendMessage, getMessages };
