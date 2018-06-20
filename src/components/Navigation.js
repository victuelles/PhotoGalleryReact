import React,{Component} from 'react';
import AuthUserContext from './AuthUserContext'
import * as routes from '../constants/routes'
import SignOutButton from './SignOut';
import logo from "../images/logo.png";

import './style.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    } from 'reactstrap';

const Navigation = () =>
    <AuthUserContext.Consumer> 
            {authUser=>authUser? <NavigationAuth/>:<NavigationNonAuth/>}
    </AuthUserContext.Consumer>



class NavigationAuth extends Component {
    constructor(props) {
       super(props);
   
       this.toggle = this.toggle.bind(this);
       this.state = {
         isOpen: false
       };
     }
     toggle() {
       this.setState({
         isOpen: !this.state.isOpen
       });
     }
       render() { 
         return  (
           <div>
           
    <header className="header_area animated">
        <div className="container-fluid">
            <div className="row align-items-center">

                <div className="col-12 col-lg-10">
                    <div className="menu_area">
                        <nav className="navbar navbar-expand-lg navbar-light">
                  
                            <a className="navbar-brand" href={routes.LANDING}>Ep</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ca-navbar" aria-controls="ca-navbar" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                        
                            <div className="collapse navbar-collapse" id="ca-navbar">
                                <ul className="navbar-nav ml-auto" id="nav">
                                    <li className="nav-item active"><a className="nav-link" href={routes.LANDING}>Home</a></li>
                                    <li className="nav-item"><a className="nav-link" href={routes.STRIPE_STORE}>Store</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                                </ul>
                                <div className="sing-up-button d-lg-none">
                                    <a href={routes.SIGN_IN}>Sign Up Free</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            
                <div className="col-12 col-lg-2">
                    <div className="sing-up-button d-none d-lg-block">
                        <a href={routes.SIGN_IN}>Sign Up Free</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
         </div>
         )
       }
   }
    

class NavigationNonAuth extends Component {
 constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
    render() { 
      return  (
        <div>
   <header className="header_area animated">
        <div className="container-fluid">
            <div className="row align-items-center">

                <div className="col-12 col-lg-10">
                    <div className="menu_area">
                        <nav className="navbar navbar-expand-lg navbar-light">
                  
                            <a className="navbar-brand" href={routes.LANDING}>Ep</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ca-navbar" aria-controls="ca-navbar" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                        
                            <div className="collapse navbar-collapse" id="ca-navbar">
                                <ul className="navbar-nav ml-auto" id="nav">
                                    <li className="nav-item active"><a className="nav-link" href={routes.LANDING}>Home</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#about">Store</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                                </ul>
                                <div className="sing-up-button d-lg-none">
                                    <a href={routes.SIGN_IN}>Sign Up Free</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            
                <div className="col-12 col-lg-2">
                    <div className="sing-up-button d-none d-lg-block">
                        <a href={routes.SIGN_IN}>Sign Up Free</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
         </div>
     
      )
    }
}
 


export default Navigation