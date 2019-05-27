import React from 'react';
import logo from './logo.svg';
import './App.css';
import EmailForm from '../EmailForm/EmailForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <EmailForm />
      </header>
    </div>
  );
}

export default App;
