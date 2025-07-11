// Application configuration
export const config = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
    retries: 3,
  },

  // Application Settings
  app: {
    name: 'Admin Dashboard',
    version: '1.0.0',
    storagePrefix: 'admin_dashboard_',
  },

  // Feature Flags
  features: {
    notifications: true,
    darkMode: false,
    analytics: true,
  },

  // Cache Configuration
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100,
  },
}; 