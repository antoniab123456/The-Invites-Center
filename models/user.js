const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
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
        type: Boolean
    },
    pass_change: {
        type: Boolean
    }
});



const User = module.exports = mongoose.model('User', UserSchema);

