const nodemailer = require("nodemailer");

async function sendEmailBynodemailer(email, otp) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER, // sender address
    to: email,
    subject: "Email Verification", // Subject line
    text: " Your verification code is:", // plain text body
    html: `<div><p> ${"Your verification code is:"}<p/>
    ${otp}
    </div>`, // html body
  });

  return info;
}

module.exports = sendEmailBynodemailer;
