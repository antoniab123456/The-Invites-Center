const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    confirmed: {
        type: Boolean,
        defaultValue: false
    },
    name: {
        type: String
    },
    timestamps: {
        type: String
    },
    pass_change: {
        type: Boolean
    },
    profile_img: {
        type: String
    }, 
    conversation: [{
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    }],
    openedConvos: [{
        type: Schema.Types.ObjectId,
        ref: 'Convesation'
    }]
});

module.exports = mongoose.model('User', UserSchema);

