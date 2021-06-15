import {React, useState} from "react";
 import PropTypes from 'prop-types';
import { registerUser } from '../../redux/actions/authActions';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import "assets/css/auth.css";

// reactstrap components
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Register = (props) => {
  const defaultCredential = { fullname: '', email: '', phonenumber: '', password: '' };
	const [credentials, setCredentials] = useState(defaultCredential);
  const [error, setError] = useState(defaultCredential);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const [checkError, setCheckError] = useState(false); 
  const [loading, setLoading] = useState(false); 
   
  

  
	const { history  } = props;
  
	const handleChange = (e) => {
    const { name, value} = e.target;
	  setCredentials({ ...credentials, [name]: value });
	};
  
	const handleRegistration = e => {
    e.preventDefault();
		const { fullname, email, phonenumber, password } = credentials;
   
		const error = {};
		let hasError = false;
		if(fullname === " ") {
			hasError = true;
      setCheckError(true);
			error['fullname'] = 'fullname field is required';
		}
    const verifyEmail = email.split('@');
    
    if(!verifyEmail || verifyEmail.length !== 2) {
      error['email'] = 'Invalid email address';
      hasError = true;
      setCheckError(true);
    }
		
		if(phonenumber === "") {
      hasError = true;
      setCheckError(true);
			error['phonenumber'] = 'phonenumber field is required';
		}

		if(password === "") {
			hasError = true;
      setCheckError(true);
			error['phonenumber'] = 'phonenumber field is required';
		}
    
    console.log(error);

		Object.keys(credentials).forEach(key => {
			if(!credentials[key].length) {
				hasError = true;
				error[key] = 'This field is required';
			}
		});

		setError({ ...error });

		if(hasError) return;
    setLoading(true);

		dispatch(registerUser(credentials, history))

     setTimeout(function(){ setLoading(false); }, 3000);

      
      


    
    
   
    
	};
  
   
  return (  
    <>    
    <Row>
      <Col>
      <div className="login-content">
      <Form className="margins">
        <div className="d-flex justify-content-center">
        <h3>Veegil Bank</h3>
        </div>
      <FormGroup>
        <div className="my-3">
        <Label for="exampleName">Fullname</Label>
        <Input className={checkError ? "inputs" : ""} type="text" name="fullname" id="exampleName" placeholder="enter your fullname"  value={credentials.fullname}
            onChange={handleChange} />
        <p className={checkError > 0 ? "showText" : "hideText"}>{error.fullname}</p>
        </div>

        <div className="my-3">
        <Label for="exampleEmail">Email</Label>
        <Input className={checkError ? "inputs" : ""} type="email" name="email" id="exampleEmail" placeholder="enter your email" value={credentials.email}
            onChange={handleChange} />
        <p className="showText">{errors.email} </p>
        </div>
 
        <div className="my-3">
        <Label for="exampleEmail">Phone Number (Your phone number will be used as your account number)</Label>
        <Input className={checkError ? "inputs" : ""} type="number" name="phonenumber" id="exampleEmail" placeholder="enter your phone number" value={credentials.phonenumber}
            onChange={handleChange} />
        <p className={checkError ? "showText" : "hideText"}>{error.phonenumber}</p>
        </div>

        <div className="my-3">
        <Label for="examplePassword">Password</Label>
        <Input className={checkError ? "inputs" : ""} type="password" name="password" id="examplePassword" placeholder="enter your password" value={credentials.password}
            onChange={handleChange} />
        <p className="showText">{errors.password}</p>   
        </div>

      </FormGroup>
      <Button onClick={(e) => handleRegistration(e)} className="btn-color" size="lg" block>Register</Button>
     { loading ?
       <div className="d-flex justify-content-center my-3"><Spinner color="primary" /></div>
       :
       ""
       }
      <div className="bottom-text">
        <div>Already have an account?</div>
        <div className="register"><Link to="/" className="ml-2">Login</Link></div>
      </div>
      </Form>
      </div>

      </Col>
    </Row>
      
    </>
  );
};
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

export default Register;
