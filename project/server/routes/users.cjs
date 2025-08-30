const express = require('express');
const { db } = require('../database/init.cjs');
const router = express.Router();

// Get community profiles (customers, distributors, pharmacies)
router.get('/profiles', authenticateToken, (req, res) => {
  const { type } = req.query; // 'customer', 'distributer', 'pharmacy', or 'all'
  
  let query = `
    SELECT u.id, u.name, u.email, u.user_type, u.city, u.state, u.avatar,
           w.coins, w.balance,
           l.business_name, l.address, l.latitude, l.longitude
    FROM users u
    LEFT JOIN wallet w ON u.id = w.user_id
    LEFT JOIN locations l ON u.id = l.user_id
    WHERE u.id != ?
  `;
  
  let params = [req.user.userId];
  
  if (type && type !== 'all') {
    query += ' AND u.user_type = ?';
    params.push(type);
  }
  
  query += ' ORDER BY u.created_at DESC LIMIT 20';
  
  db.all(query, params, (err, profiles) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Remove sensitive information (phone numbers, exact addresses for customers)
    const sanitizedProfiles = profiles.map(profile => ({
      id: profile.id,
      name: profile.name,
      email: profile.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Partially hide email
      userType: profile.user_type,
      city: profile.city,
      state: profile.state,
      avatar: profile.avatar,
      coins: profile.coins || 0,
      businessName: profile.business_name,
      // Only show general area for businesses, not exact address
      area: profile.address ? profile.address.split(',')[0] : null,
      rating: 4.5 + Math.random() * 0.5, // Mock rating
      isVerified: true
    }));
    
    res.json(sanitizedProfiles);
  });
});

// Get detailed profile (when clicked)
router.get('/profile/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.get(
    `SELECT u.id, u.name, u.email, u.user_type, u.city, u.state, u.avatar, u.created_at,
            w.coins, w.balance,
            l.business_name, l.address, l.city as business_city, l.state as business_state
     FROM users u
     LEFT JOIN wallet w ON u.id = w.user_id
     LEFT JOIN locations l ON u.id = l.user_id
     WHERE u.id = ?`,
    [id],
    (err, profile) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      
      // Return detailed but safe profile information
      const detailedProfile = {
        id: profile.id,
        name: profile.name,
        email: profile.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
        userType: profile.user_type,
        city: profile.city,
        state: profile.state,
        avatar: profile.avatar,
        memberSince: profile.created_at,
        coins: profile.coins || 0,
        businessName: profile.business_name,
        businessCity: profile.business_city,
        businessState: profile.business_state,
        // Mock additional data
        totalOrders: Math.floor(Math.random() * 100) + 10,
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 50) + 5,
        isVerified: true,
        badges: profile.user_type === 'distributer' ? ['Top Seller', 'Verified Business'] : 
               profile.user_type === 'pharmacy' ? ['Licensed Pharmacy', 'Trusted Partner'] :
               ['Verified Customer', 'Active Member']
      };
      
      res.json(detailedProfile);
    }
  );
});

// Get user dashboard data
router.get('/dashboard', authenticateToken, (req, res) => {
  const userType = req.user.userType;

  if (userType === 'customer') {
    // Get customer dashboard data
    db.all(
      `SELECT 
        (SELECT COUNT(*) FROM orders WHERE user_id = ?) as total_orders,
        (SELECT SUM(total) FROM orders WHERE user_id = ?) as total_spent,
        (SELECT balance FROM wallet WHERE user_id = ?) as wallet_balance`,
      [req.user.userId, req.user.userId, req.user.userId],
      (err, stats) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({
          userType: 'customer',
          stats: stats[0] || { total_orders: 0, total_spent: 0, wallet_balance: 0 }
        });
      }
    );
  } else if (userType === 'distributer') {
    // Get distributor dashboard data
    db.all(
      `SELECT 
        (SELECT COUNT(*) FROM products WHERE id IN (SELECT product_id FROM distributor_products WHERE user_id = ?)) as total_products,
        (SELECT SUM(quantity * price) FROM order_items oi JOIN distributor_products dp ON oi.product_id = dp.product_id WHERE dp.user_id = ?) as total_sales,
        (SELECT balance FROM wallet WHERE user_id = ?) as wallet_balance`,
      [req.user.userId, req.user.userId, req.user.userId],
      (err, stats) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({
          userType: 'distributer',
          stats: stats[0] || { total_products: 0, total_sales: 0, wallet_balance: 0 }
        });
      }
    );
  } else if (userType === 'pharmacy') {
    // Get pharmacy dashboard data
    db.all(
      `SELECT 
        (SELECT COUNT(*) FROM products WHERE category LIKE '%medical%') as medical_products,
        (SELECT COUNT(*) FROM orders WHERE user_id = ?) as prescriptions_filled,
        (SELECT balance FROM wallet WHERE user_id = ?) as wallet_balance`,
      [req.user.userId, req.user.userId],
      (err, stats) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({
          userType: 'pharmacy',
          stats: stats[0] || { medical_products: 0, prescriptions_filled: 0, wallet_balance: 0 }
        });
      }
    );
  }
});

// Get user's wishlist
router.get('/wishlist', authenticateToken, (req, res) => {
  db.all(
    `SELECT p.* FROM products p
     JOIN wishlist w ON p.id = w.product_id
     WHERE w.user_id = ?`,
    [req.user.userId],
    (err, products) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const formattedProducts = products.map(product => ({
        ...product,
        features: product.features ? JSON.parse(product.features) : [],
        sizes: product.sizes ? JSON.parse(product.sizes) : [],
        colors: product.colors ? JSON.parse(product.colors) : [],
        images: product.images ? JSON.parse(product.images) : [product.image]
      }));

      res.json(formattedProducts);
    }
  );
});

// Add to wishlist
router.post('/wishlist/:productId', authenticateToken, (req, res) => {
  const { productId } = req.params;

  db.run(
    'INSERT OR IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)',
    [req.user.userId, productId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to add to wishlist' });
      }
      res.json({ message: 'Added to wishlist successfully' });
    }
  );
});

// Remove from wishlist
router.delete('/wishlist/:productId', authenticateToken, (req, res) => {
  const { productId } = req.params;

  db.run(
    'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
    [req.user.userId, productId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to remove from wishlist' });
      }
      res.json({ message: 'Removed from wishlist successfully' });
    }
  );
});

// Get user notifications
router.get('/notifications', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20',
    [req.user.userId],
    (err, notifications) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(notifications || []);
    }
  );
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET || 'caresakhi_secret_key';

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = router;