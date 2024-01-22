const app = require("./app");
const connectDB = require("./db/db");
const server = require("./socket");

require("dotenv").config();

// DB Connection
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
