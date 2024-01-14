//import connect file from mongoose to connect database with server
const { connect, default: mongoose } = require("mongoose");

require("dotenv").config();

//getting uri

// connecting DB -> Server
const connectDB = async () => {
  try {
    await connect(`${process.env.MONGO_CONNECTION_STRING}`);
    console.log("MongoDB connection Successfull");
  } catch (error) {
    console.log("DB connection FAILED", error);
  }
};

// export
module.exports = connectDB;
