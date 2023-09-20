// App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom"; // Use 'Routes' instead of 'Switch'
import Header from "./components/Header";
import Home from "../src/pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import "../src/styles/App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
