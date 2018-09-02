
const User = require('../models/user');
const app = require('../app.js');

let settings = {
    getProfile: (req, res) => {
        res.render('profile_settings', {profile: 'profile_active'});
    },
    getSettings: (req, res) => {
        res.render('profile_settings', {settings: 'settings_active'});
    },
    postProfilePicture: (req, res) => {
        if(req.file.filename !== undefined){
            User.findOne({_id: req.user._id}, (err, user) => {
                if(err) throw err;
                user.profile_img = req.file.filename;
                user.save((err, user) => {
                    res.redirect('/users/profile');
                });
            });
        }
    },
    getImage: (req, res) => {
        if(req.query.image !== undefined){
            app.getFile({filename: req.query.image}, (err, file) => {
                if(err) throw err;
                if(!file){
                    res.json({
                        err: 'File not found'
                    })
                } else{
                    app.readStream(file, res);
                }
            });
        } else{
            res.json({
                err: 'No file was provided'
            })
        }
    },
    deleteImage: (req, res) => {
        app.removeFile({filename: req.query.image}, (err, file) => {
            if(err) throw err;
            User.findOne({_id: req.user._id}, (err, user) => {
                if(err) throw err;
                user.profile_img = '';
                user.save((err, user) => {
                    if(err) throw err;
                    res.send('deleted');
                });
            });
        })
    }
}

module.exports = settings;