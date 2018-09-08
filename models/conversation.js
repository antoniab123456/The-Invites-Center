const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConversationSchema = new Schema({
    chats: [{
        type: Schema.Types.ObjectId, 
        ref: 'Chat'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});


module.exports = mongoose.model('Conversation', ConversationSchema);