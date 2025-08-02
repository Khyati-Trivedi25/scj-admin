import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaVideo, FaEye, FaCalendar, FaDollarSign, FaPlay } from 'react-icons/fa';
import SCJCalculator from './SCJCalculator';

const UserContent = () => {
  const { userId } = useParams();
  const [provider, setProvider] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedContentForCalc, setSelectedContentForCalc] = useState(null);

  useEffect(() => {
    const fetchProviderContent = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock provider data based on ID
        const providerData = {
          1: {
            id: 1,
            name: 'Netflix',
            type: 'OTT Platform',
            contactEmail: 'partnerships@netflix.com',
            partnershipDate: '2024-01-15',
            totalRevenue: 1250000.50,
            status: 'active',
            territory: 'Global',
            contentTypes: ['Movies', 'Webseries', 'Documentaries']
          },
          2: {
            id: 2,
            name: 'Amazon Prime',
            type: 'OTT Platform',
            contactEmail: 'content@amazonprime.com',
            partnershipDate: '2024-02-20',
            totalRevenue: 890000.25,
            status: 'active',
            territory: 'Global',
            contentTypes: ['Movies', 'Webseries', 'TV Shows']
          },
          3: {
            id: 3,
            name: 'Disney+',
            type: 'OTT Platform',
            contactEmail: 'acquisitions@disneyplus.com',
            partnershipDate: '2024-03-10',
            totalRevenue: 2100000.75,
            status: 'active',
            territory: 'Global',
            contentTypes: ['Movies', 'Animated', 'Family Content']
          },
          4: {
            id: 4,
            name: 'Warner Bros',
            type: 'Studio',
            contactEmail: 'licensing@warnerbros.com',
            partnershipDate: '2024-01-30',
            totalRevenue: 450000.00,
            status: 'active',
            territory: 'North America',
            contentTypes: ['Movies', 'TV Shows']
          },
          5: {
            id: 5,
            name: 'Sony Pictures',
            type: 'Studio',
            contactEmail: 'distribution@sonypictures.com',
            partnershipDate: '2024-02-15',
            totalRevenue: 650000.30,
            status: 'active',
            territory: 'Global',
            contentTypes: ['Movies', 'Webseries']
          },
          6: {
            id: 6,
            name: 'Apple TV+',
            type: 'OTT Platform',
            contactEmail: 'content@appletv.com',
            partnershipDate: '2024-03-01',
            totalRevenue: 320000.00,
            status: 'active',
            territory: 'Global',
            contentTypes: ['Movies', 'Webseries', 'Documentaries']
          }
        };

        const mockProvider = providerData[parseInt(userId)] || providerData[1];

        // Mock content data for the provider
        const mockContent = [
          {
            id: 1,
            title: 'The Last Kingdom',
            contentType: 'Webseries',
            description: 'A historical drama series set in 9th century England during the Viking invasion.',
            thumbnail: 'https://via.placeholder.com/300x200/FF0000/ffffff?text=The+Last+Kingdom',
            views: 1250000,
            revenue: 450000.25,
            uploadDate: '2024-03-15',
            duration: '45 min per episode',
            category: 'Action/Drama',
            director: 'Nick Murphy',
            cast: ['Alexander Dreymon', 'David Dawson'],
            rating: 4.5,
            acquisitionCost: 250000,
            licensingFee: 150000,
            rightsType: 'Exclusive',
            territory: 'Global',
            contractDuration: '24 months',
            status: 'Active'
          },
          {
            id: 2,
            title: 'The Crown Season 6',
            contentType: 'Webseries',
            description: 'The final season of the acclaimed series about Queen Elizabeth II.',
            thumbnail: 'https://via.placeholder.com/300x200/000000/ffffff?text=The+Crown+S6',
            views: 2100000,
            revenue: 650000.00,
            uploadDate: '2024-03-10',
            duration: '60 min per episode',
            category: 'Drama',
            director: 'Stephen Daldry',
            cast: ['Imelda Staunton', 'Jonathan Pryce'],
            rating: 4.8,
            acquisitionCost: 300000,
            licensingFee: 200000,
            rightsType: 'Exclusive',
            territory: 'Global',
            contractDuration: '36 months',
            status: 'Active'
          },
          {
            id: 3,
            title: 'Dune: Part Two',
            contentType: 'Movie',
            description: 'The epic conclusion to Denis Villeneuve\'s adaptation of Frank Herbert\'s classic novel.',
            thumbnail: 'https://via.placeholder.com/300x200/8B4513/ffffff?text=Dune+Part+Two',
            views: 950000,
            revenue: 420750.75,
            uploadDate: '2024-02-28',
            duration: '166 min',
            category: 'Sci-Fi',
            director: 'Denis Villeneuve',
            cast: ['Timothée Chalamet', 'Zendaya'],
            rating: 4.7,
            acquisitionCost: 200000,
            licensingFee: 120000,
            rightsType: 'Non-Exclusive',
            territory: 'North America',
            contractDuration: '18 months',
            status: 'Active'
          }
        ];

        setProvider(mockProvider);
        setContent(mockContent);
      } catch (error) {
        console.error('Error fetching provider content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderContent();
  }, [userId]);

  if (loading) {
    return (
      <div className="loading">
        <h3>Loading provider content...</h3>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="error">
        <h3>Content provider not found</h3>
        <Link to="/admin/users" className="btn btn-primary">Back to Providers</Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <Link to="/admin/users" className="btn btn-secondary" style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Providers
        </Link>
        
        <div className="card" style={{ padding: '24px' }}>
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
              marginRight: '20px'
            }}>
              {provider.name.charAt(0)}
            </div>
            <div>
              <h2 style={{ margin: '0 0 8px 0', color: '#495057' }}>{provider.name}</h2>
              <p style={{ margin: '0', color: '#6c757d' }}>{provider.type} • {provider.contactEmail}</p>
            </div>
          </div>
          
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div className="stats-card">
              <div className="stats-number">{content.length}</div>
              <div className="stats-label">Total Content</div>
            </div>
            <div className="stats-card">
              <div className="stats-number">
                {content.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
              </div>
              <div className="stats-label">Total Views</div>
            </div>
            <div className="stats-card">
              <div className="stats-number">
                ${provider.totalRevenue.toLocaleString()}
              </div>
              <div className="stats-label">Total Revenue</div>
            </div>
            <div className="stats-card">
              <div className="stats-number">
                {new Date(provider.partnershipDate).toLocaleDateString()}
              </div>
              <div className="stats-label">Partnership Date</div>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ color: '#495057', marginBottom: '20px' }}>
        <FaVideo style={{ marginRight: '8px' }} />
        Content ({content.length})
      </h3>

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
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <FaPlay style={{ marginRight: '4px' }} />
                {item.duration}
              </div>
            </div>
            
            <div style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#495057' }}>{item.title}</h4>
              <p style={{ margin: '0 0 16px 0', color: '#6c757d', fontSize: '14px' }}>
                {item.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{
                  padding: '4px 8px',
                  background: '#e9ecef',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#495057'
                }}>
                  {item.contentType}
                </span>
                <span style={{
                  padding: '4px 8px',
                  background: '#e9ecef',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#495057'
                }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '14px', color: '#6c757d' }}>
                  <FaCalendar style={{ marginRight: '4px' }} />
                  {new Date(item.uploadDate).toLocaleDateString()}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', color: '#6c757d' }}>
                  <FaEye style={{ marginRight: '4px' }} />
                  {item.views.toLocaleString()} views
                </span>
                <span style={{ fontWeight: '600', color: '#28a745' }}>
                  <FaDollarSign style={{ marginRight: '4px' }} />
                  ${item.revenue.toLocaleString()}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', color: '#6c757d' }}>
                  Director: {item.director}
                </span>
                <span style={{ fontSize: '12px', color: '#6c757d' }}>
                  Rating: {item.rating} ⭐
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to={`/admin/user/${userId}/content/${item.id}`}
                  className="btn btn-primary"
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  <FaEye style={{ marginRight: '4px' }} />
                  View Details
                </Link>
                <button
                  onClick={() => {
                    setSelectedContentForCalc(item);
                    setShowCalculator(true);
                  }}
                  className="btn btn-secondary"
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  <FaDollarSign style={{ marginRight: '4px' }} />
                  Calculator
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* SCJ Calculator Modal - Temporarily disabled */}
      {/* <SCJCalculator 
        isOpen={showCalculator} 
        onClose={() => setShowCalculator(false)}
        contentData={selectedContentForCalc}
      /> */}
    </div>
  );
};

export default UserContent; 