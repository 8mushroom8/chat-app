import React from "react";
import Auth from "./components/Auth/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} /> 
      </Routes>
    </Router>
  );
}

export default App;
