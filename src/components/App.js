import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import LandingPage from './Landing'
import SignUpPage from './SignUp'
import SignInPage from './SignIn'
import PasswordForgetPage from './PasswordForget'
import HomePage from './Home'
import AccountPage from './Account'
import JoinTokeSalePage from './JoinTokeSale'
import UserInfoPage from './UserInfo'
import StripeStore from './StripeStore'
import GridPage from './kendo/GridPage'
import * as routes from '../constants/routes'
import withAuthentication from './withAuthentication'


const App = () => 
  <Router>
    <div>
    <Navigation />
        <Route 
          exact path={routes.LANDING} component={()=><LandingPage/>} 
        />
        <Route 
          exact path={routes.SIGN_UP} component={()=><SignUpPage/>} 
        />
        <Route 
          exact path={routes.SIGN_IN} component={()=><SignInPage/>} 
        />
        <Route 
          exact path={routes.PASSWORD_FORGET} component={()=><PasswordForgetPage/>} 
        />
        <Route 
          exact path={routes.HOME} component={()=><HomePage/>} 
        />
        <Route 
          exact path={routes.ACCOUNT} component={()=><AccountPage/>} 
        />
        <Route 
          exact path={routes.JOIN_TOKEN_SALE} component={()=><JoinTokeSalePage/>} 
        />
        <Route 
          exact path={routes.USER_INFO} component={()=><UserInfoPage/>} 
        />
        <Route 
          exact path={routes.STRIPE_STORE} component={()=><StripeStore/>} 
        />
            <Route 
          exact path={routes.KENDO_GRID} component={()=><GridPage/>} 
        />
        
         <Footer/>
      </div>
     
  </Router>

 
export default withAuthentication(App)
