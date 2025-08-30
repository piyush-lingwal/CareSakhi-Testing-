const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../database/init.cjs');
const router = express.Router();

// Create order
router.post('/create', authenticateToken, (req, res) => {
  const { items, total, shippingAddress, paymentMethod, coinsUsed = 0 } = req.body;
  const orderId = uuidv4();

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    // Create order
    db.run(
      'INSERT INTO orders (id, user_id, total, shipping_address, payment_method) VALUES (?, ?, ?, ?, ?)',
      [orderId, req.user.userId, total, JSON.stringify(shippingAddress), paymentMethod],
      function(err) {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).json({ error: 'Failed to create order' });
        }

        // Add order items
        const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price, size, color) VALUES (?, ?, ?, ?, ?, ?)');
        
        items.forEach(item => {
          stmt.run([orderId, item.id, item.quantity, item.price, item.size || '', item.color || '']);
        });
        
        stmt.finalize();

        // Clear user's cart
        db.run('DELETE FROM cart WHERE user_id = ?', [req.user.userId]);

        // Award coins for successful orders (gamification for all user types)
        const coinsEarned = Math.floor(total / 10); // 1 coin per 10 rupees spent
        
        db.run(
          'UPDATE wallet SET coins = coins + ? WHERE user_id = ?',
          [coinsEarned, req.user.userId],
          function(err) {
            if (!err) {
              // Record coin transaction
              db.run(
                'INSERT INTO wallet_transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
                [req.user.userId, 'coins_credit', coinsEarned, `Order completion reward - ${orderId}`]
              );
            }
          }
        );

        // Add wallet transaction for payment
        const finalAmount = total - (coinsUsed || 0);
        if (finalAmount > 0) {
          db.run(
            'INSERT INTO wallet_transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
            [req.user.userId, 'debit', finalAmount, `Order payment - ${orderId}`]
          );
        }

        // Deduct coins if used
        if (coinsUsed > 0) {
          db.run(
            'UPDATE wallet SET coins = coins - ? WHERE user_id = ?',
            [coinsUsed, req.user.userId]
          );
          
          db.run(
            'INSERT INTO wallet_transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
            [req.user.userId, 'coins_debit', coinsUsed, `Coins redeemed - ${orderId}`]
          );
        }

        // Bonus coins for distributors
        if (req.user.userType === 'distributer') {
          const coinsEarned = Math.floor(total / 10); // 1 coin per 10 rupees spent
          db.run(
            'UPDATE wallet SET coins = coins + ? WHERE user_id = ?',
            [coinsEarned * 0.5, req.user.userId] // 50% bonus for distributors
          );
          
          db.run(
            'INSERT INTO wallet_transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
            [req.user.userId, 'coins_credit', coinsEarned * 0.5, `Distributor bonus - ${orderId}`]
          );
        }

        db.run('COMMIT');

        res.status(201).json({
          message: 'Order created successfully',
          orderId
        });
      }
    );
  });
});

// Get user orders
router.get('/', authenticateToken, (req, res) => {
  db.all(
    `SELECT o.*, 
     GROUP_CONCAT(oi.product_id || ':' || oi.quantity || ':' || oi.price || ':' || p.name) as items
     FROM orders o
     LEFT JOIN order_items oi ON o.id = oi.order_id
     LEFT JOIN products p ON oi.product_id = p.id
     WHERE o.user_id = ?
     GROUP BY o.id
     ORDER BY o.created_at DESC`,
    [req.user.userId],
    (err, orders) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const formattedOrders = orders.map(order => ({
        ...order,
        shipping_address: order.shipping_address ? JSON.parse(order.shipping_address) : null,
        items: order.items ? order.items.split(',').map(item => {
          const [productId, quantity, price, name] = item.split(':');
          return { productId, quantity: parseInt(quantity), price: parseFloat(price), name };
        }) : []
      }));

      res.json(formattedOrders);
    }
  );
});

// Get single order
router.get('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.get(
    'SELECT * FROM orders WHERE id = ? AND user_id = ?',
    [id, req.user.userId],
    (err, order) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Get order items
      db.all(
        `SELECT oi.*, p.name, p.image 
         FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [id],
        (err, items) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }

          res.json({
            ...order,
            shipping_address: order.shipping_address ? JSON.parse(order.shipping_address) : null,
            items
          });
        }
      );
    }
  );
});

// Update order status
router.put('/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run(
    'UPDATE orders SET status = ? WHERE id = ?',
    [status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update order status' });
      }

      res.json({ message: 'Order status updated successfully' });
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