import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaUsers, FaChartLine, FaChartBar, FaVideo, FaCalculator } from 'react-icons/fa';
import UserList from './admin/UserList';
import UserContent from './admin/UserContent';
import ContentDetails from './admin/ContentDetails';
import PlatformAnalytics from './admin/PlatformAnalytics';
import AllContent from './admin/AllContent';
import SCJCalculator from './admin/SCJCalculator';

const AdminPanel = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/admin" className="navbar-brand">
            <FaChartLine style={{ marginRight: '8px' }} />
            Admin Dashboard
          </Link>
          <ul className="navbar-nav">
            <li>
              <Link 
                to="/admin" 
                className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
              >
                <FaVideo style={{ marginRight: '4px' }} />
                All Content
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/users" 
                className={`nav-link ${isActive('/admin/users') ? 'active' : ''}`}
              >
                <FaUsers style={{ marginRight: '4px' }} />
                Users
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/analytics" 
                className={`nav-link ${isActive('/admin/analytics') ? 'active' : ''}`}
              >
                <FaChartBar style={{ marginRight: '4px' }} />
                Platform Analytics
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowCalculator(true)}
                className="nav-link"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                <FaCalculator style={{ marginRight: '4px' }} />
                Revenue Calculator
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<AllContent />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/analytics" element={<PlatformAnalytics />} />
          <Route path="/user/:userId" element={<UserContent />} />
          <Route path="/user/:userId/content/:contentId" element={<ContentDetails />} />
        </Routes>
      </div>
      
      {/* SCJ Calculator Modal - Temporarily disabled for testing */}
      {/* <SCJCalculator 
        isOpen={showCalculator} 
        onClose={() => setShowCalculator(false)} 
      /> */}
    </div>
  );
};

export default AdminPanel; 