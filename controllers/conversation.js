const User = require('../models/user');
const Conversation = require('../models/conversation');

let conversation = {
    postConversation: (req, res) => {
        Conversation.findOne({sender: req.user._id, receiver: req.query.receiver}, (err, convo) =>{
            if(err) throw err;
            console.log(convo);
            if(!convo){
                let new_convo = new Conversation({
                    sender: req.user._id,
                    receiver: req.query.receiver, 
                    openBy: req.user._id
                }); 
                new_convo.save();
                res.send(new_convo);
            } else {
                convo.openBy = req.user._id;
                convo.save();
                res.send(convo);
            }
        });
    },
    getReceiver: (req, res) => {
        User.findOne({_id: req.query.receiver}, (err, receiver) => {
            if(err) throw err;
            if(!receiver){
                res.send('err');
            } else{
                res.send(receiver);
            }
        });
    }
}

module.exports = conversation;