
import {React, useState} from "react";
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';
import { loginUser } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import "assets/css/auth.css";

// reactstrap components
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Login = (props) => {
   const defaultCredential = { email: '',  password: '' };
	const [credentials, setCredentials] = useState(defaultCredential);
  const [error, setError] = useState(defaultCredential);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const [loading, setLoading] = useState(false); 

 
   
  

  
	const { history  } = props;
  
	const handleChange = (e) => {
    const { name, value} = e.target;
	  setCredentials({ ...credentials, [name]: value });
	};
  
	const handleLogin = e => {
    e.preventDefault();
		const { email, password } = credentials;
   
		const error = {};
    let hasError = false;
	
		
		
		if(password === "") {
			hasError = true;
			error['password'] = 'password field is required';
		}

		Object.keys(credentials).forEach(key => {
			if(!credentials[key].length) {
				hasError = true;
				error[key] = 'This field is required';
			}
		});

		setError({ ...error });

		if(hasError) return;

    setLoading(true);
		dispatch(loginUser(credentials, history));

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
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="enter your email" value={credentials.email}
            onChange={handleChange} />
        <p className="showText">{errors.email}</p>
        </div>
        <div className="my-3">
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="enter your password" value={credentials.password}
            onChange={handleChange} />
        <p className="showText">{errors.password}</p>
        
        </div>
      </FormGroup>
      <Button onClick={(e) => handleLogin(e)} className="btn-color" size="lg" block>Login</Button>
       { loading ?
       <div className="d-flex justify-content-center my-3"><Spinner color="primary" /></div>
       :
       ""
       }
      <div className="bottom-text">
        <div>Don't have an account?</div>
        <div className="register"><Link to="/register" className="ml-2">Register</Link></div>
      </div>
      </Form>
      </div>

      </Col>
    </Row>
      
    </>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

export default Login;
