const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    time: {
        hours: String,
        mins: String,
        secs: String,
        day: String, 
        month: String,
        year: String
    }, 
    files: Array
});

module.exports = mongoose.model('Chat', ChatSchema);