import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaVideo, FaEye, FaCalendar } from 'react-icons/fa';

const UserList = () => {
  const [contentProviders, setContentProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch content providers
    const fetchContentProviders = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for OTT content providers
        const mockProviders = [
          {
            id: 1,
            name: 'Netflix',
            type: 'OTT Platform',
            contactEmail: 'partnerships@netflix.com',
            partnershipDate: '2024-01-15',
            contentCount: 25,
            totalRevenue: '-',
            status: 'active',
            territory: 'Global',
            contentTypes: ['Movies', 'Webseries', 'Documentaries']
          },
          {
            id: 2,
            name: 'Amazon Prime',
            type: 'OTT Platform',
            contactEmail: 'content@amazonprime.com',
            partnershipDate: '2024-02-20',
            contentCount: 18,
            totalRevenue: '-',
            status: 'active',
            territory: 'Global',
            contentTypes: ['Movies', 'Webseries', 'TV Shows']
          },
          {
            id: 3,
            name: 'Disney+',
            type: 'OTT Platform',
            contactEmail: 'acquisitions@disneyplus.com',
            partnershipDate: '2024-03-10',
            contentCount: 32,
            totalRevenue: '-',
            status: 'active',
            territory: 'Global',
            contentTypes: ['Movies', 'Animated', 'Family Content']
          },
          {
            id: 4,
            name: 'Warner Bros',
            type: 'Studio',
            contactEmail: 'licensing@warnerbros.com',
            partnershipDate: '2024-01-30',
            contentCount: 12,
            totalRevenue: '-',
            status: 'active',
            territory: 'North America',
            contentTypes: ['Movies', 'TV Shows']
          },
          {
            id: 5,
            name: 'Sony Pictures',
            type: 'Studio',
            contactEmail: 'distribution@sonypictures.com',
            partnershipDate: '2024-02-15',
            contentCount: 15,
            totalRevenue: '-',
            status: 'active',
            territory: 'Global',
            contentTypes: ['Movies', 'Webseries']
          },
          {
            id: 6,
            name: 'Apple TV+',
            type: 'OTT Platform',
            contactEmail: 'content@appletv.com',
            partnershipDate: '2024-03-01',
            contentCount: 8,
            totalRevenue: '-',
            status: 'active',
            territory: 'Global',
            contentTypes: ['Movies', 'Webseries', 'Documentaries']
          }
        ];
        
        setContentProviders(mockProviders);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContentProviders();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h3>Loading clients...</h3>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div>
          <h1 style={{ 
            color: '#e0e0e0', 
            margin: '0 0 8px 0',
            fontSize: '32px',
            fontWeight: '700'
          }}>
            <FaUsers style={{ marginRight: '12px', color: '#667eea' }} />
            Client Management
          </h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            margin: '0',
            fontSize: '16px'
          }}>
            Manage and monitor your clients - OTT platforms, production companies, individuals, and more
          </p>
        </div>
        <div style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          color: '#667eea',
          fontWeight: '600',
          fontSize: '18px'
        }}>
          {contentProviders.length} Clients
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(40, 167, 69, 0.05) 100%)',
          border: '1px solid rgba(40, 167, 69, 0.2)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#51cf66', marginBottom: '8px' }}>
            {contentProviders.length}
          </div>
          <div style={{ color: '#e0e0e0', fontSize: '16px' }}>Total Clients</div>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(102, 126, 234, 0.05) 100%)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#667eea', marginBottom: '8px' }}>
            {contentProviders.reduce((sum, provider) => sum + provider.contentCount, 0)}
          </div>
          <div style={{ color: '#e0e0e0', fontSize: '16px' }}>Total Content</div>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)',
          border: '1px solid rgba(255, 193, 7, 0.2)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ffc107', marginBottom: '8px' }}>
            ${contentProviders.reduce((sum, provider) => {
              const revenue = typeof provider.totalRevenue === 'number' ? provider.totalRevenue : 0;
              return sum + revenue;
            }, 0).toLocaleString()}
          </div>
          <div style={{ color: '#e0e0e0', fontSize: '16px' }}>Total Revenue</div>
        </div>
      </div>

      {/* Content Provider Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '24px' 
      }}>
        {contentProviders.map(provider => (
          <div key={provider.id} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '24px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
          >
            {/* Status Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              background: provider.status === 'active' ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)',
              color: provider.status === 'active' ? '#51cf66' : '#ff6b6b',
              border: provider.status === 'active' ? '1px solid rgba(40, 167, 69, 0.3)' : '1px solid rgba(220, 53, 69, 0.3)'
            }}>
              {provider.status}
            </div>

            {/* Provider Avatar and Info */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '24px',
                marginRight: '16px',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                position: 'relative'
              }}>
                {provider.name.charAt(0)}
                <div style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: provider.status === 'active' ? '#51cf66' : '#ff6b6b',
                  border: '2px solid rgba(255, 255, 255, 0.1)'
                }}></div>
              </div>
              <div>
                <h3 style={{ 
                  color: '#e0e0e0', 
                  margin: '0 0 4px 0', 
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  {provider.name}
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  margin: '0',
                  fontSize: '14px'
                }}>
                  {provider.type} • {provider.contactEmail}
                </p>
              </div>
            </div>

            {/* Provider Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px', 
              marginBottom: '24px' 
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#667eea',
                  marginBottom: '4px'
                }}>
                  {provider.contentCount}
                </div>
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Content
                </div>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#51cf66',
                  marginBottom: '4px'
                }}>
                  {typeof provider.totalRevenue === 'number' 
                    ? `$${provider.totalRevenue.toLocaleString()}` 
                    : provider.totalRevenue}
                </div>
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Revenue
                </div>
              </div>
            </div>

            {/* Partnership Date */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '20px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px'
            }}>
              <FaCalendar style={{ 
                marginRight: '8px', 
                color: '#667eea',
                fontSize: '16px'
              }} />
              <span style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px'
              }}>
                Partnership: {new Date(provider.partnershipDate).toLocaleDateString()}
              </span>
            </div>

            {/* Content Types */}
            <div style={{ 
              marginBottom: '20px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px'
            }}>
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                Content Types: {provider.contentTypes.join(', ')}
              </div>
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '12px'
              }}>
                Territory: {provider.territory}
              </div>
            </div>

            {/* Action Button */}
            <Link
              to={`/admin/user/${provider.id}`}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <FaEye style={{ marginRight: '8px' }} />
              View Content & Analytics
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList; 