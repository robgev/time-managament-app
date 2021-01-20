import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api")
      .then(res => res.json())
      .then(({ response }) => setResponse(response))
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{response}</p>
      </header>
    </div>
  );
}

export default App;
