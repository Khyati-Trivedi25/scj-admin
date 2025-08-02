import React, { useState, useEffect } from 'react';
import { FaVideo, FaChartLine, FaUser, FaUpload, FaEye, FaEdit, FaTrash, FaCalculator } from 'react-icons/fa';
import { sessionAnalytics } from '../utils/sessionAnalytics';

const ClientPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <FaVideo style={{ marginRight: '8px' }} />
            Content Creator Dashboard
          </div>
          <ul className="navbar-nav">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              >
                <FaChartLine style={{ marginRight: '4px' }} />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('content')}
                className={`nav-link ${activeTab === 'content' ? 'active' : ''}`}
              >
                <FaVideo style={{ marginRight: '4px' }} />
                My Content
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('profile')}
                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
              >
                <FaUser style={{ marginRight: '4px' }} />
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => window.open('/calculator', '_blank')}
                className="nav-link"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}
              >
                <FaCalculator style={{ marginRight: '4px' }} />
                Revenue Calculator
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        {activeTab === 'dashboard' && <ClientDashboard />}
        {activeTab === 'content' && <ClientContent />}
        {activeTab === 'profile' && <ClientProfile />}
      </div>
    </div>
  );
};

const ClientDashboard = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalRevenue: 0,
    totalContent: 0,
    avgEngagement: 0
  });

  useEffect(() => {
    const loadStats = () => {
      const insights = sessionAnalytics.getPerformanceInsights();
      const allContent = sessionAnalytics.getAllContentPerformance();
      
      setStats({
        totalViews: insights.totalViews || 0,
        totalRevenue: insights.totalRevenue || 0,
        totalContent: insights.totalContent || 0,
        avgEngagement: allContent.length > 0 
          ? (allContent.reduce((sum, item) => sum + (Number(item.engagement) || 0), 0) / allContent.length) * 100
          : 0
      });
    };

    loadStats();
  }, []);

  return (
    <div>
      <h1 style={{ color: '#495057', marginBottom: '30px' }}>
        <FaChartLine style={{ marginRight: '8px' }} />
        Dashboard
      </h1>

      <div className="grid">
        <div className="stats-card">
          <div className="stats-number">{stats.totalViews.toLocaleString()}</div>
          <div className="stats-label">Total Views</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{stats.totalContent}</div>
          <div className="stats-label">Total Content</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{stats.avgEngagement}%</div>
          <div className="stats-label">Avg. Engagement</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '30px' }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#495057' }}>Recent Activity</h3>
        <div style={{ color: '#6c757d' }}>
          <p>• New video "Advanced React Patterns" uploaded 2 days ago</p>
          <p>• "CSS Grid Mastery" reached 1,000 views yesterday</p>
          <p>• Earned $45.20 from "JavaScript Fundamentals" today</p>
          <p>• Engagement rate improved by 2.3% this week</p>
        </div>
      </div>
    </div>
  );
};

const ClientContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = () => {
      const allContent = sessionAnalytics.getAllContentPerformance();
      
      const transformedContent = allContent.map((item, index) => ({
        id: item.id || index + 1,
        title: item.title || 'Untitled Content',
        thumbnail: `https://via.placeholder.com/300x200/667eea/ffffff?text=${encodeURIComponent(item.title || 'Content')}`,
        views: Number(item.views) || 0,
        revenue: Number(item.revenue) || 0,
        status: 'published',
        uploadDate: item.uploadDate || new Date().toISOString().split('T')[0]
      }));
      
      setContent(transformedContent);
      setLoading(false);
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h3>Loading content...</h3>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#495057' }}>
          <FaVideo style={{ marginRight: '8px' }} />
          My Content
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary">
            <FaUpload style={{ marginRight: '8px' }} />
            Upload New Content
          </button>
          <button 
            onClick={() => window.open('/calculator', '_blank')}
            className="btn btn-secondary"
            style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: 'white' }}
          >
            <FaCalculator style={{ marginRight: '4px' }} />
            Calculate
          </button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {content.map(item => (
          <div key={item.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={item.thumbnail} 
                alt={item.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                background: item.status === 'published' ? '#d4edda' : '#fff3cd',
                color: item.status === 'published' ? '#155724' : '#856404'
              }}>
                {item.status}
              </div>
            </div>
            
            <div style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#495057' }}>{item.title}</h4>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', color: '#6c757d' }}>
                  <FaEye style={{ marginRight: '4px' }} />
                  {item.views.toLocaleString()} views
                </span>
                <span style={{ fontWeight: '600', color: '#28a745' }}>
                  ${item.revenue.toFixed(2)}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary" style={{ flex: 1 }}>
                  <FaEye style={{ marginRight: '4px' }} />
                  View
                </button>
                <button 
                  onClick={() => window.open('/calculator', '_blank')}
                  className="btn btn-secondary" 
                  style={{ flex: 1, background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: 'white' }}
                >
                  <FaCalculator style={{ marginRight: '4px' }} />
                  $ Calculator
                </button>
                <button className="btn btn-secondary" style={{ flex: 1 }}>
                  <FaEdit style={{ marginRight: '4px' }} />
                  Edit
                </button>
                <button className="btn btn-danger" style={{ flex: 1 }}>
                  <FaTrash style={{ marginRight: '4px' }} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ClientProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Passionate content creator sharing knowledge about web development and programming.',
    joinDate: '2024-01-15',
    totalViews: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const loadProfile = () => {
      const insights = sessionAnalytics.getPerformanceInsights();
      setProfile(prev => ({
        ...prev,
        totalViews: insights.totalViews || 0,
        totalRevenue: insights.totalRevenue || 0
      }));
    };

    loadProfile();
  }, []);

  return (
    <div>
      <h1 style={{ color: '#e0e0e0', marginBottom: '30px' }}>
        <FaUser style={{ marginRight: '8px', color: '#667eea' }} />
        Profile
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '36px',
              margin: '0 auto 16px'
            }}>
              {profile.name.charAt(0)}
            </div>
            <h3 style={{ margin: '0 0 8px 0', color: '#e0e0e0' }}>{profile.name}</h3>
            <p style={{ margin: '0', color: '#e0e0e0' }}>{profile.email}</p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#e0e0e0' }}>Member since</span>
              <span style={{ fontWeight: '600', color: '#e0e0e0' }}>{new Date(profile.joinDate).toLocaleDateString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#e0e0e0' }}>Total views</span>
              <span style={{ fontWeight: '600', color: '#e0e0e0' }}>{profile.totalViews.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#e0e0e0' }}>Total revenue</span>
              <span style={{ fontWeight: '600', color: '#51cf66' }}>${profile.totalRevenue.toFixed(2)}</span>
            </div>
          </div>
          
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Edit Profile
          </button>
        </div>

        <div className="card">
          <h3 style={{ margin: '0 0 20px 0', color: '#e0e0e0' }}>About</h3>
          <p style={{ color: '#e0e0e0', lineHeight: '1.6', marginBottom: '20px' }}>
            {profile.bio}
          </p>
          
          <h4 style={{ margin: '0 0 16px 0', color: '#e0e0e0' }}>Account Settings</h4>
          <div style={{ display: 'grid', gap: '12px' }}>
            <button className="btn btn-secondary" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
              Change Password
            </button>
            <button className="btn btn-secondary" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
              Notification Settings
            </button>
            <button className="btn btn-secondary" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
              Privacy Settings
            </button>
            <button className="btn btn-secondary" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
              Payment Methods
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPanel; 