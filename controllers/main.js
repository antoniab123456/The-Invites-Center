const User = require('../models/user');

let main = {
    getIndex: (req, res) => {
        res.render('index');
    },
    getInvite: (req,res) => {
        res.render('invitation');
    },
    getHome: (req, res) => {
        res.render('home');
    },
    getUsers: (req, res) => {
        if(req.isAuthenticated()){
            User.find({}).sort({timestamp: 1}).exec((err, users) => {
                /* Show all the users but the current one */
               let all_users = [];
               users.forEach((user)=>{
                   if(user.email !== req.user.email){
                        user_obj = {
                            username: user.username, 
                            profile_img: user.profile_img, 
                            _id: user._id,
                            status: user.status
                        }
                       all_users.push(user_obj);
                   }
               });
   
               res.send(all_users);
           });
        }

    },
    getUser: (req, res) => {
        res.send({user: req.user._id});
    },
    Test: (req, res) =>{
       res.end('test');       
    },
    notFound: (req, res) => {
        res.render('notfound');
    }
}

module.exports = main;