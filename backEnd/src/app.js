const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Create APP
const app = express();

// for use json data
app.use(express.json());
// for cookies
app.use(cookieParser());

app.use(
  cors({
    origin: "https://chit-chat-app-frontend.onrender.com",
    methods: ["GET", "POST"],
  })
);

//routes import
const RegisterRouter = require("./routes/register.route");
const AuthRouter = require("./routes/authentication.route");
const UserRouter = require("./routes/user.route");
const ConnectionRouter = require("./routes/connection.route");
const ChatRouter = require("./routes/chat.route");
const MessageRouter = require("./routes/message.route");
const NotificationRouter = require("./routes/notice.route");

//routes declaration
app.use("/api/v1/", RegisterRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/connection", ConnectionRouter);
app.use("/api/v1/chat", ChatRouter);
app.use("/api/v1/message", MessageRouter);
app.use("/api/v1/notification", NotificationRouter);

//export
module.exports = app;
