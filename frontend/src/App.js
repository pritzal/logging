import React from 'react';
import './App.css';
import ErrorTrigger from './components/ErrorTrigger';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Flask Error Handling with React</h1>
        <ErrorTrigger />
      </header>
    </div>
  );
}

export default App;

