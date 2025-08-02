import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPanel from './components/AdminPanel';
import ClientPanel from './components/ClientPanel';
import DashboardCalculator from './components/calculator/DashboardCalculator';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/client/*" element={<ClientPanel />} />
          <Route path="/calculator" element={<DashboardCalculator />} />
          <Route path="/" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 