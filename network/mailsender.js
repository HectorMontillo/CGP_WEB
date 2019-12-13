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

/*
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox3ec03df49c5d4991b00b63415ae2f25a.mailgun.org";
const mg = mailgun({
  apiKey: "abe00d029f17e30f440487590d459cdc-5645b1f9-f2897c25",
  domain: DOMAIN
});

exports.sendMail = function(to, subject, text, html) {
  const mailOptions = {
    from: "cgp.web.mailer@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: html
  };
  mg.messages().send(mailOptions, function(error, body) {
    if (error) console.log(error);
    else console.log(body);
  });
};*/
