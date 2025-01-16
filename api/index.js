const express = require('express');
const { createServer } = require('@vercel/node'); // Vercel's Node.js runtime

const app = express();

// Middleware and routes
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to College Hub API!');
});

// Export app as a serverless function
module.exports = createServer(app);
