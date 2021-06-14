const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phonenumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = User = mongoose.model('users', UserSchema)