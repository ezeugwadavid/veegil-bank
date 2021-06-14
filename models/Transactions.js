const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const TransactionSchema = new Schema({

    customerid: {
        type: String,
        requires: true
    },
    customername: {
        type: String,
        requires: true
    },

    amount: {
        type: Number,
        requires: true
    },

    phonenumber: {
        type: Number,
        requires: true
    },

    type: {
        type: String,
        requires: true
    },
    
    receiver: {
        type: String,
        requires: true
    },

    time: {
        type: Date,
        requires: true
    },

  
});

module.exports = Transaction = mongoose.model('transactions', TransactionSchema);