const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass
  }
});

function sendEmail(subject, text) {
  const mailOptions = {
    from: config.adminEmail,
    to: config.adminEmail,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(`Error: ${error}`);
    }
    console.log(`Message sent: ${info.response}`);
  });
}

module.exports = {
  sendEmail
};
