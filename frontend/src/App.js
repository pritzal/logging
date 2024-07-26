import React from "react";
import "./App.css";
import ErrorTrigger from "./components/ErrorTrigger";
import LogViewer from "./components/LogViewer";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Flask Error Handling with React</h1>
        <Routes>
          <Route exact path="/" element={<ErrorTrigger/>} />
          <Route path="/logs" element={<LogViewer/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
