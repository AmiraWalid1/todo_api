const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

const sendMail = (subject, userEmail, emailBody) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject,
    text: emailBody,

  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }
    console.log("Message sent: ", info.messageId);
  });
};

module.exports = { sendMail };