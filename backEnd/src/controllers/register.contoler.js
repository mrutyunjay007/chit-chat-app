const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

/*----------------------- CREATE REGISTER-CONTROLER ------------------------ */
/*  
    description :  signUp to new user
    api : /auth/signin
    method : POST
    req : name,email,password,cheetCode
    res : [201]/[500]
*/
const signUpControler = async (req, res) => {
  /*  
        -> get name,emai,password
        -> generate salte
        -> bcrypt password by that salt
        -> create user by persing data to User-Model
    */
  try {
    // get all data from req
    const { name, email, password, cheetCode } = req.body;

    // Generate salte
    const newsalt = await bcrypt.genSalt(10);

    // Hashing password
    const hashedPassword = bcrypt.hashSync(password, newsalt); // @Todo: parse the password in bcrypt

    // create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      cheetCode,
    });

    await user.save();

    //send res
    res.status(201).json({
      success: true,
      msg: "sing up successfull!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "registration failed!",
    });
  }
};

//EXPORT
module.exports = {
  signUpControler,
};
