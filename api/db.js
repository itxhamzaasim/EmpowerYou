// Database utility for both local and Vercel
const path = require('path');

let db = null;
let sqlite3 = null;

function getDatabase() {
  if (db) return db;
  
  try {
    // Try to load sqlite3 (may fail on Vercel)
    sqlite3 = require('sqlite3').verbose();
  } catch (error) {
    console.warn('sqlite3 not available, using in-memory storage');
    // Fallback to in-memory storage for Vercel
    return getInMemoryDatabase();
  }
  
  // For Vercel, use /tmp directory (writable)
  // For local, use current directory
  const dbPath = process.env.VERCEL 
    ? '/tmp/submissions.db'
    : path.join(process.cwd(), 'submissions.db');
  
  try {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Failed to open DB:', err.message);
        return getInMemoryDatabase();
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
  } catch (error) {
    console.error('Database initialization error:', error);
    return getInMemoryDatabase();
  }
}

// In-memory fallback for Vercel
let inMemoryStore = [];
let nextId = 1;

function getInMemoryDatabase() {
  return {
    run: (query, params, callback) => {
      if (query.includes('INSERT INTO')) {
        const [name, email, course, message] = params;
        const submission = {
          id: nextId++,
          name,
          email,
          course,
          message: message || '',
          created_at: new Date().toISOString()
        };
        inMemoryStore.push(submission);
        if (callback) callback(null, { lastID: submission.id, changes: 1 });
      } else if (query.includes('DELETE FROM')) {
        const id = params[0];
        const index = inMemoryStore.findIndex(s => s.id === id);
        if (index !== -1) {
          inMemoryStore.splice(index, 1);
          if (callback) callback(null, { changes: 1 });
        } else {
          if (callback) callback(null, { changes: 0 });
        }
      } else if (callback) {
        callback(null, { changes: 0 });
      }
    },
    all: (query, params, callback) => {
      if (query.includes('SELECT * FROM submissions')) {
        const sorted = [...inMemoryStore].sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        if (callback) callback(null, sorted);
      } else if (callback) {
        callback(null, []);
      }
    }
  };
}

module.exports = { getDatabase };


