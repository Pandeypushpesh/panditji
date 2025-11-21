// Vercel serverless function
const app = require('../server.js');

// Export as handler for Vercel
module.exports = (req, res) => {
  return app(req, res);
};

