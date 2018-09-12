const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');


passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Incorrect Credentials' });
            }
            if(!user.confirmed){
                return done(null, false, { message: 'The email is not confirmed' });
            } 

            bcrypt.compare(password, user.password, (err, res) => {
                if(err) throw err;
                ((err, res) => {
                    if (err) throw err;
                    if (res) {
                        user.set({status: 'online'});
                        user.save((err, saved) => {
                            if(err) throw err;
                            return done(null, saved);
                        })
                    } else  {
                        return done(null, false, { message: 'Incorrect Credentials' });
                    }
                })(null, res);
            });
        });
    } 
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

let login = {
    postLogin: passport.authenticate('local', { 
        successRedirect: '/users/home', 
        failureRedirect:'/', 
        failureFlash: true
    })
}

module.exports = login; 

