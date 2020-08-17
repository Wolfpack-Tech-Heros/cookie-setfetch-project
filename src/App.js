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
  const [apiResponse,setapiResponse] = useState('');

  const readCookie = ()=>{
    const user = Cookies.get("user",{ expires: 1 })
    if(user){
      setAuth(true)
    }
  }

  const callAPI= () => {
    fetch('http://localhost:5000/testAPI')
    .then(res=>res.text())
    .then(res=> setapiResponse(res));
  }

  useEffect(() => {
    readCookie();
    callAPI();
  }, [])

  return (
    <div className="App">
      <AuthApi.Provider value={{auth,setAuth}}>
      <Router>
        <Routes />
      </Router>
      </AuthApi.Provider>
  <h1>{apiResponse}</h1>
    </div>
  );
}

export default App;


