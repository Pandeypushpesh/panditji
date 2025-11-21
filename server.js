const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mailRoutes = require('./routes/mailRoute');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*', // In production, specify your frontend URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes (must come before static files)
app.use('/api', mailRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Explicitly serve CSS file with proper content type
app.get('/styles.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'styles.css'));
});

// Explicitly serve JS file
app.get('/script.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'script.js'));
});

// Serve static files FIRST (CSS, JS, images, JSON) - but not index.html
app.use(express.static(path.join(__dirname), {
  index: false, // Don't serve index.html automatically
  dotfiles: 'ignore',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Serve language files
app.use('/lang', express.static(path.join(__dirname, 'lang')));
app.use('/languages', express.static(path.join(__dirname, 'lang'))); // Fallback

// Serve images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Root route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all route for SPA - serve index.html for all non-API, non-static routes
app.get('*', (req, res, next) => {
  // Skip if it's an API route
  if (req.path.startsWith('/api')) {
    return next();
  }
  
  // Skip if it's a static file (should have been handled by express.static)
  const staticExtensions = ['.css', '.js', '.json', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.webp'];
  const hasExtension = staticExtensions.some(ext => req.path.toLowerCase().endsWith(ext));
  
  if (hasExtension) {
    return res.status(404).send('File not found');
  }
  
  // For all other routes, serve index.html (SPA routing)
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server (only if not in Vercel environment)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;

