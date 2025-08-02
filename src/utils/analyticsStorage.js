// Analytics Storage Utility - No Database Required
// Uses localStorage to track content performance across platforms

export const AnalyticsStorage = {
  // Store content performance data
  saveContentPerformance: (contentData) => {
    const existingData = JSON.parse(localStorage.getItem('contentAnalytics') || '[]');
    const updatedData = [...existingData, {
      ...contentData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    }];
    localStorage.setItem('contentAnalytics', JSON.stringify(updatedData));
  },

  // Get all content performance data
  getAllContentPerformance: () => {
    return JSON.parse(localStorage.getItem('contentAnalytics') || '[]');
  },

  // Get performance by platform
  getPerformanceByPlatform: (platform) => {
    const allData = AnalyticsStorage.getAllContentPerformance();
    return allData.filter(item => item.platform === platform);
  },

  // Get best performing content
  getBestPerformingContent: (metric = 'revenue') => {
    const allData = AnalyticsStorage.getAllContentPerformance();
    return allData.sort((a, b) => b[metric] - a[metric]);
  },

  // Get platform comparison
  getPlatformComparison: () => {
    const allData = AnalyticsStorage.getAllContentPerformance();
    const platforms = {};
    
    allData.forEach(item => {
      if (!platforms[item.platform]) {
        platforms[item.platform] = {
          totalViews: 0,
          totalRevenue: 0,
          totalContent: 0,
          avgEngagement: 0,
          avgCompletionRate: 0
        };
      }
      
      platforms[item.platform].totalViews += item.views || 0;
      platforms[item.platform].totalRevenue += item.revenue || 0;
      platforms[item.platform].totalContent += 1;
      platforms[item.platform].avgEngagement += item.engagement || 0;
      platforms[item.platform].avgCompletionRate += item.completionRate || 0;
    });

    // Calculate averages
    Object.keys(platforms).forEach(platform => {
      const data = platforms[platform];
      data.avgEngagement = data.avgEngagement / data.totalContent;
      data.avgCompletionRate = data.avgCompletionRate / data.totalContent;
      data.revenuePerView = data.totalRevenue / data.totalViews;
    });

    return platforms;
  },

  // Get trending content (last 30 days)
  getTrendingContent: () => {
    const allData = AnalyticsStorage.getAllContentPerformance();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return allData
      .filter(item => new Date(item.timestamp) > thirtyDaysAgo)
      .sort((a, b) => b.views - a.views);
  },

  // Calculate ROI (if cost data is available)
  calculateROI: (contentId) => {
    const allData = AnalyticsStorage.getAllContentPerformance();
    const content = allData.find(item => item.id === contentId);
    
    if (content && content.cost) {
      return ((content.revenue - content.cost) / content.cost) * 100;
    }
    return null;
  },

  // Get performance insights
  getPerformanceInsights: () => {
    const allData = AnalyticsStorage.getAllContentPerformance();
    const platformComparison = AnalyticsStorage.getPlatformComparison();
    
    const insights = {
      totalContent: allData.length,
      totalRevenue: allData.reduce((sum, item) => sum + (item.revenue || 0), 0),
      totalViews: allData.reduce((sum, item) => sum + (item.views || 0), 0),
      bestPlatform: Object.keys(platformComparison).reduce((best, platform) => {
        return platformComparison[platform].totalRevenue > platformComparison[best]?.totalRevenue ? platform : best;
      }, Object.keys(platformComparison)[0]),
      topPerformingContent: AnalyticsStorage.getBestPerformingContent().slice(0, 5),
      trendingContent: AnalyticsStorage.getTrendingContent().slice(0, 5)
    };

    return insights;
  },

  // Clear all data (for testing)
  clearAllData: () => {
    localStorage.removeItem('contentAnalytics');
  }
};

// Sample data structure for content performance
export const sampleContentData = {
  id: 1,
  title: "Introduction to React Hooks",
  platform: "YouTube",
  views: 1250,
  revenue: 450.25,
  engagement: 0.087,
  completionRate: 0.72,
  cost: 50, // Optional: content creation cost
  category: "Programming",
  uploadDate: "2024-02-15",
  duration: "15:30",
  likes: 89,
  comments: 23,
  shares: 12
}; 