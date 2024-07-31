const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Validation = require("../models/validation.model");

const generateRefreshToken = require("../utils/generateRefreshToken");
const generateAccessToken = require("../utils/generateAccessToken");
const otpGenerater = require("../utils/otpGenerater");
const sendEmailBynodemailer = require("../utils/nodemailer");

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
    const { fullName, email, password, userName, profilePic } = req.body;
    console.log(req.body);

    //check user already exists or not

    const existedUser = await User.findOne({ userName });
    console.log(existedUser);
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
        profilePic,
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
        const maxAge = 24 * 60 * 60 * 1000;
        //send to client by cookies
        res
          .status(200)
          .cookie("accessToken", accessToken, {
            maxAge,
            httpOnly: true,
            secure: true,
            sameSite: "None",
          })
          .cookie("refreshToken", refreshToken, {
            maxAge,
            httpOnly: true,
            secure: true,
            sameSite: "None",
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

const logOutController = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $unset: {
          refreshToken: 1, // this removes the field from document
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        msg: "logout successfully!",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      msg: "logout failed!",
    });
  }
};

const checkForEmailController = async (req, res) => {
  /*
        -> check email availability in validation-collection
          -> yes  -> send to validate
          -> no   -> check user with same email
                      -> yes ->  "email not available"
                      -> no  ->  "email available"
    */

  try {
    const { email } = req.body;

    // check email availability in validation-collection
    const validatingEmail = await Validation.findOne({ email });

    if (validatingEmail) {
      //send to validate
      res.status(200).json({
        success: true,
        validate: true,
        msg: "validate",
      });
    } else {
      // check user with same email
      const user = await User.findOne({ email });

      if (user) {
        // email not available
        res.status(200).json({
          success: true,
          validate: false,
          msg: "not availabe",
        });
      } else {
        //email available
        res.status(404).json({
          success: false,
          validate: false,
          msg: "availabe",
        });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "Authentication failed!",
    });
  }
};

const EmailSendForValidationController = async (req, res) => {
  /*
        -> create otp and check otp availability
            -> yes -> create new
            -> no -> send email 
    */
  try {
    const { email } = req.body;
    console.log(email);
    //create new otp
    const otp = await otpGenerater(
      Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000)
    );
    console.log(otp);
    //save in Validation
    const varify = await Validation.create({ otp, email });
    await varify.save();
    console.log("hi");

    const info = await sendEmailBynodemailer(email, otp);

    res.status(200).json({
      success: true,
      info,
      msg: "Varification successfull!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "Authentication failed!",
    });
  }
};

const EmailVarificationController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const varify = await Validation.findOne({ email, otp });

    if (varify) {
      res.status(200).json({
        success: true,
        varify,
        msg: "Varification successfull!",
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "Varification failed!",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "Varification failed!",
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
  checkForEmailController,
  EmailSendForValidationController,
  EmailVarificationController,
  logOutController,
};
