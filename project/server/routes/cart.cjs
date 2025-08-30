const express = require('express');
const { db } = require('../database/init.cjs');
const router = express.Router();

// Get cart items
router.get('/', authenticateToken, (req, res) => {
  db.all(
    `SELECT c.*, p.name, p.price, p.image 
     FROM cart c 
     JOIN products p ON c.product_id = p.id 
     WHERE c.user_id = ?`,
    [req.user.userId],
    (err, items) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

      res.json({
        items,
        total,
        itemCount
      });
    }
  );
});

// Add item to cart
router.post('/add', authenticateToken, (req, res) => {
  const { productId, quantity = 1, size, color } = req.body;

  // Check if item already exists in cart
  db.get(
    'SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND size = ? AND color = ?',
    [req.user.userId, productId, size || '', color || ''],
    (err, existingItem) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (existingItem) {
        // Update quantity
        db.run(
          'UPDATE cart SET quantity = quantity + ? WHERE id = ?',
          [quantity, existingItem.id],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to update cart' });
            }
            res.json({ message: 'Cart updated successfully' });
          }
        );
      } else {
        // Add new item
        db.run(
          'INSERT INTO cart (user_id, product_id, quantity, size, color) VALUES (?, ?, ?, ?, ?)',
          [req.user.userId, productId, quantity, size || '', color || ''],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to add to cart' });
            }
            res.status(201).json({ message: 'Item added to cart successfully' });
          }
        );
      }
    }
  );
});

// Update cart item quantity
router.put('/update/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    db.run(
      'DELETE FROM cart WHERE id = ? AND user_id = ?',
      [id, req.user.userId],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to remove item' });
        }
        res.json({ message: 'Item removed from cart' });
      }
    );
  } else {
    db.run(
      'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, id, req.user.userId],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to update cart' });
        }
        res.json({ message: 'Cart updated successfully' });
      }
    );
  }
});

// Remove item from cart
router.delete('/remove/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.run(
    'DELETE FROM cart WHERE id = ? AND user_id = ?',
    [id, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to remove item' });
      }
      res.json({ message: 'Item removed from cart' });
    }
  );
});

// Clear cart
router.delete('/clear', authenticateToken, (req, res) => {
  db.run(
    'DELETE FROM cart WHERE user_id = ?',
    [req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to clear cart' });
      }
      res.json({ message: 'Cart cleared successfully' });
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