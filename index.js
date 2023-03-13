const express = require("express");
const dotenv = require("dotenv");
const connect = require("./database/connectdb");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(
	cors({
		origin: "https://postrapp.vercel.app/" || "http://localhost:3000/",
	})
);
app.use(express.json());
const port = process.env.PORT;
const routes = require("./router/userRoutes");
const chatRouter = require("./router/chatRouter");
const messageRouter = require("./router/messageRoute");
const profileRouter = require("./router/profileRouter");
connect();
app.use(routes);
app.use(chatRouter);
app.use(messageRouter);
app.use(profileRouter);
app.listen(port, (res, req) => {
	console.log(`Your server started on ${port}`);
});
