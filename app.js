const express = require("express");
const dotenv = require("dotenv");
const connect = require("./database/connectdb");

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;
const routes = require("./router/userRoutes");
const chatRouter = require("./router/chatRouter");
connect();
app.use(routes);
app.use(chatRouter);
app.listen(port, (res, req) => {
	console.log(`Your server started on ${port}`);
});
