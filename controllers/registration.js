const User = require('../models/user')
const jwt = require('jsonwebtoken');
const mailer = require('../config/nodemailer');
const bcrypt = require('bcryptjs');
const env = require('dotenv/config');
const message = require('../config/email_contents');

let registration = {
    postReg: (req, res) =>{
      User.findOne({email: req.body.email}, (err, existingUser) => {
            if (err) { throw (err); }
    
            const email = req.body.email;
            const name = req.body.name;
            const username = req.body.username;
            const password = req.body.password;
            
            if (existingUser) {
                res.send('email_exists');
            } else {
                User.findOne({username: username}, (err, user) => {
                    if(user){
                        res.send('username_exists');
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
        
                                    jwt.sign({ id: user._id }, process.env.REG_SECRET, { expiresIn: '1h' }, 
                                    (err, token) => {
                                        if(err) throw err;
                                        mailer.sendEmail(user.email, message.emailVerification(token));
                                        res.send('success');
                                        console.log(user);
                                    });
                                });
        
                            });
                        });
                    }
                });
            }
            
        });
    },
    verifyEmail: (req, res) => {
        if(req.query.token == undefined){
            req.flash('error_msg', 'No token provided');
            res.redirect('/');
        } else {
            jwt.verify(req.query.token, process.env.REG_SECRET, (err, decoded) =>{
                if(!decoded){
                    req.flash('error_msg', 'The token is expired or incorrect');
                    res.redirect('/');
                } else {
                    User.findOne({_id: decoded.id}, (err, user) => {
                        if(err) throw err;
                        if(!user){
                            req.flash('error_msg', 'Opps something went wrong');
                            res.redirect('/');
                        } else{
                            user.confirmed = true;
                            user.save((err, user) => {
                                req.flash('success_msg', 'Email verified!');
                                res.redirect('/');
                            });
                        }
                    });
                }
            });
        }
    }
}


module.exports = registration;

