const express = require('express');
const { db } = require('../database/init.cjs');
const router = express.Router();

// Save period tracking data
router.post('/track', authenticateToken, (req, res) => {
  const { lastPeriodDate, cycleLength, periodLength, symptoms } = req.body;

  // Check if user already has tracking data
  db.get(
    'SELECT * FROM period_tracking WHERE user_id = ?',
    [req.user.userId],
    (err, existingData) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const symptomsJson = JSON.stringify(symptoms || []);

      if (existingData) {
        // Update existing data
        db.run(
          'UPDATE period_tracking SET last_period_date = ?, cycle_length = ?, period_length = ?, symptoms = ? WHERE user_id = ?',
          [lastPeriodDate, cycleLength, periodLength, symptomsJson, req.user.userId],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to update tracking data' });
            }
            res.json({ message: 'Period tracking updated successfully' });
          }
        );
      } else {
        // Create new tracking data
        db.run(
          'INSERT INTO period_tracking (user_id, last_period_date, cycle_length, period_length, symptoms) VALUES (?, ?, ?, ?, ?)',
          [req.user.userId, lastPeriodDate, cycleLength, periodLength, symptomsJson],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to save tracking data' });
            }
            res.status(201).json({ message: 'Period tracking saved successfully' });
          }
        );
      }
    }
  );
});

// Get period tracking data
router.get('/data', authenticateToken, (req, res) => {
  db.get(
    'SELECT * FROM period_tracking WHERE user_id = ?',
    [req.user.userId],
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!data) {
        return res.json(null);
      }

      res.json({
        ...data,
        symptoms: data.symptoms ? JSON.parse(data.symptoms) : []
      });
    }
  );
});

// Calculate period predictions
router.post('/predict', authenticateToken, (req, res) => {
  const { lastPeriodDate, cycleLength } = req.body;

  try {
    const lastDate = new Date(lastPeriodDate);
    const nextPeriod = new Date(lastDate);
    nextPeriod.setDate(lastDate.getDate() + parseInt(cycleLength));

    const ovulation = new Date(lastDate);
    ovulation.setDate(lastDate.getDate() + parseInt(cycleLength) - 14);

    const today = new Date();
    const daysUntilNext = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));

    res.json({
      nextPeriod: nextPeriod.toISOString().split('T')[0],
      ovulation: ovulation.toISOString().split('T')[0],
      daysUntilNext
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid date format' });
  }
});

// Log daily symptoms
router.post('/symptoms', authenticateToken, (req, res) => {
  const { date, symptoms, notes } = req.body;

  db.run(
    'INSERT OR REPLACE INTO daily_symptoms (user_id, date, symptoms, notes) VALUES (?, ?, ?, ?)',
    [req.user.userId, date, JSON.stringify(symptoms), notes],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to log symptoms' });
      }
      res.json({ message: 'Symptoms logged successfully' });
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