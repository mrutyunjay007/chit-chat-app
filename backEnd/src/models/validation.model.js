const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ValidationSchema = new Schema({
  otp: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

//export
const Validation = mongoose.model("Validation", ValidationSchema);
module.exports = Validation;
