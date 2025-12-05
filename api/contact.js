const { getDatabase } = require('./db');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Parse JSON body (Vercel doesn't auto-parse)
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ success: false, message: 'Invalid JSON' });
      }
    }
    
    const { name, email, course, message } = body;

    // Validation
    if (!name || !email || !course) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields.' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address.' 
      });
    }

    const database = getDatabase();
    if (!database) {
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection failed.' 
      });
    }

    // Insert into database
    database.run(
      'INSERT INTO submissions (name, email, course, message) VALUES (?, ?, ?, ?)',
      [name, email, course, message || ''],
      function(err) {
        if (err) {
          console.error('DB Error:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Failed to save submission.' 
          });
        }
        
        console.log(`✓ Submission saved: ${name}, ${email}, ${course}`);
        res.json({
          success: true,
          message: 'Thank you! We have received your enrollment request.'
        });
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};


