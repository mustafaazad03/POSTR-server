const expressAsyncHandler = require("express-async-handler");
const chats = require("../models/chatModels");
const person = require("../models/userModel");
const messages = require("../models/messageModel");

const accessChat = expressAsyncHandler(async (req, res) => {
	const { id, currentuser } = await req.body;
	if (!id || !currentuser) {
		return res.status(500).send({ message: "User Not Found" });
	}

	var isChat = await chats
		.find({
			isGroupChat: false,
			$and: [
				{ users: { $elemMatch: { $eq: currentuser } } },
				{ users: { $elemMatch: { $eq: id } } },
			],
		})
		.populate("users")
		.populate("latestmessage");

	isChat = await person.populate(isChat, {
		path: "latestmessage.sender",
		select: "name pic email",
	});

	if (isChat.length > 0) {
		res.status(200).json(isChat[0]);
	} else {
		var chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [currentuser, id],
		};

		try {
			const createdChat = await chats.create(chatData);
			const full_chat = await chats
				.find({ _id: createdChat._id })
				.populate("users");
			res.status(200).json(full_chat);
		} catch (error) {
			res.status(400);
			throw new Error(error);
		}
	}
});

const fetchChat = expressAsyncHandler(async (req, res) => {
	const { id } = await req?.body;
	try {
		chats
			?.find({
				users: {
					$elemMatch: { $eq: id },
				},
			})
			.populate("users")
			.populate("groupAdmin")
			.populate("latestmessage")
			.sort({ updatedAt: -1 })
			.then(async (result) => {
				result = await person?.populate(result, {
					path: "latestmessage.sender",
					select: "name pic email",
				});
				res.status(200).send(result);
			});
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

const accessGroup = expressAsyncHandler(async (req, res) => {
	if (!req.body.users || !req.body.name) {
		res.status(400).send({ message: "All fields are required" });
	}

	const users = JSON.parse(req.body.users);

	if (users.length < 2) {
		return res.status(400).send({ message: "Add atleast 2 users" });
	}
	users.push(req.user);
	try {
		const groupChat = await chats.create({
			chatName: req.body.name,
			isGroupChat: true,
			users: users,
			groupAdmin: req.user,
		});

		const fullgroupchat = await chats
			.findOne({ _id: groupChat._id })
			.populate("users")
			.populate("groupAdmin");
		res.status(200).send(fullgroupchat);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

const renameGroups = expressAsyncHandler(async (req, res) => {
	const { chatId, chatName } = await req.body;
	const updateChat = await chats
		.findByIdAndUpdate(chatId, { chatName }, { new: true })
		.populate("users")
		.populate("groupAdmin");
	if (!updateChat) {
		res.status(404);
		throw new Error("Chat not found");
	}
	res.status(200).json(updateChat);
});

const addToGroup = expressAsyncHandler(async (req, res) => {
	const { chatId, userId } = await req.body;
	const added = await chats
		.findByIdAndUpdate(
			chatId,
			{
				$push: { users: userId },
			},
			{ new: true }
		)
		.populate("users")
		.populate("groupAdmin");

	if (!added) {
		res.status(404);
		throw new Error("Chat not found");
	} else {
		res.status(200).json(added);
	}
});

const removeToGroup = expressAsyncHandler(async (req, res) => {
	const { chatId, userId } = await req.body;
	const removed = await chats
		.findByIdAndUpdate(
			chatId,
			{
				$pull: { users: userId },
			},
			{ new: true }
		)
		.populate("users")
		.populate("groupAdmin");

	if (!removed) {
		res.status(404);
		throw new Error("Chat not found");
	} else {
		res.status(200).json(removed);
	}
});

const deleteMessage = expressAsyncHandler(async (req, res) => {
	const { messageId } = await req.body;
	if (!messageId) {
		return res.status(500).send({ messages: "Enter Valid message id" });
	}
	const deleted = await messages.findByIdAndDelete(messageId);
	if (!deleted) {
		res.status(404);
		throw new Error("Message not found");
	} else {
		res.status(200).json(deleted);
	}
});
module.exports = {
	accessChat,
	fetchChat,
	accessGroup,
	renameGroups,
	addToGroup,
	removeToGroup,
	deleteMessage,
};
