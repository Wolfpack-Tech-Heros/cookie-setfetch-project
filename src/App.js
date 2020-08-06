import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the team [2] Local...</h1>
      <Login />
      <Dashboard />
    </div>
  );
}

//Login
const Login = () => {
  return (
    <div>
      <button>Login</button>
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

export default App;
