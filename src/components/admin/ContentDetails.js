import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaDollarSign, FaPlay, FaThumbsUp, FaComment, FaShare, FaClock } from 'react-icons/fa';
import SCJCalculator from './SCJCalculator';

const ContentDetails = () => {
  const { userId, contentId } = useParams();
  const [content, setContent] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock provider data
        const mockProvider = {
          id: parseInt(userId),
          name: 'Netflix',
          type: 'OTT Platform',
          contactEmail: 'partnerships@netflix.com'
        };

        // Mock OTT content details
        const mockContent = {
          id: parseInt(contentId),
          title: 'The Last Kingdom',
          contentType: 'Webseries',
          description: 'A historical drama series set in 9th century England during the Viking invasion. Follow Uhtred of Bebbanburg as he navigates the complex political landscape of Saxon England and Viking raids.',
          thumbnail: 'https://via.placeholder.com/600x400/FF0000/ffffff?text=The+Last+Kingdom',
          videoUrl: 'https://example.com/video.mp4',
          views: 1250000,
          revenue: 450000.25,
          uploadDate: '2024-03-15',
          duration: '45 min per episode',
          category: 'Action/Drama',
          director: 'Nick Murphy',
          cast: ['Alexander Dreymon', 'David Dawson', 'Tobias Santelmann'],
          language: 'English',
          totalEpisodes: 10,
          season: 1,
          releaseYear: 2023,
          rating: 4.5,
          acquisitionCost: 250000,
          licensingFee: 150000,
          rightsType: 'Exclusive',
          territory: 'Global',
          contractDuration: '24 months',
          status: 'Active',
          tags: ['Viking', 'Medieval', 'War', 'Kingdom', 'Historical'],
          engagement: 0.087, // 8.7% engagement rate
          watchTime: '38:20', // average watch time
          completionRate: 0.72, // 72% completion rate
          analytics: {
            dailyViews: [45000, 52000, 38000, 67000, 89000, 76000, 54000],
            revenue: [12500, 15250, 8750, 18900, 25300, 22150, 16800],
            engagement: [0.082, 0.091, 0.075, 0.095, 0.103, 0.089, 0.078]
          }
        };

        setUser(mockProvider);
        setContent(mockContent);
      } catch (error) {
        console.error('Error fetching content details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContentDetails();
  }, [userId, contentId]);

  if (loading) {
    return (
      <div className="loading">
        <h3>Loading content details...</h3>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="error">
        <h3>Content not found</h3>
        <Link to={`/admin/user/${userId}`} className="btn btn-primary">Back to Provider Content</Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <Link 
          to={`/admin/user/${userId}`} 
          className="btn btn-secondary" 
          style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center' }}
        >
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Provider Content
        </Link>
        
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              fontWeight: 'bold',
              fontSize: '20px',
              marginRight: '15px'
            }}>
              {user.name.charAt(0)}
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#495057' }}>{user.name}</h4>
              <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '30px' }}>
        {/* Main Content */}
        <div>
          <div className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '20px' }}>
            <img 
              src={content.thumbnail} 
              alt={content.title}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '20px' }}>
              <h2 style={{ margin: '0 0 12px 0', color: '#495057' }}>{content.title}</h2>
              <p style={{ margin: '0 0 16px 0', color: '#6c757d', lineHeight: '1.6' }}>
                {content.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {content.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '4px 12px',
                    background: '#e9ecef',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#495057'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div>
          <div className="card" style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 16px 0', color: '#495057' }}>Performance Metrics</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <FaEye style={{ marginRight: '8px', color: '#6c757d' }} />
              <span style={{ flex: 1 }}>Views</span>
              <span style={{ fontWeight: '600' }}>{content.views.toLocaleString()}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <FaDollarSign style={{ marginRight: '8px', color: '#28a745' }} />
              <span style={{ flex: 1 }}>Revenue</span>
              <span style={{ fontWeight: '600', color: '#28a745' }}>${content.revenue.toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <FaThumbsUp style={{ marginRight: '8px', color: '#007bff' }} />
              <span style={{ flex: 1 }}>Likes</span>
              <span style={{ fontWeight: '600' }}>{content.likes}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <FaComment style={{ marginRight: '8px', color: '#6c757d' }} />
              <span style={{ flex: 1 }}>Comments</span>
              <span style={{ fontWeight: '600' }}>{content.comments}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <FaShare style={{ marginRight: '8px', color: '#28a745' }} />
              <span style={{ flex: 1 }}>Shares</span>
              <span style={{ fontWeight: '600' }}>{content.shares}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <FaClock style={{ marginRight: '8px', color: '#ffc107' }} />
              <span style={{ flex: 1 }}>Duration</span>
              <span style={{ fontWeight: '600' }}>{content.duration}</span>
            </div>
          </div>

          <div className="card">
            <h4 style={{ margin: '0 0 16px 0', color: '#495057' }}>Engagement Analytics</h4>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', color: '#6c757d' }}>Engagement Rate</span>
                <span style={{ fontWeight: '600' }}>{(content.engagement * 100).toFixed(1)}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e9ecef',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${content.engagement * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', color: '#6c757d' }}>Completion Rate</span>
                <span style={{ fontWeight: '600' }}>{(content.completionRate * 100).toFixed(0)}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e9ecef',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${content.completionRate * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #28a745 0%, #20c997 100%)',
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', color: '#6c757d' }}>Avg. Watch Time</span>
                <span style={{ fontWeight: '600' }}>{content.watchTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="card">
        <h4 style={{ margin: '0 0 20px 0', color: '#495057' }}>7-Day Analytics</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <h5 style={{ margin: '0 0 12px 0', color: '#6c757d' }}>Daily Views</h5>
            <div style={{ display: 'flex', alignItems: 'end', height: '100px', gap: '8px' }}>
              {content.analytics.dailyViews.map((views, index) => (
                <div key={index} style={{
                  flex: 1,
                  height: `${(views / Math.max(...content.analytics.dailyViews)) * 100}%`,
                  background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '4px 4px 0 0',
                  minHeight: '20px'
                }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#6c757d' }}>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
          
          <div>
            <h5 style={{ margin: '0 0 12px 0', color: '#6c757d' }}>Daily Revenue</h5>
            <div style={{ display: 'flex', alignItems: 'end', height: '100px', gap: '8px' }}>
              {content.analytics.revenue.map((revenue, index) => (
                <div key={index} style={{
                  flex: 1,
                  height: `${(revenue / Math.max(...content.analytics.revenue)) * 100}%`,
                  background: 'linear-gradient(180deg, #28a745 0%, #20c997 100%)',
                  borderRadius: '4px 4px 0 0',
                  minHeight: '20px'
                }}></div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#6c757d' }}>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
        <button
          onClick={() => setShowCalculator(true)}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <FaDollarSign style={{ marginRight: '8px' }} />
          Revenue Calculator
        </button>
        
        <button className="btn btn-secondary">
          <FaPlay style={{ marginRight: '8px' }} />
          Preview Content
        </button>
      </div>
      
      {/* SCJ Calculator Modal - Temporarily disabled */}
      {/* <SCJCalculator 
        isOpen={showCalculator} 
        onClose={() => setShowCalculator(false)}
        contentData={content}
      /> */}
    </div>
  );
};

export default ContentDetails; 