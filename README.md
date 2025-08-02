# Content Submission Platform

A React-based content management platform with separate admin and client interfaces.

## Features

### Admin Panel
- **User Management**: View all users with their content and revenue statistics
- **Content Analytics**: Detailed analytics for individual content pieces
- **Revenue Calculator**: Interactive calculator for estimating content revenue
- **Platform Analytics**: Compare performance across different platforms (YouTube, Instagram, TikTok, etc.)
- **Performance Metrics**: Views, engagement rates, and revenue tracking

### Client Panel
- **Dashboard**: Overview of content performance and recent activity
- **Content Management**: Upload, edit, and manage your content
- **Profile Management**: Update profile information and account settings

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Login Credentials

### Admin Access
- **Email**: admin@example.com
- **Password**: admin123
- **Role**: Admin

### Client Access
- **Email**: Any valid email format (e.g., user@example.com)
- **Password**: Any password
- **Role**: Client

## Navigation

### Admin Panel Routes
- `/admin` - User list and overview
- `/admin/analytics` - Platform analytics and performance comparison
- `/admin/user/:userId` - Individual user's content
- `/admin/user/:userId/content/:contentId` - Content details
- `/admin/user/:userId/content/:contentId/calculator` - Revenue calculator

### Client Panel Routes
- `/client` - Dashboard (default)
- Content management and profile sections accessible via navigation

## Technology Stack

- **Frontend**: React 18
- **Routing**: React Router DOM v6
- **Icons**: React Icons
- **Styling**: CSS with modern design patterns
- **State Management**: React Context API

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── UserList.js
│   │   ├── UserContent.js
│   │   ├── ContentDetails.js
│   │   └── RevenueCalculator.js
│   ├── AdminPanel.js
│   ├── ClientPanel.js
│   └── Login.js
├── context/
│   └── AuthContext.js
├── App.js
├── App.css
└── index.js
```

## Features in Detail

### Revenue Calculator
The revenue calculator allows you to estimate content revenue based on:
- Total views
- Engagement rate
- CPM (Cost Per Mille) rate
- Conversion rates
- Average order value
- Subscription rates
- **Save to Analytics**: Store calculated results for platform comparison

### Platform Analytics
- **Cross-Platform Comparison**: Compare performance across YouTube, Instagram, TikTok, Facebook, Twitter
- **Best Performing Content**: Identify top revenue generators and most viewed content
- **Platform Insights**: See which platform generates the most revenue and engagement
- **Performance Tracking**: Monitor content performance over time
- **Session-Based Storage**: Data persists during browser session (no localStorage required)
- **Export/Import**: Save data as JSON files and import them later

### Analytics Dashboard
- Real-time performance metrics
- Visual charts and graphs
- 7-day analytics tracking
- Engagement rate monitoring

### Content Management
- Upload new content
- Edit existing content
- View detailed analytics
- Track revenue performance

## Development

The application uses mock data for demonstration purposes. In a production environment, you would:
1. Replace mock API calls with real backend endpoints
2. Implement proper authentication and authorization
3. Add real data persistence
4. Implement file upload functionality
5. Add real-time analytics tracking

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation) 