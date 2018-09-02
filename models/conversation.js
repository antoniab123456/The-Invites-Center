const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConversationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    chats: [{
        type: Schema.Types.ObjectId, 
        ref: 'Chat'
    }],
    openBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('Conversation', ConversationSchema);