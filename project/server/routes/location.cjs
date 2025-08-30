const express = require('express');
const { db } = require('../database/init.cjs');
const router = express.Router();

// Add/Update business location
router.post('/business', authenticateToken, (req, res) => {
  const { businessName, address, city, state, latitude, longitude, phone, businessHours, services } = req.body;

  // Check if location already exists
  db.get(
    'SELECT * FROM locations WHERE user_id = ?',
    [req.user.userId],
    (err, existingLocation) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const servicesJson = JSON.stringify(services || []);
      const hoursJson = JSON.stringify(businessHours || {});

      if (existingLocation) {
        // Update existing location
        db.run(
          'UPDATE locations SET business_name = ?, address = ?, city = ?, state = ?, latitude = ?, longitude = ?, phone = ?, business_hours = ?, services = ? WHERE user_id = ?',
          [businessName, address, city, state, latitude, longitude, phone, hoursJson, servicesJson, req.user.userId],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to update location' });
            }
            res.json({ message: 'Location updated successfully' });
          }
        );
      } else {
        // Create new location
        db.run(
          'INSERT INTO locations (user_id, business_name, address, city, state, latitude, longitude, phone, business_hours, services) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [req.user.userId, businessName, address, city, state, latitude, longitude, phone, hoursJson, servicesJson],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to save location' });
            }
            res.status(201).json({ message: 'Location saved successfully' });
          }
        );
      }
    }
  );
});

// Get nearby distributors and pharmacies
router.get('/nearby', (req, res) => {
  const { latitude, longitude, radius = 10 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude required' });
  }

  // Get all locations with user type information
  db.all(
    `SELECT l.*, u.user_type, u.name as owner_name
     FROM locations l
     JOIN users u ON l.user_id = u.id
     WHERE u.user_type IN ('distributer', 'pharmacy')
     ORDER BY l.created_at DESC`,
    (err, locations) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      // In a real app, you would calculate distance using latitude/longitude
      // For now, we'll return all locations grouped by type
      const distributors = locations.filter(loc => loc.user_type === 'distributer').map(loc => ({
        ...loc,
        business_hours: loc.business_hours ? JSON.parse(loc.business_hours) : {},
        services: loc.services ? JSON.parse(loc.services) : [],
        distance: Math.random() * 5 + 0.5 // Mock distance
      }));

      const pharmacies = locations.filter(loc => loc.user_type === 'pharmacy').map(loc => ({
        ...loc,
        business_hours: loc.business_hours ? JSON.parse(loc.business_hours) : {},
        services: loc.services ? JSON.parse(loc.services) : [],
        distance: Math.random() * 5 + 0.5 // Mock distance
      }));

      res.json({
        distributors: distributors.sort((a, b) => a.distance - b.distance),
        pharmacies: pharmacies.sort((a, b) => a.distance - b.distance)
      });
    }
  );
});

// Get user's business location
router.get('/business', authenticateToken, (req, res) => {
  db.get(
    'SELECT * FROM locations WHERE user_id = ?',
    [req.user.userId],
    (err, location) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!location) {
        return res.json(null);
      }

      res.json({
        ...location,
        business_hours: location.business_hours ? JSON.parse(location.business_hours) : {},
        services: location.services ? JSON.parse(location.services) : []
      });
    }
  );
});

// Get all distributors and pharmacies for admin
router.get('/all', (req, res) => {
  db.all(
    `SELECT l.*, u.user_type, u.name as owner_name, u.email
     FROM locations l
     JOIN users u ON l.user_id = u.id
     WHERE u.user_type IN ('distributer', 'pharmacy')
     ORDER BY l.city, l.business_name`,
    (err, locations) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const formattedLocations = locations.map(loc => ({
        ...loc,
        business_hours: loc.business_hours ? JSON.parse(loc.business_hours) : {},
        services: loc.services ? JSON.parse(loc.services) : []
      }));

      res.json(formattedLocations);
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