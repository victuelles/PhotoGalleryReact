import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import LandingPage from './Landing'
import SignUpPage from './SignUp'
import SignInPage from './SignIn'
import PasswordForgetPage from './PasswordForget'
import HomePage from './Home'
import AccountPage from './Account'
import UserInfoPage from './UserInfo'
import StripeStore from './StripeStore'
import EventsPage from './kendo/EventsPage'
import EventsEditPage from './kendo/EventsEditPage'
import ClientsPage from './kendo/ClientsPage'
import Uploader from './kendo/Uploader'
import CollectionsPage from './Collections'
import * as routes from '../constants/routes'
import withAuthentication from './withAuthentication'
import CollectionStore from './CollectionStore';
import SchedulePage from './SchedulePage'

const App = () => 
  <Router>
    <React.Fragment>
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
          exact path={routes.USER_INFO} component={()=><UserInfoPage/>} 
        />
        <Route 
          exact path={routes.STRIPE_STORE} component={()=><StripeStore/>} 
        />
        <Route 
          exact path={routes.EVENTS_GRID} component={()=><EventsPage/>} 
        /> 
        <Route 
          exact path={routes.EVENTS_CRUD} component={()=><EventsEditPage/>} 
        />
        <Route 
          exact path={routes.CLIENTS_GRID} component={()=><ClientsPage/>} 
        />
        <Route 
          exact path={routes.UPLOAD_PHOTOS} component={()=><Uploader/>} 
        />
        <Route 
          exact path={routes.COLLECTIONS} component={()=><CollectionsPage/>} 
        />
       <Route path={ routes.COLLECTION_STORE } component={(props)=><CollectionStore {...props}/>}  
        />
        <Route 
          exact path={routes.SCHEDULE} component={()=><SchedulePage/>} 
        />
         <Footer/>
      </React.Fragment>
     
  </Router>

 
export default withAuthentication(App)

