//import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import axios from "axios";
import Dashboard from './Dashboard';
import { UserDataProvider } from "./UserDataContext";

function Home() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5001/login"; // Redirect to backend
  };

  return (
    <div>
      <h1>Spotify Stats</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}


function App() {
  return (
    <UserDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserDataProvider>
  );
}

export default App;
