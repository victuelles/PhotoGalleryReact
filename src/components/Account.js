import React from 'react';
import {PasswordForgetForm} from './PasswordForget'
import PasswordChangeForgetForm from './PasswordChange'
import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization'
import { Container, Row, Col } from 'reactstrap';


const AccountPage = () => 
<AuthUserContext.Consumer>
    {authUser =>
     <Container style={{marginTop:40+'px'}}>
        <Row>
            <Col md="3"></Col>
            <Col md="6">
                <h2>Account</h2>
                <hr/>
            </Col>
        </Row>
        <Row>
            <Col md="3"></Col>
            <Col md="9">
                <p>Email Id: <span style={{fontWeight:'bold',fontSize:'1.2em'}}> {authUser.email}</span></p>
                <p>Email verified:<span style={{fontWeight:'bold',fontSize:'1.2em'}}> {authUser.emailVerified?'Yes':'No'}</span></p>
                 <p>UID:<span style={{fontWeight:'bold',fontSize:'1.2em'}}> {authUser.uid}</span></p>
                 </Col>
        </Row>    
        <PasswordForgetForm />
        <PasswordChangeForgetForm/>
       
       
      
    </Container>  
    }
</AuthUserContext.Consumer>
const authCondition =(authUser)=>!!authUser;

export default withAuthorization(authCondition)(AccountPage)