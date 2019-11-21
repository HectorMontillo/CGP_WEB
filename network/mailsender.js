const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "cgp.web.mailer@gmail.com",
    pass: "cc1112497"
  }
});
exports.sendMail = function(to, subject, text, html) {
  const mailOptions = {
    from: "cgp.web.mailer@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent");
    }
  });
};
