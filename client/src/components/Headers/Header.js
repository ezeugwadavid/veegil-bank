/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {React, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import store from 'store';
import { Spinner,Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fundAccount, getDeposits, getWithdrawals, getTransactions, getCurrentAccount, depositAmount, withdrawAmount, clearCurrentTransactions} from '../../redux/actions/transactionActions'

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Modal, ModalHeader, Form, FormGroup, Label, Input, } from "reactstrap";
import "../../assets/css/auth.css";


const Header = (props) => {  
  
  const [modal, setModal] = useState(false);
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  
  
  
  const dispatch = useDispatch();
  useEffect(() => {
    setModal(!modal)
    console.log('effect')
    dispatch(fundAccount());
    dispatch(getDeposits());
    dispatch(getCurrentAccount());   
    dispatch(getTransactions())
    dispatch(getWithdrawals());      
     
   
	}, [dispatch]);

  
  const transactions = useSelector((state) => state.transactions.transactions);  
  const deposits = useSelector((state) => state.transactions.deposits);
  const account = useSelector((state) => state.transactions.account);    
   const withdrawals = useSelector((state) => state.transactions.withdrawals);
  const loading = useSelector((state) => state.transactions.loading); 
  const errors = useSelector((state) => state.transactions.errors); 
  const accountNum = useSelector((state) => state.auth.user.phonenumber); 
  
  // const trans = JSON.stringify(transactions.length)
  // localStorage.setItem('transactionLength', trans);
  // localStorage.setItem('depositsLength', trans); 
  // localStorage.setItem('withdrawalsLength', withdrawals.length);
  
   
    const  balance = () => {
      if(account.length === 1){
        return account[0].balance;
      }
    }
    const {message, amount, phonenumber} = errors;
 
    //for deposit forms modal
    const defaultCredential = { phonenumber: '',  amount: '', type: 'deposit' };
	const [credentials, setCredentials] = useState(defaultCredential);
  const [error, setError] = useState(defaultCredential);

   //for withdraw forms modal
    const newDefaultCredential = { amount: '', type: 'withdraw' };
	const [newCredentials, setNewCredentials] = useState(newDefaultCredential);
  const [newError, setNewError] = useState(newDefaultCredential);
  
   

 
   
  

  
	const { history  } = props;
  
	const handleChange = (e) => {
    const { name, value} = e.target;
	  setCredentials({ ...credentials, [name]: value });
	};
  
	const handleDeposit = e => {
    e.preventDefault();
		const { phonenumber, amount } = credentials;
   
		const error = {};
    let hasError = false;
	
		
		
		if(phonenumber === "") {
			hasError = true;
			error['phonenumber'] = 'phonenumber field is required';
		}
		if(phonenumber === accountNum) {
			hasError = true;
			error['phonenumber'] = 'You cant send money to yourself';
		}
		if(amount === "") {
			hasError = true;
			error['amount'] = 'Amount field cant be empty';
		}

		Object.keys(credentials).forEach(key => {
			if(!credentials[key].length) {
				hasError = true;
				error[key] = 'This field is required';
			}
		});

		setError({ ...error });

		if(hasError) return;

    console.log(error);
    console.log(credentials);

   
    // setTimeout(setDepositModal(!depositModal), 3000);
		dispatch(depositAmount(credentials, history));
    


       
    
    
	};
  
	const handleAmount = (e) => {
    const { name, value} = e.target;
	  setNewCredentials({ ...newCredentials, [name]: value });
	}; 
  
	const handleWithdrawal = e => {
    e.preventDefault();
		const { amount } = newCredentials;
    console.log(amount);
   
		const error = {};
    let hasError = false;  
	
		
		
		if(amount === "") {
			hasError = true;
			error['amount'] = 'Amount field cant be empty';
		}

		Object.keys(newCredentials).forEach(key => {
			if(!newCredentials[key].length) {
				hasError = true;
				error[key] = 'This field is required';   
			}
		});

		setNewError({ ...error });

		if(hasError) return;

    console.log(error);
    console.log(newCredentials);

   
		dispatch(withdrawAmount(newCredentials, history));
    // setTimeout(setDepositModal(!depositModal), 15000);

       
   
    
	};
  

 


  return (  
    <>
           {/* modal */}
        <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={()=>setModal(!modal)} >
        <ModalHeader toggle={()=>setModal(!modal)}></ModalHeader>
        <Row>
          <Col>
          
                   <div className="icon icon-shape mx-auto d-flex justify-content-center align-items-center  bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-wallet" />           
                        </div> 
          <div className="my-3 d-flex justify-content-center align-items-center ">{message}</div>
          </Col>
        </Row>
          
      
      </Modal>

      {/* deposit modal */}
      <Modal isOpen={depositModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={()=>setDepositModal(!depositModal)} >
        <ModalHeader toggle={()=> setDepositModal(!depositModal)}></ModalHeader>
        <Row>
          <Col>
            <FormGroup className="p-4">
          <div className="my-3">
        <Label for="exampleEmail">Account Number (Phone Number of Beneficiary)</Label>
        <Input type="number" name="phonenumber" id="exampleEmail" placeholder="enter your account number" value={credentials.phonenumber}
            onChange={handleChange} />
        <p className="showText">{errors.phonenumber}</p>  
        </div>
        <div className="my-3"> 
        <Label for="examplePassword">Amount</Label>
        <Input type="number" name="amount" id="examplePassword" placeholder="e.g 3000" value={credentials.amount}
            onChange={handleChange} />
        <p className="showText">{errors.amount}</p>
       
         
        </div>
        <Button color="danger" onClick={(e)=>handleDeposit(e)}>Deposit</Button> 
        </FormGroup>

          </Col>  
        </Row>
          
      
      </Modal>

      {/* withdrawalModal */}
      <Modal isOpen={withdrawModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={()=>setWithdrawModal(!withdrawModal)}>
        <ModalHeader toggle={()=> setWithdrawModal(!withdrawModal)}></ModalHeader>
        <Row>
          <Col>
            <FormGroup className="p-2">
         
        <div className="my-3">
        <Label for="examplePassword">Amount</Label>
        <Input type="number" name="amount" id="examplePassword" placeholder="e.g 3000" value={newCredentials.amount}
            onChange={handleAmount} />
        <p className="showText">{message === "Your account needs not be funded" ? "" : message}</p>  
        
        </div>
        <Button color="danger" onClick={(e)=>handleWithdrawal(e)}>Withdraw</Button> 
        </FormGroup>

          </Col>  
        </Row>
          
      
      </Modal>



      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
        { loading ?
         <div className="d-flex justify-content-center my-3"><Spinner color="red" /></div>
          :
          ""
          }
          <div className="header-body"> 
            {/* Card stats */}  
            <Row>
         
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Transactions
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {transactions.length ? transactions.length : 0 }
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                   
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Deposits  
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{deposits.length ? deposits.length : 0}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                   
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"  
                        >
                          Balance   
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">N{balance()}</span>
                      </div>
                      <Col className="col-auto">  
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-wallet" />           
                        </div>    
                      </Col>
                    </Row>
                   
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <div className="modal-btn d-flex justify-content-center align-items-center">
                <Button color="danger" onClick={()=>setDepositModal(!depositModal)}>Deposit</Button>
                <Button onClick={()=>setWithdrawModal(!withdrawModal)} color="danger">Withdraw</Button>

                </div>

                </Col> 
            </Row>
          </div>
        </Container>
      </div>

    </> 
  );
};

export default Header;
