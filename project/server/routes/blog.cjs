const express = require('express');
const { db } = require('../database/init.cjs');
const router = express.Router();

// Get all blog posts
router.get('/', (req, res) => {
  const { category, search, featured } = req.query;
  
  let query = 'SELECT * FROM blog_posts WHERE published = 1';
  let params = [];

  if (category && category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (title LIKE ? OR excerpt LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  if (featured === 'true') {
    query += ' AND featured = 1';
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, posts) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(posts);
  });
});

// Get single blog post
router.get('/:slug', (req, res) => {
  const { slug } = req.params;

  db.get('SELECT * FROM blog_posts WHERE slug = ? AND published = 1', [slug], (err, post) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(post);
  });
});

// Get blog categories
router.get('/categories/list', (req, res) => {
  db.all(
    'SELECT category, COUNT(*) as count FROM blog_posts WHERE published = 1 GROUP BY category',
    (err, categories) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const formattedCategories = [
        { id: 'all', name: 'All Posts', count: categories.reduce((sum, cat) => sum + cat.count, 0) },
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

// Create blog post (admin only)
router.post('/', authenticateToken, (req, res) => {
  const { title, slug, excerpt, content, author, category, image, readTime, featured } = req.body;

  db.run(
    'INSERT INTO blog_posts (title, slug, excerpt, content, author, category, image, read_time, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, slug, excerpt, content, author, category, image, readTime, featured ? 1 : 0],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create blog post' });
      }

      res.status(201).json({
        message: 'Blog post created successfully',
        id: this.lastID
      });
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