import React from 'react'
import {
    Route,
    Redirect
  } from 'react-router-dom';
  import Dashboard from './Dashboard'

function ProtectedRoute(props) {
    const { path, auth, ...rest } = props
    return (
        <Route 
        {...rest}
        render = {()=> auth?(
          <Dashboard />
        ):
          (
            <Redirect to="/login" />
          )
        }
        />
      )
}

export default ProtectedRoute
