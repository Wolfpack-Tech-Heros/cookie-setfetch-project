import React from 'react'
import {
    Route,
    Redirect
  } from 'react-router-dom';

  import LoginForm from './LoginForm'

function ProtectedLogin(props) {
    const { path, auth, ...rest } = props
    return (
        <Route 
        {...rest}
        render = {()=> !auth?(
          <LoginForm />
        ):
          (
            <Redirect to="/dashboard" />
          )
        }
        />
      )
}

export default ProtectedLogin
