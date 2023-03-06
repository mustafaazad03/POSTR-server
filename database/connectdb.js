const mongoose = require("mongoose");

const connect = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL);
		console.log(`MongoDB Connected : ${conn.connection.host}`);
	} catch (error) {
		console.log(`Error in connection`);
		process.exit();
	}
};

module.exports = connect;
