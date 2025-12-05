const { getDatabase } = require('../db');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const adminPass = process.env.ADMIN_PASS || 'empoweryou123';
  const providedPass = req.query.admin_pass;

  if (providedPass !== adminPass) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized' 
    });
  }

  const database = getDatabase();
  if (!database) {
    return res.status(500).json({ 
      success: false, 
      message: 'Database connection failed' 
    });
  }

  // GET - List all submissions
  if (req.method === 'GET') {
    database.all('SELECT * FROM submissions ORDER BY created_at DESC', (err, rows) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Database error' 
        });
      }
      return res.json({ 
        success: true, 
        submissions: rows || [] 
      });
    });
  } 
  // DELETE - Delete a submission
  else if (req.method === 'DELETE') {
    // Parse body if needed
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // Ignore parse errors
      }
    }
    const id = parseInt(req.query.id || (body && body.id));
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Submission ID required' 
      });
    }

    database.run('DELETE FROM submissions WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Database error' 
        });
      }
      if (this.changes === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Submission not found' 
        });
      }
      console.log(`✓ Deleted submission ID: ${id}`);
      return res.json({ 
        success: true, 
        message: 'Submission deleted successfully' 
      });
    });
  } 
  else {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }
};


