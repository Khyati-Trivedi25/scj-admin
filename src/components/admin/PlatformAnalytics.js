import React, { useState, useEffect } from 'react';
import { FaChartLine, FaYoutube, FaInstagram, FaTiktok, FaFacebook, FaTwitter, FaDollarSign, FaEye } from 'react-icons/fa';
import { sessionAnalytics, sampleContentData } from '../../utils/sessionAnalytics';

const PlatformAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('revenue');

  useEffect(() => {
    // Initialize with sample data if empty
    const existingData = sessionAnalytics.getAllContentPerformance();
    if (existingData.length === 0) {
      // Add sample data for demonstration
      const sampleData = [
        { ...sampleContentData, platform: 'YouTube', views: 1250, revenue: 450.25, engagement: 0.087 },
        { ...sampleContentData, id: 2, title: 'Advanced JavaScript', platform: 'Instagram', views: 890, revenue: 320.75, engagement: 0.095 },
        { ...sampleContentData, id: 3, title: 'CSS Grid Mastery', platform: 'TikTok', views: 2100, revenue: 479.50, engagement: 0.103 },
        { ...sampleContentData, id: 4, title: 'React State Management', platform: 'YouTube', views: 1800, revenue: 650.00, engagement: 0.092 },
        { ...sampleContentData, id: 5, title: 'Web Design Tips', platform: 'Facebook', views: 650, revenue: 180.25, engagement: 0.075 },
        { ...sampleContentData, id: 6, title: 'JavaScript Promises', platform: 'Twitter', views: 420, revenue: 95.50, engagement: 0.068 }
      ];
      
      sampleData.forEach(data => sessionAnalytics.saveContentPerformance(data));
    }

    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const insights = sessionAnalytics.getPerformanceInsights();
    const platformComparison = sessionAnalytics.getPlatformComparison();
    const bestPerforming = sessionAnalytics.getBestPerformingContent(sortBy);
    
    setAnalytics({
      insights: insights || {
        totalContent: 0,
        totalRevenue: 0,
        totalViews: 0,
        bestPlatform: 'No platforms',
        topPerformingContent: [],
        trendingContent: []
      },
      platformComparison: platformComparison || {},
      bestPerforming: selectedPlatform === 'all' 
        ? (bestPerforming || [])
        : (bestPerforming || []).filter(item => item.platform === selectedPlatform)
    });
  };

  useEffect(() => {
    loadAnalytics();
  }, [selectedPlatform, sortBy]);

  const getPlatformIcon = (platform) => {
    const icons = {
      'YouTube': FaYoutube,
      'Instagram': FaInstagram,
      'TikTok': FaTiktok,
      'Facebook': FaFacebook,
      'Twitter': FaTwitter
    };
    return icons[platform] || FaChartLine;
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'YouTube': '#FF0000',
      'Instagram': '#E4405F',
      'TikTok': '#000000',
      'Facebook': '#1877F2',
      'Twitter': '#1DA1F2'
    };
    return colors[platform] || '#667eea';
  };

  if (!analytics) {
    return (
      <div className="loading">
        <h3>Loading analytics...</h3>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#e0e0e0' }}>
          <FaChartLine style={{ marginRight: '8px', color: '#6600cc' }} />
          Platform Analytics
        </h1>
      </div>

      {/* Overall Insights */}
      <div className="grid">
        <div className="stats-card">
          <div className="stats-number">{analytics.insights.totalContent}</div>
          <div className="stats-label">Total Content</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{(analytics.insights.totalViews || 0).toLocaleString()}</div>
          <div className="stats-label">Total Views</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">${(Number(analytics.insights.totalRevenue) || 0).toFixed(2)}</div>
          <div className="stats-label">Total Revenue</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{analytics.insights.bestPlatform}</div>
          <div className="stats-label">Best Platform</div>
        </div>
      </div>

      {/* Best Performing Platform - Vertical Ranking */}
      <div className="card" style={{ marginTop: '30px' }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#495057' }}>
          <FaChartLine style={{ marginRight: '8px', color: '#667eea' }} />
          Best Performing Platform Ranking
        </h3>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {Object.entries(analytics.platformComparison || {})
            .sort(([,a], [,b]) => (b.totalRevenue || 0) - (a.totalRevenue || 0))
            .map(([platform, data], index) => {
            const PlatformIcon = getPlatformIcon(platform);
            const platformColor = getPlatformColor(platform);
            const rank = index + 1;
            const rankText = rank === 1 ? '1st' : rank === 2 ? '2nd' : rank === 3 ? '3rd' : `${rank}th`;
            const rankColors = {
              1: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              2: 'linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)',
              3: 'linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)',
              4: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              5: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
            };
            const rankShadows = {
              1: '0 4px 15px rgba(255, 215, 0, 0.3)',
              2: '0 4px 15px rgba(192, 192, 192, 0.3)',
              3: '0 4px 15px rgba(205, 127, 50, 0.3)',
              4: '0 4px 15px rgba(102, 126, 234, 0.3)',
              5: '0 4px 15px rgba(40, 167, 69, 0.3)'
            };
            
            return (
              <div key={platform} className="card" style={{ 
                border: `1px solid #e9ecef`,
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  background: rankColors[rank] || rankColors[5],
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: rankShadows[rank] || rankShadows[5],
                  zIndex: 1
                }}>
                  {rankText}
                </div>
                
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: platformColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '24px'
                }}>
                  <PlatformIcon style={{ fontSize: '28px' }} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '20px' }}>{platform}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Total Revenue</div>
                      <div style={{ fontWeight: '600', fontSize: '18px', color: '#28a745' }}>${(Number(data.totalRevenue) || 0).toFixed(2)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Total Views</div>
                      <div style={{ fontWeight: '600', fontSize: '18px' }}>{(data.totalViews || 0).toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Content Count</div>
                      <div style={{ fontWeight: '600', fontSize: '18px' }}>{data.totalContent}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Revenue/View</div>
                      <div style={{ fontWeight: '600', fontSize: '18px' }}>${(Number(data.revenuePerView) || 0).toFixed(4)}</div>
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', color: '#28a745', fontSize: '24px' }}>
                    ${(Number(data.totalRevenue) || 0).toFixed(2)}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6c757d' }}>
                    {((Number(data.avgEngagement) || 0) * 100).toFixed(1)}% engagement
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>



      {/* Best Performing Content */}
      <div className="card" style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: '0', color: '#495057' }}>Best Performing Content</h3>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Platforms</option>
              {Object.keys(analytics.platformComparison || {}).map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="revenue">Sort by Revenue</option>
              <option value="views">Sort by Views</option>
              <option value="engagement">Sort by Engagement</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {(analytics.bestPerforming || []).slice(0, 10).map((content, index) => {
            const PlatformIcon = getPlatformIcon(content.platform);
            const platformColor = getPlatformColor(content.platform);
            const rank = index + 1;
            const rankText = rank === 1 ? '1st' : rank === 2 ? '2nd' : rank === 3 ? '3rd' : `${rank}th`;
            const rankColors = {
              1: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              2: 'linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)',
              3: 'linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)',
              4: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              5: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
            };
            const rankShadows = {
              1: '0 4px 15px rgba(255, 215, 0, 0.3)',
              2: '0 4px 15px rgba(192, 192, 192, 0.3)',
              3: '0 4px 15px rgba(205, 127, 50, 0.3)',
              4: '0 4px 15px rgba(102, 126, 234, 0.3)',
              5: '0 4px 15px rgba(40, 167, 69, 0.3)'
            };
            
            return (
              <div key={content.id} className="card" style={{ 
                border: `1px solid #e9ecef`,
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  background: rankColors[rank] || rankColors[5],
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: rankShadows[rank] || rankShadows[5],
                  zIndex: 1
                }}>
                  {rankText}
                </div>
                
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: platformColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}>
                  <PlatformIcon style={{ fontSize: '24px' }} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '18px' }}>{content.title}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Platform</div>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: platformColor }}>{content.platform}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Views</div>
                      <div style={{ fontWeight: '600', fontSize: '16px' }}>{(content.views || 0).toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Revenue</div>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#28a745' }}>${(Number(content.revenue) || 0).toFixed(2)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px' }}>Engagement</div>
                      <div style={{ fontWeight: '600', fontSize: '16px' }}>{((content.engagement || 0) * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', color: '#28a745', fontSize: '22px' }}>
                    ${(Number(content.revenue) || 0).toFixed(2)}
                  </div>
                                     <div style={{ fontSize: '14px', color: '#6c757d' }}>
                     ${((Number(content.revenue) || 0) / (Number(content.views) || 1)).toFixed(4)} per view
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card" style={{ marginTop: '30px' }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#495057' }}>Performance Insights</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: '#495057' }}>Top Revenue Generator</h4>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>
              {(analytics.insights.topPerformingContent || [])[0]?.title || 'No data available'}
            </div>
            <div style={{ fontWeight: '600', color: '#28a745' }}>
              ${(Number((analytics.insights.topPerformingContent || [])[0]?.revenue) || 0).toFixed(2)}
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: '#495057' }}>Most Viewed Content</h4>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>
              {analytics.insights.topPerformingContent.sort((a, b) => b.views - a.views)[0]?.title || 'No data available'}
            </div>
            <div style={{ fontWeight: '600' }}>
              {((analytics.insights.topPerformingContent || []).sort((a, b) => (b.views || 0) - (a.views || 0))[0]?.views || 0).toLocaleString()} views
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: '#495057' }}>Best Platform</h4>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>
              {analytics.insights.bestPlatform}
            </div>
            <div style={{ fontWeight: '600', color: '#28a745' }}>
              ${(analytics.platformComparison[analytics.insights.bestPlatform]?.totalRevenue || 0).toFixed(2)}
            </div>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: '#495057' }}>Average Revenue per Content</h4>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>
              Across all platforms
            </div>
            <div style={{ fontWeight: '600', color: '#28a745' }}>
              ${((analytics.insights.totalRevenue || 0) / (analytics.insights.totalContent || 1)).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics; 