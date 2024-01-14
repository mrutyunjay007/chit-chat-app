const express = require("express");
const cookieParser = require("cookie-parser");

// Create APP
const app = express();

// for use json data
app.use(express.json());
// for cookies
app.use(cookieParser);

//export
module.exports = app;
