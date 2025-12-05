const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const db = new sqlite3.Database('submissions.db', (err) => {
  if (err) return console.error('Failed to open DB:', err.message);
  console.log('✓ Connected to SQLite DB');
});
db.run(`CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  course TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Contact form POST: save to db
app.post('/api/contact', (req, res) => {
  const { name, email, course, message } = req.body;
  if (!name || !email || !course) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }
  db.run(
    'INSERT INTO submissions (name, email, course, message) VALUES (?, ?, ?, ?)',
    [name, email, course, message || ''],
    function (err) {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ success: false, message: 'Failed to save submission.' });
      }
      console.log(`✓ Submission saved for: ${name}, ${email}, ${course}`);
      return res.json({
        success: true,
        message: 'Thank you! We have received your enrollment request.'
      });
    }
  );
});

// Admin: View all submissions (password via ADMIN_PASS in .env query string)
app.get('/api/admin/submissions', (req, res) => {
  const adminPass = process.env.ADMIN_PASS || 'empoweryou123';
  if (req.query.admin_pass !== adminPass) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  db.all('SELECT * FROM submissions ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ success: true, submissions: rows });
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', db: 'sqlite' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log('========================================');
  console.log('🚀 EmpowerYou Backend Server (Database: SQLite)');
  console.log(`DB Path: submissions.db`);
  console.log(`API Endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`Admin View:   http://localhost:${PORT}/api/admin/submissions?admin_pass=YOURPASS`);
  console.log('========================================\n');
});

