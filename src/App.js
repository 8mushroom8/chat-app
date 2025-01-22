import React from "react";
import Chat from "./components/Chat/Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} /> 
      </Routes>
    </Router>
  );
}

export default App;
