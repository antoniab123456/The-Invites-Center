const User = require('../models/user');

let main = {
    getIndex: (req, res) => {
        res.render('index');
    },
    getInvite: (req,res) => {
        res.render('invitation');
    },
    getHome: (req, res) => {
        res.render('admin');
    },
    renderUsers: (req, res) => {
        User.find({}, (err, users) => {
            if(err){ req.flash('error_msg', "Oops, something went wrong");}
            /* Show all the users but the current one */
            let all_users = [];
            users.forEach((user)=>{
                if(user.email !== req.user.email){
                    all_users.push(user);
                }
            });

            res.render('admin', {users: all_users});
        });
    },
    notFound: (req, res) => {
        res.render('notfound');
    }
}

module.exports = main;