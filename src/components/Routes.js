import React, {useContext} from 'react'
import {
    Switch,
  } from 'react-router-dom';
  

import AuthApi from './AuthApi'
import ProtectedLogin from './ProtectedLogin'
import ProtectedRoute from './ProtectedRoute'

function Routes() {
    
    const Auth = useContext(AuthApi);
    return (
        <Switch>
        <ProtectedLogin path="/login" auth={Auth.auth} />
        <ProtectedRoute path="/dashboard" auth={Auth.auth} />
        </Switch>
    )
}

export default Routes
