const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTransactionInput(data){
    let errors = {};
    data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
    data.amount = !isEmpty(data.amount) ? data.amount : '';
    data.type = !isEmpty(data.type) ? data.type : '';
    

    if(validator.isEmpty(data.phonenumber)){
      errors.phonenumber = 'Phonenumber field is required';
    }
 
    if(validator.isEmpty(data.amount)){
      errors.amount = 'Amount field is required';
    }

    if(validator.isEmpty(data.type)){
      errors.type = 'Type field is required';
    } 

    return {
        errors,
        isValid: isEmpty(errors)
    }
}        