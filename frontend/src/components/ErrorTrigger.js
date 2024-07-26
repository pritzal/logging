import React from 'react';
import axios from 'axios';
import './ErrorTrigger.css';  // Import the CSS file
import { NavLink } from "react-router-dom";

const ErrorTrigger = () => {
  const handleTrigger = (endpoint) => {
    axios.get(`${process.env.REACT_APP_API_URL}/${endpoint}`)
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
      <NavLink
        style={{ color:"blue", marginBottom: "10px", marginTop: "10px" }}
        to="/logs"
      >
        View Logs
      </NavLink>

      <button onClick={() => handleTrigger("divide_by_zero")}>
        Trigger Divide By Zero
      </button>
      <button onClick={() => handleTrigger("undefined_variable")}>
        Trigger Undefined Variable
      </button>
      <button onClick={() => handleTrigger("type_error")}>
        Trigger Type Error
      </button>
      <button onClick={() => handleTrigger("index_error")}>
        Trigger Index Error
      </button>
      <button onClick={() => handleTrigger("file_not_found")}>
        Trigger File Not Found
      </button>
      <button onClick={() => handleTrigger("value_error")}>
        Trigger Value Error
      </button>
      <button onClick={() => handleTrigger("assertion_error")}>
        Trigger Assertion Error
      </button>
      <button onClick={() => handleTrigger("key_error")}>
        Trigger Key Error
      </button>
    </div>
  );
};

export default ErrorTrigger;
