import React from 'react';
import axios from 'axios';
import './ErrorTrigger.css';  // Import the CSS file
import LogViewer from './LogViewer';  // Import the LogViewer component

const ErrorTrigger = () => {
  const handleTrigger = (endpoint) => {
    axios.get(`http://localhost:5000/${endpoint}`)
      .then(response => {
        alert(`Error Triggered: ${JSON.stringify(response.data)}`);
      })
      .catch(error => {
        if (error.response) {
          alert(`Error: ${JSON.stringify(error.response.data)}`);
        } else {
          alert(`Error: ${error.message}`);
        }
      });
  };

  return (
    <div className="error-trigger-container">
      <h2>Error Trigger Buttons</h2>
      <button onClick={() => handleTrigger('divide_by_zero')}>Trigger Divide By Zero</button>
      <button onClick={() => handleTrigger('undefined_variable')}>Trigger Undefined Variable</button>
      <button onClick={() => handleTrigger('type_error')}>Trigger Type Error</button>
      <button onClick={() => handleTrigger('index_error')}>Trigger Index Error</button>
      <button onClick={() => handleTrigger('file_not_found')}>Trigger File Not Found</button>
      <button onClick={() => handleTrigger('value_error')}>Trigger Value Error</button>
      <button onClick={() => handleTrigger('assertion_error')}>Trigger Assertion Error</button>
      <button onClick={() => handleTrigger('key_error')}>Trigger Key Error</button>
      <LogViewer />
    </div>
  );
};

export default ErrorTrigger;
