import React,{useState, useContext, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Cookies from 'js-cookie'
import AuthApi from './components/AuthApi'
import './App.css';


function App() {

  const [auth,setAuth] = useState(false);

  const readCookie = ()=>{
    const user = Cookies.get("user",{ expires: 1 })
    if(user){
      setAuth(true)
    }
  }

  useEffect(() => {
    readCookie();
  }, [])

  return (
    <div className="App">
      <AuthApi.Provider value={{auth,setAuth}}>
      <Router>
        <Routes />
      </Router>
      </AuthApi.Provider>
    </div>
  );
}

//Login
const Login = () => {
  
  const Auth = useContext(AuthApi);

  const handleOnClick = ()=>{
    Auth.setAuth(true);
    Cookies.set('user','loginTrue')
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

  const Auth = useContext(AuthApi);

  const handleOnClick = ()=>{
    Auth.setAuth(false)
    Cookies.remove('user')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleOnClick}>Logout</button>
    </div>
  )
}

const Routes = () => {
  const Auth = useContext(AuthApi);
  console.log(Auth.auth);
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


