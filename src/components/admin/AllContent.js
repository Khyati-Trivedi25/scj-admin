import React, { useState, useEffect } from 'react';
import { FaVideo, FaEye, FaCalendar, FaDollarSign, FaPlay, FaSort, FaFilter, FaSearch, FaYoutube, FaAmazon, FaApple, FaGlobe, FaClock, FaStar, FaUsers, FaFileContract, FaCalculator } from 'react-icons/fa';
import { sessionAnalytics, sampleContentData } from '../../utils/sessionAnalytics';

const AllContent = () => {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date'); // date, views, revenue, title
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedContentType, setSelectedContentType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const loadAllContent = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get existing data or initialize with sample data
        let existingData = sessionAnalytics.getAllContentPerformance();
        
        if (existingData.length === 0) {
          // Add sample OTT content data for demonstration
          const sampleData = [
            { 
              id: 1,
              title: 'The Last Kingdom',
              contentType: 'Webseries',
              category: 'Action/Drama',
              platform: 'Netflix',
              contentProvider: 'Carnival Films',
              director: 'Nick Murphy',
              cast: ['Alexander Dreymon', 'David Dawson'],
              language: 'English',
              duration: '45 min per episode',
              totalEpisodes: 10,
              season: 1,
              releaseYear: 2023,
              rating: 4.5,
              impressions: '-',
              revenue: '-',
              engagement: '-',
              acquisitionCost: '-',
              licensingFee: '-',
              rightsType: 'Exclusive',
              territory: 'Global',
              contractDuration: '24 months',
              uploadDate: '2024-03-15',
              timestamp: '2024-03-15T10:00:00Z',
              status: 'Active',
              description: 'A historical drama series set in 9th century England during the Viking invasion.',
              thumbnail: 'https://via.placeholder.com/300x200/FF0000/ffffff?text=The+Last+Kingdom'
            },
            { 
              id: 2,
              title: 'The Crown Season 6',
              contentType: 'Webseries',
              category: 'Drama',
              platform: 'Netflix',
              contentProvider: 'Left Bank Pictures',
              director: 'Stephen Daldry',
              cast: ['Imelda Staunton', 'Jonathan Pryce'],
              language: 'English',
              duration: '60 min per episode',
              totalEpisodes: 8,
              season: 6,
              releaseYear: 2023,
              rating: 4.8,
              impressions: '-',
              revenue: '-',
              engagement: '-',
              acquisitionCost: '-',
              licensingFee: '-',
              rightsType: 'Exclusive',
              territory: 'Global',
              contractDuration: '36 months',
              uploadDate: '2024-03-10',
              timestamp: '2024-03-10T14:30:00Z',
              status: 'Active',
              description: 'The final season of the acclaimed series about Queen Elizabeth II.',
              thumbnail: 'https://via.placeholder.com/300x200/000000/ffffff?text=The+Crown+S6'
            },
            { 
              id: 3,
              title: 'The Boys Season 4',
              contentType: 'Webseries',
              category: 'Action/Superhero',
              platform: 'Amazon Prime',
              contentProvider: 'Sony Pictures Television',
              director: 'Eric Kripke',
              cast: ['Karl Urban', 'Jack Quaid'],
              language: 'English',
              duration: '55 min per episode',
              totalEpisodes: 8,
              season: 4,
              releaseYear: 2024,
              rating: 4.6,
              impressions: '-',
              revenue: '-',
              engagement: '-',
              acquisitionCost: '-',
              licensingFee: '-',
              rightsType: 'Exclusive',
              territory: 'Global',
              contractDuration: '30 months',
              uploadDate: '2024-03-05',
              timestamp: '2024-03-05T09:15:00Z',
              status: 'Active',
              description: 'A dark superhero series about vigilantes fighting corrupt superheroes.',
              thumbnail: 'https://via.placeholder.com/300x200/FF9900/ffffff?text=The+Boys+S4'
            },
            { 
              id: 4,
              title: 'Dune: Part Two',
              contentType: 'Movie',
              category: 'Sci-Fi',
              platform: 'Warner Bros',
              contentProvider: 'Legendary Pictures',
              director: 'Denis Villeneuve',
              cast: ['Timothée Chalamet', 'Zendaya'],
              language: 'English',
              duration: '166 min',
              totalEpisodes: 1,
              season: null,
              releaseYear: 2024,
              rating: 4.7,
              impressions: '-',
              revenue: '-',
              engagement: '-',
              acquisitionCost: '-',
              licensingFee: '-',
              rightsType: 'Non-Exclusive',
              territory: 'North America',
              contractDuration: '18 months',
              uploadDate: '2024-02-28',
              timestamp: '2024-02-28T16:45:00Z',
              status: 'Active',
              description: 'The epic conclusion to Denis Villeneuve\'s adaptation of Frank Herbert\'s classic novel.',
              thumbnail: 'https://via.placeholder.com/300x200/8B4513/ffffff?text=Dune+Part+Two'
            },
            { 
              id: 6,
              title: 'Independent Documentary',
              contentType: 'Documentary',
              category: 'Educational',
              platform: 'John Smith Productions',
              contentProvider: 'Independent Filmmaker',
              director: 'Sarah Johnson',
              cast: ['Narrator: David Attenborough'],
              language: 'English',
              duration: '90 min',
              totalEpisodes: 1,
              season: null,
              releaseYear: 2024,
              rating: 4.2,
              impressions: '-',
              revenue: '-',
              engagement: '-',
              acquisitionCost: '-',
              licensingFee: '-',
              rightsType: 'Non-Exclusive',
              territory: 'United States',
              contractDuration: '12 months',
              uploadDate: '2024-03-01',
              timestamp: '2024-03-01T12:00:00Z',
              status: 'Active',
              description: 'An independent documentary about climate change.',
              thumbnail: 'https://via.placeholder.com/300x200/228B22/ffffff?text=Documentary'
            },
            { 
              id: 5,
              title: 'Poor Things',
              contentType: 'Movie',
              category: 'Drama/Comedy',
              platform: 'Searchlight Pictures',
              contentProvider: 'Film4 Productions',
              director: 'Yorgos Lanthimos',
              cast: ['Emma Stone', 'Mark Ruffalo'],
              language: 'English',
              duration: '141 min',
              totalEpisodes: 1,
              season: null,
              releaseYear: 2023,
              rating: 4.4,
              impressions: '-',
              revenue: '-',
              engagement: '-',
              acquisitionCost: '-',
              licensingFee: '-',
              rightsType: 'Non-Exclusive',
              territory: 'Europe',
              contractDuration: '12 months',
              uploadDate: '2024-02-15',
              timestamp: '2024-02-15T13:10:00Z',
              status: 'Active',
              description: 'A dark comedy about a young woman brought back to life by a brilliant scientist.',
              thumbnail: 'https://via.placeholder.com/300x200/4B0082/ffffff?text=Poor+Things'
            }
          ];
          
          sampleData.forEach(data => sessionAnalytics.saveContentPerformance(data));
          existingData = sessionAnalytics.getAllContentPerformance();
        }

        setContent(existingData);
        setFilteredContent(existingData);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllContent();
  }, []);

  useEffect(() => {
    let filtered = [...content];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contentType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contentProvider?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cast?.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by platform
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(item => item.platform === selectedPlatform);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by content type
    if (selectedContentType !== 'all') {
      filtered = filtered.filter(item => item.contentType === selectedContentType);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    // Sort content
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.timestamp || a.uploadDate);
          bValue = new Date(b.timestamp || b.uploadDate);
          break;
        case 'impressions':
          aValue = a.impressions;
          bValue = b.impressions;
          break;
        case 'revenue':
          aValue = a.revenue;
          bValue = b.revenue;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        default:
          aValue = new Date(a.timestamp || a.uploadDate);
          bValue = new Date(b.timestamp || b.uploadDate);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredContent(filtered);
  }, [content, sortBy, sortOrder, searchTerm, selectedPlatform, selectedCategory, selectedContentType, selectedStatus]);

  const getPlatformIcon = (platform) => {
    const icons = {
      'Netflix': FaPlay,
      'Amazon Prime': FaAmazon,
      'Disney+': FaPlay,
      'HBO Max': FaPlay,
      'Apple TV+': FaApple,
      'Hulu': FaGlobe,
      'YouTube': FaYoutube,
      'Warner Bros': FaVideo,
      'John Smith Productions': FaUsers
    };
    return icons[platform] || FaVideo;
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'Netflix': '#E50914',
      'Amazon Prime': '#FF9900',
      'Disney+': '#0063E5',
      'HBO Max': '#B535F6',
      'Apple TV+': '#000000',
      'Hulu': '#1CE783',
      'YouTube': '#FF0000',
      'Warner Bros': '#8B4513',
      'John Smith Productions': '#228B22'
    };
    return colors[platform] || '#667eea';
  };

  const getCategories = () => {
    return [...new Set(content.map(item => item.category))];
  };

  const getPlatforms = () => {
    return [...new Set(content.map(item => item.platform))];
  };

  const getContentTypes = () => {
    return [...new Set(content.map(item => item.contentType))];
  };

  const getStatuses = () => {
    return [...new Set(content.map(item => item.status))];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateROI = (revenue, acquisitionCost) => {
    if (!acquisitionCost || acquisitionCost === 0) return 0;
    return ((revenue - acquisitionCost) / acquisitionCost) * 100;
  };

  if (loading) {
    return (
      <div className="loading">
        <h3>Loading all content...</h3>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#e0e0e0', marginBottom: '20px' }}>
          <FaVideo style={{ marginRight: '8px', color: '#667eea' }} />
          Content Acquisition Dashboard
        </h1>
        
        {/* Summary Stats */}
        <div className="grid" style={{ marginBottom: '30px' }}>
          <div className="stats-card">
            <div className="stats-number">{content.length}</div>
            <div className="stats-label">Total Content</div>
          </div>
          <div className="stats-card">
            <div className="stats-number">{getPlatforms().length}</div>
            <div className="stats-label">Clients</div>
          </div>
          <div className="stats-card" style={{ cursor: 'pointer' }} onClick={() => window.open('/calculator', '_blank')}>
            <div className="stats-number">
              <FaCalculator style={{ fontSize: '24px', color: '#667eea' }} />
            </div>
            <div className="stats-label">Revenue Calculator</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card" style={{ marginBottom: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {/* Search */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#495057', fontSize: '14px' }}>
                <FaSearch style={{ marginRight: '4px' }} />
                Search Content
              </label>
              <input
                type="text"
                placeholder="Search by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Client Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#495057', fontSize: '14px' }}>
                <FaFilter style={{ marginRight: '4px' }} />
                Client
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Clients</option>
                {getPlatforms().map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>

            {/* Content Type Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#495057', fontSize: '14px' }}>
                <FaFilter style={{ marginRight: '4px' }} />
                Content Type
              </label>
              <select
                value={selectedContentType}
                onChange={(e) => setSelectedContentType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Types</option>
                {getContentTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#495057', fontSize: '14px' }}>
                <FaFilter style={{ marginRight: '4px' }} />
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Categories</option>
                {getCategories().map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#495057', fontSize: '14px' }}>
                <FaFilter style={{ marginRight: '4px' }} />
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Status</option>
                {getStatuses().map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#495057', fontSize: '14px' }}>
                <FaSort style={{ marginRight: '4px' }} />
                Sort By
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="date">Date Added</option>
                  <option value="impressions">Impressions</option>
                  <option value="revenue">Revenue</option>
                  <option value="rating">Rating</option>
                  <option value="title">Title</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '6px',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '20px', color: '#6c757d', fontSize: '14px' }}>
          Showing {filteredContent.length} of {content.length} content items
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
        {filteredContent.map(item => {
          const PlatformIcon = getPlatformIcon(item.platform);
          const platformColor = getPlatformColor(item.platform);
          
          return (
            <div key={item.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={item.thumbnail || `https://via.placeholder.com/300x200/${platformColor.replace('#', '')}/ffffff?text=${encodeURIComponent(item.title)}`}
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
                  <FaClock style={{ marginRight: '4px' }} />
                  {item.duration || 'N/A'}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <FaStar style={{ marginRight: '4px', color: '#FFD700' }} />
                  {item.rating}
                </div>
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: platformColor,
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <PlatformIcon style={{ marginRight: '4px' }} />
                  {item.platform}
                </div>
              </div>
              
              <div style={{ padding: '20px' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#495057', fontSize: '18px' }}>{item.title}</h4>
                
                {/* Basic Details */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
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
                    <span style={{
                      padding: '4px 8px',
                      background: '#e9ecef',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#495057'
                    }}>
                      {item.totalEpisodes} {item.contentType === 'Movie' ? 'Movie' : 'Episodes'}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '8px' }}>
                    <strong>Director:</strong> {item.director}
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '8px' }}>
                    <strong>Cast:</strong> {item.cast?.slice(0, 2).join(', ')}{item.cast?.length > 2 ? '...' : ''}
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#6c757d' }}>
                    <strong>Release Year:</strong> {item.releaseYear}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => window.open('/calculator', '_blank')}
                    className="btn btn-primary"
                    style={{ flex: 1, textAlign: 'center', fontSize: '14px', padding: '12px', fontWeight: '600' }}
                  >
                    <FaCalculator style={{ marginRight: '8px' }} />
                    Revenue Calculator
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ flex: 1, textAlign: 'center', fontSize: '14px', padding: '12px', fontWeight: '600' }}
                  >
                    <FaFileContract style={{ marginRight: '8px' }} />
                    Licensing Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredContent.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>No content found</h3>
          <p style={{ color: '#6c757d' }}>Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

export default AllContent; 