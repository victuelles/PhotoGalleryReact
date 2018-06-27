import React from 'react';
import {auth} from '../firebase'

const SignOutButton=() =>
<a className="nav-link" 
        onClick={auth.doSignOut}
        >
        Sign Out
        </a>
export default SignOutButton;