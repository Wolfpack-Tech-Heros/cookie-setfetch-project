import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import AuthApi from "./components/AuthApi";

import './App.css';


function App() {

  const [auth, setAuth] = React.useState(false);

  return (
    <div className="App">
      <AuthApi.Provider value={(auth,setAuth)}>
      <Router>
        <Routes />
      </Router>
      </AuthApi.Provider>
    </div>
  );
}

//Login
const Login = () => {
  
  const Auth = React.useContext(AuthApi);

  const handleOnClick = ()=>{
    
    Auth.setAuth(true);
  }
  return (
    <div>
      <h1>Welcome to the Login Page</h1>
      <button onClick={handleOnClick}>Login</button>
    </div>
  )
}

//Dashboard
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button>Logout</button>
    </div>
  )
}

const Routes = () => {
  const Auth = React.useContext(AuthApi);
  return (
    <Switch>
      <ProtectedLogin path="/login" auth={Auth.auth} component={Login}  />
      <ProtectedRoute path="/dashboard" auth={Auth.auth} component={Dashboard} />
    </Switch>
  )
}

const ProtectedRoute = ({auth,component: Component, ...rest}) => {
  return (
    <Route 
    {...rest}
    render = {()=> auth?(
      <Component />
    ):
      (
        <Redirect to="/login" />
      )
    }
    />
  )
}

const ProtectedLogin = ({auth,component: Component, ...rest}) => {
  return (
    <Route 
    {...rest}
    render = {()=> !auth?(
      <Component />
    ):
      (
        <Redirect to="/dashboard" />
      )
    }
    />
  )
}

export default App;


