const express = require('express');
const { db } = require('../database/init.cjs');
const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  const { category, search, sort, minPrice, maxPrice } = req.query;
  
  let query = 'SELECT * FROM products WHERE 1=1';
  let params = [];

  if (category && category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  if (minPrice) {
    query += ' AND price >= ?';
    params.push(minPrice);
  }

  if (maxPrice) {
    query += ' AND price <= ?';
    params.push(maxPrice);
  }

  // Add sorting
  switch (sort) {
    case 'price-low':
      query += ' ORDER BY price ASC';
      break;
    case 'price-high':
      query += ' ORDER BY price DESC';
      break;
    case 'rating':
      query += ' ORDER BY rating DESC';
      break;
    case 'newest':
      query += ' ORDER BY created_at DESC';
      break;
    default:
      query += ' ORDER BY is_bestseller DESC, rating DESC';
  }

  db.all(query, params, (err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    // Parse JSON fields
    const formattedProducts = products.map(product => ({
      ...product,
      features: product.features ? JSON.parse(product.features) : [],
      sizes: product.sizes ? JSON.parse(product.sizes) : [],
      colors: product.colors ? JSON.parse(product.colors) : [],
      images: product.images ? JSON.parse(product.images) : [product.image]
    }));

    res.json(formattedProducts);
  });
});

// Get single product
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Parse JSON fields
    const formattedProduct = {
      ...product,
      features: product.features ? JSON.parse(product.features) : [],
      sizes: product.sizes ? JSON.parse(product.sizes) : [],
      colors: product.colors ? JSON.parse(product.colors) : [],
      images: product.images ? JSON.parse(product.images) : [product.image]
    };

    res.json(formattedProduct);
  });
});

// Get product reviews
router.get('/:id/reviews', (req, res) => {
  const { id } = req.params;

  db.all(
    `SELECT pr.*, u.name as user_name, u.avatar 
     FROM product_reviews pr 
     JOIN users u ON pr.user_id = u.id 
     WHERE pr.product_id = ? 
     ORDER BY pr.created_at DESC`,
    [id],
    (err, reviews) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(reviews);
    }
  );
});

// Add product review
router.post('/:id/reviews', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { rating, review_text } = req.body;

  db.run(
    'INSERT INTO product_reviews (product_id, user_id, rating, review_text) VALUES (?, ?, ?, ?)',
    [id, req.user.userId, rating, review_text],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to add review' });
      }

      // Update product rating
      db.run(`
        UPDATE products 
        SET rating = (
          SELECT AVG(rating) FROM product_reviews WHERE product_id = ?
        ),
        reviews_count = (
          SELECT COUNT(*) FROM product_reviews WHERE product_id = ?
        )
        WHERE id = ?
      `, [id, id, id]);

      res.status(201).json({ message: 'Review added successfully' });
    }
  );
});

// Get categories
router.get('/categories/list', (req, res) => {
  db.all(
    'SELECT category, COUNT(*) as count FROM products GROUP BY category',
    (err, categories) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const formattedCategories = [
        { id: 'all', name: 'All Products', count: categories.reduce((sum, cat) => sum + cat.count, 0) },
        ...categories.map(cat => ({
          id: cat.category,
          name: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
          count: cat.count
        }))
      ];

      res.json(formattedCategories);
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