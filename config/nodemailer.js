const nodemailer = require('nodemailer');
const env = require('dotenv/config');
const User = require('../models/user');
const registration  = require('../controllers/registration');


exports.emailVerification = (receiver, message) => {

  const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.com',
        port: 465,
        secure: true,
        auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
        }
  });

   const mailOptions = {
        from: '"The Invitation Center" <whiteley555@yandex.ru>',
        to: receiver,
        subject: message.subject,
        html: message.text
    };

   transporter.sendMail(mailOptions, (error, info) => {
       if(error) {
         return console.log(error);
       }
      console.log('Email successfully sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}
