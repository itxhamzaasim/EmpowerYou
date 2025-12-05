// Database utility for local, Vercel, and Netlify
const path = require('path');
const { getSupabaseDatabase } = require('./supabase');

let db = null;
let sqlite3 = null;

function getDatabase() {
  if (db) return db;
  
  // Priority 1: Use Supabase if credentials are available (for permanent cloud storage)
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    const supabaseDb = getSupabaseDatabase();
    if (supabaseDb) {
      console.log('✓ Using Supabase (permanent cloud database)');
      db = supabaseDb;
      return db;
    }
  }
  
  // Priority 2: On Vercel or Netlify without Supabase, use in-memory storage
  if (process.env.VERCEL || process.env.VERCEL_ENV || process.env.NETLIFY || process.env.NETLIFY_DEV) {
    console.warn('⚠️ Using in-memory storage (data will be lost). Set up Supabase for permanent storage.');
    return getInMemoryDatabase();
  }
  
  // Try to use sqlite3 for local development
  try {
    sqlite3 = require('sqlite3').verbose();
    const dbPath = path.join(process.cwd(), 'submissions.db');
    
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
    console.warn('sqlite3 not available, using in-memory storage');
    return getInMemoryDatabase();
  }
}

// In-memory fallback for Vercel and Netlify
let inMemoryStore = [];
let nextId = 1;

function getInMemoryDatabase() {
  const mockDb = {
    run: function(query, params, callback) {
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
        if (callback) {
          // Simulate sqlite3 callback with 'this' context
          const mockThis = { lastID: submission.id, changes: 1 };
          callback.call(mockThis, null);
        }
      } else if (query.includes('DELETE FROM')) {
        const id = params[0];
        const index = inMemoryStore.findIndex(s => s.id === id);
        const mockThis = { changes: index !== -1 ? 1 : 0 };
        if (index !== -1) {
          inMemoryStore.splice(index, 1);
        }
        if (callback) {
          callback.call(mockThis, null);
        }
      } else if (callback) {
        const mockThis = { changes: 0 };
        callback.call(mockThis, null);
      }
    },
    all: function(query, params, callback) {
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
  return mockDb;
}

module.exports = { getDatabase };


