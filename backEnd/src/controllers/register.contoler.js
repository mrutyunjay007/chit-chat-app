const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const generateRefreshToken = require("../utils/generateRefreshToken");
const generateAccessToken = require("../utils/generateAccessToken");

/*----------------------- CREATE REGISTER-CONTROLER ------------------------ */

/* ......................SignUp Controlers.......................... */

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
    const { fullName, email, password, userName } = req.body;

    //check user already exists or not

    const existedUser = await User.findOne({ userName });

    if (existedUser) {
      res.status(404).json({
        success: false,
        msg: "user already exists",
      });
    } else {
      // Generate salte
      const newsalt = await bcrypt.genSalt(10);

      // Hashing password
      const hashedPassword = bcrypt.hashSync(password, newsalt); // @Todo: parse the password in bcrypt

      // create new user
      const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        userName,
      });

      await user.save();

      //send res
      res.status(201).json({
        success: true,
        msg: "sing up successfull!",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "registration failed!",
    });
  }
};

const userNameUpdateControler = async (req, res) => {
  try {
    const { userName, email } = req.body;
    const userNameExisted = await User.findOne({ userName });

    if (userNameExisted) {
      res.status(404).json({
        success: false,
        msg: "user name not available!",
      });
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { userName },
        {
          new: true,
        }
      );

      res.status(201).json({
        success: true,
        msg: "user name successfully updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "user name update failed!",
    });
  }
};

const checkForUserNameControler = async (req, res) => {
  try {
    const userName = req.query.userName;

    const isUserNamePresent = await User.exists({ userName });

    if (isUserNamePresent === null) {
      //TODO: createUserName

      res.status(200).json({
        success: true,
        msg: "user name is available",
      });
    } else {
      res.status(200).json({
        success: false,
        msg: "user name is not available",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "user name getting request failed!",
    });
  }
};

/* ......................Login Controlers.......................... */

// generate Token
const generateJwtToken = async (userId, fullName, userName) => {
  const user = await User.findById(userId);
  const refreshToken = generateRefreshToken(userId);
  const accessToken = generateAccessToken(userId, fullName, userName);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

/*  
    description :  user get log-in
    api : /auth/login
    method : POST 
    req : email,password
    res : User-{name,email} [200]/[401]/[401]  
*/
const loginController = async (req, res) => {
  /*
        -> get password & email
        -> put email in user model and check user exisit or not
        -> check given password with bcrypted password
    */

  try {
    const { userName, password } = req.body;
    console.log(userName);
    console.log(password);

    //user present or not
    const user = await User.findOne({ userName });

    if (user) {
      //matching password
      const isPasswordMatching = await bcrypt.compareSync(
        password,
        user.password
      ); // @Todo parse password in bcrypt.compareSync(req.pass,user.pass)

      if (isPasswordMatching) {
        const { _id, fullName, userName } = user;

        //generate token
        const { accessToken, refreshToken } = await generateJwtToken(
          _id,
          fullName,
          userName
        );

        //send to client by cookies
        res
          .status(200)
          .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
          })
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
          })
          .json({
            success: true,
            User: {
              fullName,
              userName,
            },
            msg: "login successfull!",
          });
      } else {
        res.status(401).json({
          success: false,
          msg: "Authentication failed!",
        });
      }
    } else {
      // ** NOTE: we could send 400[Bad request]...but for sequrity 401 has been sended
      res.status(401).json({
        success: false,
        msg: "Authentication failed!",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "Authentication failed!",
    });
  }
};

//EXPORT
module.exports = {
  signUpControler,
  userNameUpdateControler,
  checkForUserNameControler,
  loginController,
  generateJwtToken,
};
