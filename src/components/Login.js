import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'client'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication logic
      if (formData.role === 'admin') {
        if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
          login({
            id: 1,
            email: formData.email,
            name: 'Admin User',
            role: 'admin'
          });
          navigate('/admin');
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        // For client users, create a mock user
        login({
          id: Math.floor(Math.random() * 1000) + 1,
          email: formData.email,
          name: formData.email.split('@')[0],
          role: 'client'
        });
        navigate('/client');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#667eea', marginBottom: '10px' }}>Content Platform</h1>
          <p style={{ color: '#6c757d' }}>Sign in to your account</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-control"
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
                required
                style={{ paddingLeft: '40px' }}
              />
              <FaUser style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6c757d'
              }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
                required
                style={{ paddingLeft: '40px', paddingRight: '40px' }}
              />
              <FaLock style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6c757d'
              }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#6c757d',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {formData.role === 'admin' && (
            <div style={{ 
              background: '#fff3cd', 
              border: '1px solid #ffeaa7', 
              borderRadius: '8px', 
              padding: '12px', 
              marginBottom: '20px',
              fontSize: '14px',
              color: '#856404'
            }}>
              <strong>Admin Demo:</strong><br />
              Email: admin@example.com<br />
              Password: admin123
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#6c757d', fontSize: '14px' }}>
            {formData.role === 'client' 
              ? 'For client users, any email/password combination will work'
              : 'Use the demo credentials above for admin access'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 