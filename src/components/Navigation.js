import React,{Component} from 'react';
import AuthUserContext from './AuthUserContext'
import * as routes from '../constants/routes'
import SignOutButton from './SignOut';
import logo from "../images/logo.png";


import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,  
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,DropdownItem
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
           
    <header className="header_area animated sticky slideInDown">
        <div className="container-fluid">
            <div className="row align-items-center">

                <div className="col-12 col-lg-10">
                    <div className="menu_area">
                    <Navbar className="navbar navbar-expand-lg navbar-light" expand="md">
                      <NavbarBrand href={routes.LANDING}>RomPhotos</NavbarBrand>
                      <NavbarToggler onClick={this.toggle} />
                      <Collapse isOpen={this.state.isOpen} navbar id="ca-navbar">
                        <Nav className="navbar-nav ml-auto" id="nav" navbar>
                          <NavItem>
                              <NavLink href={routes.LANDING}>Home</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href={routes.SCHEDULE}>Event Schedule</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href={routes.COLLECTIONS}>Collections</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href={routes.UPLOAD_PHOTOS}>Upload</NavLink>
                          </NavItem>

                          <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                              Lookup Tables
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem>
                                <a href={routes.CLIENTS_GRID}>Clients</a>
                              </DropdownItem>
                              <DropdownItem>
                                <NavItem>
                                   <a href={routes.EVENTS_CRUD}>Events</a>
                                </NavItem>
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem>
                                Client Photos
                              </DropdownItem> 
                              <DropdownItem>
                                <a href={routes.STRIPE_STORE}>Store</a>
                              </DropdownItem>
                              <DropdownItem>
                                <a href={routes.COLLECTION}>Collection</a>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>   
                          <NavItem>
                              <NavLink href={routes.USER_INFO}>Account</NavLink>
                          </NavItem>              
                          <NavItem>
                            <SignOutButton/>
                          </NavItem>
                        </Nav>
  
                      </Collapse>
                     
                    </Navbar>
                        
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
        
        <header className="header_area animated sticky slideInDown">
        <div className="container-fluid">
            <div className="row align-items-center">
            <div className="col-12 col-lg-10">
              <div className="menu_area">
                <Navbar className="navbar navbar-expand-lg navbar-light" expand="md">
                <NavbarBrand href={routes.LANDING}>RomPhotos</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar id="ca-navbar">
                  <Nav className="ml-auto"  id="nav" navbar>
                    <NavItem>
                      <NavLink href={routes.LANDING}>Home</NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink href={routes.SCHEDULE}>Event Schedule</NavLink>
                    </NavItem>
                   
                    <NavItem>
                      <NavLink href={routes.SIGN_IN}>Sign In</NavLink>
                    </NavItem>
                  </Nav>
                  <div className="col-12 col-lg-2">
                          <div className="sing-up-button d-none d-lg-block">
                              <a href={routes.SIGN_UP}>Sign Up Free</a>
                          </div>
                   </div>
                  </Collapse>
                </Navbar>  
                       
            </div>

        </div>

            </div>
            
        </div>
    </header>
        
     
      )
    }
}
 


export default Navigation