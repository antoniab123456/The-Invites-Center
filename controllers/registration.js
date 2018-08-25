const User = require('../models/user')
const jwt = require('jsonwebtoken');
const mailer = require('../config/nodemailer');
const bcrypt = require('bcryptjs');
const env = require('dotenv/config');
const message = require('../config/email_contents');

let registration = {
    postReg: (req, res) =>{
      User.findOne({email: req.body.email}, (err, existingUser) => {
            if (err) { return next(err); }
    
            const email = req.body.email;
            const name = req.body.name;
            const username = req.body.username;
            const password = req.body.password;
    
            //Validation
            req.checkBody('email', 'Invalid e-mail').isEmail();
            req.checkBody('password', 'Password should be at least 6 symbols').isLength({min: 6});
            req.checkBody('passwordConfirm', 'Passwords are not equal').equals(req.body.password);
            req.checkBody('username', 'Username should be less than 22 symbols').isLength({max: 22});
    
            const errors = req.validationErrors();
    
            if(errors) {
                res.render('index', {
                    errors: errors
                });
            } else {
                if (existingUser) {
                    req.flash('error_msg', 'User with this email already exists');
                    res.redirect('/');
                } else {
                    const newUser = new User({
                        email: email,
                        name: name,
                        username: username,
                        password:  password,
                        confirmed: false
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;

                            newUser.save((err, user) => {
                                if (err) throw err;

                                req.flash('success_msg', 'You are registered! Verify your email to Login');
                                res.redirect('/');

                                jwt.sign({ id: user._id }, process.env.REG_SECRET, { expiresIn: '1h' }, 
                                (err, token) => {
                                    if(err) throw err;

                                    mailer.sendEmail(user.email, message.emailVerification(token));
                                });
                            });

                        });
                    });
                }
            }
        });
    },
    verifyEmail: (req, res) => {
        if(req.query.token == undefined){
            req.flash('error_msg', 'No token provided');
            res.redirect('/');
        } else {
            jwt.verify(req.query.token, process.env.REG_SECRET, (err, decoded) =>{
                if(err) throw err;
                User.findOne({_id: decoded.id}, (err, user) => {
                    if(err) throw err;
                    if(!user){
                        req.flash('error_msg', 'Opps something went wrong');
                        res.redirect('/');
                    } else{
                        user.confirmed = true;
                        user.save();
                        req.flash('success_msg', 'Email verified!');
                        res.redirect('/');
                    }
                });
            });
        }
    }
}


module.exports = registration;

