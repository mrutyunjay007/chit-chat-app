const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

// generate Token
async function generateJwtToken(userId, userName, email) {
  const user = await User.findById(userId);
  const refreshToken = generateRefreshToken(userId);
  const accessToken = generateAccessToken(userId, userName, email);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
}

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
    const { email, password } = req.body;

    //user present or not
    const user = await User.find({ email: email });

    if (user && user.length > 0) {
      //matching password
      const isPasswordMatching = await bcrypt.compareSync(
        password,
        user[0].password
      ); // @Todo parse password in bcrypt.compareSync(req.pass,user.pass)

      if (isPasswordMatching) {
        const { _id, name, email } = user[0];

        //generate token
        const { accessToken, refreshToken } = await generateJwtToken(
          _id,
          name,
          email
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
              name,
              email,
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

module.exports = {
  loginController,
};
