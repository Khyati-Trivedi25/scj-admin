// Session Analytics Storage - No localStorage Required
// Data persists only during current browser session

class SessionAnalytics {
  constructor() {
    this.contentData = [];
    this.loadFromSession();
  }

  // Load data from sessionStorage (if available)
  loadFromSession() {
    try {
      const sessionData = sessionStorage.getItem('contentAnalytics');
      if (sessionData) {
        this.contentData = JSON.parse(sessionData);
      }
    } catch (error) {
      console.log('No existing session data found');
    }
  }

  // Save data to session
  saveContentPerformance(contentData) {
    const newData = {
      ...contentData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    this.contentData.push(newData);
    this.saveToSession();
    return newData;
  }

  // Save to sessionStorage (optional, for page refresh persistence)
  saveToSession() {
    try {
      sessionStorage.setItem('contentAnalytics', JSON.stringify(this.contentData));
    } catch (error) {
      console.log('Could not save to session storage');
    }
  }

  // Get all content performance data
  getAllContentPerformance() {
    return this.contentData;
  }

  // Get performance by platform
  getPerformanceByPlatform(platform) {
    return this.contentData.filter(item => item.platform === platform);
  }

  // Get best performing content
  getBestPerformingContent(metric = 'revenue') {
    return [...this.contentData].sort((a, b) => (Number(b[metric]) || 0) - (Number(a[metric]) || 0));
  }

  // Get platform comparison
  getPlatformComparison() {
    const platforms = {};
    
    this.contentData.forEach(item => {
      if (!platforms[item.platform]) {
        platforms[item.platform] = {
          totalViews: 0,
          totalRevenue: 0,
          totalContent: 0,
          avgEngagement: 0,
          avgCompletionRate: 0
        };
      }
      
      platforms[item.platform].totalViews += Number(item.views) || 0;
      platforms[item.platform].totalRevenue += Number(item.revenue) || 0;
      platforms[item.platform].totalContent += 1;
      platforms[item.platform].avgEngagement += Number(item.engagement) || 0;
      platforms[item.platform].avgCompletionRate += Number(item.completionRate) || 0;
    });

    // Calculate averages
    Object.keys(platforms).forEach(platform => {
      const data = platforms[platform];
      data.avgEngagement = data.avgEngagement / data.totalContent;
      data.avgCompletionRate = data.avgCompletionRate / data.totalContent;
      data.revenuePerView = data.totalViews > 0 ? data.totalRevenue / data.totalViews : 0;
    });

    return platforms;
  }

  // Get trending content (last 30 days)
  getTrendingContent() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return this.contentData
      .filter(item => new Date(item.timestamp) > thirtyDaysAgo)
      .sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0));
  }

  // Calculate ROI
  calculateROI(contentId) {
    const content = this.contentData.find(item => item.id === contentId);
    
    if (content && content.cost) {
      return ((content.revenue - content.cost) / content.cost) * 100;
    }
    return null;
  }

  // Get performance insights
  getPerformanceInsights() {
    const platformComparison = this.getPlatformComparison();
    const platformKeys = Object.keys(platformComparison);
    
    const insights = {
      totalContent: this.contentData.length,
      totalRevenue: this.contentData.reduce((sum, item) => sum + (Number(item.revenue) || 0), 0),
      totalViews: this.contentData.reduce((sum, item) => sum + (Number(item.views) || 0), 0),
      bestPlatform: platformKeys.length > 0 ? platformKeys.reduce((best, platform) => {
        return platformComparison[platform].totalRevenue > platformComparison[best]?.totalRevenue ? platform : best;
      }, platformKeys[0]) : 'No platforms',
      topPerformingContent: this.getBestPerformingContent().slice(0, 5),
      trendingContent: this.getTrendingContent().slice(0, 5)
    };

    return insights;
  }

  // Export data as JSON file
  exportData() {
    const dataStr = JSON.stringify(this.contentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `content-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Import data from JSON file
  importData(jsonData) {
    try {
      const importedData = JSON.parse(jsonData);
      this.contentData = [...this.contentData, ...importedData];
      this.saveToSession();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Clear all data
  clearAllData() {
    this.contentData = [];
    sessionStorage.removeItem('contentAnalytics');
  }

  // Get data summary
  getDataSummary() {
    return {
      totalRecords: this.contentData.length,
      platforms: [...new Set(this.contentData.map(item => item.platform))],
      dateRange: {
        earliest: this.contentData.length > 0 ? 
          new Date(Math.min(...this.contentData.map(item => new Date(item.timestamp)))) : null,
        latest: this.contentData.length > 0 ? 
          new Date(Math.max(...this.contentData.map(item => new Date(item.timestamp)))) : null
      }
    };
  }
}

// Create singleton instance
export const sessionAnalytics = new SessionAnalytics();

// Sample data structure
export const sampleContentData = {
  id: 1,
  title: "Introduction to React Hooks",
  platform: "YouTube",
  views: 1250,
  revenue: 450.25,
  engagement: 0.087,
  completionRate: 0.72,
  cost: 50,
  category: "Programming",
  uploadDate: "2024-02-15",
  duration: "15:30",
  likes: 89,
  comments: 23,
  shares: 12
}; 