const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const AccountSchema = new Schema({

    userid: {
        type: String,
        requires: true
    },
    phonenumber: {
        type: Number,
        requires: true
    },

    accountname: {
        type: String,
        requires: true
    },

    balance: {
        type: Number,
        requires: true
    }

    

  
});

module.exports = Account = mongoose.model('accounts', AccountSchema);