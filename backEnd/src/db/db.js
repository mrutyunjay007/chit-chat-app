//import connect file from mongoose to connect database with server
const { connect, default: mongoose } = require("mongoose");

require("dotenv").config();

//getting uri

// connecting DB -> Server
const connectDB = async () => {
  try {
    const connectionInstance = await connect(
      `${process.env.MONGO_CONNECTION_STRING}/${"chit-chat"}`
    );
    console.log("MongoDB connection Successfull");
    console.log(connectionInstance.connection.host);
    console.log(connectionInstance.connection.id);
  } catch (error) {
    console.log("DB connection FAILED", error);
  }
};

// export
module.exports = connectDB;
