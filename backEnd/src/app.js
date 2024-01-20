const express = require("express");
const cookieParser = require("cookie-parser");

// Create APP
const app = express();

// for use json data
app.use(express.json());
// for cookies
app.use(cookieParser);

//routes import
const RegidterRouter = require("./routes/register.route");
const LogRouter = require("./routes/log.route");
const AuthRouter = require("./routes/authentication.route");
const UserRouter = require("./routes/user.route");
const ChatRouter = require("./routes/chat.route");
const MessageRouter = require("./routes/message.route");
const NotificationRouter = require("./routes/notice.route");

//routes declaration
app.use("/", RegidterRouter); // routes -> getData/ login/ signin/ logout
app.use("/", LogRouter); // routes -> getData/ login/ signin/ logout
app.use("/auth", AuthRouter); // routes -> getData/ login/ signin/ logout
app.use("/user", UserRouter);
app.use("/chat", ChatRouter);
app.use("/message", MessageRouter);
app.use("/notify", NotificationRouter);

//export
module.exports = app;
