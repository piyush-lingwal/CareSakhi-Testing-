const express = require('express');
const cors = require('cors');
const path = require('path');
const { fileURLToPath } = require('url');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth.cjs');
const productRoutes = require('./routes/products.cjs');
const cartRoutes = require('./routes/cart.cjs');
const orderRoutes = require('./routes/orders.cjs');
const userRoutes = require('./routes/users.cjs');
const periodRoutes = require('./routes/period.cjs');
const walletRoutes = require('./routes/wallet.cjs');
const locationRoutes = require('./routes/location.cjs');
const blogRoutes = require('./routes/blog.cjs');

// Import database initialization
const { initializeDatabase } = require('./database/init.cjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// In development, we don't serve the React build files
// Vite handles the frontend on port 5173

// Initialize database
initializeDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/period', periodRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/blog', blogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CareSakhi API is running' });
});

// API 404 handler - only for API routes
app.use(/^\/api\/.*/, (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`CareSakhi API server running on http://localhost:${PORT}`);
  console.log(`Frontend should be running on http://localhost:5173`);
});