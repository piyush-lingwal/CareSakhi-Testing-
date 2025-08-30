const { db } = require('./database/init.cjs');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  console.log('Seeding database with initial data...');

  // Seed products
  const products = [
    {
      name: 'EcoFlow Cup',
      category: 'cups',
      price: 45,
      original_price: 60,
      description: 'Our flagship menstrual cup made from premium medical-grade silicone. Designed for comfort and reliability, the EcoFlow Cup provides up to 12 hours of protection.',
      features: JSON.stringify(['12hr Protection', 'Medical Grade Silicone', '10 Year Lifespan', 'Eco-Friendly', 'Easy to Clean']),
      sizes: JSON.stringify(['Small', 'Medium', 'Large']),
      colors: JSON.stringify(['Clear', 'Pink', 'Purple']),
      image: 'https://images.pexels.com/photos/7319325/pexels-photo-7319325.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: JSON.stringify([
        'https://images.pexels.com/photos/7319325/pexels-photo-7319325.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/7319326/pexels-photo-7319326.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]),
      rating: 4.8,
      reviews_count: 1234,
      is_bestseller: 1
    },
    {
      name: 'ComfortMax Brief',
      category: 'underwear',
      price: 32,
      original_price: 40,
      description: 'Ultra-absorbent period underwear that feels just like regular underwear. Perfect for light to heavy flow days with leak-proof protection.',
      features: JSON.stringify(['Ultra Absorbent', 'Leak-Proof', 'Machine Washable', 'Comfortable Fit', 'Odor Control']),
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify(['Black', 'Nude', 'Navy']),
      image: 'https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: JSON.stringify([
        'https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]),
      rating: 4.9,
      reviews_count: 892,
      is_new: 1
    },
    {
      name: 'Travel Kit Pro',
      category: 'accessories',
      price: 25,
      original_price: 35,
      description: 'Complete travel kit with sterilizer, storage pouch, and cleaning tablets. Perfect for maintaining hygiene on the go.',
      features: JSON.stringify(['Sterilizer Included', 'Compact Design', 'Travel Friendly', 'Cleaning Tablets', 'Storage Pouch']),
      sizes: JSON.stringify(['One Size']),
      colors: JSON.stringify(['Pink', 'Blue', 'Green']),
      image: 'https://images.pexels.com/photos/7319069/pexels-photo-7319069.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: JSON.stringify([
        'https://images.pexels.com/photos/7319069/pexels-photo-7319069.jpeg?auto=compress&cs=tinysrgb&w=600'
      ]),
      rating: 4.7,
      reviews_count: 456
    }
  ];

  // Insert products
  const productStmt = db.prepare(`
    INSERT OR IGNORE INTO products 
    (name, category, price, original_price, description, features, sizes, colors, image, images, rating, reviews_count, is_new, is_bestseller)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  products.forEach(product => {
    productStmt.run([
      product.name, product.category, product.price, product.original_price,
      product.description, product.features, product.sizes, product.colors,
      product.image, product.images, product.rating, product.reviews_count,
      product.is_new || 0, product.is_bestseller || 0
    ]);
  });

  productStmt.finalize();

  // Seed blog posts
  const blogPosts = [
    {
      title: 'The Complete Guide to Menstrual Cups: Everything You Need to Know',
      slug: 'complete-guide-menstrual-cups',
      excerpt: 'Discover everything about menstrual cups, from choosing the right size to proper care and maintenance.',
      content: 'Full article content about menstrual cups...',
      author: 'Dr. Sarah Johnson',
      category: 'education',
      image: 'https://images.pexels.com/photos/7319325/pexels-photo-7319325.jpeg?auto=compress&cs=tinysrgb&w=600',
      read_time: '8 min read',
      featured: 1
    },
    {
      title: 'Sustainable Periods: How to Reduce Your Environmental Impact',
      slug: 'sustainable-periods-environmental-impact',
      excerpt: 'Learn how switching to reusable menstrual products can significantly reduce your carbon footprint.',
      content: 'Full article content about sustainability...',
      author: 'Emily Chen',
      category: 'sustainability',
      image: 'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=600',
      read_time: '6 min read',
      featured: 0
    }
  ];

  const blogStmt = db.prepare(`
    INSERT OR IGNORE INTO blog_posts 
    (title, slug, excerpt, content, author, category, image, read_time, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  blogPosts.forEach(post => {
    blogStmt.run([
      post.title, post.slug, post.excerpt, post.content,
      post.author, post.category, post.image, post.read_time, post.featured
    ]);
  });

  blogStmt.finalize();

  // Create sample distributor and pharmacy users
  const sampleUsers = [
    {
      name: 'CareSakhi Store - Central',
      email: 'central@caresakhi.com',
      password: 'password123',
      user_type: 'distributer'
    },
    {
      name: 'HealthPlus Pharmacy',
      email: 'healthplus@pharmacy.com',
      password: 'password123',
      user_type: 'pharmacy'
    }
  ];

  sampleUsers.forEach(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    db.run(
      'INSERT OR IGNORE INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)',
      [user.name, user.email, hashedPassword, user.user_type],
      function(err) {
        if (!err && this.lastID) {
          // Create wallet for user
          const initialCoins = user.user_type === 'distributer' ? 50 : user.user_type === 'pharmacy' ? 25 : 10;
          db.run('INSERT OR IGNORE INTO wallet (user_id, balance, coins) VALUES (?, ?, ?)', [this.lastID, 0, initialCoins]);
          
          // Add location for business users
          if (user.user_type !== 'customer') {
            db.run(
              'INSERT OR IGNORE INTO locations (user_id, business_name, address, city, state, latitude, longitude, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
              [this.lastID, user.name, '123 Main St', 'Mumbai', 'Maharashtra', 19.0760, 72.8777, '+91-9876543210']
            );
          }
        }
      }
    );
  });

  console.log('Database seeded successfully');
};

// Add more sample users for community profiles
const additionalUsers = [
  // Customers
  { name: 'Priya Sharma', email: 'priya.sharma@gmail.com', password: 'password123', user_type: 'customer', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Anjali Patel', email: 'anjali.patel@gmail.com', password: 'password123', user_type: 'customer', city: 'Delhi', state: 'Delhi' },
  { name: 'Sneha Reddy', email: 'sneha.reddy@gmail.com', password: 'password123', user_type: 'customer', city: 'Hyderabad', state: 'Telangana' },
  { name: 'Kavitha Nair', email: 'kavitha.nair@gmail.com', password: 'password123', user_type: 'customer', city: 'Kochi', state: 'Kerala' },
  
  // Distributors
  { name: 'Meera Gupta', email: 'meera.gupta@caresakhi.com', password: 'password123', user_type: 'distributer', city: 'Bangalore', state: 'Karnataka' },
  { name: 'Kavya Singh', email: 'kavya.singh@caresakhi.com', password: 'password123', user_type: 'distributer', city: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Ritu Agarwal', email: 'ritu.agarwal@caresakhi.com', password: 'password123', user_type: 'distributer', city: 'Pune', state: 'Maharashtra' },
  
  // Pharmacies
  { name: 'MediCare Pharmacy', email: 'medicare@pharmacy.com', password: 'password123', user_type: 'pharmacy', city: 'Mumbai', state: 'Maharashtra' },
  { name: 'Apollo Pharmacy', email: 'apollo@pharmacy.com', password: 'password123', user_type: 'pharmacy', city: 'Delhi', state: 'Delhi' },
  { name: 'Wellness Pharmacy', email: 'wellness@pharmacy.com', password: 'password123', user_type: 'pharmacy', city: 'Bangalore', state: 'Karnataka' }
];

// Seed additional users
const seedAdditionalUsers = async () => {
  for (const user of additionalUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    db.run(
      'INSERT OR IGNORE INTO users (name, email, password, user_type, city, state) VALUES (?, ?, ?, ?, ?, ?)',
      [user.name, user.email, hashedPassword, user.user_type, user.city, user.state],
      function(err) {
        if (!err && this.lastID) {
          // Create wallet with initial coins based on user type
          const initialCoins = user.user_type === 'distributer' ? 125 : user.user_type === 'pharmacy' ? 75 : 25;
          const initialBalance = user.user_type === 'customer' ? 100 : 250;
          
          db.run('INSERT OR IGNORE INTO wallet (user_id, balance, coins) VALUES (?, ?, ?)', [this.lastID, initialBalance, initialCoins]);
          
          // Add location for business users
          if (user.user_type !== 'customer') {
            const addresses = {
              'Mumbai': 'Shop 12, Linking Road, Bandra West',
              'Delhi': '45, Connaught Place, Central Delhi',
              'Bangalore': '23, MG Road, Brigade Road',
              'Chennai': '67, T. Nagar, Anna Salai',
              'Pune': '34, FC Road, Shivajinagar',
              'Hyderabad': '56, Banjara Hills, Road No. 12',
              'Kochi': '78, MG Road, Ernakulam'
            };
            
            db.run(
              'INSERT OR IGNORE INTO locations (user_id, business_name, address, city, state, latitude, longitude, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
              [this.lastID, user.name, addresses[user.city] || '123 Main St', user.city, user.state, 
               19.0760 + (Math.random() - 0.5) * 0.1, 72.8777 + (Math.random() - 0.5) * 0.1, '+91-98765-43210']
            );
          }
        }
      }
    );
  }
};

// Create additional tables for features
db.serialize(() => {
  // Wishlist table
  db.run(`
    CREATE TABLE IF NOT EXISTS wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (product_id) REFERENCES products (id),
      UNIQUE(user_id, product_id)
    )
  `);

  // Notifications table
  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'info',
      read BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Daily symptoms table
  db.run(`
    CREATE TABLE IF NOT EXISTS daily_symptoms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date DATE NOT NULL,
      symptoms TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      UNIQUE(user_id, date)
    )
  `);

  // Distributor products table
  db.run(`
    CREATE TABLE IF NOT EXISTS distributor_products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      stock_quantity INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (product_id) REFERENCES products (id),
      UNIQUE(user_id, product_id)
    )
  `);
});

module.exports = { seedDatabase };