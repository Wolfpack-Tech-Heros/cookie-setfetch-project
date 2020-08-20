import React, {useContext} from 'react'
import {
    Switch,
    Redirect
  } from 'react-router-dom';
  

import AuthApi from './AuthApi'
import ProtectedLogin from './ProtectedLogin'
import ProtectedRoute from './ProtectedRoute'

function Routes() {
    
    const Auth = useContext(AuthApi);
    console.log(Auth.auth);
    return (
        <Switch>
        <ProtectedLogin path="/login" auth={Auth.auth} />
        <ProtectedRoute path="/dashboard" auth={Auth.auth} />
        <Redirect to="/login" />
        </Switch>
    )
}

export default Routes
