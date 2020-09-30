import React,{useState, useEffect} from 'react';
import {
  BrowserRouter as Router, Link
} from 'react-router-dom';

import Cookies from 'js-cookie'
import GlobalHeader from "@salesforce/design-system-react/lib/components/global-header";
import IconSettings from "@salesforce/design-system-react/lib/components/icon-settings";
import Button from "@salesforce/design-system-react/lib/components/button";
import logo from "./assets/images/logo-salesforce.svg";

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

    <GlobalHeader logoSrc={logo} />
      <AuthApi.Provider value={{auth,setAuth}}>
      <Router>
        <Routes />
      </Router>
      </AuthApi.Provider>
    </div>
  );
}

export default App;


