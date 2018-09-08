const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    content: String,
    time: {
        hours: String,
        mins: String,
        date: String, 
        month: String,
        year: String
    }, 
    files: Array,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdFor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Chat', ChatSchema);