const mailer = require('../config/nodemailer');
const User = require('../models/user');
const env = require('dotenv/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const base64url = require('base64url');

function randomStringAsBase64Url(size) {
   return base64url(crypto.randomBytes(size));
}

const emailToken = randomStringAsBase64Url(10);
const url = `http://localhost:3000/users/confirmation/${emailToken}`;
const message = {
  text: ` <p>Please, click this link to confirm your email</p>
          <a href=${url}> ${url} </a>`,
  subject: "Verification email"
}

exports.registrationValidation = (req, res) => {

    const email = req.body.email;
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    //validation
    req.checkBody('email', 'Invalid e-mail').isEmail();
    req.checkBody('password', 'Password should be at least 6 symbols').isLength({min: 6});
    req.checkBody('passwordConfirm', 'Passwords are not equal').equals(req.body.password);
    req.checkBody('username', 'Username should be less than 22 symbols').isLength({max: 22});

    const errors = req.validationErrors();
        if(errors) {
           res.render('index', {
             errors: errors
           });
        }
    else {
       const newUser = new User({
           email: email,
           name: name,
           username: username,
           password:  password
        });

      User.createUser(newUser, (err, user) => {
          if (err) throw err;
          console.log(user);

          jwt.sign({
               user: user._id,
              },
                 process.env.EMAIL_SECRET,
              {
                expiresIn: "1d",
              },
             (err, emailToken) => {
               mailer.emailVerification(email, message);
              }
         );
         req.flash('success_msg', 'You are registered! Verify your email to Login');
         res.redirect('/');
      });
   }
}
