const User = require('../models/user');
const Conversation = require('../models/conversation');
const Chat = require('../models/chat');

let conversation = {
    postConversation: (req, res) => {
        Conversation.findOne({users: [
            req.user._id,
            req.query.receiver
        ]}, (err, convo) => {
            if(err) throw err;
            if(!convo){
                Conversation.findOne({users: [
                    req.query.receiver,
                    req.user._id
                ]}, (err, conv) => {
                    if(err) throw err;
                    if(!conv){
                        let new_convo = new Conversation({
                            users: [req.user._id, req.query.receiver]
                        }); 
                        new_convo.save((err, conver) => {
                            if(err) throw err;
                            User.findOne({_id: req.query.receiver}, (err, user) => {
                                if(err) throw err;
                                if(!user){
                                    res.send("errors");
                                } else{
                                    let receiver_obj = {
                                        convo: conver,
                                        createdBy: req.user._id,
                                        username: user.username,
                                        profile_img: user.profile_img
                                    }
                                    res.send(receiver_obj);
                                }
                            })
                        });
                    } else {
                        User.findOne({_id: req.query.receiver}, (err, user) => {
                            if(err) throw err;
                            if(!user){
                                res.send("errors");
                            } else{
                                let receiver_obj = {
                                    convo: conv,
                                    createdBy: req.user._id,
                                    username: user.username,
                                    profile_img: user.profile_img
                                }
                                res.send(receiver_obj);
                            }
                        })
                    }
                })
            } else {
                User.findOne({_id: req.query.receiver}, (err, user) => {
                    if(err) throw err;
                    if(!user){
                        res.send("errors");
                    } else{
                        let receiver_obj = {
                            convo: convo,
                            createdBy: req.user._id,
                            username: user.username,
                            profile_img: user.profile_img
                        }
                        res.send(receiver_obj);
                    }
                })
            }
        });
    },
    chatHistory: (req, res) => {
        Chat.find({conversation: req.body.convo_id}, (err, chats) => {
            if(err) throw err;
            if(chats.length == 0 ){
                res.send('404');
            } else{
                res.send(chats);
            }
        });
    }
}

module.exports = conversation;