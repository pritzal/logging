import React, { useState } from 'react';
import axios from 'axios';
import './LogViewer.css';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null); // Added state for handling errors

  const fetchLogs = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/logs`)
      .then(response => {
        setLogs(response.data.logs);
        setError(null); // Clear previous errors
      })
      .catch(error => {
        if (error.response) {
          setError(`Error: ${JSON.stringify(error.response.data)}`);
        } else {
          setError(`Error: ${error.message}`);
        }
        setLogs([]); // Clear logs in case of error
      });
  };

  return (
    <div className="log-viewer-container">
      <button onClick={fetchLogs}>View Logs</button>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      {logs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Log Level</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              const [timestamp, level, ...messageParts] = log.split(' - ');
              const message = messageParts.join(' - ');
              return (
                <tr key={index}>
                  <td>{timestamp}</td>
                  <td>{level}</td>
                  <td>{message}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !error && <p>No logs available</p> // Display message when no logs are available
      )}
    </div>
  );
};

export default LogViewer;

