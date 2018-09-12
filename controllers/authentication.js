const User = require('../models/user');
const env = require('dotenv/config');
const mailer = require('../config/nodemailer');
const message = require('../config/email_contents');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let authentication = {
    getLogout: (req, res) => {
        if(req.isAuthenticated()){
            User.findById(req.user._id, (err, user) => {
                if(err) throw err;
                user.set({status: 'offline'});
                user.save((err, saved)=> {
                    if(err) throw err;
                    console.log(saved);
                    req.logout();
                    req.flash('success_msg', 'You are logged out');
                    res.redirect('/');
                });
            })
        }
    },
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        } else {
            req.flash('error_msg', "You are not logged in");
            res.redirect('/');
        }
    },
    forgotPassword: (req, res) => {
        let signPassChange = (query) => { 
            User.findOne(query, (err, user) => {
                if(err) throw err;
                if(!user) {
                    res.send('error');
                } else {
                    /* Make the token valid for use */
                    user.pass_change = true;
                    user.save((err, user) => {if(err) throw err});
                    
                    jwt.sign({id: user._id}, process.env.PSW_SECRET, {expiresIn: '1h'}, 
                    (err, token) => {
                        if(err) throw err;
                        mailer.sendEmail(user.email, message.forgotPassword(token));
                        res.send('fine');
                    });
                }
            });
        }

        (req.body.query == 'user') ? signPassChange({username: req.body.value}): signPassChange({email: req.body.value});
    },
    changePassword: (req, res) => {
        if(req.query.token == undefined){
            req.flash('error_msg', 'No token provided');
            res.redirect('/');
        } else {
            jwt.verify(req.query.token, process.env.PSW_SECRET, (err, decoded) => {
                if(err) throw err;
                if(decoded == undefined){
                    req.flash('error_msg', 'The token has expires or is incorrect!');
                    res.redirect('/');
                } else{
                    User.findOne({_id: decoded.id}, (err, user) => {
                        if(user.pass_change == true){
                            if(err) throw err;
                            if(!user){
                                req.flash('error_msg', 'Opps, something went wrong');
                                res.redirect('/');
                            } else {
                                res.render('pass_change');
                            }
                        } else {
                            req.flash('error_msg', 'The token has expired or is incorrect!');
                            res.redirect('/');
                        }
                    });
                }
            });
        }
    },
    postPassChange: (req, res) => {
        jwt.verify(req.body.token, process.env.PSW_SECRET, (err, decoded) => {
            if(err) throw err;
            User.findOne({_id: decoded.id}, (err, user) => {
                console.log(user);
                console.log(req.body.pass);
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.pass, salt, (err, hash) => {
                        if(err) throw err;
                        user.password = hash;
                        user.pass_change = false;
                        user.save((err, user) => {
                            if(err) throw err;
                            mailer.sendEmail(user.email, message.passwordChanged);
                            res.send('Changed');
                        });
                    });
                });
            });
        });
    }

}

module.exports = authentication;
