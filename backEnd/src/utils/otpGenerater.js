const Validation = require("../models/validation.model");

async function otpGenerater(otp) {
  try {
    const isOtpNotAvailable = await Validation.findOne({ otp });
    if (isOtpNotAvailable) {
      // create new one
      const newOtp = Math.floor(
        Math.random() * (1000000 - 100000 + 1) + 100000
      );
      return await otpGenerater(newOtp);
    }
    return otp;
  } catch (error) {
    console.log(error);
  }
}

//EXPORT
module.exports = otpGenerater;
