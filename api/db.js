// Database utility for both local and Vercel
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

let db = null;

function getDatabase() {
  if (db) return db;
  
  // For Vercel, use /tmp directory (writable)
  // For local, use current directory
  const dbPath = process.env.VERCEL 
    ? '/tmp/submissions.db'
    : path.join(process.cwd(), 'submissions.db');
  
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Failed to open DB:', err.message);
      return null;
    }
  });
  
  // Create table if not exists
  db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    course TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  return db;
}

module.exports = { getDatabase };

