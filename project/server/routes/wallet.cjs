const express = require('express');
const { db } = require('../database/init.cjs');
const router = express.Router();

// Get wallet balance
router.get('/balance', authenticateToken, (req, res) => {
  db.get(
    'SELECT balance, coins FROM wallet WHERE user_id = ?',
    [req.user.userId],
    (err, wallet) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!wallet) {
        // Create wallet if doesn't exist
        db.run(
          'INSERT INTO wallet (user_id, balance, coins) VALUES (?, ?, ?)',
          [req.user.userId, 0, 0],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to create wallet' });
            }
            res.json({ balance: 0, coins: 0 });
          }
        );
      } else {
        res.json({ balance: wallet.balance, coins: wallet.coins || 0 });
      }
    }
  );
});

// Add money to wallet
router.post('/add-money', authenticateToken, (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    // Update wallet balance
    db.run(
      'UPDATE wallet SET balance = balance + ? WHERE user_id = ?',
      [amount, req.user.userId],
      function(err) {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).json({ error: 'Failed to add money' });
        }

        // Add transaction record
        db.run(
          'INSERT INTO wallet_transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
          [req.user.userId, 'credit', amount, 'Wallet top-up'],
          function(err) {
            if (err) {
              db.run('ROLLBACK');
              return res.status(500).json({ error: 'Failed to record transaction' });
            }

            db.run('COMMIT');
            res.json({ message: 'Money added successfully' });
          }
        );
      }
    );
  });
});

// Get wallet transactions
router.get('/transactions', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM wallet_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    [req.user.userId],
    (err, transactions) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(transactions);
    }
  );
});

// Process payment from wallet
router.post('/pay', authenticateToken, (req, res) => {
  const { amount, description } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  // Check wallet balance
  db.get(
    'SELECT balance FROM wallet WHERE user_id = ?',
    [req.user.userId],
    (err, wallet) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!wallet || wallet.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }

      db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        // Deduct from wallet
        db.run(
          'UPDATE wallet SET balance = balance - ? WHERE user_id = ?',
          [amount, req.user.userId],
          function(err) {
            if (err) {
              db.run('ROLLBACK');
              return res.status(500).json({ error: 'Payment failed' });
            }

            // Add transaction record
            db.run(
              'INSERT INTO wallet_transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
              [req.user.userId, 'debit', amount, description],
              function(err) {
                if (err) {
                  db.run('ROLLBACK');
                  return res.status(500).json({ error: 'Failed to record transaction' });
                }

                db.run('COMMIT');
                res.json({ message: 'Payment successful' });
              }
            );
          }
        );
      });
    }
  );
});

// Add cashback to wallet
router.post('/cashback', authenticateToken, (req, res) => {
  const { amount, description } = req.body;

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    // Add to wallet balance
    db.run(
      'UPDATE wallet SET balance = balance + ? WHERE user_id = ?',
      [amount, req.user.userId],
      function(err) {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).json({ error: 'Failed to add cashback' });
        }

        // Add transaction record
        db.run(
          'INSERT INTO wallet_transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
          [req.user.userId, 'credit', amount, description],
          function(err) {
            if (err) {
              db.run('ROLLBACK');
              return res.status(500).json({ error: 'Failed to record transaction' });
            }

            db.run('COMMIT');
            res.json({ message: 'Cashback added successfully' });
          }
        );
      }
    );
  });
});

// Add coins to wallet (gamification)
router.post('/add-coins', authenticateToken, (req, res) => {
  const { coins, description } = req.body;

  if (coins <= 0) {
    return res.status(400).json({ error: 'Invalid coin amount' });
  }

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    // Update wallet coins
    db.run(
      'UPDATE wallet SET coins = coins + ? WHERE user_id = ?',
      [coins, req.user.userId],
      function(err) {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).json({ error: 'Failed to add coins' });
        }

        // Add transaction record
        db.run(
          'INSERT INTO wallet_transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
          [req.user.userId, 'coins_credit', coins, description],
          function(err) {
            if (err) {
              db.run('ROLLBACK');
              return res.status(500).json({ error: 'Failed to record transaction' });
            }

            db.run('COMMIT');
            res.json({ message: 'Coins added successfully' });
          }
        );
      }
    );
  });
});

// Redeem coins during checkout
router.post('/redeem-coins', authenticateToken, (req, res) => {
  const { coins } = req.body;

  if (coins <= 0) {
    return res.status(400).json({ error: 'Invalid coin amount' });
  }

  // Check wallet coins
  db.get(
    'SELECT coins FROM wallet WHERE user_id = ?',
    [req.user.userId],
    (err, wallet) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!wallet || wallet.coins < coins) {
        return res.status(400).json({ error: 'Insufficient coins' });
      }

      db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        // Deduct coins from wallet
        db.run(
          'UPDATE wallet SET coins = coins - ? WHERE user_id = ?',
          [coins, req.user.userId],
          function(err) {
            if (err) {
              db.run('ROLLBACK');
              return res.status(500).json({ error: 'Failed to redeem coins' });
            }

            // Add transaction record
            db.run(
              'INSERT INTO wallet_transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
              [req.user.userId, 'coins_debit', coins, 'Coins redeemed at checkout'],
              function(err) {
                if (err) {
                  db.run('ROLLBACK');
                  return res.status(500).json({ error: 'Failed to record transaction' });
                }

                db.run('COMMIT');
                res.json({ message: 'Coins redeemed successfully', discount: coins });
              }
            );
          }
        );
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