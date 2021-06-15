const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    

    if(!validator.isLength(data.fullname, {min: 4, max: 30})){
      errors.fullname = 'fullname must be between 4 and 30 characters';
    }

    if(validator.isEmpty(data.fullname)){
      errors.fullname = 'fullname field is required';
    }

    if(validator.isEmpty(data.email)){
      errors.email = 'Email field is required';
    }

    if(!validator.isEmail(data.email)){
      errors.email = 'Email is invalid';
    }

    if(validator.isEmpty(data.password)){
      errors.password = 'password field is required';
    }
    if(validator.isEmpty(data.phonenumber)){
      errors.phonenumber = 'phonenumber field is required';
    }

    if(!validator.isLength(data.password, {min: 2, max: 30})){  
      errors.password = 'password must be at least 2 characters';     
    }  

    return {
        errors,
        isValid: isEmpty(errors)
    }
}        