const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../database/init.cjs');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'caresakhi_secret_key';

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, userType = 'customer' } = req.body;

    console.log('Registration attempt:', { name, email, userType });

    // Check if user already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error during registration:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (user) {
        console.log('User already exists:', email);
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      db.run(
        'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, userType],
        function(err) {
          if (err) {
            console.error('Failed to create user:', err);
            return res.status(500).json({ error: 'Failed to create user' });
          }

          console.log('User created successfully:', this.lastID);

          // Create wallet for new user
          db.run(
            'INSERT INTO wallet (user_id, balance, coins) VALUES (?, ?, ?)',
            [this.lastID, 0, userType === 'distributer' ? 125 : userType === 'pharmacy' ? 75 : 25],
            (walletErr) => {
              if (walletErr) {
                console.error('Failed to create wallet:', walletErr);
              }
            }
          );

          // Generate JWT token
          const token = jwt.sign(
            { userId: this.lastID, email, userType },
            JWT_SECRET,
            { expiresIn: '7d' }
          );

          res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
              id: this.lastID,
              name,
              email,
              userType
            }
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', email);

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error during login:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        console.log('User not found:', email);
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        console.log('Invalid password for user:', email);
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      console.log('Login successful for user:', email);

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, userType: user.user_type },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          avatar: user.avatar
        }
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  db.get(
    'SELECT id, name, email, user_type, phone, address, city, state, zip_code, avatar FROM users WHERE id = ?',
    [req.user.userId],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    }
  );
});

// Update user profile
router.put('/profile', authenticateToken, (req, res) => {
  const { name, phone, address, city, state, zip_code } = req.body;

  db.run(
    'UPDATE users SET name = ?, phone = ?, address = ?, city = ?, state = ?, zip_code = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [name, phone, address, city, state, zip_code, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update profile' });
      }

      res.json({ message: 'Profile updated successfully' });
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

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = router;