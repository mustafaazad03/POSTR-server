const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");

const allUsers = asyncHandler(async (req, res) => {
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search, $options: "i" } },
					{ email: { $regex: req.query.search, $options: "i" } },
				],
		  }
		: {};

	const userr = await Users.find(keyword);
	res.send(userr);
});

module.exports = { allUsers };
