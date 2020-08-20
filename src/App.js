import React,{useState, useEffect} from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';

import Cookies from 'js-cookie'

import AuthApi from './components/AuthApi'
import './App.css';
import Routes from './components/Routes';


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

export default App;


